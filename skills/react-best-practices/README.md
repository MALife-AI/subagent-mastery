# React Best Practices Skill

Vercel 엔지니어링 팀의 React 및 Next.js 성능 최적화 가이드라인입니다. 69개의 세부 룰을 포함합니다.

## 개요

- **이름:** `vercel-react-best-practices`
- **버전:** 1.0.0
- **작성자:** AI혁신팀

## 활용 시점

React 컴포넌트 작성/리뷰/리팩토링, Next.js 페이지 최적화, 데이터 페칭, 번들 최적화, 성능 개선 시

## 룰 카테고리

### Rerender 최적화 (15개)

| 룰 | 설명 |
|----|------|
| [rerender-memo](rules/rerender-memo.md) | React.memo를 활용한 불필요한 리렌더링 방지 |
| [rerender-memo-with-default-value](rules/rerender-memo-with-default-value.md) | 기본값 포함 memo 패턴 |
| [rerender-derived-state](rules/rerender-derived-state.md) | 파생 상태 최적화 |
| [rerender-derived-state-no-effect](rules/rerender-derived-state-no-effect.md) | Effect 없이 파생 상태 계산 |
| [rerender-dependencies](rules/rerender-dependencies.md) | 의존성 배열 최적화 |
| [rerender-defer-reads](rules/rerender-defer-reads.md) | 읽기 지연 패턴 |
| [rerender-use-deferred-value](rules/rerender-use-deferred-value.md) | useDeferredValue 활용 |
| [rerender-use-ref-transient-values](rules/rerender-use-ref-transient-values.md) | useRef로 일시적 값 관리 |
| [rerender-move-effect-to-event](rules/rerender-move-effect-to-event.md) | Effect를 이벤트 핸들러로 이동 |
| [rerender-no-inline-components](rules/rerender-no-inline-components.md) | 인라인 컴포넌트 금지 |
| [rerender-functional-setstate](rules/rerender-functional-setstate.md) | 함수형 setState 사용 |
| [rerender-lazy-state-init](rules/rerender-lazy-state-init.md) | 지연 상태 초기화 |
| [rerender-simple-expression-in-memo](rules/rerender-simple-expression-in-memo.md) | memo 내 단순 표현식 |
| [rerender-split-combined-hooks](rules/rerender-split-combined-hooks.md) | 복합 훅 분리 |
| [rerender-transitions](rules/rerender-transitions.md) | Transitions 활용 |

### Async 패턴 (6개)

| 룰 | 설명 |
|----|------|
| [async-api-routes](rules/async-api-routes.md) | API 라우트 비동기 패턴 |
| [async-cheap-condition-before-await](rules/async-cheap-condition-before-await.md) | await 전 저렴한 조건 검사 |
| [async-defer-await](rules/async-defer-await.md) | await 지연 패턴 |
| [async-dependencies](rules/async-dependencies.md) | 비동기 의존성 관리 |
| [async-parallel](rules/async-parallel.md) | 병렬 비동기 처리 |
| [async-suspense-boundaries](rules/async-suspense-boundaries.md) | Suspense 경계 설정 |

### Bundle 최적화 (5개)

| 룰 | 설명 |
|----|------|
| [bundle-barrel-imports](rules/bundle-barrel-imports.md) | 배럴 임포트 최적화 |
| [bundle-conditional](rules/bundle-conditional.md) | 조건부 번들링 |
| [bundle-defer-third-party](rules/bundle-defer-third-party.md) | 서드파티 지연 로딩 |
| [bundle-dynamic-imports](rules/bundle-dynamic-imports.md) | 동적 임포트 활용 |
| [bundle-preload](rules/bundle-preload.md) | 리소스 프리로드 |

### Rendering 최적화 (11개)

| 룰 | 설명 |
|----|------|
| [rendering-activity](rules/rendering-activity.md) | Activity 패턴 |
| [rendering-animate-svg-wrapper](rules/rendering-animate-svg-wrapper.md) | SVG 애니메이션 래퍼 |
| [rendering-conditional-render](rules/rendering-conditional-render.md) | 조건부 렌더링 |
| [rendering-content-visibility](rules/rendering-content-visibility.md) | Content Visibility API |
| [rendering-hoist-jsx](rules/rendering-hoist-jsx.md) | JSX 호이스팅 |
| [rendering-hydration-no-flicker](rules/rendering-hydration-no-flicker.md) | 하이드레이션 깜빡임 방지 |
| [rendering-hydration-suppress-warning](rules/rendering-hydration-suppress-warning.md) | 하이드레이션 경고 억제 |
| [rendering-resource-hints](rules/rendering-resource-hints.md) | 리소스 힌트 |
| [rendering-script-defer-async](rules/rendering-script-defer-async.md) | 스크립트 defer/async |
| [rendering-svg-precision](rules/rendering-svg-precision.md) | SVG 정밀도 |
| [rendering-usetransition-loading](rules/rendering-usetransition-loading.md) | useTransition 로딩 |

### JavaScript 최적화 (14개)

| 룰 | 설명 |
|----|------|
| [js-batch-dom-css](rules/js-batch-dom-css.md) | DOM/CSS 배치 처리 |
| [js-cache-function-results](rules/js-cache-function-results.md) | 함수 결과 캐싱 |
| [js-cache-property-access](rules/js-cache-property-access.md) | 프로퍼티 접근 캐싱 |
| [js-cache-storage](rules/js-cache-storage.md) | Cache Storage API |
| [js-combine-iterations](rules/js-combine-iterations.md) | 반복문 결합 |
| [js-early-exit](rules/js-early-exit.md) | 조기 반환 패턴 |
| [js-flatmap-filter](rules/js-flatmap-filter.md) | flatMap/filter 최적화 |
| [js-hoist-regexp](rules/js-hoist-regexp.md) | 정규표현식 호이스팅 |
| [js-index-maps](rules/js-index-maps.md) | 인덱스 맵 활용 |
| [js-length-check-first](rules/js-length-check-first.md) | 길이 체크 우선 |
| [js-min-max-loop](rules/js-min-max-loop.md) | 루프 내 min/max 최적화 |
| [js-request-idle-callback](rules/js-request-idle-callback.md) | requestIdleCallback 활용 |
| [js-set-map-lookups](rules/js-set-map-lookups.md) | Set/Map 조회 최적화 |
| [js-tosorted-immutable](rules/js-tosorted-immutable.md) | toSorted 불변 정렬 |

### Server 최적화 (9개)

| 룰 | 설명 |
|----|------|
| [server-after-nonblocking](rules/server-after-nonblocking.md) | 논블로킹 후처리 |
| [server-auth-actions](rules/server-auth-actions.md) | 인증 액션 패턴 |
| [server-cache-lru](rules/server-cache-lru.md) | LRU 캐시 |
| [server-cache-react](rules/server-cache-react.md) | React 캐시 활용 |
| [server-dedup-props](rules/server-dedup-props.md) | Props 중복 제거 |
| [server-hoist-static-io](rules/server-hoist-static-io.md) | 정적 I/O 호이스팅 |
| [server-parallel-fetching](rules/server-parallel-fetching.md) | 병렬 데이터 페칭 |
| [server-parallel-nested-fetching](rules/server-parallel-nested-fetching.md) | 중첩 병렬 페칭 |
| [server-serialization](rules/server-serialization.md) | 직렬화 최적화 |

### Client 최적화 (4개)

| 룰 | 설명 |
|----|------|
| [client-event-listeners](rules/client-event-listeners.md) | 이벤트 리스너 최적화 |
| [client-localstorage-schema](rules/client-localstorage-schema.md) | LocalStorage 스키마 관리 |
| [client-passive-event-listeners](rules/client-passive-event-listeners.md) | Passive 이벤트 리스너 |
| [client-swr-dedup](rules/client-swr-dedup.md) | SWR 중복 제거 |

### Advanced 패턴 (3개)

| 룰 | 설명 |
|----|------|
| [advanced-event-handler-refs](rules/advanced-event-handler-refs.md) | 이벤트 핸들러 Ref 패턴 |
| [advanced-init-once](rules/advanced-init-once.md) | 1회 초기화 패턴 |
| [advanced-use-latest](rules/advanced-use-latest.md) | useLatest 훅 패턴 |

[스킬 목록으로 돌아가기](../)
