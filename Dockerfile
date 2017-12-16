# use a node base image
FROM node:6.11

ARG PORT=9090

# set maintainer
LABEL maintainer "hansschollaardt@gmail.com"

# set a health check
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:${PORT} || exit 1
			
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

COPY . .

# tell docker what port to expose
EXPOSE 9090

CMD [ "npm", "start" ]
