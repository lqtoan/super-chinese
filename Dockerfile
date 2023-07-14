# Stage 1 - the build process
FROM node:16-alpine AS build-step
RUN apk add --no-cache python3 g++ make
WORKDIR /usr/src/app
COPY package*.json yarn.lock nx.json ./
RUN yarn
COPY . ./
CMD [ "npm", "start" ]

# Stage 2 - the dev environment
# FROM nginx:1.23-alpine
# COPY --from=build-deps /usr/src/app/dist/super-chinese /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
