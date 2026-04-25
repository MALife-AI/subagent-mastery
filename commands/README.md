# Commands

Claude Code에서 사용할 수 있는 워크플로우 자동화 커맨드입니다. 각 커맨드는 반복적인 개발 워크플로우를 구조화된 단계로 안내합니다.

## 커맨드 목록

| 커맨드 | 설명 |
|--------|------|
| [feature-development](feature-development.md) | 표준 기능 구현 워크플로우. 매니페스트, 스키마, 테스트, API 관련 파일을 다루며, 현재 상태 파악 -> 최소 변경 -> 검증 -> 요약 순서로 진행 |
| [database-migration](database-migration.md) | 데이터베이스 스키마 변경 워크플로우. 마이그레이션 파일 생성, 스키마 정의 업데이트, 타입 생성/업데이트를 포함 |
| [add-language-rules](add-language-rules.md) | 새 프로그래밍 언어 룰 추가 워크플로우. `rules/{language}/` 디렉토리에 coding-style, hooks, patterns, security, testing 가이드를 생성 |
| [smart-skill](smart-skill.md) | 자연어 지시를 분석하여 최적의 스킬 조합으로 query를 재작성하고, 확인 후 실행 |
| [skill-search](skill-search.md) | 자연어로 검색하면 관련 스킬을 찾아 기능과 사용법을 안내 |
| [polish](../.claude/commands/polish.md) | **NEW** UI/UX 종합 폴리싱. 모든 디자인 스킬(ui-ux-pro-max, composition-patterns, design-system 등) + 외부 디자인 철학(Design Engineering, Impeccable, Taste Skill)을 통합 활용하여 인터페이스를 프로덕션 수준으로 완성 |

## 사용법

Claude Code에서 워크플로우 커맨드로 호출하여 사용합니다.

## 공통 워크플로우

모든 커맨드는 동일한 4단계 워크플로우를 따릅니다:

1. **상태 파악** - 현재 상태와 실패 모드 이해
2. **최소 변경** - 목표를 달성하는 가장 작은 일관된 변경 수행
3. **검증** - 수정된 파일에 대한 관련 검증 실행
4. **요약** - 변경 사항 및 남은 리뷰 사항 정리

[메인으로 돌아가기](../)
