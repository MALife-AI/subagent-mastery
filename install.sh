#!/bin/bash
# ============================================================
# Subagent Mastery - 미래에셋 AX추진팀 Claude Code Skill Pack
# 원라인 설치: curl -fsSL https://raw.githubusercontent.com/YOUR_ORG/subagent-mastery/main/install.sh | bash
# ============================================================

set -e

# 색상 정의
ORANGE='\033[38;2;245;130;32m'
BLUE='\033[38;2;4;59;114m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

REPO_URL="https://github.com/MALife-AI/subagent-mastery"
CLAUDE_DIR="$HOME/.claude"
TEMP_DIR=$(mktemp -d)

echo ""
echo -e "${ORANGE}╔══════════════════════════════════════════════╗${NC}"
echo -e "${ORANGE}║${NC}  ${BLUE}Subagent Mastery${NC} — Claude Code Skill Pack   ${ORANGE}║${NC}"
echo -e "${ORANGE}║${NC}  미래에셋 AX추진팀                             ${ORANGE}║${NC}"
echo -e "${ORANGE}╚══════════════════════════════════════════════╝${NC}"
echo ""

# ── 사전 체크 ──
if ! command -v git &> /dev/null; then
  echo -e "${YELLOW}[!] git이 설치되어 있지 않습니다. 설치 후 다시 시도해주세요.${NC}"
  exit 1
fi

if [ ! -d "$CLAUDE_DIR" ]; then
  echo -e "${YELLOW}[!] ~/.claude 디렉토리가 없습니다. Claude Code를 먼저 설치해주세요.${NC}"
  exit 1
fi

# ── 다운로드 ──
echo -e "${BLUE}[1/4]${NC} 레포지토리 다운로드 중..."
git clone --depth 1 "$REPO_URL" "$TEMP_DIR/subagent-mastery" 2>/dev/null || {
  echo -e "${YELLOW}[!] git clone 실패. URL을 확인해주세요: $REPO_URL${NC}"
  rm -rf "$TEMP_DIR"
  exit 1
}

SRC="$TEMP_DIR/subagent-mastery"

# ── 백업 ──
echo -e "${BLUE}[2/4]${NC} 기존 설정 백업 중..."
BACKUP_DIR="$CLAUDE_DIR/backups/subagent-mastery-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

for dir in agents skills rules commands; do
  if [ -d "$CLAUDE_DIR/$dir" ]; then
    cp -r "$CLAUDE_DIR/$dir" "$BACKUP_DIR/$dir" 2>/dev/null || true
  fi
done
echo -e "  백업 위치: ${GREEN}$BACKUP_DIR${NC}"

# ── 설치 ──
echo -e "${BLUE}[3/4]${NC} 스킬팩 설치 중..."

AGENTS_INSTALLED=0
SKILLS_INSTALLED=0
RULES_INSTALLED=0
COMMANDS_INSTALLED=0

# Agents 설치
if [ -d "$SRC/agents" ]; then
  mkdir -p "$CLAUDE_DIR/agents"
  for category in "$SRC/agents"/*/; do
    category_name=$(basename "$category")
    mkdir -p "$CLAUDE_DIR/agents/$category_name"
    for agent in "$category"*.md; do
      [ -f "$agent" ] && cp "$agent" "$CLAUDE_DIR/agents/$category_name/" && ((AGENTS_INSTALLED++))
    done
  done
  echo -e "  ${GREEN}✓${NC} Agents: ${AGENTS_INSTALLED}개 설치"
fi

# Skills 설치
if [ -d "$SRC/skills" ]; then
  mkdir -p "$CLAUDE_DIR/skills"
  for skill in "$SRC/skills"/*/; do
    skill_name=$(basename "$skill")
    cp -r "$skill" "$CLAUDE_DIR/skills/$skill_name"
    ((SKILLS_INSTALLED++))
  done
  echo -e "  ${GREEN}✓${NC} Skills: ${SKILLS_INSTALLED}개 설치"
fi

# Rules 설치
if [ -d "$SRC/rules" ]; then
  mkdir -p "$CLAUDE_DIR/rules"
  for rule in "$SRC/rules"/*.md; do
    [ -f "$rule" ] && cp "$rule" "$CLAUDE_DIR/rules/" && ((RULES_INSTALLED++))
  done
  echo -e "  ${GREEN}✓${NC} Rules: ${RULES_INSTALLED}개 설치"
fi

# Commands 설치
if [ -d "$SRC/commands" ]; then
  mkdir -p "$CLAUDE_DIR/commands"
  for cmd in "$SRC/commands"/*.md; do
    [ -f "$cmd" ] && cp "$cmd" "$CLAUDE_DIR/commands/" && ((COMMANDS_INSTALLED++))
  done
  echo -e "  ${GREEN}✓${NC} Commands: ${COMMANDS_INSTALLED}개 설치"
fi

# ── 정리 ──
echo -e "${BLUE}[4/4]${NC} 정리 중..."
rm -rf "$TEMP_DIR"

# ── 완료 ──
TOTAL=$((AGENTS_INSTALLED + SKILLS_INSTALLED + RULES_INSTALLED + COMMANDS_INSTALLED))
echo ""
echo -e "${ORANGE}══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  설치 완료!${NC} 총 ${TOTAL}개 항목 설치됨"
echo ""
echo -e "  ${BLUE}Agents:${NC}   ${AGENTS_INSTALLED}개"
echo -e "  ${BLUE}Skills:${NC}   ${SKILLS_INSTALLED}개"
echo -e "  ${BLUE}Rules:${NC}    ${RULES_INSTALLED}개"
echo -e "  ${BLUE}Commands:${NC} ${COMMANDS_INSTALLED}개"
echo ""
echo -e "  설치 경로: ${GREEN}~/.claude/${NC}"
echo -e "  백업 경로: ${GREEN}$BACKUP_DIR${NC}"
echo ""
echo -e "  ${YELLOW}Claude Code를 재시작하면 적용됩니다.${NC}"
echo -e "${ORANGE}══════════════════════════════════════════════${NC}"
echo ""
