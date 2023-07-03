#!/bin/sh

rm -rf release/dataopen-sdk-nodejs*
mkdir release/dataopen-sdk-nodejs

cp -rf LICENSE release/dataopen-sdk-nodejs/
cp -rf README.md release/dataopen-sdk-nodejs/
cp -rf ./dist/index.js release/dataopen-sdk-nodejs/
cp -rf package.json release/dataopen-sdk-nodejs/

cd release
zip -r dataopen-sdk-nodejs.zip dataopen-sdk-nodejs/*

rm -rf dataopen-sdk-nodejs

cd ../