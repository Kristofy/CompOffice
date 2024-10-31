tree -I '.git|node_modules' --noreport -P '*.js|*.ts|*.tsx|*.md|*.json|*.yml|*.yaml|*.css|*.scss|*.html|*.png|*.gif|*.jpg|*.svg|*.ico|*.ttf|*.woff|*.woff2|*.eot' | sed 's/^/  /'
