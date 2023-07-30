#!/usr/bin/env sh
set -e
quasar build
cd dist/spa
git init
git add -A
git commit -m'deploy'
git push -f git@github.com:h65410/xlsx.git master:gh-pages
cd -
rm dist/spa -fr