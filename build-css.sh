#!/usr/bin/env bash

# Compile Sass source to CSS files.
# Applies functions & importer to support Blueprint compilation.

yarn node-sass-chokidar \
  --functions ./scripts/sass-inline-svg.js \
  --importer node_modules/node-sass-package-importer/dist/cli.js \
  --output src/styles \
  --source-map true \
  $@
