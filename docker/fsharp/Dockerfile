FROM alpine
LABEL author="1Computer1"

RUN apk update
RUN apk add fsharp

COPY run.sh /var/run/
WORKDIR /var/ws
