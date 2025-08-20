#!/usr/bin/env bash
set -euo pipefail

PR="${1:?Usage: scripts/accept-pr.sh <PR-number|url|branch>}"

# Ensure tools are authenticated
gh auth status >/dev/null

# Capture a diff for the AI to read
DIFF_FILE="$(mktemp)"
gh pr diff "$PR" > "$DIFF_FILE"

# Ask Codex to review in read-only mode, never execute commands
codex --ask-for-approval never --sandbox read-only \
  "You are the PR Review Gate. Read the unified diff in $DIFF_FILE and apply the rules in AGENTS.md. Output numbered blockers. End with APPROVE or REJECT only." \
  | tee .codex_pr_review.txt

# Approve or request changes based on the last line
if tail -1 .codex_pr_review.txt | grep -qx "APPROVE"; then
  gh pr review "$PR" --approve -b "Approved by Codex review. See .codex_pr_review.txt"
  # Merge strategy: change to --merge or --rebase if your repo policy prefers it
  gh pr merge "$PR" --squash --delete-branch --auto
else
  gh pr review "$PR" --request-changes -F .codex_pr_review.txt
  echo "Requested changes; not merging."
fi
