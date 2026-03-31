# 미래에셋 보고서 양식 가이드

> 출처: 보고양식.pdf (AX 혁신 추진 현황 보고 양식)

## 보고서 레이아웃

### 기본 구조
```
┌──────────────────────────────────────┐
│ 샘플 양식                     (오렌지 텍스트)│
│ [실행 과제명] OOOO            (블루/진한 텍스트)│
│                          OOOO 본부   │
│──────────────────────────────────────│  ← 오렌지 구분선 (#F58220)
│                                      │
│ ※ AX 혁신 추진 현황에 대해 자유롭게      │
│   작성하여 주시기 바랍니다.(자유양식)      │
│                                      │
│ ○ 가나다라                            │
│   - ABC                              │
│                                      │
│                                      │
│                                      │
│                                      │
│                                      │
│           Mirae Asset Life Insurance │  ← 우하단 회사명
└──────────────────────────────────────┘
```

### 스타일 규칙

| 요소 | 스타일 |
|------|--------|
| 상단 레이블 ("샘플 양식") | 오렌지 (#F58220), Bold, 소형 |
| 제목 ("[실행 과제명] OOOO") | 블루 (#043B72), Bold, 대형 |
| 부서명 | 블루 (#043B72), Regular, 우측 정렬 |
| 구분선 | 오렌지 (#F58220), 2px solid |
| 본문 | 블루/다크그레이, Regular |
| 소제목 ("○") | Bold |
| 하위 항목 ("- ") | Regular, 들여쓰기 |
| 하단 회사명 | 라이트 그레이, 우하단 정렬 |

### PPT/DOCX 템플릿

`assets/templates/` 폴더에 3가지 템플릿 변형:

| 파일 | 용도 |
|------|------|
| 미래에셋생명_A.pptx | PPT 템플릿 A |
| 미래에셋생명_B.pptx | PPT 템플릿 B |
| 미래에셋생명_C.pptx | PPT 템플릿 C |
| 미래에셋생명_A.docx | Word 템플릿 A |
| 미래에셋생명_B.docx | Word 템플릿 B |
| 미래에셋생명_C.docx | Word 템플릿 C |

## HTML 보고서 생성 시 CSS

```css
.report-container {
  font-family: 'Spoqa Han Sans', 'Malgun Gothic', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  color: #043B72;
}

.report-label {
  color: #F58220;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
}

.report-title {
  color: #043B72;
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 4px;
}

.report-dept {
  color: #043B72;
  font-size: 14px;
  text-align: right;
  margin-bottom: 16px;
}

.report-divider {
  border: none;
  border-top: 2px solid #F58220;
  margin-bottom: 32px;
}

.report-body {
  font-size: 16px;
  line-height: 1.8;
  color: #48535B;
}

.report-footer {
  text-align: right;
  color: #A0A6A8;
  font-size: 12px;
  margin-top: 60px;
}
```
