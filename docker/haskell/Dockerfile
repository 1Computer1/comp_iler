FROM alpine
LABEL author="1Computer1"

RUN apk update
RUN apk add build-base wget ghc cabal
RUN cabal update
RUN cabal install aeson async attoparsec integer-logarithms megaparsec random scientific split vector

COPY run.sh /var/run/
WORKDIR /var/ws
