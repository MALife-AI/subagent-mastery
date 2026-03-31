# 미래에셋 컬러 시스템

> 출처: 미래에셋 디지털 가이드라인 (브랜드전략실, 2020.04)

## 주색상 (Main Color)

미래에셋 브랜드의 일관된 이미지 전달을 위해 2가지 주 색상을 이용.

| Name | Hex | RGB | CMYK | 역할 |
|------|-----|-----|------|------|
| **Mirae Asset Orange** | #F58220 | R:245 G:130 B:32 | C:0 M:60 Y:100 K:0 | 전체적인 브랜드 이미지 톤 형성, 메인 컬러 |
| **Mirae Asset Blue** | #043B72 | R:4 G:59 B:114 | C:100 M:60 Y:0 K:40 | 메인 컬러를 뒷받침하기 위해 사용 |

## 보조색상 - 우선순위

| Name | Hex | RGB | CMYK |
|------|-----|-----|------|
| Mirae Asset Orange | #F58220 | R:245 G:130 B:32 | C:0 M:60 Y:100 K:0 |
| Mirae Asset Blue | #043B72 | R:4 G:59 B:114 | C:100 M:60 Y:0 K:40 |
| Mirae Asset Orange Light (60%) | #FAAF72 | R:250 G:176 B:114 | C:0 M:36 Y:60 K:0 |

## 보조색상 - 차순위

| Hex | RGB | CMYK | 용도 |
|-----|-----|------|------|
| #48535B | R:72 G:93 B:91 | C:15 M:0 Y:0 K:80 | 다크 그레이 |
| #C2AC97 | R:194 G:172 B:151 | C:25 M:30 Y:40 K:0 | 베이지/웜톤 |
| #84888B | R:132 G:136 B:139 | C:22 M:15 Y:15 K:15 | 미디엄 그레이 |
| #A0A6A8 | R:160 G:166 B:168 | C:15 M:8 Y:10 K:30 | 라이트 그레이 |
| #CDCECB | R:205 G:206 B:203 | C:6 M:4 Y:7 K:15 | 페일 그레이 |
| #E5E4E1 | R:229 G:228 B:225 | C:4 M:3 Y:5 K:5 | 배경 그레이 |
| #ECEFF4 | R:236 G:239 B:244 | C:9 M:6 Y:3 K:0 | 푸터/섹션 배경 |

## 그래프 전용 색상

비슷한 계열이 연속적으로 사용되지 않도록 시인성 확보.

### Orange 계열
| Hex | RGB |
|-----|-----|
| #F58220 | R:245 G:130 B:32 |
| #FAAF72 | R:250 G:176 B:114 |
| #CB6015 | R:203 G:96 B:21 |
| #AD624E | R:174 G:99 B:78 |
| #84888B | R:132 G:136 B:139 |

### Blue 계열
| Hex | RGB |
|-----|-----|
| #043B72 | R:4 G:59 B:114 |
| #00A9CF | R:0 G:169 B:206 |
| #0086B8 | R:0 G:134 B:184 |
| #7F9FC3 | R:126 G:160 B:195 |
| #8DC8F8 | R:141 G:200 B:232 |

## CSS Variables

```css
:root {
  /* Primary */
  --ma-orange: #F58220;
  --ma-blue: #043B72;
  --ma-orange-light: #FAAF72;

  /* Secondary */
  --ma-dark-gray: #48535B;
  --ma-beige: #C2AC97;
  --ma-medium-gray: #84888B;
  --ma-light-gray: #A0A6A8;
  --ma-pale-gray: #CDCECB;
  --ma-bg-gray: #E5E4E1;
  --ma-footer-bg: #ECEFF4;

  /* Graph - Orange */
  --ma-graph-orange-1: #F58220;
  --ma-graph-orange-2: #FAAF72;
  --ma-graph-orange-3: #CB6015;
  --ma-graph-orange-4: #AD624E;
  --ma-graph-orange-5: #84888B;

  /* Graph - Blue */
  --ma-graph-blue-1: #043B72;
  --ma-graph-blue-2: #00A9CF;
  --ma-graph-blue-3: #0086B8;
  --ma-graph-blue-4: #7F9FC3;
  --ma-graph-blue-5: #8DC8F8;

  /* Selection */
  --ma-selection-text: #ffffff;
  --ma-selection-bg: #F58220;
}
```

## Tailwind Config

```javascript
colors: {
  ma: {
    orange: {
      DEFAULT: '#F58220',
      light: '#FAAF72',
      dark: '#CB6015',
    },
    blue: {
      DEFAULT: '#043B72',
      light: '#00A9CF',
      medium: '#0086B8',
      pale: '#7F9FC3',
      sky: '#8DC8F8',
    },
    gray: {
      dark: '#48535B',
      medium: '#84888B',
      DEFAULT: '#A0A6A8',
      pale: '#CDCECB',
      light: '#E5E4E1',
      footer: '#ECEFF4',
    },
    beige: '#C2AC97',
  }
}
```

## 색상 적용 규칙

1. **헤더 배경**: Mirae Asset Orange (#F58220) — Type A 권장
2. **푸터 배경**: #ECEFF4
3. **본문 텍스트**: Mirae Asset Blue (#043B72)
4. **링크/강조**: Mirae Asset Orange (#F58220)
5. **배너**: 오렌지 컬러 메인, 블루는 강조 라인으로
6. **그래프**: Orange/Blue 계열 번갈아 사용, 비슷한 계열 연속 배치 금지
7. **드래그 선택**: 텍스트 #ffffff, 배경 #F58220
