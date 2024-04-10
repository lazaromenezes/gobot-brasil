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
FROM node:lts-alpine

WORKDIR /opt/gobot

COPY --chown=node:node --from=builder /opt/gobot/dist ./dist
COPY --chown=node:node --from=runtime /opt/gobot/node_modules ./node_modules

ENTRYPOINT ["node", "/opt/gobot/dist/main"]

