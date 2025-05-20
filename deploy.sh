#!/usr/bin/env sh

# Detener en caso de errores
set -e

# Construir la aplicación
npm run build

# Navegar al directorio de salida de la compilación
cd dist

# Si estás desplegando en un dominio personalizado
# echo 'www.example.com' > CNAME

# Inicializar un repositorio Git si no existe
git init
git checkout -b main
git add -A
git commit -m 'deploy'

# Si estás desplegando en https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:sergiorodrigueztrujillo/tienda-migue.git main:gh-pages

cd -
