@echo off
cd scoring-api 
icacls "data" /grant Everyone:F
npm install && npm run-script start-pc 