# stage 1 - build the code
FROM node:11.15-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN apk add --no-cache git && \
  npm config set unsafe-perm true && \
  npm install -g typescript

RUN npm install

ADD . .
# COPY .env .

RUN npm run build


# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build


# stage 2
FROM node:11.15-alpine
# WORKDIR /src
# COPY package.json ./

RUN apk -v --update add --no-cache git \
  python \
  py-pip && \
  npm config set unsafe-perm true && \
  npm install -g serve && \
  pip install --upgrade awscli==1.14.5 s3cmd==2.0.1 && \
  apk -v --purge del py-pip

COPY --from=build-deps /usr/src/app/build ./build

EXPOSE 3000
CMD serve -s build -p 3000