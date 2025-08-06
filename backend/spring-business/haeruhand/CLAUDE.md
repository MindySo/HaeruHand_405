# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

### Build
```bash
# Build the project
./gradlew build

# Build without tests
./gradlew build -x test

# Clean and build
./gradlew clean build
```

### Run
```bash
# Run the application
./gradlew bootRun

# Run with specific profile
./gradlew bootRun --args='--spring.profiles.active=local'
```

### Test
```bash
# Run all tests
./gradlew test

# Run a specific test class
./gradlew test --tests com.ssafy.haeruhand.HaeruhandApplicationTests

# Run tests with more output
./gradlew test --info
```

### Development
```bash
# Format code (if configured)
./gradlew spotlessApply

# Check dependencies for updates
./gradlew dependencyUpdates

# Generate dependency report
./gradlew dependencies
```

## Architecture Overview

### Project Structure
This is a Spring Boot 3.5.4 application using Java 17 with a domain-driven design approach.

### Core Dependencies
- **Spring Boot Web**: REST API endpoints
- **Spring Data JPA**: Database persistence with Hibernate
- **Spring Security + OAuth2**: Authentication via Kakao OAuth
- **JWT**: Token-based authentication (io.jsonwebtoken)
- **Redis**: Token storage and caching
- **MySQL**: Primary database
- **WebFlux**: For WebClient usage
- **Swagger/OpenAPI**: API documentation at `/swagger-ui.html`

### Domain Structure
The application follows a layered architecture within each domain:
- **controller**: REST endpoints
- **dto**: Data transfer objects
- **entity**: JPA entities
- **repository**: Data access layer
- **service**: Business logic

Current domains:
- **user**: User management and OAuth authentication
- **fish**: Fish-related functionality
- **fishery**: Fishery management
- **location**: Location services
- **marine**: Marine data
- **weather**: Weather information

### Global Components
- **config**: Application configuration (Security, CORS, Swagger, etc.)
- **jwt**: JWT token generation and validation
- **exception**: Global exception handling
- **response**: Standardized API responses using ApiResponse wrapper
- **base/status**: Enum-based status codes for responses

### Security Configuration
- CSRF disabled
- All `/api/**` endpoints are currently permitAll()
- JWT authentication configured in Swagger
- OAuth2 with Kakao provider

### Environment Variables Required
```yaml
# Database
MYSQL_HOST
MYSQL_PORT
MYSQL_DATABASE
MYSQL_USER
MYSQL_PASSWORD

# Redis
REDIS_HOST
REDIS_PORT

# Server
SERVER_PORT

# JWT
JWT_SECRET

# OAuth
CLIENT_ID (Kakao)
```

### Key Configuration Files
- `application-local.yml`: Local development configuration
- `application-prod.yml`: Production configuration
- JWT token expiration: 1 hour (access), 7 days (refresh)

### API Response Pattern
All API responses use the `ApiResponse<T>` wrapper with:
- Status codes from `SuccessStatus` or `ErrorStatus` enums
- Consistent error handling via `GlobalExceptionHandler`