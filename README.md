# Subagent Mastery

**미래에셋 AX추진팀 Claude Code Skill Pack**

150개 이상의 전문 에이전트, 11개 스킬, 2개 룰, 3개 워크플로우 커맨드를 포함한 Claude Code 확장 팩입니다.

---

## 설치 방법

### 사전 요구사항

- [Claude Code](https://claude.ai/code) 설치 완료 (`~/.claude` 디렉토리 존재)
- Git 설치

### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/MALife-AI/subagent-mastery/main/install.sh | bash
```

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/MALife-AI/subagent-mastery/main/install.ps1 | iex
```

### 수동 설치

```bash
git clone https://github.com/MALife-AI/subagent-mastery.git
cd subagent-mastery

# 각 디렉토리를 ~/.claude/ 아래에 복사
cp -r agents/ ~/.claude/agents/
cp -r skills/ ~/.claude/skills/
cp -r rules/ ~/.claude/rules/
cp -r commands/ ~/.claude/commands/
```

### 제거

```bash
bash uninstall.sh
```

최근 백업에서 이전 설정을 복원합니다. 설치 시 자동으로 `~/.claude/backups/`에 백업이 생성됩니다.

> 설치/제거 후 **Claude Code를 재시작**하면 적용됩니다.

---

## 구성 요소 개요

| 구성 요소 | 수량 | 설명 |
|-----------|------|------|
| [Agents](agents/) | 150+ | 특정 도메인에 특화된 AI 서브에이전트 |
| [Skills](skills/) | 11 | 재사용 가능한 전문 스킬 모듈 |
| [Rules](rules/) | 2 | 프로젝트 코딩 규칙 및 가드레일 |
| [Commands](commands/) | 3 | 워크플로우 자동화 커맨드 |

---

## Agents (에이전트)

10개 카테고리, 150개 이상의 전문 서브에이전트를 제공합니다.

| 카테고리 | 에이전트 수 | 설명 |
|----------|------------|------|
| [Business & Product](agents/business-product/) | 11 | 비즈니스 분석, 제품 관리, 마케팅, 법률 자문 |
| [Core Development](agents/core-development/) | 10 | API, 백엔드, 프론트엔드, 풀스택 개발 |
| [Data & AI](agents/data-ai/) | 13 | 데이터 엔지니어링, ML/AI, NLP, 프롬프트 엔지니어링 |
| [Developer Experience](agents/developer-experience/) | 13 | 빌드, CLI, 문서화, 리팩토링, DX 최적화 |
| [Infrastructure](agents/infrastructure/) | 16 | 클라우드, DevOps, K8s, 보안, 네트워크 |
| [Language Specialists](agents/language-specialists/) | 29 | 언어/프레임워크별 전문가 (React, Go, Rust 등) |
| [Meta Orchestration](agents/meta-orchestration/) | 10 | 다중 에이전트 조율, 워크플로우 오케스트레이션 |
| [Quality & Security](agents/quality-security/) | 14 | 코드 리뷰, 테스트, 보안 감사, 성능 최적화 |
| [Research & Analysis](agents/research-analysis/) | 7 | 시장 조사, 트렌드 분석, 경쟁 분석 |
| [Specialized Domains](agents/specialized-domains/) | 18 | 핀테크, 게임, IoT, 블록체인 등 특수 도메인 |

---

## Skills (스킬)

| 스킬 | 설명 |
|------|------|
| [banner-design](skills/banner-design/) | 소셜 미디어, 광고, 웹사이트 히어로 배너 디자인 (22개 스타일) |
| [brand](skills/brand/) | 브랜드 보이스, 비주얼 아이덴티티, 메시징 프레임워크 |
| [composition-patterns](skills/composition-patterns/) | React 컴포지션 패턴 (Compound Components, Context 등) |
| [design](skills/design/) | 종합 디자인 (로고, CIP, 배너, 아이콘, 프레젠테이션) |
| [design-system](skills/design-system/) | 디자인 토큰 아키텍처, 컴포넌트 스펙, 슬라이드 생성 |
| [everything-claude-code](skills/everything-claude-code/) | ECC 프로젝트 개발 컨벤션 및 패턴 |
| [mirae-asset-design](skills/mirae-asset-design/) | 미래에셋 공식 디지털 가이드라인 기반 디자인 |
| [react-best-practices](skills/react-best-practices/) | Vercel 엔지니어링 기반 React/Next.js 성능 최적화 (69개 룰) |
| [react-native-skills](skills/react-native-skills/) | React Native/Expo 모바일 앱 최적화 (39개 룰) |
| [slides](skills/slides/) | HTML 프레젠테이션 생성 (Chart.js, 디자인 토큰) |
| [ui-styling](skills/ui-styling/) | shadcn/ui + Tailwind CSS UI 스타일링 |

---

## Rules (룰)

| 룰 | 설명 |
|----|------|
| [everything-claude-code-guardrails](rules/everything-claude-code-guardrails.md) | ECC 프로젝트 가드레일 (커밋 워크플로우, 아키텍처, 코드 스타일) |
| [node](rules/node.md) | Node.js 프로젝트 규칙 (CommonJS, ESLint, 훅 개발 가이드) |

---

## Commands (커맨드)

| 커맨드 | 설명 |
|--------|------|
| [feature-development](commands/feature-development.md) | 표준 기능 구현 워크플로우 스캐폴드 |
| [database-migration](commands/database-migration.md) | 데이터베이스 스키마 변경 및 마이그레이션 워크플로우 |
| [add-language-rules](commands/add-language-rules.md) | 새로운 프로그래밍 언어 룰 추가 워크플로우 |

---

## 프로젝트 구조

```
subagent-mastery/
├── agents/                    # 150+ 전문 서브에이전트
│   ├── business-product/      # 비즈니스/제품 에이전트
│   ├── core-development/      # 핵심 개발 에이전트
│   ├── data-ai/               # 데이터/AI 에이전트
│   ├── developer-experience/  # 개발자 경험 에이전트
│   ├── infrastructure/        # 인프라 에이전트
│   ├── language-specialists/  # 언어 전문가 에이전트
│   ├── meta-orchestration/    # 메타 오케스트레이션 에이전트
│   ├── quality-security/      # 품질/보안 에이전트
│   ├── research-analysis/     # 연구/분석 에이전트
│   └── specialized-domains/   # 특수 도메인 에이전트
├── skills/                    # 11개 전문 스킬 모듈
│   ├── banner-design/
│   ├── brand/
│   ├── composition-patterns/
│   ├── design/
│   ├── design-system/
│   ├── everything-claude-code/
│   ├── mirae-asset-design/
│   ├── react-best-practices/
│   ├── react-native-skills/
│   ├── slides/
│   └── ui-styling/
├── rules/                     # 프로젝트 규칙
├── commands/                  # 워크플로우 커맨드
├── install.sh                 # macOS/Linux 설치 스크립트
├── install.ps1                # Windows 설치 스크립트
└── uninstall.sh               # 제거 스크립트
```

---

## 라이선스

MIT License - AX추진팀
