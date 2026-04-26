---
description: UI/UX 폴리싱 - 모든 디자인 스킬을 통합 활용하여 인터페이스를 프로덕션 수준으로 완성합니다
allowed_tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
---

# /polish

UI/UX를 프로덕션 수준으로 폴리싱하는 종합 커맨드입니다. 기존 내부 스킬과 외부 디자인 스킬을 모두 통합하여 적용합니다.

## 사전 준비 (필수)

**폴리싱 작업 전, 반드시 아래 스킬 파일들을 Read하여 지식을 로드합니다.**

### 내부 스킬
- `skills/ui-ux-pro-max/SKILL.md` — 99 UX 가이드라인, 161 컬러 팔레트, 57 폰트 페어링
- `skills/design-system/SKILL.md` — 토큰 아키텍처, 컴포넌트 스펙

### 외부 디자인 스킬 (풀버전 설치됨)
- `skills/animation-engineering/SKILL.md` — 애니메이션 의사결정, 컴포넌트 빌딩 원칙, CSS Transform, clip-path, 제스처, 성능 규칙 (679줄)
- `skills/production-design/SKILL.md` — 프로덕션급 인터페이스 설계, 24개 커맨드, 색상 전략, AI slop 감지
  - 커맨드별 상세 가이드: `skills/production-design/reference/` (41개 파일)
  - 스크립트: `skills/production-design/scripts/` (14개 파일)
- `skills/design-quality/SKILL.md` — 메트릭 기반 디자인 (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY), AI Tells 금지 패턴, Creative Arsenal

**로드 순서:**
1. 대상 파일을 Read
2. `skills/production-design/SKILL.md`를 Read (공유 디자인 법칙 확인)
3. `skills/animation-engineering/SKILL.md`를 Read (애니메이션 관련이면)
4. `skills/design-quality/SKILL.md`를 Read (레이아웃/안티패턴 관련이면)
5. 필요한 production-design reference 파일을 Read (예: `skills/production-design/reference/polish.md`, `skills/production-design/reference/audit.md`)

## 통합 지식 베이스

### 내부 스킬
- **ui-ux-pro-max**: 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types
- **composition-patterns**: React 컴포지션 패턴 10가지
- **design-system**: 토큰 아키텍처, 컴포넌트 스펙
- **ui-styling**: shadcn/ui + Tailwind CSS
- **banner-design**: 배너 디자인 22가지 스타일
- **slides**: HTML 프레젠테이션 디자인

### 외부 디자인 스킬 (풀버전)

#### 1. 애니메이션 엔지니어링 (`skills/animation-engineering/`)
**핵심 원칙**:
- 취향은 훈련되는 것이다
- 보이지 않는 디테일이 쌓인다
- 아름다움은 레버리지다

**애니메이션 의사결정 프레임워크**:
1. Should this animate? (빈도 기반 - 100+/day면 NO)
2. What is the purpose? (공간 일관성, 상태 표시, 피드백)
3. What easing? (진입=ease-out, 이동=ease-in-out, 호버=ease)
4. How fast? (UI는 100-300ms)

**추가 섹션** (기존 요약에 없던 것들):
- CSS Transform Mastery (translateY 퍼센트, scale 자식 상속, 3D)
- clip-path 애니메이션 (탭 전환, hold-to-delete, 이미지 리빌)
- Gesture & Drag (모멘텀 해제, 경계 감쇠, 포인터 캡처)
- Performance Rules (CSS변수 상속 주의, WAAPI, CSS > JS 규칙)
- Sonner Principles (개발자 경험, 좋은 기본값)
- Stagger / Debugging 기법

#### 2. 프로덕션 디자인 시스템 (`skills/production-design/`)
**24개 커맨드** (각각 상세 reference 파일 보유):
- Build: craft, shape, teach, document, extract
- Evaluate: critique, audit
- Refine: polish, bolder, quieter, distill, harden, onboard
- Enhance: animate, colorize, typeset, layout, delight, overdrive
- Fix: clarify, adapt, optimize
- Iterate: live

**공유 디자인 법칙**:
- OKLCH 색상 시스템 + 4단계 색상 전략 (Restrained → Drenched)
- 테마: 물리적 장면 문장으로 dark/light 결정
- Absolute bans: 사이드 스트라이프, 그라디언트 텍스트, 기본 글래스모피즘, 히어로 메트릭 템플릿
- AI slop test: 카테고리 반사 체크

**컨텍스트 시스템**:
- PRODUCT.md: 브랜드, 사용자, 전략
- DESIGN.md: 컬러, 타이포그래피, 컴포넌트

#### 3. 메트릭 기반 디자인 (`skills/design-quality/`)
**3가지 파라미터**:
- DESIGN_VARIANCE: 1-10 (레이아웃 실험성)
- MOTION_INTENSITY: 1-10 (애니메이션 양)
- VISUAL_DENSITY: 1-10 (화면 콘텐츠 밀도)

**AI Tells (금지 패턴)** — 기존 요약보다 훨씬 구체적:
- NO Neon/Outer Glows, NO Pure Black (#000000)
- NO Inter Font → Geist, Outfit, Cabinet Grotesk, Satoshi 사용
- NO 3-Column Card Layouts → Zig-Zag, 비대칭 그리드
- NO Generic Names/Avatars/Numbers (Jane Doe 효과)
- NO Startup Slop Names (Acme, Nexus)

**Creative Arsenal** (고급 인터랙션 레시피):
- Navigation: Mac OS Dock, Magnetic Button, Gooey Menu, Dynamic Island
- Layout: Bento Grid, Masonry, Split Screen Scroll
- Cards: Parallax Tilt, Spotlight Border, Holographic Foil
- Scroll: Sticky Stack, Horizontal Hijack, Zoom Parallax
- Typography: Kinetic Marquee, Text Mask Reveal, Text Scramble

## 실행 프로세스

**사용자 입력**: $ARGUMENTS

### Phase 0: 스킬 로드

대상 파일과 작업 유형에 따라 필요한 스킬 파일을 Read합니다.

**항상 로드**:
- 대상 파일(들)
- `skills/production-design/SKILL.md` (공유 디자인 법칙)

**조건부 로드**:
- 애니메이션/인터랙션 관련 → `skills/animation-engineering/SKILL.md`
- 레이아웃/안티패턴/전체 폴리싱 → `skills/design-quality/SKILL.md`
- production-design 세부 커맨드 필요 시 → `skills/production-design/reference/{command}.md`

### Phase 1: 분석 (Analyze)

파일을 읽고 현재 상태 파악:

1. **구조 분석**
   - 컴포넌트 아키텍처 (composition-patterns)
   - 레이아웃 구조 (ui-ux-pro-max)
   - 상태 관리 패턴

2. **시각 분석**
   - 컬러 시스템 (ui-ux-pro-max 161 palettes + production-design OKLCH 전략)
   - 타이포그래피 (57 font pairings + design-quality 금지 폰트)
   - 간격 및 정렬 (design-system tokens)

3. **인터랙션 분석**
   - 애니메이션 품질 (animation-engineering 풀 프레임워크)
   - 터치/클릭 인터랙션 (ui-ux-pro-max)
   - 모션 강도 (design-quality MOTION_INTENSITY)

4. **접근성 분석**
   - WCAG 준수 (ui-ux-pro-max)
   - 터치 타겟 크기 (44x44)
   - 키보드 네비게이션

5. **안티패턴 감지**
   - production-design Absolute bans + AI slop test
   - design-quality AI Tells (금지 패턴)
   - UI-UX-Pro-Max 룰 위반

### Phase 2: 진단 (Diagnose)

발견된 이슈를 우선순위별로 분류:

| 우선순위 | 카테고리 | 예시 |
|---------|---------|------|
| CRITICAL | 접근성, 터치 인터랙션 | 명도 대비 4.5:1 미달, 터치 타겟 < 44px |
| HIGH | 레이아웃, 타이포그래피 | 일관성 없는 간격, 가독성 문제 |
| MEDIUM | 애니메이션, 컬러 | 부적절한 easing, 안티패턴 컬러 |
| LOW | 마이크로 인터랙션 | 버튼 :active 상태 없음, 툴팁 딜레이 |

**파라미터 추천**:
```
현재 추정:
DESIGN_VARIANCE: [1-10]
MOTION_INTENSITY: [1-10]
VISUAL_DENSITY: [1-10]

최적 추천:
DESIGN_VARIANCE: [X] (이유: ...)
MOTION_INTENSITY: [Y] (이유: ...)
VISUAL_DENSITY: [Z] (이유: ...)
```

### Phase 3: 폴리싱 (Polish)

우선순위에 따라 개선:

#### 1. CRITICAL 이슈 해결

**접근성**:
- 명도 대비 수정 (ui-ux-pro-max color-contrast)
- Focus states 추가
- ARIA labels
- Alt text

**터치 인터랙션**:
- 터치 타겟 44x44px 보장
- 8px 간격 확보
- Loading 피드백

#### 2. HIGH 이슈 개선

**레이아웃**:
- Design tokens 적용 (design-system)
- 모바일 우선 breakpoints
- Grid/Flexbox 최적화
- production-design 레이아웃 법칙: 카드 남용 금지, 리듬감 있는 간격

**타이포그래피**:
- 57 font pairings 참고 + design-quality 금지 폰트 확인
- Base 16px, line-height 1.5, max-width 65-75ch
- Semantic color tokens

#### 3. MEDIUM 이슈 최적화

**애니메이션** (animation-engineering 풀 프레임워크):
- 빈도 체크 → 100+/day면 제거
- Easing 커브 교체 (ease-out for UI)
- Duration 최적화 (100-300ms)
- Custom curves 적용
- CSS transition > keyframes (인터럽트 가능한 UI)
- clip-path 활용, blur 마스킹

**컬러**:
- production-design OKLCH + 색상 전략 적용
- design-quality AI Tells 제거 (NO purple gradients, NO pure black)
- Semantic tokens

#### 4. LOW 이슈 폴리싱

**마이크로 인터랙션** (animation-engineering):
```css
/* 버튼 */
.button:active {
  transform: scale(0.97);
}

/* 진입 애니메이션 */
.entering {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 200ms var(--ease-out), opacity 200ms;
}

/* Popover origin */
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}
```

**Custom Easing**:
```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### Phase 4: 리뷰 포맷 (Review)

**반드시 마크다운 테이블 사용**:

| Before | After | Why | Priority | Source |
| --- | --- | --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | 정확한 속성 명시; `all` 회피 | MEDIUM | animation-engineering |
| `scale(0)` | `scale(0.95); opacity: 0` | 현실에서는 무에서 나타나지 않음 | MEDIUM | animation-engineering |
| `color: #888` | `color: var(--text-secondary)` | Semantic token 사용 | HIGH | design-system |
| 명도 대비 2.5:1 | 명도 대비 4.5:1 | WCAG AA 준수 | CRITICAL | ui-ux-pro-max |
| 터치 영역 38px | 터치 영역 44px | iOS/Android 가이드라인 | CRITICAL | ui-ux-pro-max |
| `#000` 사용 | 브랜드 hue tinted neutral | 순수 검정 금지 | MEDIUM | production-design |
| Inter 폰트 | Geist / Satoshi | AI 기본 폰트 회피 | MEDIUM | design-quality |
| 3열 동일 카드 | 비대칭 그리드 | 제네릭 카드 레이아웃 금지 | MEDIUM | design-quality |

### Phase 5: 통합 완성 (Finalize)

1. **파일 수정 적용**
2. **디자인 토큰 추출** (design-system)
3. **컴포넌트 재사용성 검증** (composition-patterns)
4. **최종 체크리스트**:
   - [ ] WCAG AA 준수
   - [ ] 터치 타겟 44x44
   - [ ] 애니메이션 duration < 300ms
   - [ ] Semantic tokens 사용
   - [ ] production-design Absolute bans 위반 없음
   - [ ] design-quality AI Tells 위반 없음
   - [ ] 컴포넌트 컴포지션 최적화

## 사용 예시

```bash
# 기본 폴리싱
/polish components/hero.tsx

# 특정 우선순위만
/polish --priority CRITICAL,HIGH dashboard.tsx

# 파라미터 지정
/polish --variance 7 --motion 5 --density 4 landing-page.tsx

# 애니메이션만 집중
/polish --focus animation button.tsx

# 전체 프로젝트
/polish src/components/**/*.tsx
```

## 출력 구조

### 1. 분석 요약 (1-2문단)
현재 상태와 주요 발견사항

### 2. 진단 테이블
| 우선순위 | 이슈 | 위치 | 영향 |
|---------|-----|------|------|

### 3. 파라미터 추천
```
추천 설정:
DESIGN_VARIANCE: X (이유)
MOTION_INTENSITY: Y (이유)
VISUAL_DENSITY: Z (이유)
```

### 4. Before/After 테이블
상세한 수정 내역

### 5. 수정된 코드
실제 폴리싱 적용된 코드

### 6. 체크리스트
[ ] 완료 항목들

## 통합 지식 활용 우선순위

1. **CRITICAL**: ui-ux-pro-max (접근성, 터치)
2. **HIGH**: design-system (토큰), production-design (디자인 법칙), ui-ux-pro-max (레이아웃)
3. **MEDIUM**: animation-engineering (애니메이션), design-quality (안티패턴), production-design (AI slop test)
4. **LOW**: animation-engineering (마이크로 디테일), design-quality (Creative Arsenal)

## 참고 자료

- **내부 스킬**: skills/ui-ux-pro-max, skills/composition-patterns, skills/design-system, skills/ui-styling
- **외부 스킬 (풀버전)**: skills/animation-engineering, skills/production-design (41 references + 14 scripts), skills/design-quality

---

**실행 시작**: $ARGUMENTS가 있으면 Phase 0 스킬 로드부터 시작. 없으면 사용법 안내.
