# 미래에셋 타이포그래피

> 출처: 미래에셋 디지털 가이드라인 (브랜드전략실, 2020.04)

## 지정 서체

### 주서체: Spoqa Han Sans

미래에셋의 국내 웹 서체. 홈페이지, 웹 메일, 웹 배너, 영상 캡션 등 각종 디지털 환경의 시각 전달 매체에 사용.

| Weight | 파일명 | 용도 |
|--------|--------|------|
| Thin | Spoqa Han Sans Thin.ttf | 장식적 대형 텍스트 |
| Light | Spoqa Han Sans Light.ttf | 본문, 설명 텍스트 |
| Regular | Spoqa Han Sans Regular.ttf | 일반 본문, UI 텍스트 |
| Bold | Spoqa Han Sans Bold.ttf | 제목, 강조, CTA |

- **다운로드:** https://spoqa.github.io/spoqa-han-sans/ko-KR/
- **적용 항목의 성격에 따라 서체 두께를 선택하여 사용**

### 보조서체: 맑은고딕

Spoqa Han Sans를 사용할 수 없는 경우 대안으로 사용.
이메일 서명 등 사용자의 PC 환경에 상관없이 일관된 서체를 노출하기 위해 사용.

## CSS Font Stack

```css
/* 주서체 */
--font-primary: 'Spoqa Han Sans', 'Malgun Gothic', '맑은 고딕', sans-serif;

/* Web font import */
@font-face {
  font-family: 'Spoqa Han Sans';
  src: url('assets/fonts/Spoqa Han Sans Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Spoqa Han Sans';
  src: url('assets/fonts/Spoqa Han Sans Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Spoqa Han Sans';
  src: url('assets/fonts/Spoqa Han Sans Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Spoqa Han Sans';
  src: url('assets/fonts/Spoqa Han Sans Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}
```

## 타입 스케일 (권장)

| Element | Size (Desktop) | Size (Mobile) | Weight | Color |
|---------|----------------|---------------|--------|-------|
| H1 | 36-48px | 28-36px | Bold | #043B72 |
| H2 | 28-36px | 24-28px | Bold | #043B72 |
| H3 | 22-28px | 20-24px | Bold | #043B72 |
| Body | 16px | 16px | Regular | #48535B |
| Body Large | 18px | 18px | Regular | #48535B |
| Small/Caption | 12-14px | 12-14px | Light | #84888B |
| CTA/Button | 14-16px | 14-16px | Bold | #FFFFFF on #F58220 |
