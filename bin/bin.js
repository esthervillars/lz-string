#! /usr/bin/env node

var lzString = require('../libs/lz-string.js');
var base64String = require ('../libs/base64-string.js');
var fs = require('fs');

if (process.argv.length < 3) {
  console.error('Usage: lz-string <input_file> <method> <methodType> <encoding>');
  console.error ('<method>: compress (default), decompress');
  console.error ('<methodType>: LZ-String default, UTF16, EncodedURIComponent, or Base64String');
  console.error ('<encoding>: utf8 (default), base64, ucs-2 (utf16), or binary');
  process.exit(1);
}

var inputFile = process.argv[2];
var method = process.argv[3] || 'compress';
var methodType = (process.argv[4] || 'default').toLowerCase();
var inputEncoding = process.argv[5] || 'utf8';
var inputString = fs.readFileSync(inputFile, {encoding: inputEncoding,});

switch (method) {
  case 'compress':
    switch(methodType) {
      case 'encodeduricomponent':
        console.log(lzString.compressToEncodedURIComponent(inputString));
        break;
      case 'utf16':
        console.log(lzString.compressToUTF16(inputString));
        break;
      case 'base64string':
        console.log(base64String.compress(inputString));
        break;
      default:
      console.log(lzString.compress(inputString));
    }
    break;
  case 'decompress':
    switch(methodType) {
      case 'encodeduricomponent':
        console.log(lzString.decompressFromEncodedURIComponent(inputString));
        break;
      case 'utf16':
        console.log(lzString.decompressFromUTF16(inputString));
        break;
      case 'base64string':
        console.log(base64String.decompress(inputString));
        break;
      default:
      console.log(lzString.decompress(inputString));
    }
  break;
}
