FROM daocloud.io/library/node:12.16
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
EXPOSE 3000
CMD ["node","server.js"]
