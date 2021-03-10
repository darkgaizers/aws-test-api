FROM node:12-alpine as builder
WORKDIR /home/node

COPY . /home/node
# Install python/pip
#RUN apk --no-cache add --virtual native-deps \
#    g++ gcc libgcc libstdc++ linux-headers make python2 && \
#    npm install --quiet node-pre-gyp -g
#RUN npm install sequelize-cli
ENV NODE_ENV build
#USER node
RUN npm install --production
RUN npm install @nestjs/cli
RUN npm run build
# ---
FROM node:12-alpine

#USER node
WORKDIR /home/node

ENV DB_DIALECT=postgres
## Cache
ENV ENABLE_CACHE=false \
    USE_LOCAL_CACHE=true \
    CACHE_TTL=600

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/
EXPOSE 80
#RUN npm ci
ENTRYPOINT [ "npm", "run", "start:prod" ]