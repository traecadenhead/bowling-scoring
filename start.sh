#!/bin/bash
echo "starting API..."
( cd scoring-api && npm start ) &
echo "starting UI..." &
( cd scoring-ui && npm start )