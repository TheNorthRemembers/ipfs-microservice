# development environment
FROM node:14.9-alpine AS dev

WORKDIR /srv

ENV NODE_ENV=development

COPY package.json yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile --ignore-optional

COPY . .

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["yarn", "start:dev"]

# build environment
FROM dev AS build

RUN yarn build
RUN yarn install --non-interactive --frozen-lockfile --ignore-optional --production --ignore-scripts --prefer-offline --force

# production environment
FROM node:14.9-alpine

WORKDIR /srv

ARG VERSION=0.0.0
ENV VERSION=$VERSION

ENV NODE_ENV=production \
    VERSION=$VERSION

COPY --from=build /srv/dist ./dist
COPY --from=build /srv/node_modules ./node_modules

USER node

CMD ["node", "dist/main"]
