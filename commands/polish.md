---
description: UI/UX 폴리싱 - 모든 디자인 스킬을 통합 활용하여 인터페이스를 프로덕션 수준으로 완성합니다
allowed_tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
---

# /polish

UI/UX를 프로덕션 수준으로 폴리싱하는 종합 커맨드입니다. 기존 디자인 스킬과 외부 디자인 철학을 모두 통합하여 적용합니다.

## 통합 지식 베이스

### 기존 스킬
- **ui-ux-pro-max**: 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types
- **composition-patterns**: React 컴포지션 패턴 10가지
- **design-system**: 토큰 아키텍처, 컴포넌트 스펙
- **ui-styling**: shadcn/ui + Tailwind CSS
- **banner-design**: 배너 디자인 22가지 스타일
- **slides**: HTML 프레젠테이션 디자인

### 외부 디자인 철학 (통합)

#### 1. Design Engineering (Emil Kowalski)
**핵심 원칙**:
- 취향은 훈련되는 것이다
- 보이지 않는 디테일이 쌓인다
- 아름다움은 레버리지다

**애니메이션 의사결정 프레임워크**:
1. Should this animate? (빈도 기반 - 100+/day면 NO)
2. What is the purpose? (공간 일관성, 상태 표시, 피드백)
3. What easing? (진입=ease-out, 이동=ease-in-out, 호버=ease)
4. How fast? (UI는 100-300ms)

**컴포넌트 원칙**:
- 버튼: `transform: scale(0.97)` on `:active` 필수
- 진입: `scale(0.95) + opacity: 0` (절대 scale(0) 금지)
- Popover: trigger 위치 기준 transform-origin
- Tooltip: 후속 호버에서 딜레이 스킵
- CSS transition > keyframes (인터럽트 가능)

**커스텀 Easing**:
```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

#### 2. Impeccable (pbakaus)
**23개 설계 명령어 개념**:
- craft/shape: 초기 설계
- audit/critique: 체계적 검토
- animate/bolder/colorize/delight: 시각 강화
- quieter/typeset/layout: 정리 최적화
- adapt/clarify/distill: 정보 구조
- harden/onboard/optimize: 완성도
- teach/document/extract/live: 도구

**컨텍스트 시스템**:
- PRODUCT.md: 브랜드, 사용자, 전략
- DESIGN.md: 컬러, 타이포그래피, 컴포넌트

**안티패턴 감지 (25가지)**:
- Purple gradients 남용
- Generic card layouts
- Oversized buttons
- Cluttered spacing
- Inconsistent typography

#### 3. Taste Skill (leonxlnx)
**3가지 파라미터**:
- DESIGN_VARIANCE: 1-10 (레이아웃 실험성)
- MOTION_INTENSITY: 1-10 (애니메이션 양)
- VISUAL_DENSITY: 1-10 (화면 콘텐츠 밀도)

**메트릭 기반 접근**:
- 명확한 수치로 디자인 결정 정당화
- 성능, 접근성, 사용성 지표 중심
- RSC 우선, 명확한 클라이언트/서버 경계

**회피 안티패턴**:
- 보라/분홍 그라데이션
- 과도한 버튼과 간격
- 제네릭 카드 그리드
- 의미 없는 장식 아이콘
- 과장된 그림자/블러

## 실행 프로세스

**사용자 입력**: $ARGUMENTS

### Phase 1: 분석 (Analyze)

파일을 읽고 현재 상태 파악:

1. **구조 분석**
   - 컴포넌트 아키텍처 (composition-patterns)
   - 레이아웃 구조 (ui-ux-pro-max)
   - 상태 관리 패턴

2. **시각 분석**
   - 컬러 시스템 (ui-ux-pro-max 161 palettes)
   - 타이포그래피 (57 font pairings)
   - 간격 및 정렬 (design-system tokens)

3. **인터랙션 분석**
   - 애니메이션 품질 (emil-design-eng)
   - 터치/클릭 인터랙션 (ui-ux-pro-max)
   - 모션 강도 (taste-skill MOTION_INTENSITY)

4. **접근성 분석**
   - WCAG 준수 (ui-ux-pro-max)
   - 터치 타겟 크기 (44×44)
   - 키보드 네비게이션

5. **안티패턴 감지**
   - Impeccable 25가지 체크
   - Taste-skill 회피 패턴
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
- 터치 타겟 44×44px 보장
- 8px 간격 확보
- Loading 피드백

#### 2. HIGH 이슈 개선

**레이아웃**:
- Design tokens 적용 (design-system)
- 모바일 우선 breakpoints
- Grid/Flexbox 최적화

**타이포그래피**:
- 57 font pairings 참고
- Base 16px, line-height 1.5
- Semantic color tokens

#### 3. MEDIUM 이슈 최적화

**애니메이션** (emil-design-eng):
- 빈도 체크 → 100+/day면 제거
- Easing 커브 교체 (ease-out for UI)
- Duration 최적화 (100-300ms)
- Custom curves 적용

**컬러**:
- 안티패턴 제거 (purple gradients)
- 161 palettes에서 매칭
- Semantic tokens

#### 4. LOW 이슈 폴리싱

**마이크로 인터랙션**:
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

### Phase 4: 리뷰 포맷 (Review)

**반드시 마크다운 테이블 사용**:

| Before | After | Why | Priority | Source |
| --- | --- | --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | 정확한 속성 명시; `all` 회피 | MEDIUM | emil-design-eng |
| `scale(0)` | `scale(0.95); opacity: 0` | 현실에서는 무에서 나타나지 않음 | MEDIUM | emil-design-eng |
| `color: #888` | `color: var(--text-secondary)` | Semantic token 사용 | HIGH | design-system |
| 명도 대비 2.5:1 | 명도 대비 4.5:1 | WCAG AA 준수 | CRITICAL | ui-ux-pro-max |
| 터치 영역 38px | 터치 영역 44px | iOS/Android 가이드라인 | CRITICAL | ui-ux-pro-max |
| `ease-in` 300ms | Custom `cubic-bezier(0.23, 1, 0.32, 1)` 200ms | 즉각적 피드백 | MEDIUM | emil-design-eng |

### Phase 5: 통합 완성 (Finalize)

1. **파일 수정 적용**
2. **디자인 토큰 추출** (design-system)
3. **컴포넌트 재사용성 검증** (composition-patterns)
4. **최종 체크리스트**:
   - [ ] WCAG AA 준수
   - [ ] 터치 타겟 44×44
   - [ ] 애니메이션 duration < 300ms
   - [ ] Semantic tokens 사용
   - [ ] 안티패턴 제거
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
2. **HIGH**: design-system (토큰), ui-ux-pro-max (레이아웃)
3. **MEDIUM**: emil-design-eng (애니메이션), impeccable (안티패턴)
4. **LOW**: emil-design-eng (디테일), taste-skill (파라미터)

## 참고 자료

- **기존 스킬**: skills/ui-ux-pro-max, composition-patterns, design-system, ui-styling
- **Design Engineering**: animations.dev, easing.dev
- **Impeccable**: impeccable.style
- **Taste Skill**: 메트릭 기반 접근

---

**실행 시작**: $ARGUMENTS가 있으면 즉시 Phase 1부터 시작. 없으면 사용법 안내.
