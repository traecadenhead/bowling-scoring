#!/bin/bash
echo "starting API..."
( cd scoring-api && npm install && npm start ) &
echo "starting UI..." &
( cd scoring-ui && npm install && npm start )