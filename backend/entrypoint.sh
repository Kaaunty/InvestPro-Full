#!/bin/sh
set -e

# Espera o MySQL ficar disponível
until mysqladmin ping -h"db" -P3306 --silent; do
  echo 'Aguardando o MySQL ficar pronto...';
  sleep 2
done

echo 'MySQL está pronto! Rodando migrations...'
npx prisma migrate deploy

# Inicia o servidor no caminho correto
exec node dist/src/server.js
