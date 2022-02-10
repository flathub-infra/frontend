FROM node:16 AS devel

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
CMD ["yarn", "dev"]

FROM node:16-slim AS production
COPY --from=devel /app /app

WORKDIR /app
RUN yarn build
CMD ["yarn", "start"]
