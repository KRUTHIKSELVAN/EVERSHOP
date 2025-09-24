@echo off
echo Starting EverShop Advanced...
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart your computer and run this script again.
    pause
    exit /b 1
)

echo Node.js found! Installing dependencies...
echo.

npm install

echo.
echo Starting development server...
echo This will open your browser automatically.
echo.
echo Access the application at: http://localhost:3000
echo.

npm start

pause