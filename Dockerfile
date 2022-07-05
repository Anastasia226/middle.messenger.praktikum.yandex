FROM node:16
WORKDIR /home/anastasiia/Desktop/project/sprint_1


COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm ci
COPY . .
COPY ./src src
COPY ./webpack.config.js webpack.config.js
COPY ./webpack.prod.js webpack.prod.js
COPY ./src/index.ts src/index.ts
COPY ./server.ts server.ts
COPY ./tsconfig.json tsconfig.json

RUN ["npm", "run", "build"]

EXPOSE 4751
CMD ["npm", "run", "start"]
