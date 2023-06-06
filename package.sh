#!/bin/bash

mkdir idps_prepare
cp idps_prepare.js idps_prepare
cp LICENSE.txt idps_prepare
cp README.md idps_prepare
cp -a example idps_prepare
tar -czf idps_prepare.tar.gz idps_prepare
sha256sum idps_prepare.tar.gz > idps_prepare.tar.gz.sha256
rm -rf idps_prepare
