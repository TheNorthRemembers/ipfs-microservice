#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  if [ ! -d "node_modules" ]; then
      yarn install --non-interactive --frozen-lockfile --ignore-optional
  fi
fi

exec "$@"
