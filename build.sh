#!/bin/bash
# Builds a static site in dist/ without npm: Bun transpiles/bundles the app,
# libraries load from jsDelivr through an import map, Tailwind runs from its CDN.
set -e
cd "$(dirname "$0")"
rm -rf .build dist && mkdir -p .build dist/assets
cp -r src .build/src
# CSS is handled in index.html, not by the bundler
sed -i '/import "\.\/App\.css";/d; /import "@\/index\.css";/d' .build/src/App.js .build/src/index.js
sed -i 's#from "@/App"#from "./App"#' .build/src/index.js
~/.bun/bin/bun build .build/src/index.js --outfile dist/app.js --format esm --minify \
  --loader .js:jsx --jsx-runtime automatic \
  --external react --external react-dom --external 'react/*' --external 'react-dom/*' \
  --external framer-motion --external lenis --external lucide-react --external sonner --external @tanstack/react-query
cp src/App.css dist/app.css
cp public/assets/* dist/assets/
TWCSS=$(sed -e '1,3d' src/index.css)
python3 - "$TWCSS" <<'PY'
import sys
tw = sys.argv[1]
html = open("index.dist.html").read().replace("/*__TAILWIND_CSS__*/", tw)
open("dist/index.html", "w").write(html)
PY
rm -rf .build
echo "built:"; ls -la dist dist/assets
