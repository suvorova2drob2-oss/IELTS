@echo off
cd /d "%~dp0"
set KEY=%USERPROFILE%\.ssh\ielts_deploy
set PUB=%KEY%.pub

echo.
echo === SSH key for deploy (one-time setup) ===
echo.

if exist "%KEY%" (
  echo Key already exists: %KEY%
) else (
  echo Creating key...
  if not exist "%USERPROFILE%\.ssh" mkdir "%USERPROFILE%\.ssh"
  ssh-keygen -t ed25519 -f "%KEY%" -N "" -C "ielts-deploy"
  if errorlevel 1 (
    echo ssh-keygen failed.
    pause
    exit /b 1
  )
)

echo.
echo --- COPY everything below this line into VPS panel (SSH keys) ---
type "%PUB%"
echo --- END ---
echo.
echo 1. Open your VPS control panel in the browser.
echo 2. Find: SSH keys / Authorized keys / Add key.
echo 3. Paste the line above, save.
echo    (No WinSCP, no file replace — only paste the key once.)
echo.
echo 4. Run deploy.bat — it will use the key, no password.
echo.
echo Optional — auto-deploy on every git push:
echo   GitHub repo - Settings - Secrets - Actions - New secret:
echo     VPS_HOST = 77.110.113.165
echo     VPS_USER = root
echo     VPS_SSH_KEY = contents of file %KEY%  (private key, all lines)
echo.
pause
