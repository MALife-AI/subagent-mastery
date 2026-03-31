#!/bin/bash
# ============================================================
# Subagent Mastery - 제거 스크립트
# ============================================================

set -e

ORANGE='\033[38;2;245;130;32m'
BLUE='\033[38;2;4;59;114m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

CLAUDE_DIR="$HOME/.claude"

echo ""
echo -e "${RED}Subagent Mastery 제거${NC}"
echo ""

# 최신 백업 찾기
LATEST_BACKUP=$(ls -td "$CLAUDE_DIR/backups/subagent-mastery-"* 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
  echo -e "${YELLOW}[!] 백업을 찾을 수 없습니다. 수동으로 제거해주세요.${NC}"
  exit 1
fi

echo -e "백업에서 복원합니다: ${GREEN}$LATEST_BACKUP${NC}"
echo ""
read -p "계속하시겠습니까? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "취소되었습니다."
  exit 0
fi

for dir in agents skills rules commands; do
  if [ -d "$LATEST_BACKUP/$dir" ]; then
    rm -rf "$CLAUDE_DIR/$dir"
    cp -r "$LATEST_BACKUP/$dir" "$CLAUDE_DIR/$dir"
    echo -e "  ${GREEN}✓${NC} $dir 복원 완료"
  fi
done

echo ""
echo -e "${GREEN}복원 완료!${NC} Claude Code를 재시작하면 적용됩니다."
echo ""
