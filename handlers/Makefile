export SHARED_DIR=shared
export NODE_GYP_DIR=/home/abhisekp/.nvm/versions/node/v22.13.1
export SHARED_FILE_NAME=example.node

# Build Flags
export CGO_ENABLED=1
export CGO_CFLAGS=-I${NODE_GYP_DIR}/include

# Compiler
export CC=clang
export CXX=clang++

default:
	go build -buildmode=c-shared -o "${SHARED_DIR}/${SHARED_FILE_NAME}"

dev:
	go build -gcflags="all=-N -l" -buildmode=c-shared -o "${SHARED_DIR}/${SHARED_FILE_NAME}"