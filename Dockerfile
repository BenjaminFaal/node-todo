# use a node base image
FROM node:6.11

# set maintainer
LABEL maintainer "hansschollaardt@gmail.com"

# set a health check
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8080 || exit 1

# tell docker what port to expose
EXPOSE 8080
