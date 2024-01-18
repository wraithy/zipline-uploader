@echo off
set "dirPath=%~dp0"
set arg1=%~1

if "%arg1%" == "" (
    set /p "arg1=Please provide a file path (or type 'q' to quit): "
)

if /i "%arg1%"=="q" (
    exit /b
)

if not "%arg1%" == "" (
    cd /d "%dirPath%"
    node .\index.js "%arg1%" %dirPath% | clip
    echo File uploaded successfully and copied to clipboard.
    pause
)

exit /b
