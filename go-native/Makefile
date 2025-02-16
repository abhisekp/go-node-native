.PHONY: default dev clean

export SHARED_DIR=shared
export NODE_GYP_DIR=/home/abhisekp/.nvm/versions/node/v22.13.1
export SHARED_FILE_NAME=example.node

# Build Flags
export CGO_ENABLED=1
export CGO_CFLAGS=-I${NODE_GYP_DIR}/include

# Compiler
export CC=clang
export CXX=clang++

default: clean
	go build -buildmode=c-shared -o "${SHARED_DIR}/${SHARED_FILE_NAME}"

dev: clean
	go build -gcflags="all=-N -l" -buildmode=c-shared -o "${SHARED_DIR}/${SHARED_FILE_NAME}"

clean:
	npm run clean

test:
	go test -race