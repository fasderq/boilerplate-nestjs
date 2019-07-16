FROM mhart/alpine-node:12

ENV NODE_ENV=production \
    HTTP_PORT=9090 \
    HTTP_HOST=0.0.0.0

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 9090

CMD ["yarn", "start:prod"]
