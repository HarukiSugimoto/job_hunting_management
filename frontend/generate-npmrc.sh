#!/bin/bash
set -e

echo ""
echo "Generating .npmrc file"
echo "------------------------"

# .env の読み込み（安全策）
export $(grep -v '^#' .env | xargs)

\cp -r ./.npmrc.example ./.npmrc
sed -ie "s/_authToken=/_authToken=$GITHUB_TOKEN/" ./.npmrc
rm -f .npmrce
