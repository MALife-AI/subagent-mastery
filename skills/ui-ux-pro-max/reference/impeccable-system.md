# Impeccable Design System

프로덕션급 프론트엔드 디자인을 위한 체계적 접근법. 23개 설계 명령어 개념과 안티패턴 감지.

출처: Impeccable (impeccable.style)

## 설계 명령어 23가지

### 초기 설계
- **craft**: 처음부터 인터페이스 설계, 모든 결정 정당화
- **shape**: 기존 와이어프레임/스케치를 작동하는 인터페이스로 전환

### 검토 및 개선
- **audit**: 체계적 디자인 검토, 우선순위 매긴 개선 목록 생성
- **critique**: 디자인 결정에 대한 건설적 비평, 대안 제시

### 시각 강화
- **animate**: 의미 있는 모션 추가, 물리 기반 애니메이션
- **bolder**: 시각적 대비 증가, 더 강한 타이포그래피, 생생한 컬러
- **colorize**: 컬러 팔레트 개선, 접근성 있는 대비
- **delight**: 미묘한 놀라움 요소 추가, 마이크로 인터랙션 강화

### 정리 및 최적화
- **quieter**: 과도한 디자인 정리, 시각적 소음 감소
- **typeset**: 타이포그래피 최적화, scale과 hierarchy 개선
- **layout**: 레이아웃 구조 재설계, 그리드 시스템 적용

### 정보 구조
- **adapt**: 다른 컨텍스트나 플랫폼에 디자인 적응
- **clarify**: 복잡한 인터페이스 단순화, 인지 부하 감소
- **distill**: 핵심 요소로 축소, 불필요한 것 제거

### 완성도 향상
- **harden**: 엣지 케이스 처리, 에러 상태, 로딩 상태
- **onboard**: 첫 경험 개선, 온보딩 플로우 설계
- **optimize**: 성능 최적화, 로딩 시간 개선
- **polish**: 모든 디테일 완성, 프로덕션 준비

### 도구 및 컨텍스트
- **teach**: PRODUCT.md 생성/업데이트 (브랜드, 사용자, 전략)
- **document**: DESIGN.md 생성/업데이트 (컬러, 타이포, 컴포넌트)
- **extract**: 기존 디자인에서 토큰과 패턴 추출
- **live**: 브라우저에서 실시간 UI 반복 작업

### 특수 효과
- **overdrive**: 기술적으로 특별한 비주얼 효과, 앰비션 있는 인터랙션

## 컨텍스트 시스템

### PRODUCT.md (필수)
프로젝트 루트에 위치, 대소문자 무관:

**포함 내용**:
- **Users**: 대상 사용자, 페르소나, 니즈
- **Product Purpose**: 제품이 해결하는 문제
- **Brand**: 톤, 보이스, 가치
- **Anti-references**: 피할 디자인 스타일
- **Strategic Principles**: 디자인 결정을 안내하는 원칙
- **Register**: `brand` 또는 `product` (작업 유형 분류)

**Register 분류**:
- **brand**: 마케팅, 랜딩, 캠페인, 포트폴리오 (디자인 = 제품)
- **product**: 앱 UI, 대시보드, 관리자, 도구 (디자인이 제품을 보조)

### DESIGN.md (선택, 강력 추천)
**포함 내용**:
- **Colors**: 팔레트, semantic tokens, 접근성 대비
- **Typography**: Font families, scales, weights, line heights
- **Elevation**: Shadow system, depth levels
- **Components**: 재사용 가능한 패턴, 변형, 상태
- **Spacing**: Scale system, grid units
- **Motion**: 애니메이션 duration, easing curves

### 로딩 방법
```bash
# 두 파일 모두 한 번에 로드
node .claude/skills/impeccable/scripts/load-context.mjs
```

## 안티패턴 감지 (25가지)

### 1. Purple Gradients
**문제**: AI가 보라/분홍 그라데이션을 과도하게 사용
**해결**: 브랜드에 맞는 절제된 컬러 팔레트

### 2. Generic Card Layouts
**문제**: 모든 것이 평범한 카드 그리드
**해결**: 컨텐츠에 맞는 다양한 레이아웃 구조

### 3. Oversized Buttons
**문제**: 불필요하게 큰 버튼과 CTA
**해결**: 시각적 계층에 맞는 적절한 크기

### 4. Cluttered Spacing
**문제**: 일관성 없는 여백과 간격
**해결**: 디자인 토큰 기반 spacing scale

### 5. Inconsistent Typography
**문제**: 무작위 font sizes와 weights
**해결**: Type scale과 semantic hierarchy

### 6. Meaningless Icons
**문제**: 장식용으로만 쓰이는 아이콘
**해결**: 의미 있고 기능적인 아이콘 사용

### 7. Over-shadowed Elements
**문제**: 과장된 box-shadow와 blur
**해결**: 미묘한 elevation system

### 8. Low Contrast Text
**문제**: 회색-on-회색, 접근성 실패
**해결**: WCAG AA 준수 (4.5:1 대비)

### 9. Broken Grid Alignment
**문제**: 요소들이 그리드에서 벗어남
**해결**: 일관된 그리드 시스템

### 10. Instant State Changes
**문제**: 애니메이션 없이 상태 변경
**해결**: 적절한 transition (100-300ms)

### 11. Ambiguous CTAs
**문제**: "Click here", "Learn more" 같은 제네릭 버튼 텍스트
**해결**: 구체적이고 액션 지향적인 라벨

### 12. Redundant Labels
**문제**: Placeholder와 label이 동일
**해결**: Placeholder는 예시, label은 설명

### 13. Missing States
**문제**: Hover, focus, active, disabled 상태 없음
**해결**: 모든 인터랙티브 요소에 상태 정의

### 14. Broken Touch Targets
**문제**: 모바일에서 터치 영역 < 44px
**해결**: 최소 44×44px 터치 타겟

### 15. Orphaned Content
**문제**: 컨텍스트 없는 고립된 요소
**해결**: 명확한 그룹화와 관계 설정

### 16. Overloaded Navigation
**문제**: 네비게이션에 너무 많은 항목
**해결**: 정보 아키텍처 재구성, 그룹화

### 17. Generic Hero Sections
**문제**: "혁신적인", "최고의" 같은 평범한 카피
**해결**: 구체적인 가치 제안

### 18. Missing Feedback
**문제**: 액션 후 피드백 없음
**해결**: 로딩, 성공, 에러 상태 명확히

### 19. Unclear Hierarchy
**문제**: 모든 것이 똑같이 중요해 보임
**해결**: Size, weight, color로 hierarchy 설정

### 20. Inaccessible Forms
**문제**: Label 없음, 에러 메시지 불명확
**해결**: 명확한 label, inline validation

### 21. Broken Responsiveness
**문제**: 모바일에서 수평 스크롤, 깨진 레이아웃
**해결**: 모바일 우선 반응형 디자인

### 22. Decorative-Only Animation
**문제**: 의미 없는 애니메이션
**해결**: 목적 있는 모션만 사용

### 23. Inconsistent Patterns
**문제**: 같은 기능이 다르게 동작
**해결**: 일관된 인터랙션 패턴

### 24. Missing Empty States
**문제**: 데이터 없을 때 빈 화면
**해결**: 유용한 empty state 디자인

### 25. Overwhelming Onboarding
**문제**: 너무 많은 정보를 한꺼번에
**해결**: Progressive disclosure, 단계별 안내

## 휴리스틱 스코어링

각 이슈를 우선순위로 점수 매김:

| 우선순위 | 점수 | 기준 |
|---------|------|------|
| CRITICAL | 100 | 접근성, 법적 요구사항, 완전히 망가진 기능 |
| HIGH | 75 | 사용성 블로커, 명확한 브랜드 위반 |
| MEDIUM | 50 | 향상된 경험, 일관성 문제 |
| LOW | 25 | 폴리시, 마이크로 개선 |

**스코어링 공식**:
```
최종 점수 = 우선순위 점수 × 빈도 × 영향
```

- **빈도**: 얼마나 자주 나타나는가? (1-5)
- **영향**: 얼마나 많은 사용자가 영향 받는가? (1-5)

## 사용 워크플로우

### 1. 준비 단계
```bash
# 컨텍스트 로드
node .claude/skills/impeccable/scripts/load-context.mjs

# Register 확인 (brand vs product)
```

### 2. 초기 설계
```bash
# Brand register: 랜딩, 마케팅
/impeccable craft landing page

# Product register: 대시보드, 관리자
/impeccable craft admin dashboard
```

### 3. 반복 개선
```bash
# 검토
/impeccable audit components/hero.tsx

# 개선 적용
/impeccable polish components/hero.tsx

# 안티패턴 제거
/impeccable quieter components/hero.tsx
```

### 4. 라이브 반복
```bash
# 브라우저에서 실시간 작업
/impeccable live

# CSS 변경 즉시 적용
# 변경사항 승인하여 파일에 반영
```

### 5. 문서화
```bash
# 디자인 토큰 추출
/impeccable extract

# 디자인 시스템 문서화
/impeccable document
```

## 통합 원칙

### Design Engineering 철학과의 조화
- **impeccable craft/shape** → 전체 시스템 설계
- **design-engineering principles** → 애니메이션 디테일
- **impeccable polish** → 최종 완성

### Taste Skill 파라미터와의 조화
- **bolder** ≈ DESIGN_VARIANCE 증가
- **quieter** ≈ DESIGN_VARIANCE 감소
- **animate** ≈ MOTION_INTENSITY 증가

### UI-UX-Pro-Max와의 조화
- **impeccable audit** = 체계적 접근
- **ui-ux-pro-max rules** = 체크리스트
- 함께 사용하여 포괄적 리뷰

## 출력 포맷

### Audit 출력
```markdown
## 분석 요약
[2-3문단: 현재 상태와 주요 발견]

## 이슈 목록
| 우선순위 | 이슈 | 위치 | 점수 | 권장사항 |
|---------|-----|------|------|----------|
| CRITICAL | ... | ... | 100 | ... |

## 안티패턴 감지
- [X] Purple gradients
- [ ] Generic cards
- [X] Low contrast text

## 다음 단계
1. CRITICAL 이슈 해결
2. HIGH 이슈 개선
3. Polish 적용
```

### Polish 출력
```markdown
## Before/After

| Before | After | Why | Priority |
| --- | --- | --- | --- |
| ... | ... | ... | CRITICAL |

## 수정된 파일
[실제 폴리시 적용된 코드]

## 체크리스트
- [x] 안티패턴 제거
- [x] WCAG AA 준수
- [x] 디자인 토큰 적용
- [ ] 라이브 테스트 필요
```

## 참고 자료

- [impeccable.style](https://impeccable.style/)
- [DESIGN.json](https://github.com/pbakaus/impeccable/blob/main/DESIGN.json) - 전체 디자인 토큰 레퍼런스
- 35개 reference 파일 - 각 명령어별 상세 가이드
