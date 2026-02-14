@echo off
echo Starting Next.js Dev Server (Direct) > dev_server.log
node --max-old-space-size=8192 "node_modules\next\dist\bin\next" dev >> dev_server.log 2>&1
