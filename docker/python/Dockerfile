FROM alpine
LABEL author="1Computer1"

RUN apk update
RUN apk add build-base python3 python3-dev
RUN python3 -m pip install -U pip
RUN python3 -m pip install -U numpy

COPY run.sh /var/run/
WORKDIR /var/ws
