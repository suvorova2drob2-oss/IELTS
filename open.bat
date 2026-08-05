@echo off
cd /d "%~dp0"

echo Starting IELTS trainer (live updates)...
echo Just refresh the browser after changes — no rebuild needed.
echo Do not close this window while using the site.
echo.

npm run dev -- --open --port 5173
