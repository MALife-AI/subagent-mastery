# Composition Patterns Skill

확장 가능한 React 컴포지션 패턴 스킬입니다. Boolean prop 남용 리팩토링, 유연한 컴포넌트 라이브러리, 재사용 가능한 API 설계에 활용합니다.

## 개요

- **이름:** `vercel-composition-patterns`
- **버전:** 1.0.0
- **작성자:** AI혁신팀

## 활용 시점

- Compound Components, Render Props, Context Provider 관련 작업
- Boolean prop이 과도하게 사용된 컴포넌트 리팩토링
- React 19 API 변경 사항 적용

## 룰 목록

### Architecture (2개)

| 룰 | 설명 |
|----|------|
| [architecture-avoid-boolean-props](rules/architecture-avoid-boolean-props.md) | Boolean prop 남용 방지 |
| [architecture-compound-components](rules/architecture-compound-components.md) | Compound Components 패턴 |

### Patterns (2개)

| 룰 | 설명 |
|----|------|
| [patterns-children-over-render-props](rules/patterns-children-over-render-props.md) | Render Props 대신 children 사용 |
| [patterns-explicit-variants](rules/patterns-explicit-variants.md) | 명시적 Variant 정의 |

### State (3개)

| 룰 | 설명 |
|----|------|
| [state-context-interface](rules/state-context-interface.md) | Context 인터페이스 설계 |
| [state-decouple-implementation](rules/state-decouple-implementation.md) | 구현 분리 패턴 |
| [state-lift-state](rules/state-lift-state.md) | 상태 끌어올리기 |

### React 19 (1개)

| 룰 | 설명 |
|----|------|
| [react19-no-forwardref](rules/react19-no-forwardref.md) | React 19에서 forwardRef 제거 |

[스킬 목록으로 돌아가기](../)
