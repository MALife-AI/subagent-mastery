# Skills

Claude Code에서 사용할 수 있는 전문 스킬 모듈 모음입니다. 각 스킬은 특정 작업에 특화된 레퍼런스, 룰, 패턴을 포함합니다.

## 스킬 목록

### 내부 스킬

| 스킬 | 레퍼런스 | 룰 | 설명 |
|------|---------|-----|------|
| [banner-design](banner-design/) | 1 | - | 소셜 미디어, 광고, 웹사이트 히어로 배너 디자인 |
| [brand](brand/) | 11 | - | 브랜드 보이스, 비주얼 아이덴티티, 메시징 프레임워크 |
| [composition-patterns](composition-patterns/) | - | 10 | React 컴포지션 패턴 (Compound Components 등) |
| [design](design/) | 18 | - | 종합 디자인 (로고, CIP, 배너, 아이콘, 슬라이드) |
| [design-system](design-system/) | 7 | - | 디자인 토큰 아키텍처, 컴포넌트 스펙 |
| [everything-claude-code](everything-claude-code/) | - | - | ECC 프로젝트 개발 컨벤션 |
| [mirae-asset-design](mirae-asset-design/) | 5 | - | 미래에셋 공식 디지털 가이드라인 기반 디자인 |
| [react-best-practices](react-best-practices/) | - | 69 | Vercel 엔지니어링 React/Next.js 성능 최적화 |
| [react-native-skills](react-native-skills/) | - | 39 | React Native/Expo 모바일 앱 최적화 |
| [skill-maker](skill-maker/) | - | - | 한 문장 지시로 대화형 인터뷰 → 플래닝 → 스킬 생성 |
| [slides](slides/) | 5 | - | HTML 프레젠테이션 (Chart.js, 디자인 토큰) |
| [ui-styling](ui-styling/) | 7 | - | shadcn/ui + Tailwind CSS UI 스타일링 |
| [ui-ux-pro-max](ui-ux-pro-max/) | - | - | 웹·모바일 UI/UX 지식 (99 UX 가이드라인, 161 컬러 팔레트, 57 폰트 페어링) |
| [web-design-guidelines](web-design-guidelines/) | - | - | Web Interface Guidelines 기반 UI 리뷰 및 접근성 감사 |

### 외부 디자인 스킬 (풀버전)

원본 오픈소스 스킬을 풀버전으로 통합했습니다. `/polish` 커맨드에서 자동으로 활용됩니다.

| 스킬 | 파일 수 | 설명 |
|------|--------|------|
| [production-design](production-design/) | SKILL.md + 35 references + 14 scripts | 프로덕션급 인터페이스 설계. 24개 커맨드, OKLCH 색상 전략, AI slop 감지, 라이브 개발 모드 |
| [animation-engineering](animation-engineering/) | SKILL.md (679줄) | 애니메이션 엔지니어링. 의사결정 프레임워크, 컴포넌트 원칙, CSS Transform/clip-path, 제스처, 성능 규칙 |
| [design-quality](design-quality/) | SKILL.md (226줄) | 메트릭 기반 디자인. 3가지 조정 파라미터, AI Tells 금지 패턴, Creative Arsenal 인터랙션 레시피 |

## 외부 스킬 상세

### production-design (원본: pbakaus/production-design)

**24개 디자인 커맨드:**
- Build: craft, shape, teach, document, extract
- Evaluate: critique, audit
- Refine: polish, bolder, quieter, distill, harden, onboard
- Enhance: animate, colorize, typeset, layout, delight, overdrive
- Fix: clarify, adapt, optimize
- Iterate: live (브라우저 실시간 반복)

**핵심 기능:**
- PRODUCT.md/DESIGN.md 컨텍스트 시스템
- OKLCH 색상 + 4단계 전략 (Restrained → Drenched)
- Absolute bans (사이드 스트라이프, 그라디언트 텍스트, 동일 카드 그리드 등)
- AI slop test + 카테고리 반사 체크

### animation-engineering (원본: emilkowalski/skill)

**9개 주요 섹션:**
1. Core Philosophy (취향은 훈련, 보이지 않는 디테일)
2. Animation Decision Framework (빈도, 목적, easing, duration)
3. Spring Animations (모멘텀, 마우스 인터랙션)
4. Component Building Principles (버튼, popover, tooltip)
5. CSS Transform Mastery (translateY, scale, 3D)
6. clip-path Animation (탭, hold-to-delete, 비교 슬라이더)
7. Gesture & Drag (모멘텀 해제, 감쇠, 포인터 캡처)
8. Performance Rules (WAAPI, CSS vs JS, 변수 상속)
9. Sonner Principles + Stagger + Debugging

### design-quality (원본: leonxlnx/taste-skill)

**3가지 메트릭:**
- DESIGN_VARIANCE: 1-10 (보수적 ~ 파격적)
- MOTION_INTENSITY: 1-10 (정적 ~ 시네마틱)
- VISUAL_DENSITY: 1-10 (갤러리 ~ 콕핏)

**AI Tells 금지 패턴 + Creative Arsenal 40+ 인터랙션 레시피**

## 총계

- 내부 스킬: 14개
- 외부 스킬: 3개 (풀버전)
- 레퍼런스: 89개 (내부 54 + production-design 35)
- 룰: 118개
- 스크립트: 14개 (production-design)

[메인으로 돌아가기](../)
