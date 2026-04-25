# Design Engineering Philosophy

디자인 엔지니어링 철학과 UI 폴리싱 원칙. 애니메이션 의사결정과 마이크로 인터랙션 디테일에 중점.

출처: Design Engineering principles (animations.dev)

## 핵심 원칙

### 1. 취향은 훈련되는 것이다
좋은 취향은 개인적 선호가 아니라 훈련된 본능입니다. 위대한 작품을 연구하고, 왜 좋은지 깊이 생각하며, 끊임없이 연습하여 개발됩니다.

### 2. 보이지 않는 디테일이 쌓인다
사용자가 의식적으로 알아차리지 못하는 디테일들이 모여 놀라운 것을 만듭니다. 기능이 예상대로 작동하면 사용자는 생각 없이 진행합니다. 그것이 목표입니다.

> "보이지 않는 모든 디테일이 합쳐져 놀라운 것을 만듭니다. 마치 천 개의 거의 들리지 않는 목소리가 하나로 노래하는 것처럼." - Paul Graham

### 3. 아름다움은 레버리지다
사람들은 기능만이 아니라 전체 경험을 기준으로 도구를 선택합니다. 좋은 기본값과 좋은 애니메이션은 실제 차별화 요소입니다. 소프트웨어에서 아름다움은 과소평가되어 있습니다. 이를 레버리지로 활용하세요.

## 애니메이션 의사결정 프레임워크

애니메이션 코드를 작성하기 전에 순서대로 질문에 답하세요:

### 1. 애니메이션을 할 것인가?

**질문**: 사용자가 이 애니메이션을 얼마나 자주 볼까요?

| 빈도 | 결정 |
|------|------|
| 하루 100회 이상 (키보드 단축키, 커맨드 팔레트) | 절대 애니메이션 없음 |
| 하루 수십 회 (호버 효과, 리스트 네비게이션) | 제거 또는 대폭 축소 |
| 가끔 (모달, 드로어, 토스트) | 표준 애니메이션 |
| 드물게/처음 (온보딩, 피드백 폼, 축하) | 즐거움 추가 가능 |

**절대 규칙**: 키보드로 시작된 액션은 애니메이션하지 마세요. 하루에 수백 번 반복되는 액션에 애니메이션을 추가하면 느리고 지연되고 연결이 끊긴 느낌을 줍니다.

Raycast는 열기/닫기 애니메이션이 없습니다. 하루에 수백 번 사용하는 것에는 그것이 최적 경험입니다.

### 2. 목적은 무엇인가?

모든 애니메이션은 "왜 애니메이션하는가?"에 명확한 답이 있어야 합니다.

**유효한 목적**:
- **공간 일관성**: 토스트가 같은 방향에서 들어오고 나가서 스와이프 해제가 직관적
- **상태 표시**: 모핑 피드백 버튼이 상태 변화를 보여줌
- **설명**: 기능 작동 방식을 보여주는 마케팅 애니메이션
- **피드백**: 버튼이 눌림에 scale down하여 인터페이스가 사용자를 들었다고 확인
- **급격한 변화 방지**: 전환 없이 나타나거나 사라지는 요소는 망가진 것처럼 느껴짐

"멋져 보여서"가 목적이고 사용자가 자주 볼 예정이라면, 애니메이션하지 마세요.

### 3. 어떤 easing을 사용할 것인가?

```
요소가 진입하거나 퇴장하는가?
  Yes → ease-out (빠르게 시작, 반응적으로 느껴짐)
  No →
    화면에서 이동/변형하는가?
      Yes → ease-in-out (자연스러운 가속/감속)
    호버/색상 변경인가?
      Yes → ease
    일정한 모션인가? (마퀴, 진행바)
      Yes → linear
    기본 → ease-out
```

**중요**: 커스텀 easing 커브를 사용하세요. 내장 CSS easing은 너무 약합니다.

```css
/* UI 인터랙션용 강한 ease-out */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);

/* 화면 내 이동용 강한 ease-in-out */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

/* iOS 스타일 drawer 커브 */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

**절대 ease-in을 UI 애니메이션에 사용하지 마세요.** 느리게 시작하여 인터페이스가 느리고 반응이 없다고 느껴집니다. 300ms `ease-in` 드롭다운은 같은 300ms `ease-out`보다 _느리게_ 느껴집니다. ease-in이 초기 움직임을 지연시키기 때문입니다 — 사용자가 가장 주의 깊게 보는 바로 그 순간입니다.

**Easing 커브 리소스**: 처음부터 커브를 만들지 마세요. [easing.dev](https://easing.dev/)나 [easings.co](https://easings.co/)를 사용하여 표준 easing의 더 강한 커스텀 변형을 찾으세요.

### 4. 얼마나 빠르게?

| 요소 | Duration |
| --- | --- |
| 버튼 press 피드백 | 100-160ms |
| 툴팁, 작은 팝오버 | 125-200ms |
| 드롭다운, 셀렉트 | 150-250ms |
| 모달, 드로어 | 200-500ms |
| 마케팅/설명 | 더 길어도 됨 |

**규칙: UI 애니메이션은 300ms 이하로 유지하세요.** 180ms 드롭다운이 400ms보다 반응적으로 느껴집니다. 빠르게 회전하는 스피너는 로드 시간이 동일해도 앱이 더 빠르게 로드되는 것처럼 느껴지게 합니다.

### 지각된 성능

애니메이션 속도는 단지 빠른 느낌만이 아닙니다 — 사용자가 앱 성능을 인식하는 방식에 직접 영향을 줍니다:

- **빠르게 회전하는 스피너**는 로딩이 더 빠르게 느껴지게 합니다 (같은 로드 시간, 다른 인식)
- **180ms select** 애니메이션이 **400ms**보다 반응적으로 느껴집니다
- 첫 번째 툴팁 후 **즉각적인 툴팁** (딜레이 스킵 + 애니메이션 스킵)은 전체 툴바가 더 빠르게 느껴지게 합니다

속도의 인식은 실제 속도만큼 중요합니다. Easing이 이를 증폭시킵니다: 200ms `ease-out`은 200ms `ease-in`보다 _빠르게_ 느껴집니다. 사용자가 즉각적인 움직임을 보기 때문입니다.

## 컴포넌트 빌딩 원칙

### 버튼은 반응성을 느껴야 함

`:active`에 `transform: scale(0.97)` 추가. 즉각적인 피드백을 주어 UI가 진정으로 사용자를 듣고 있다고 느껴지게 합니다.

```css
.button {
  transition: transform 160ms ease-out;
}

.button:active {
  transform: scale(0.97);
}
```

이는 모든 누를 수 있는 요소에 적용됩니다. scale은 미묘해야 합니다 (0.95-0.98).

### 절대 scale(0)에서 애니메이션하지 마세요

현실 세계에서는 아무것도 완전히 사라지고 다시 나타나지 않습니다. `scale(0)`에서 애니메이션하는 요소는 무에서 나온 것처럼 보입니다.

`scale(0.9)` 이상에서 시작하고, opacity와 결합하세요. 거의 보이지 않는 초기 scale도 진입을 더 자연스럽게 느끼게 합니다. 바람이 빠진 풍선도 여전히 보이는 모양이 있는 것처럼요.

```css
/* 나쁨 */
.entering {
  transform: scale(0);
}

/* 좋음 */
.entering {
  transform: scale(0.95);
  opacity: 0;
}
```

### Popover를 origin-aware하게 만들기

Popover는 중앙이 아닌 trigger에서 scale in해야 합니다. 기본 `transform-origin: center`는 거의 모든 popover에 틀립니다. **예외: 모달.** 모달은 특정 trigger에 고정되지 않고 뷰포트 중앙에 나타나므로 `transform-origin: center`를 유지해야 합니다.

```css
/* Radix UI */
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}

/* Base UI */
.popover {
  transform-origin: var(--transform-origin);
}
```

사용자가 개별적으로 차이를 알아차리는지는 중요하지 않습니다. 총합에서 보이지 않는 디테일이 보이게 됩니다. 쌓입니다.

### Tooltip: 후속 호버에서 딜레이 스킵

Tooltip은 실수로 활성화되는 것을 방지하기 위해 나타나기 전에 지연되어야 합니다. 하지만 하나의 tooltip이 열리면, 인접한 tooltip 위로 호버하면 애니메이션 없이 즉시 열려야 합니다. 초기 딜레이의 목적을 무효화하지 않으면서 더 빠르게 느껴집니다.

```css
.tooltip {
  transition: transform 125ms ease-out, opacity 125ms ease-out;
  transform-origin: var(--transform-origin);
}

.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

/* 후속 tooltip에서 애니메이션 스킵 */
.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

### 인터럽트 가능한 UI에는 CSS transition > keyframes

CSS transition은 애니메이션 중간에 인터럽트되고 재지정될 수 있습니다. Keyframe은 0부터 다시 시작합니다. 빠르게 트리거될 수 있는 인터랙션(토스트 추가, 상태 토글)의 경우 transition이 더 부드러운 결과를 생성합니다.

```css
/* 인터럽트 가능 - UI에 좋음 */
.toast {
  transition: transform 400ms ease;
}

/* 인터럽트 불가능 - 동적 UI에는 피하기 */
@keyframes slideIn {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
```

### 불완전한 전환을 마스킹하기 위해 blur 사용

두 상태 간의 크로스페이드가 다른 easing과 duration을 시도해도 이상하게 느껴질 때, 전환 중에 미묘한 `filter: blur(2px)`를 추가하세요.

**Blur가 작동하는 이유**: blur 없이는 크로스페이드 중에 두 개의 구별되는 객체(겹치는 이전 상태와 새 상태)가 보입니다. 이는 부자연스러워 보입니다. Blur가 시각적 간격을 메우며 두 상태를 함께 혼합하여 눈을 속여 두 객체가 교체되는 대신 하나의 부드러운 변형을 인식하게 합니다.

Press에 scale(`scale(0.97)`)과 blur를 결합하여 폴리시된 버튼 상태 전환:

```css
.button {
  transition: transform 160ms ease-out;
}

.button:active {
  transform: scale(0.97);
}

.button-content {
  transition: filter 200ms ease, opacity 200ms ease;
}

.button-content.transitioning {
  filter: blur(2px);
  opacity: 0.7;
}
```

Blur를 20px 이하로 유지하세요. 무거운 blur는 특히 Safari에서 비용이 많이 듭니다.

### @starting-style로 진입 상태 애니메이션

JavaScript 없이 요소 진입을 애니메이션하는 현대 CSS 방법:

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

이것은 초기 렌더 후 `mounted: true`를 설정하기 위해 `useEffect`를 사용하는 일반적인 React 패턴을 대체합니다. 브라우저 지원이 허용하면 `@starting-style` 사용; 그렇지 않으면 `data-mounted` attribute 패턴으로 폴백.

## Spring 애니메이션

Spring은 실제 물리를 시뮬레이션하기 때문에 duration 기반 애니메이션보다 더 자연스럽게 느껴집니다. 고정된 duration이 없습니다 — 물리 파라미터에 기반하여 정착합니다.

### Spring을 사용할 때

- 모멘텀이 있는 드래그 인터랙션
- "살아있다"고 느껴져야 하는 요소 (Apple의 Dynamic Island처럼)
- 애니메이션 중간에 인터럽트될 수 있는 제스처
- 장식용 마우스 추적 인터랙션

### Spring 기반 마우스 인터랙션

마우스 위치에 직접 시각적 변화를 묶으면 모션이 없어서 인위적으로 느껴집니다. 값 변화를 즉시 업데이트하는 대신 spring과 같은 동작으로 보간하려면 Motion(이전 Framer Motion)의 `useSpring`을 사용하세요.

```jsx
import { useSpring } from 'framer-motion';

// Spring 없이: 인위적으로 느껴짐, 즉각적
const rotation = mouseX * 0.1;

// Spring과 함께: 자연스럽게 느껴짐, 모멘텀 있음
const springRotation = useSpring(mouseX * 0.1, {
  stiffness: 100,
  damping: 10,
});
```

애니메이션이 **장식용**이기 때문에 작동합니다 — 기능을 제공하지 않습니다. 은행 앱의 기능적 그래프였다면 애니메이션 없음이 더 나을 것입니다. 장식이 언제 도움이 되고 방해가 되는지 아세요.

### Spring 구성

**Apple 접근 (추천 — 이해하기 쉬움)**:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```

**전통적 물리 (더 많은 제어)**:

```js
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

사용할 때는 bounce를 미묘하게 유지 (0.1-0.3). 대부분의 UI 컨텍스트에서 bounce를 피하세요. drag-to-dismiss와 장난스러운 인터랙션에 사용하세요.

### 인터럽트 가능성 장점

Spring은 인터럽트될 때 속도를 유지합니다 — CSS 애니메이션과 keyframe은 0부터 다시 시작합니다. 이는 사용자가 모션 중에 변경할 수 있는 제스처에 spring을 이상적으로 만듭니다. 확장된 항목을 클릭하고 빠르게 Escape를 누르면 spring 기반 애니메이션이 현재 위치에서 부드럽게 되돌아갑니다.

## 리뷰 포맷 (필수)

UI 코드를 리뷰할 때 반드시 Before/After 열이 있는 마크다운 테이블을 사용해야 합니다. 절대 별도 줄에 "Before:"와 "After:"가 있는 리스트를 사용하지 마세요. 항상 이와 같은 실제 마크다운 테이블을 출력하세요:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | 정확한 속성 명시; `all` 피하기 |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | 현실 세계에서는 무에서 나타나지 않음 |
| Dropdown에 `ease-in` | 커스텀 커브로 `ease-out` | `ease-in`은 느리게 느껴짐; `ease-out`은 즉각적 피드백 |
| 버튼에 `:active` 상태 없음 | `:active`에 `transform: scale(0.97)` | 버튼은 press에 반응적으로 느껴져야 함 |
| Popover에 `transform-origin: center` | `transform-origin: var(--radix-popover-content-transform-origin)` | Popover는 trigger에서 scale해야 함 (모달은 아님 — 모달은 중앙 유지) |

**틀린 포맷 (절대 이렇게 하지 마세요)**:

```
Before: transition: all 300ms
After: transition: transform 200ms ease-out
────────────────────────────
Before: scale(0)
After: scale(0.95)
```

**올바른 포맷**: | Before | After | Why | 열이 있는 단일 마크다운 테이블, 발견된 각 이슈당 하나의 행. "Why" 열은 간략하게 이유를 설명합니다.
