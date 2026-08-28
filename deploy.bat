@echo off
cd /d "%~dp0"

REM === настройки VPS (поправьте при необходимости) ===
set VPS_USER=root
set VPS_HOST=77.110.113.165
set VPS_PATH=/var/www/html/index.html

echo.
echo Building site...
call npm run build
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

echo.
echo Uploading dist\index.html to %VPS_USER%@%VPS_HOST%:%VPS_PATH%
echo Enter VPS password when asked.
echo.

scp "dist\index.html" %VPS_USER%@%VPS_HOST%:%VPS_PATH%
if errorlevel 1 (
  echo.
  echo Upload failed. Check user/path in deploy.bat or try:
  echo   scp dist\index.html root@77.110.113.165:/var/www/ielts/index.html
  pause
  exit /b 1
)

echo.
echo Done. Open the site and press Ctrl+F5.
pause
