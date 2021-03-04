#!/usr/bin/env bash

[ -d ./dist/proto ] || mkdir -pv ./dist/proto
# JavaScript code generating
npx protoc-gen-grpc --js_out=import_style=commonjs,binary:./src/proto --grpc_out=./src/proto --proto_path ./proto ./proto/*.proto
npx protoc-gen-grpc-ts --ts_out=service=true:./src/proto --proto_path ./proto ./proto/*.proto
npx protoc-gen-grpc --js_out=import_style=commonjs,binary:./dist/proto --grpc_out=./dist/proto --proto_path ./proto ./proto/*.proto
npx protoc-gen-grpc-ts --ts_out=service=true:./dist/proto --proto_path ./proto ./proto/*.proto

# TypeScript compiling
./node_modules/.bin/tsc -d -p ./tsconfig.build.json

