FROM node:lts-alpine as builder

WORKDIR /opt/gobot

COPY --chown=node:node package*.json .

RUN npm install 

COPY --chown=node:node . .

RUN npm run build

USER node

## ---
FROM node:lts-alpine as runtime

WORKDIR /opt/gobot

COPY --chown=node:node package*.json .

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

USER node

## ---
FROM node:lts-slim

WORKDIR /opt/gobot

COPY --chown=node:node --from=builder /opt/gobot/dist ./dist
COPY --chown=node:node --from=runtime /opt/gobot/node_modules ./node_modules

COPY --chown=node:node --chmod=500 godot.64 /opt/bin/godot
COPY --chown=node:node project.godot /opt/bin/project.godot

ENTRYPOINT ["node", "/opt/gobot/dist/main"]

