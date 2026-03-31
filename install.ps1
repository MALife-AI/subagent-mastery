# ============================================================
# Subagent Mastery - 미래에셋 AX추진팀 Claude Code Skill Pack
# 원라인 설치 (PowerShell):
# irm https://raw.githubusercontent.com/YOUR_ORG/subagent-mastery/main/install.ps1 | iex
# ============================================================

$ErrorActionPreference = "Stop"

$REPO_URL = "https://github.com/MALife-AI/subagent-mastery"
$CLAUDE_DIR = Join-Path $env:USERPROFILE ".claude"
$TEMP_DIR = Join-Path $env:TEMP "subagent-mastery-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor DarkYellow
Write-Host "║  Subagent Mastery — Claude Code Skill Pack   ║" -ForegroundColor DarkYellow
Write-Host "║  미래에셋 AX추진팀                             ║" -ForegroundColor DarkYellow
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor DarkYellow
Write-Host ""

# ── 사전 체크 ──
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[!] git이 설치되어 있지 않습니다." -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path $CLAUDE_DIR)) {
    Write-Host "[!] ~/.claude 디렉토리가 없습니다. Claude Code를 먼저 설치해주세요." -ForegroundColor Yellow
    exit 1
}

# ── 다운로드 ──
Write-Host "[1/4] 레포지토리 다운로드 중..." -ForegroundColor Cyan
try {
    git clone --depth 1 $REPO_URL $TEMP_DIR 2>$null
} catch {
    Write-Host "[!] git clone 실패. URL을 확인해주세요." -ForegroundColor Yellow
    exit 1
}

$SRC = $TEMP_DIR

# ── 백업 ──
Write-Host "[2/4] 기존 설정 백업 중..." -ForegroundColor Cyan
$BACKUP_DIR = Join-Path $CLAUDE_DIR "backups\subagent-mastery-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null

foreach ($dir in @("agents", "skills", "rules", "commands")) {
    $source = Join-Path $CLAUDE_DIR $dir
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination (Join-Path $BACKUP_DIR $dir) -Recurse -Force
    }
}
Write-Host "  백업 위치: $BACKUP_DIR" -ForegroundColor Green

# ── 설치 ──
Write-Host "[3/4] 스킬팩 설치 중..." -ForegroundColor Cyan

$counts = @{ agents = 0; skills = 0; rules = 0; commands = 0 }

# Agents
$agentsDir = Join-Path $SRC "agents"
if (Test-Path $agentsDir) {
    Get-ChildItem -Path $agentsDir -Directory | ForEach-Object {
        $targetDir = Join-Path $CLAUDE_DIR "agents\$($_.Name)"
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Get-ChildItem -Path $_.FullName -Filter "*.md" | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination $targetDir -Force
            $counts.agents++
        }
    }
    Write-Host "  ✓ Agents: $($counts.agents)개 설치" -ForegroundColor Green
}

# Skills
$skillsDir = Join-Path $SRC "skills"
if (Test-Path $skillsDir) {
    Get-ChildItem -Path $skillsDir -Directory | ForEach-Object {
        $targetDir = Join-Path $CLAUDE_DIR "skills\$($_.Name)"
        Copy-Item -Path $_.FullName -Destination $targetDir -Recurse -Force
        $counts.skills++
    }
    Write-Host "  ✓ Skills: $($counts.skills)개 설치" -ForegroundColor Green
}

# Rules
$rulesDir = Join-Path $SRC "rules"
if (Test-Path $rulesDir) {
    $targetDir = Join-Path $CLAUDE_DIR "rules"
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Get-ChildItem -Path $rulesDir -Filter "*.md" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $targetDir -Force
        $counts.rules++
    }
    Write-Host "  ✓ Rules: $($counts.rules)개 설치" -ForegroundColor Green
}

# Commands
$commandsDir = Join-Path $SRC "commands"
if (Test-Path $commandsDir) {
    $targetDir = Join-Path $CLAUDE_DIR "commands"
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Get-ChildItem -Path $commandsDir -Filter "*.md" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $targetDir -Force
        $counts.commands++
    }
    Write-Host "  ✓ Commands: $($counts.commands)개 설치" -ForegroundColor Green
}

# ── 정리 ──
Write-Host "[4/4] 정리 중..." -ForegroundColor Cyan
Remove-Item -Path $TEMP_DIR -Recurse -Force -ErrorAction SilentlyContinue

# ── 완료 ──
$total = $counts.agents + $counts.skills + $counts.rules + $counts.commands

Write-Host ""
Write-Host "══════════════════════════════════════════════" -ForegroundColor DarkYellow
Write-Host "  설치 완료! 총 ${total}개 항목 설치됨" -ForegroundColor Green
Write-Host ""
Write-Host "  Agents:   $($counts.agents)개" -ForegroundColor Cyan
Write-Host "  Skills:   $($counts.skills)개" -ForegroundColor Cyan
Write-Host "  Rules:    $($counts.rules)개" -ForegroundColor Cyan
Write-Host "  Commands: $($counts.commands)개" -ForegroundColor Cyan
Write-Host ""
Write-Host "  설치 경로: $CLAUDE_DIR" -ForegroundColor Green
Write-Host "  백업 경로: $BACKUP_DIR" -ForegroundColor Green
Write-Host ""
Write-Host "  Claude Code를 재시작하면 적용됩니다." -ForegroundColor Yellow
Write-Host "══════════════════════════════════════════════" -ForegroundColor DarkYellow
Write-Host ""
