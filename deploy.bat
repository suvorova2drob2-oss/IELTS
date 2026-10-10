@echo off
cd /d "%~dp0"

set VPS_USER=root
set VPS_HOST=77.110.113.165
set ARCHIVE=dist-upload.tar

echo.
echo Building site...
call npm run build
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

echo.
echo Upload audio too? Only needed when mp3 files were added or changed.
choice /C YN /T 10 /D N /M "Y = site + audio, N = site only (auto N in 10 s)"
if errorlevel 2 goto no_audio
tar -cf "%ARCHIVE%" -C dist .
goto packed
:no_audio
tar -cf "%ARCHIVE%" -C dist --exclude=./audio .
:packed
if errorlevel 1 (
  echo Packing failed.
  pause
  exit /b 1
)

echo.
echo Step 1 of 2: uploading archive. Enter the VPS root password.
copy /y "%ARCHIVE%" "%TEMP%\ielts-upload.tar" >nul
copy /y "scripts\remote-unpack.sh" "%TEMP%\ielts-unpack.sh" >nul
scp "%TEMP%\ielts-upload.tar" "%TEMP%\ielts-unpack.sh" %VPS_USER%@%VPS_HOST%:/tmp/
if errorlevel 1 (
  echo Upload failed.
  pause
  exit /b 1
)

echo.
echo Step 2 of 2: unpacking on the server. Enter the password again.
ssh %VPS_USER%@%VPS_HOST% "bash /tmp/ielts-unpack.sh"
if errorlevel 1 (
  echo Unpacking failed.
  pause
  exit /b 1
)

del /f "%ARCHIVE%" "%TEMP%\ielts-upload.tar" "%TEMP%\ielts-unpack.sh" 2>nul
echo.
echo Take a screenshot of the lines above ^(updated: ... and nginx^) if the site is still old.
echo Done. Open http://%VPS_HOST%/ielts/ and press Ctrl+F5.
pause
