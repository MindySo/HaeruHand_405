# 해루핸 백엔드 개발자 가이드

이 문서는 해루핸 프로젝트의 백엔드 개발 시 따라야 할 규칙과 패턴을 설명합니다.

## 1. API 응답 체계

### 1.1 표준 응답 구조
모든 API 응답은 `ApiResponse<T>` 래퍼를 사용하여 일관된 형식으로 반환됩니다.

```json
{
  "is_success": true,
  "code": 200,
  "message": "요청이 성공적으로 처리되었습니다.",
  "data": { }
}
```

### 1.2 컨트롤러에서의 사용법

#### 성공 응답 (데이터 없음)
```java
@DeleteMapping("/{id}")
public ResponseEntity<ApiResponse<Void>> deleteEmail(@PathVariable Long id) {
    emailService.deleteEmail(id);
    return ApiResponse.success(SuccessStatus.DELETE_EMAIL_SUCCESS);
}
```

#### 성공 응답 (데이터 있음)
```java
@GetMapping("/userinfo")
public ResponseEntity<ApiResponse<UserInfoDto>> getUserInfo(@RequestHeader("Authorization") String bearerToken) {
    String accessToken = bearerToken.replace("Bearer ", "");
    UserInfoDto userInfo = oAuthService.getUserInfo(accessToken);
    return ApiResponse.success(SuccessStatus.OK, userInfo);
}
```

#### 토큰을 포함한 성공 응답
```java
// Access Token만 포함
return ApiResponse.successWithToken(SuccessStatus.OK, responseDto, accessToken);

// Access Token과 Refresh Token 모두 포함 (로그인 시)
return ApiResponse.successWithToken(SuccessStatus.LOGIN_SUCCESS, loginResponse, accessToken, refreshToken);
```

## 2. 상태 코드 관리

### 2.1 성공 상태 (SuccessStatus)
`SuccessStatus` enum에 새로운 성공 상태를 추가합니다:

```java
public enum SuccessStatus implements BaseSuccessStatus {
    // 기본
    OK(HttpStatus.OK, 200, "요청이 성공적으로 처리되었습니다."),
    
    // 도메인별 성공 상태
    LOGIN_SUCCESS(HttpStatus.OK, 200, "로그인이 성공적으로 완료되었습니다."),
    GET_FISH_LIST_SUCCESS(HttpStatus.OK, 200, "물고기 목록 조회가 성공적으로 완료되었습니다."),
    CREATE_FISH_SUCCESS(HttpStatus.CREATED, 201, "물고기 생성이 성공적으로 완료되었습니다.");
    
    // ...
}
```

### 2.2 에러 상태 (ErrorStatus)
`ErrorStatus` enum에 새로운 에러 상태를 추가합니다:

```java
public enum ErrorStatus implements BaseErrorStatus {
    // 공통 에러
    BAD_REQUEST(HttpStatus.BAD_REQUEST, 400, "잘못된 요청입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 401, "인증이 필요합니다."),
    
    // 도메인별 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "존재하지 않는 유저입니다."),
    FISH_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "존재하지 않는 물고기입니다."),
    DUPLICATE_FISH_NAME(HttpStatus.CONFLICT, 409, "이미 존재하는 물고기 이름입니다.");
    
    // ...
}
```

## 3. 예외 처리

### 3.1 비즈니스 예외 발생
서비스 레이어에서 `GlobalException`을 사용하여 예외를 발생시킵니다:

```java
@Service
public class FishService {
    public Fish findById(Long id) {
        return fishRepository.findById(id)
            .orElseThrow(() -> new GlobalException(ErrorStatus.FISH_NOT_FOUND));
    }
    
    public void validateDuplicateName(String name) {
        if (fishRepository.existsByName(name)) {
            throw new GlobalException(ErrorStatus.DUPLICATE_FISH_NAME);
        }
    }
}
```

### 3.2 예외 처리 흐름
1. 서비스에서 `GlobalException` 발생
2. `GlobalExceptionHandler`가 예외를 캐치
3. `ApiResponse.error()`로 일관된 에러 응답 반환

```java
// GlobalExceptionHandler에서 자동 처리
@ExceptionHandler(GlobalException.class)
public ResponseEntity<ApiResponse<Void>> handleGlobalException(GlobalException e) {
    log.warn(">>>>>>>>GlobalException: {}", e.getErrorStatus().getMessage());
    return ApiResponse.error(e.getErrorStatus());
}
```

## 4. 도메인 개발 패턴

### 4.1 새로운 도메인 추가 시 체크리스트

1. **Entity 생성** (`domain/[도메인명]/entity`)
   ```java
   @Entity
   @Getter
   @NoArgsConstructor(access = AccessLevel.PROTECTED)
   @AllArgsConstructor
   @Builder
   public class Fish extends BaseEntity {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;
       
       private String name;
       // ...
   }
   ```

2. **DTO 생성** (`domain/[도메인명]/dto`)
   - Request DTO: 클라이언트 → 서버
   - Response DTO: 서버 → 클라이언트
   - 내부 DTO: 서비스 간 데이터 전달

3. **Repository 생성** (`domain/[도메인명]/repository`)
   ```java
   public interface FishRepository extends JpaRepository<Fish, Long> {
       Optional<Fish> findByName(String name);
       boolean existsByName(String name);
   }
   ```

4. **Service 인터페이스 및 구현체** (`domain/[도메인명]/service`)
   ```java
   public interface FishService {
       FishResponseDto createFish(FishCreateRequestDto request);
       FishResponseDto getFish(Long id);
   }
   
   @Service
   @RequiredArgsConstructor
   public class FishServiceImpl implements FishService {
       private final FishRepository fishRepository;
       // 구현...
   }
   ```

5. **Controller 생성** (`domain/[도메인명]/controller`)
   ```java
   @RestController
   @RequestMapping("/api/v1/fish")
   @RequiredArgsConstructor
   public class FishController {
       private final FishService fishService;
       
       @PostMapping
       public ResponseEntity<ApiResponse<FishResponseDto>> createFish(
               @RequestBody @Valid FishCreateRequestDto request) {
           FishResponseDto response = fishService.createFish(request);
           return ApiResponse.success(SuccessStatus.CREATE_FISH_SUCCESS, response);
       }
   }
   ```

6. **상태 코드 추가**
   - `SuccessStatus`에 성공 상태 추가
   - `ErrorStatus`에 에러 상태 추가

### 4.2 DTO 검증
Request DTO에는 Bean Validation을 사용합니다:

```java
public class FishCreateRequestDto {
    @NotBlank(message = "물고기 이름은 필수입니다.")
    @Size(max = 50, message = "물고기 이름은 50자 이하여야 합니다.")
    private String name;
    
    @NotNull(message = "길이는 필수입니다.")
    @Positive(message = "길이는 양수여야 합니다.")
    private Double length;
}
```

## 5. 보안 및 인증

### 5.1 JWT 토큰 사용
- Access Token: Authorization 헤더에 Bearer 토큰으로 전달
- Refresh Token: X-Refresh-Token 헤더에 전달

### 5.2 인증이 필요한 엔드포인트
```java
@GetMapping("/my-fish")
public ResponseEntity<ApiResponse<List<FishResponseDto>>> getMyFish(
        @RequestHeader("Authorization") String bearerToken) {
    String accessToken = bearerToken.replace("Bearer ", "");
    // JWT에서 userId 추출하여 사용
    Long userId = jwtProvider.getUserIdFromToken(accessToken);
    List<FishResponseDto> myFish = fishService.getMyFish(userId);
    return ApiResponse.success(SuccessStatus.OK, myFish);
}
```

## 6. 개발 시 주의사항

1. **일관된 응답 구조 유지**: 모든 API는 `ApiResponse`를 사용
2. **적절한 상태 코드 사용**: 도메인별로 구체적인 상태 메시지 정의
3. **예외 처리**: 서비스 레이어에서 `GlobalException` 사용
4. **DTO 분리**: Entity를 직접 반환하지 않고 DTO 사용
5. **검증**: Request DTO에 Bean Validation 적용
6. **로깅**: 중요한 비즈니스 로직과 예외 상황에 로그 추가

## 7. 코드 예제

### 완전한 CRUD 컨트롤러 예제
```java
@RestController
@RequestMapping("/api/v1/fish")
@RequiredArgsConstructor
@Tag(name = "Fish", description = "물고기 관리 API")
public class FishController {
    private final FishService fishService;
    
    @PostMapping
    @Operation(summary = "물고기 생성")
    public ResponseEntity<ApiResponse<FishResponseDto>> createFish(
            @RequestBody @Valid FishCreateRequestDto request) {
        FishResponseDto response = fishService.createFish(request);
        return ApiResponse.success(SuccessStatus.CREATE_FISH_SUCCESS, response);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "물고기 단건 조회")
    public ResponseEntity<ApiResponse<FishResponseDto>> getFish(@PathVariable Long id) {
        FishResponseDto response = fishService.getFish(id);
        return ApiResponse.success(SuccessStatus.OK, response);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "물고기 수정")
    public ResponseEntity<ApiResponse<FishResponseDto>> updateFish(
            @PathVariable Long id,
            @RequestBody @Valid FishUpdateRequestDto request) {
        FishResponseDto response = fishService.updateFish(id, request);
        return ApiResponse.success(SuccessStatus.OK, response);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "물고기 삭제")
    public ResponseEntity<ApiResponse<Void>> deleteFish(@PathVariable Long id) {
        fishService.deleteFish(id);
        return ApiResponse.success(SuccessStatus.DELETE_FISH_SUCCESS);
    }
}
```

이 가이드를 따라 일관성 있고 유지보수가 쉬운 코드를 작성할 수 있습니다.