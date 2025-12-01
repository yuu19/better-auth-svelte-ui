#!/usr/bin/env bash
set -euo pipefail

# .codex ディレクトリをホームにコピー or symlink
mkdir -p "${HOME}/.codex"

# 上書きを許容するなら cp -f
cp -f "${HOME}/.dotfiles/.codex/config.toml" "${HOME}/.codex/config.toml"
# もしくはシンボリックリンクにしたいなら:
# ln -sf "${HOME}/.dotfiles/.codex/config.toml" "${HOME}/.codex/config.toml"
