@echo off
start "" cmd /c "npm install && npm install sass && npm run dev"
timeout /t 10

start http://localhost:5173/