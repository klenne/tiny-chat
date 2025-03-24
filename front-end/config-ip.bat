@echo off
setlocal

:: Get local IP address (first IPv4, not loopback)
for /f "tokens=2 delims=:" %%f in ('"ipconfig | findstr /i IPv4"') do (
    for /f "tokens=* delims= " %%a in ("%%f") do set LOCAL_IP=%%a
)

set VITE_WS_ADDRESS=ws://%LOCAL_IP%:1999/ws

:: Check if .env exists; if not, create
if not exist .env (
    echo Creating .env file...
    type nul > .env
)

:: If VITE_WS_ADDRESS exists in .env, replace it; otherwise, add it
findstr /b /c:"VITE_WS_ADDRESS=" .env >nul
if %errorlevel% equ 0 (
    powershell -Command "(Get-Content .env) -replace '^VITE_WS_ADDRESS=.*', 'VITE_WS_ADDRESS=%VITE_WS_ADDRESS%' | Set-Content .env"
) else (
    echo VITE_WS_ADDRESS=%VITE_WS_ADDRESS%>>.env
)

echo VITE_WS_ADDRESS set to: %VITE_WS_ADDRESS% in .env

endlocal
