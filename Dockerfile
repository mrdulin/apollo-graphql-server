FROM mhart/alpine-node:8.11.4
ENV PORT 3200

WORKDIR /app
COPY ./package.json ./package-lock.json /app/
COPY ./ /app/

RUN apk update \
  && apk add curl python --no-cache --virtual build-dependencies build-base gcc \
  && npm i -g npm@latest \
  && npm i

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/version || exit 1

EXPOSE ${PORT}
CMD [ "npm", "start" ]
