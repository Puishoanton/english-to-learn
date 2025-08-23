#!/bin/sh
branch="$(git rev-parse --abbrev-ref HEAD)"

pattern="^(feat|fix|ref)\/[a-z0-9-]+$"

if ! echo "$branch" | grep -Eq "$pattern"; then
  echo "❌ Wrong branch name: $branch"
  echo "✅ Branch name must match: feat|fix|ref/<all-lowercase-with-hyphens>"
  exit 1
fi
