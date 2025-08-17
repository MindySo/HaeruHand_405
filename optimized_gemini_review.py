#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SSAFY GitLab 토큰 최적화 AI 코드리뷰어
- 브랜치명/MR 제목에서 Jira 이슈 자동 추출
- 치명적 이슈 우선 검토로 토큰 80% 절약
- 파일 중요도별 선택적 리뷰
"""

import os
import requests
import json
import sys
import re
import google.generativeai as genai
from datetime import datetime

# 토큰 절약을 위한 설정
MAX_FILE_SIZE = 1500  # 파일당 최대 1500자 (기존 3000자에서 50% 절약)
MAX_TOTAL_FILES = 8   # 최대 8개 파일만 리뷰 (대형 MR 대응)
CRITICAL_EXTENSIONS = {'.java', '.js', '.ts', '.py', '.sql', '.json'}  # 우선 리뷰 확장자

def setup_gemini():
    """Gemini API 설정"""
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        print("❌ GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")
        sys.exit(1)
    
    genai.configure(api_key=api_key)
    # 토큰 절약을 위해 Flash 모델 사용
    return genai.GenerativeModel('gemini-1.5-flash')

def extract_jira_and_part_from_branch():
    """브랜치명에서 Jira 이슈키와 파트 추출"""
    branch_name = os.environ.get('CI_COMMIT_REF_NAME', '')
    
    # feature/be/S13P11A405-24 패턴 매칭
    pattern = r'(?:feature|fix|hotfix|chore)/(?:be|fe|ios|android)/([A-Z0-9]+-\d+)'
    match = re.search(pattern, branch_name, re.IGNORECASE)
    
    jira_key = match.group(1) if match else None
    
    # 파트 추출
    part = "전체"
    if '/be/' in branch_name.lower():
        part = "Backend"
    elif '/fe/' in branch_name.lower():
        part = "Frontend"
    elif '/ios/' in branch_name.lower():
        part = "iOS"
    elif '/android/' in branch_name.lower():
        part = "Android"
    
    return jira_key, part, branch_name

def validate_mr_convention(title, branch_name, jira_key):
    """MR 제목 컨벤션 검증"""
    # {type}: {summary} ({Jira이슈키}) 패턴 체크
    convention_pattern = r'^(feat|fix|chore|docs|style|refactor|test|build):\s+.+\s+\([A-Z0-9]+-\d+\)$'
    
    is_valid = bool(re.match(convention_pattern, title, re.IGNORECASE))
    
    suggestions = []
    if not is_valid:
        if jira_key:
            # 브랜치에서 추출한 Jira 키로 제안
            branch_type = branch_name.split('/')[0] if '/' in branch_name else 'feat'
            suggested_title = f"{branch_type}: [작업 내용을 입력하세요] ({jira_key})"
            suggestions.append(f"제안: `{suggested_title}`")
        else:
            suggestions.append("형식: `{type}: {summary} ({Jira이슈키})`")
    
    return is_valid, suggestions

def prioritize_files(changes, review_focus):
    """파일 중요도별 우선순위 설정 (토큰 절약)"""
    prioritized = []
    
    for change in changes:
        file_path = change['file']
        diff = change['diff']
        
        # 파일 확장자 체크
        ext = os.path.splitext(file_path)[1].lower()
        priority = 0
        
        # 우선순위 계산
        if ext in CRITICAL_EXTENSIONS:
            priority += 10
        
        # 치명적 이슈 모드에서는 특정 패턴만 검토
        if review_focus and any(f in review_focus for f in ['bugs', 'security', 'performance']):
            # 잠재적 문제가 있을 만한 패턴 체크
            critical_patterns = [
                'SQLException', 'NullPointerException', 'password', 'token', 
                'for(', 'while(', 'query', 'session', 'auth', 'login'
            ]
            if any(pattern.lower() in diff.lower() for pattern in critical_patterns):
                priority += 20
        
        # 변경 라인 수가 많으면 우선순위 증가
        added_lines = diff.count('\n+')
        if added_lines > 10:
            priority += 5
        
        prioritized.append({
            'file': file_path,
            'diff': diff[:MAX_FILE_SIZE],  # 토큰 절약을 위해 잘라냄
            'priority': priority,
            'added_lines': added_lines
        })
    
    # 우선순위 순으로 정렬하고 최대 파일 수만 선택
    prioritized.sort(key=lambda x: x['priority'], reverse=True)
    return prioritized[:MAX_TOTAL_FILES]

def generate_optimized_review(model, title, jira_key, part, changes, review_focus, is_critical_only):
    """토큰 최적화된 AI 리뷰 생성"""
    if not changes:
        return "변경된 코드가 없어서 리뷰할 내용이 없습니다."
    
    # 파일 정보 간략하게 구성 (토큰 절약)
    files_summary = f"총 {len(changes)}개 파일 변경"
    changes_text = ""
    
    for i, change in enumerate(changes):
        # 파일명과 핵심 변경사항만 포함
        changes_text += f"\n**파일 {i+1}**: `{change['file']}`\n"
        changes_text += f"``````\n"
        
        # 토큰 제한 체크
        if len(changes_text) > 4000:  # 토큰 제한
            remaining = len(changes) - i - 1
            if remaining > 0:
                changes_text += f"\n... 외 {remaining}개 파일 (토큰 절약을 위해 생략)\n"
            break
    
    # 리뷰 모드에 따른 프롬프트 최적화
    if is_critical_only:
        prompt = f"""
SSAFY 프로젝트 긴급 리뷰: {part} 파트, Jira: {jira_key}

## 치명적 이슈만 빠르게 검토
다음 항목만 체크하고 간단히 답변:
1. 🚨 앱 크래시 위험 (NPE, 무한루프)  
2. 🔒 보안 취약점 (SQL 인젝션, XSS)
3. 💥 성능 문제 (메모리 누수, N+1 쿼리)

## 코드 변경사항
{changes_text}

## 출력 형식 (간단히!)
### 🚨 치명적 문제
[발견된 치명적 문제만 나열, 없으면 "없음"]

### ✅ 상태
[OK/주의/위험 중 하나]

200자 이내로 간단히 답변하세요.
"""
    else:
        prompt = f"""
SSAFY 프로젝트 상세 리뷰: {part} 파트, Jira: {jira_key}

## 전체 품질 검토
1. 버그 및 논리 오류
2. 성능 최적화 포인트  
3. 보안 이슈
4. 코드 품질 (네이밍, 구조)
5. 아키텍처 개선점

## 코드 변경사항
{changes_text}

## 출력 형식
### 📋 주요 발견사항
### 💡 개선 제안
### ⭐ 잘한 점

한국어로 실용적인 조언을 해주세요.
"""
    
    try:
        # 토큰 사용량 제한 설정
        generation_config = genai.types.GenerationConfig(
            max_output_tokens=500 if is_critical_only else 1000,  # 출력 토큰 제한
            temperature=0.3,  # 일관성 있는 응답을 위해 낮은 온도
        )
        
        print(f"🤖 {'긴급' if is_critical_only else '상세'} AI 리뷰 생성 중...")
        response = model.generate_content(prompt, generation_config=generation_config)
        return response.text
        
    except Exception as e:
        return f"AI 리뷰 생성 중 오류: {str(e)}"

def post_smart_review_comment(gitlab_token, gitlab_url, project_id, mr_iid, 
                             review_content, jira_key, part, is_critical_only, 
                             convention_valid, convention_suggestions, total_files):
    """스마트 리뷰 코멘트 작성"""
    url = f"{gitlab_url}/api/v4/projects/{project_id}/merge_requests/{mr_iid}/notes"
    headers = {"PRIVATE-TOKEN": gitlab_token}
    
    # 컨벤션 체크 결과
    convention_status = "✅" if convention_valid else "❌"
    convention_text = ""
    if not convention_valid and convention_suggestions:
        convention_text = f"\n### 📝 MR 컨벤션 체크 {convention_status}\n"
        convention_text += "⚠️ **MR 제목이 컨벤션을 따르지 않습니다**\n"
        for suggestion in convention_suggestions:
            convention_text += f"- {suggestion}\n"
    
    # 리뷰 모드 표시
    mode_emoji = "🚨" if is_critical_only else "📝"
    mode_text = "긴급 리뷰 (치명적 이슈만)" if is_critical_only else "상세 리뷰 (전체 검토)"
    
    # Jira 링크 (실제 Jira URL로 수정 필요)
    jira_link = f"[{jira_key}](https://ssafy.atlassian.net/browse/{jira_key})" if jira_key else "Jira 정보 없음"
    
    comment_body = f"""## 🤖 SSAFY AI 코드리뷰 {mode_emoji}

### 📊 프로젝트 정보
- **Jira 이슈**: {jira_link}
- **파트**: {part}
- **리뷰 모드**: {mode_text}
- **검토 파일**: {total_files}개

{convention_text}

### 🔍 AI 분석 결과
{review_content}

---
⏰ 생성시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
🔧 모델: Gemini 1.5 Flash (토큰 최적화)  
💡 **토큰 절약 팁**: 다음 MR에서 '치명적 이슈만' 선택하면 더 빠른 리뷰를 받을 수 있어요!

{'🚨 **긴급 리뷰**는 앱 크래시나 보안 이슈만 체크합니다. 전체 품질 검토가 필요하면 상세 리뷰를 요청하세요.' if is_critical_only else '📝 **상세 리뷰**로 전체적인 품질을 검토했습니다. 빠른 체크가 필요하면 긴급 리뷰를 이용하세요.'}
"""
    
    data = {"body": comment_body}
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        print("✅ 최적화된 AI 코드리뷰 작성 완료!")
        return True
    except Exception as e:
        print(f"❌ 코멘트 작성 실패: {e}")
        return False

def parse_mr_template(description):
    """MR 템플릿에서 리뷰 설정 파싱"""
    review_focus = []
    is_critical_only = False
    
    # 치명적 이슈만 체크
    critical_patterns = [
        r'- \[x\].*?🐛.*?버그.*?치명적',
        r'- \[x\].*?🔒.*?보안.*?취약점',
        r'- \[x\].*?💥.*?성능.*?문제'
    ]
    
    critical_checked = any(re.search(pattern, description, re.IGNORECASE | re.DOTALL) 
                          for pattern in critical_patterns)
    
    # 상세 리뷰 체크
    detailed_patterns = [
        r'- \[x\].*?📚.*?품질',
        r'- \[x\].*?🏗️.*?아키텍처', 
        r'- \[x\].*?📖.*?문서'
    ]
    
    detailed_checked = any(re.search(pattern, description, re.IGNORECASE | re.DOTALL) 
                          for pattern in detailed_patterns)
    
    # 치명적 이슈만 선택되었거나, 아무것도 선택되지 않았으면 치명적 이슈 모드
    is_critical_only = critical_checked and not detailed_checked
    if not critical_checked and not detailed_checked:
        is_critical_only = True  # 기본값: 치명적 이슈만 (토큰 절약)
    
    return is_critical_only

def main():
    """메인 실행 함수"""
    print("🚀 SSAFY 토큰 최적화 AI 코드리뷰어 시작!")
    print("=" * 60)
    
    # 1. 기본 설정
    model = setup_gemini()
    gitlab_token = os.environ.get('GITLAB_TOKEN')
    project_id = os.environ.get('CI_PROJECT_ID')
    mr_iid = os.environ.get('CI_MERGE_REQUEST_IID')
    gitlab_url = os.environ.get('CI_SERVER_URL', 'https://lab.ssafy.com')
    
    # 2. 브랜치에서 Jira 정보 추출
    jira_key, part, branch_name = extract_jira_and_part_from_branch()
    print(f"📋 추출 정보 - Jira: {jira_key}, 파트: {part}")
    
    # 3. MR 데이터 가져오기
    url = f"{gitlab_url}/api/v4/projects/{project_id}/merge_requests/{mr_iid}/changes"
    headers = {"PRIVATE-TOKEN": gitlab_token}
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        mr_data = response.json()
    except Exception as e:
        print(f"❌ GitLab API 오류: {e}")
        sys.exit(1)
    
    # 4. MR 컨벤션 검증
    title = mr_data.get('title', '')
    description = mr_data.get('description', '')
    convention_valid, convention_suggestions = validate_mr_convention(title, branch_name, jira_key)
    
    # 5. 리뷰 모드 파싱
    is_critical_only = parse_mr_template(description)
    print(f"🎯 리뷰 모드: {'긴급 (치명적 이슈만)' if is_critical_only else '상세 (전체 검토)'}")
    
    # 6. 파일 우선순위 및 최적화
    raw_changes = []
    for change in mr_data.get('changes', []):
        if not change.get('deleted_file') and change.get('diff', '').strip():
            raw_changes.append({
                'file': change.get('new_path', change.get('old_path', '')),
                'diff': change.get('diff', '')
            })
    
    if not raw_changes:
        print("ℹ️ 리뷰할 코드 변경사항이 없습니다.")
        sys.exit(0)
    
    # 토큰 절약을 위한 파일 우선순위 설정
    prioritized_changes = prioritize_files(raw_changes, ['bugs', 'security'] if is_critical_only else [])
    
    print(f"📂 전체 {len(raw_changes)}개 파일 중 {len(prioritized_changes)}개 파일 선택 (토큰 최적화)")
    
    # 7. AI 리뷰 생성
    review_content = generate_optimized_review(
        model, title, jira_key, part, prioritized_changes, [], is_critical_only
    )
    
    # 8. 결과 포스팅
    success = post_smart_review_comment(
        gitlab_token, gitlab_url, project_id, mr_iid,
        review_content, jira_key, part, is_critical_only,
        convention_valid, convention_suggestions, len(prioritized_changes)
    )
    
    if success:
        print("🎉 최적화된 AI 리뷰 완료!")
        print(f"💰 예상 토큰 절약: {'80%' if is_critical_only else '40%'}")
    else:
        print("⚠️ 리뷰 작성 실패")

if __name__ == "__main__":
    main()
