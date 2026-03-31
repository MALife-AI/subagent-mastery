# Agents

Claude Code에서 사용할 수 있는 150개 이상의 전문 서브에이전트 모음입니다. 각 에이전트는 특정 도메인에 특화된 전문 지식과 도구를 갖추고 있습니다.

## 카테고리

| 카테고리 | 에이전트 수 | 설명 |
|----------|------------|------|
| [Business & Product](business-product/) | 11 | 비즈니스 분석, 제품 전략, 마케팅, 법률 자문 등 |
| [Core Development](core-development/) | 10 | API 설계, 백엔드/프론트엔드/풀스택 개발 |
| [Data & AI](data-ai/) | 13 | 데이터 파이프라인, ML/AI 시스템, NLP |
| [Developer Experience](developer-experience/) | 13 | 빌드 최적화, CLI 개발, 문서화, DX 개선 |
| [Infrastructure](infrastructure/) | 16 | 클라우드, DevOps, 컨테이너, 네트워크 |
| [Language Specialists](language-specialists/) | 29 | 프로그래밍 언어/프레임워크 전문가 |
| [Meta Orchestration](meta-orchestration/) | 10 | 다중 에이전트 조율 및 워크플로우 관리 |
| [Quality & Security](quality-security/) | 14 | 코드 리뷰, 테스트, 보안 감사 |
| [Research & Analysis](research-analysis/) | 7 | 시장/경쟁/트렌드 조사 및 분석 |
| [Specialized Domains](specialized-domains/) | 18 | 핀테크, 게임, IoT, 블록체인 등 특수 영역 |

## 에이전트 파일 형식

각 에이전트는 YAML frontmatter가 포함된 마크다운 파일입니다:

```yaml
---
name: agent-name
description: 에이전트 설명
tools: [Read, Write, Edit, Bash, Glob, Grep]
model: sonnet
---
```

[메인으로 돌아가기](../)
