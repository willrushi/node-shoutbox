FROM node:15-alpine as base

COPY app /app
WORKDIR /app
EXPOSE 8000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "server.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm i -g nodemon && npm i
COPY . /
CMD ["nodemon", "server.js"]