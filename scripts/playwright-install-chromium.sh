#!/usr/bin/env sh
# 将浏览器安装到仓库内可写目录，避免 Cursor 沙箱下默认缓存路径出现 __dirlock ENOENT。
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-$ROOT/node_modules/.cache/playwright-browsers}"
mkdir -p "$PLAYWRIGHT_BROWSERS_PATH"
cd "$ROOT"
exec pnpm exec playwright install chromium
