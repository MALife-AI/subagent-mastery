# Rules

프로젝트 코딩 규칙 및 가드레일을 정의하는 룰 파일입니다. Claude Code가 코드를 작성할 때 이 규칙들을 자동으로 따릅니다.

## 룰 목록

| 룰 | 설명 |
|----|------|
| [everything-claude-code-guardrails](everything-claude-code-guardrails.md) | ECC 프로젝트 가드레일. Conventional Commits, hybrid 모듈 구성, camelCase 파일 명명, 워크플로우 감지 등 프로젝트 전반의 규칙을 정의 |
| [node](node.md) | Node.js 프로젝트 규칙. Node.js >=18, CommonJS 전용, ESLint, 훅 개발 가이드(200줄 제한, exit 0 원칙), lowercase-with-hyphens 파일 명명, 테스트 필수 요건 등 |

## 주요 규칙 요약

### Commit 규칙
- Conventional Commits 사용 (`fix`, `feat`, `test`, `docs` 등)
- 기존 PR/리뷰 플로우 유지

### 코드 스타일
- CommonJS only (ESM 사용 불가, `.mjs` 제외)
- `const` 우선, `var` 금지
- 훅 스크립트 200줄 제한

### 테스트 요건
- 커밋 전 `node tests/run-all.js` 실행
- `scripts/lib/` 신규 스크립트는 `tests/lib/`에 테스트 필수
- 신규 훅은 `tests/hooks/`에 통합 테스트 필수

[메인으로 돌아가기](../)
