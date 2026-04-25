# Taste Skill - 메트릭 기반 디자인

AI가 제네릭한 "슬롭" 대신 프리미엄 디자인을 생성하도록 유도하는 메트릭 기반 접근법.

출처: Taste Skill (github.com/leonxlnx/taste-skill)

## 핵심 철학

> "AI가 생성한 것처럼 보이지 않는 디자인을 만든다"

일반적인 AI 출력의 특징인 보라색 그라데이션, 과도한 간격, 평범한 카드 레이아웃을 피하고, 실제 프로덕션 수준의 인터페이스를 생성합니다.

## 3가지 조정 파라미터

### 1. DESIGN_VARIANCE (설계 변동성)
**범위**: 1-10  
**의미**: 레이아웃 실험성 수준

| 값 | 특성 | 적합한 프로젝트 |
|----|------|----------------|
| 1-3 | 매우 보수적, 예측 가능한 레이아웃 | 기업 대시보드, 금융 앱 |
| 4-6 | 균형잡힌, 검증된 패턴 + 일부 창의성 | 일반 SaaS, B2B 도구 |
| 7-9 | 실험적, 비표준 레이아웃 | 크리에이티브 포트폴리오, 마케팅 사이트 |
| 10 | 완전히 실험적, 파격적 | 아트 프로젝트, 실험적 인터페이스 |

**구체적 영향**:
- **낮음** (1-3): 표준 그리드, 예측 가능한 계층, 안전한 컴포지션
- **중간** (4-6): 비대칭 허용, 일부 파격적 요소, 균형 유지
- **높음** (7-10): 비표준 레이아웃, 대담한 컴포지션, 놀라움 요소

### 2. MOTION_INTENSITY (모션 강도)
**범위**: 1-10  
**의미**: 애니메이션과 인터랙션 양

| 값 | 특성 | 적합한 프로젝트 |
|----|------|----------------|
| 1-2 | 최소 모션, 필수만 | 고성능 앱, 접근성 우선 |
| 3-5 | 표준 모션, 미묘한 피드백 | 일반 웹앱, 대시보드 |
| 6-8 | 풍부한 모션, 장식적 요소 | 마케팅 사이트, 포트폴리오 |
| 9-10 | 매우 풍부한 모션, 인상적 효과 | 크리에이티브 쇼케이스, 브랜드 경험 |

**구체적 영향**:
- **낮음** (1-2): 기본 fade/slide만, instant feedback
- **중간** (3-5): Hover effects, smooth transitions, 100-300ms
- **높음** (6-10): Parallax, spring animations, complex sequences

**Design Engineering 연결**:
- 1-2: 빈도 100+/day 액션 수준 (애니메이션 없음)
- 3-5: 가끔 보는 액션 수준 (표준 애니메이션)
- 6-8: 드문 액션 수준 (즐거움 추가)
- 9-10: 마케팅/설명 수준 (더 길어도 됨)

### 3. VISUAL_DENSITY (시각적 밀도)
**범위**: 1-10  
**의미**: 화면에 표시되는 콘텐츠와 정보 밀도

| 값 | 특성 | 적합한 프로젝트 |
|----|------|----------------|
| 1-3 | 매우 희소, 넉넉한 여백 | 랜딩 페이지, 미니멀 포트폴리오 |
| 4-6 | 균형잡힌, 적절한 여백 | 일반 웹사이트, 블로그 |
| 7-9 | 조밀한, 효율적 공간 사용 | 대시보드, 데이터 집약 앱 |
| 10 | 매우 조밀한, 최대 정보 표시 | 터미널, 모니터링 도구 |

**구체적 영향**:
- **낮음** (1-3): 큰 여백, 시각적 호흡, 명확한 초점
- **중간** (4-6): 균형잡힌 spacing, 읽기 쉬움
- **높음** (7-10): 컴팩트한 spacing, 정보 밀도 우선

## 메트릭 기반 설계 원칙

### 1. 명확한 수치로 정당화
모든 디자인 결정은 측정 가능한 메트릭으로 뒷받침:

```
❌ "더 나아 보입니다"
✅ "명도 대비가 2.8:1에서 4.6:1로 개선되어 WCAG AA 준수"

❌ "버튼이 크기가 적절합니다"
✅ "터치 타겟이 44×44px로 iOS/Android 가이드라인 충족"

❌ "애니메이션이 부드럽습니다"
✅ "200ms ease-out으로 빠른 피드백, 400ms보다 2배 빠르게 인식"
```

### 2. 성능 메트릭 중심

**Core Web Vitals**:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**애니메이션 성능**:
- 60fps 유지 (16.67ms/frame)
- GPU 가속 속성만 애니메이션 (transform, opacity)
- will-change 최소화

**번들 크기**:
- JavaScript: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- 이미지: WebP/AVIF, lazy loading

### 3. 접근성 메트릭

**필수 지표**:
- 명도 대비: 최소 4.5:1 (일반 텍스트), 3:1 (큰 텍스트)
- 터치 타겟: 최소 44×44px (iOS/Android)
- 키보드 네비게이션: Tab order, Focus indicators
- Screen reader: Semantic HTML, ARIA labels

## 회피 안티패턴

### 시각적 안티패턴

#### 1. Purple/Pink Gradients
```css
/* ❌ AI 스타일 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* ✅ 브랜드 기반 */
background: var(--gradient-brand);
/* 또는 */
background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
```

#### 2. Oversized Buttons
```css
/* ❌ 제네릭 */
.button {
  padding: 20px 48px;
  font-size: 18px;
  border-radius: 12px;
}

/* ✅ 계층 기반 */
.button-primary {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
}
.button-secondary {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
}
```

#### 3. Generic Card Grids
```jsx
/* ❌ 평범한 그리드 */
<div className="grid grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

/* ✅ 컨텐츠 기반 레이아웃 */
<div className="masonry-layout">
  <FeaturedCard size="large" />
  <Card size="medium" />
  <Card size="small" />
</div>
```

#### 4. Meaningless Icons
```jsx
/* ❌ 장식용 */
<button>
  <Icon name="sparkles" />
  Submit
</button>

/* ✅ 기능적 */
<button>
  <Icon name="arrow-right" aria-hidden="true" />
  Continue to Payment
</button>
```

#### 5. Excessive Shadows
```css
/* ❌ 과장됨 */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
            0 10px 30px rgba(0, 0, 0, 0.2);

/* ✅ 미묘함 */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
```

### 구조적 안티패턴

#### 6. Horizontal Scroll
```css
/* ❌ */
.container {
  width: 1400px;
  margin: 0 auto;
}

/* ✅ */
.container {
  max-width: 1400px;
  width: 100%;
  padding: 0 var(--space-4);
  margin: 0 auto;
}
```

#### 7. Placeholder-Only Labels
```jsx
/* ❌ */
<input placeholder="Email address" />

/* ✅ */
<label htmlFor="email">Email address</label>
<input 
  id="email" 
  placeholder="you@example.com" 
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email</span>
```

#### 8. Missing States
```css
/* ❌ */
.button {
  background: var(--primary);
}

/* ✅ */
.button {
  background: var(--primary);
  transition: all 150ms ease-out;
}
.button:hover {
  background: var(--primary-hover);
}
.button:active {
  transform: scale(0.97);
}
.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
.button:disabled {
  background: var(--gray-300);
  cursor: not-allowed;
}
```

## RSC (React Server Components) 우선

### 클라이언트/서버 경계 명확화

```tsx
// ❌ 모든 것을 클라이언트에서
'use client';
export default function Dashboard() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  return <div>{data?.map(...)}</div>;
}

// ✅ 서버에서 데이터, 클라이언트에서 인터랙션만
// app/dashboard/page.tsx (Server Component)
export default async function Dashboard() {
  const data = await getData(); // 서버에서 직접 fetch
  return <InteractiveList data={data} />;
}

// components/interactive-list.tsx (Client Component)
'use client';
export function InteractiveList({ data }) {
  const [selected, setSelected] = useState(null);
  return <div onClick={...}>{data.map(...)}</div>;
}
```

### 서버 우선 규칙

1. **기본은 Server Component**: 'use client' 명시할 때만 클라이언트
2. **데이터는 서버에서**: useState/useEffect 대신 async/await
3. **인터랙션만 클라이언트**: onClick, onChange 등 이벤트 핸들러만
4. **번들 최소화**: 클라이언트 컴포넌트는 필요한 만큼만

## 파라미터 조합 예시

### 기업 대시보드
```
DESIGN_VARIANCE: 3
MOTION_INTENSITY: 2
VISUAL_DENSITY: 7

특성: 보수적 레이아웃, 최소 모션, 높은 정보 밀도
```

### 마케팅 랜딩 페이지
```
DESIGN_VARIANCE: 7
MOTION_INTENSITY: 6
VISUAL_DENSITY: 3

특성: 실험적 레이아웃, 풍부한 모션, 넉넉한 여백
```

### SaaS 프로덕트 앱
```
DESIGN_VARIANCE: 5
MOTION_INTENSITY: 4
VISUAL_DENSITY: 5

특성: 균형잡힌 레이아웃, 표준 모션, 중간 밀도
```

### 크리에이티브 포트폴리오
```
DESIGN_VARIANCE: 9
MOTION_INTENSITY: 8
VISUAL_DENSITY: 4

특성: 파격적 레이아웃, 매우 풍부한 모션, 적절한 여백
```

## 다른 시스템과의 통합

### Design Engineering 연결
```
MOTION_INTENSITY: 1-2  → 빈도 100+/day (애니메이션 없음)
MOTION_INTENSITY: 3-5  → 가끔 (표준 애니메이션)
MOTION_INTENSITY: 6-8  → 드물게 (즐거움 추가)
MOTION_INTENSITY: 9-10 → 마케팅 (긴 애니메이션)
```

### Impeccable 명령어 연결
```
DESIGN_VARIANCE 증가 → /impeccable bolder
DESIGN_VARIANCE 감소 → /impeccable quieter
MOTION_INTENSITY 증가 → /impeccable animate + delight
VISUAL_DENSITY 증가 → /impeccable optimize (공간 효율)
```

### UI-UX-Pro-Max 통합
```
모든 파라미터 → ui-ux-pro-max rules 필터링
- WCAG 준수는 항상 (파라미터 무관)
- 터치 타겟 44px는 항상
- 파라미터는 "어떻게"를 결정, 규칙은 "필수"를 보장
```

## 메트릭 추적

### 디자인 품질 메트릭

```typescript
interface DesignQualityMetrics {
  // 접근성
  contrastRatio: number;          // 목표: ≥ 4.5:1
  touchTargetSize: number;        // 목표: ≥ 44px
  keyboardNavScore: number;       // 목표: 100%
  
  // 성능
  LCP: number;                    // 목표: < 2.5s
  FID: number;                    // 목표: < 100ms
  CLS: number;                    // 목표: < 0.1
  
  // 일관성
  tokenUsageRate: number;         // 목표: > 90%
  patternConsistency: number;     // 목표: > 85%
  
  // 안티패턴
  antiPatternCount: number;       // 목표: 0
  genericCardRatio: number;       // 목표: < 30%
}
```

### 추적 방법

```typescript
// 자동 감지
const metrics = {
  antiPatterns: {
    purpleGradients: detectGradients(/purple|#667eea/),
    oversizedButtons: detectButtonSizes(> 48px),
    genericCards: detectCardPatterns(),
    lowContrast: detectContrast(< 4.5),
    missingSt ates: detectMissingStates(),
  },
  
  performance: {
    LCP: measureLCP(),
    FID: measureFID(),
    CLS: measureCLS(),
  },
  
  accessibility: {
    contrast: checkAllContrast(),
    touchTargets: checkAllTargets(),
    keyboard: checkKeyboardNav(),
  }
};
```

## 실전 적용

### 파라미터 결정 프로세스

1. **프로젝트 분류**
   - Register: brand or product?
   - 산업: 기업, 소비자, 크리에이티브?
   - 사용자: 전문가, 일반인, 엔지니어?

2. **초기 파라미터 설정**
   - 유사 프로젝트 참고
   - 사용자 피드백 반영
   - A/B 테스트 고려

3. **반복 조정**
   - 메트릭 추적
   - 사용자 행동 분석
   - 점진적 개선

### 검증 체크리스트

```markdown
## 파라미터 검증

### DESIGN_VARIANCE: [X]
- [ ] 레이아웃이 사용자 기대와 맞는가?
- [ ] 브랜드 아이덴티티를 반영하는가?
- [ ] 콘텐츠가 명확히 전달되는가?

### MOTION_INTENSITY: [Y]
- [ ] 애니메이션이 사용 빈도에 적절한가?
- [ ] 성능 영향이 허용 범위인가?
- [ ] prefers-reduced-motion 고려했는가?

### VISUAL_DENSITY: [Z]
- [ ] 정보 계층이 명확한가?
- [ ] 읽기 편한 여백이 있는가?
- [ ] 모바일에서도 적절한가?

## 안티패턴 체크
- [ ] Purple gradients 없음
- [ ] 적절한 버튼 크기
- [ ] 다양한 레이아웃 패턴
- [ ] 의미 있는 아이콘
- [ ] 미묘한 elevation
- [ ] 모든 상태 정의
```

## 결론

Taste Skill의 메트릭 기반 접근은:
1. **측정 가능**: 모든 결정을 수치로 정당화
2. **반복 가능**: 파라미터로 일관된 결과
3. **검증 가능**: 메트릭으로 품질 추적
4. **통합 가능**: 다른 디자인 시스템과 조화

"AI가 만든 것처럼 보이지 않는" 디자인을 위한 과학적 접근법입니다.
