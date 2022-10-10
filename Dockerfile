# syntax=docker/dockerfile:1.2-labs
#
# Usage
# ========
#
# Use the following command to build the image:
#
#     $ docker build . -t x11-sentinel-dashboard
#

# Target Node version
ARG NODE_VERSION=16

# Target Alpine version
ARG ALPINE_VERSION=3.16

#===============================================================================
# Builder
#===============================================================================

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build

# Run OS dependencies
RUN --mount=type=cache,id=apk-global,sharing=locked,target=/var/cache/apk \
    ln -s /var/cache/apk /etc/apk/cache && \
    apk add --update build-base openssh-client git util-linux python3

# Set up workplace
WORKDIR /opt/app

# Copy package specifications
COPY package.json yarn.lock Makefile .

# Install dependencies
RUN --mount=type=cache,id=node-modules-x11-sentinel-dashboard,sharing=locked,target=/opt/node_modules \
    --mount=type=cache,id=yarn-cache-x11-sentinel-dashboard,sharing=locked,target=/usr/local/share/.cache/yarn \
    --mount=type=ssh \
    MODULES_DIR="/opt/node_modules" make install-deps

# Copy contents -- bind mount does not add that much for remote envs
COPY . .

# Run build
RUN --mount=type=cache,id=node-modules-x11-sentinel-dashboard,sharing=locked,target=/opt/node_modules \
    --mount=type=cache,id=yarn-cache-x11-sentinel-dashboard,sharing=locked,target=/usr/local/share/.cache/yarn \
    --network=none \
    export PATH="/opt/node_modules/.bin:$PATH" && \
    YARN_EXTRA_ARGS="--offline" MODULES_DIR="/opt/node_modules" make build

#===============================================================================
# Released runtime
#===============================================================================

FROM nginx:alpine AS runtime

# Set up default port for NGINX
ARG APP_SERVER_PORT=80

# Expose HTTP by default
EXPOSE ${APP_SERVER_PORT}

# Copy NGINX config
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy application to its final place
COPY --from=build /opt/app/build /opt/app
