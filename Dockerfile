FROM node:14.17-alpine
ADD . .
RUN npm install

EXPOSE 3000
CMD ["node", "server/index.js"]

# created docker image: docker build -t (name of image i.e. gregorymacat/name_here) (files to include)