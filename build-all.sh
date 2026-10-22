#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if command -v twext >/dev/null 2>&1; then TW=(twext); else TW=(npx --yes @twext/twext); fi
for d in SenseColor AdvancedTImers OptomisedBlocks; do
  echo "== $d"
  (cd "$d" && "${TW[@]}" validate && "${TW[@]}" build)
done
