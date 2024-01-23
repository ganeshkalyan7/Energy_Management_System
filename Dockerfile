FROM node:alpine 

WORKDIR /ems

COPY package.json /ems

RUN npm install

COPY .  /ems

CMD ["npm", "run", "start"]