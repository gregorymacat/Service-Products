FROM node:14.17-alpine

WORKDIR /gzmacat/Service-Products

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

# created docker image: docker build -t (name of image i.e. gregorymacat/name_here) (files to include)