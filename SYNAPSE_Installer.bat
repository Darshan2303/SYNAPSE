@echo off
setlocal

:: Sets the color to Light Aqua text on a Black background
color 0B

:: Directories
set "BASE=%cd%"
set "FOLDER=SYNAPSE"
set "REPO=https://github.com/Darshan2303/SYNAPSE.git"
set "TARGET=%BASE%\%FOLDER%"
set "BACKUP=%BASE%\SYNAPSE_DATA_BACKUP"

:: 1. Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [ FATAL ERROR ] Git is not installed or not in your system PATH.
    echo  Please install Git and try again.
    echo.
    pause
    exit /b
)

:: 2. Check if folder already exists
if not exist "%TARGET%" goto CloneFresh

:Menu
cls
echo.
echo  =================================================================
echo.
echo                               S Y N A P S E
echo                 Real-Time Collaboration Platform
echo                     Ad Astra Development Team
echo.
echo  =================================================================
echo.
echo    [ STATUS ] An existing installation was detected.
echo.
echo    Please select an option:
echo.
echo     [ 1 ] Launch Existing Setup
echo     [ 2 ] Install to a Custom Directory
echo     [ 3 ] Update Existing Setup (Pull Latest Code)
echo     [ 4 ] Uninstall / Remove Existing Files
echo     [ 5 ] Clean Reinstall (Safe Wipe ^& Clone Fresh)
echo.
echo  =================================================================
echo.
set /p choice="  Enter choice (1-5): "

if "%choice%"=="1" goto RunExisting
if "%choice%"=="2" goto CreateCustom
if "%choice%"=="3" goto UpdateExisting
if "%choice%"=="4" goto DeleteOnly
if "%choice%"=="5" goto DeleteAndClone

goto Menu


:CreateCustom
echo.
set /p newname="  Enter new folder name (no special characters): "
set "TARGET=%BASE%\%newname%"
goto CloneFresh


:UpdateExisting
cls
echo.
echo  =================================================================
echo                     Updating Codebase...
echo  =================================================================
echo.
if not exist "%TARGET%\.git" (
    echo  [ ERROR ] No valid Git repository found. Please do a Clean Reinstall.
    echo.
    pause
    goto Menu
)

cd /d "%TARGET%"
echo  [ INFO ] Fetching latest updates from GitHub...
git pull

if %errorlevel% neq 0 (
    echo.
    echo  [ ERROR ] Update failed! You might have local file conflicts.
    echo.
    pause
    goto Menu
)

echo.
echo  [ SUCCESS ] Update complete! Your databases were not touched.
echo.
pause
goto Menu


:DeleteOnly
cls
echo.
echo  =================================================================
echo                       U N I N S T A L L
echo  =================================================================
echo.
echo  [ WARNING ] Stopping background services...
taskkill /F /IM node.exe /T >nul 2>&1

echo  [ INFO ] Securing databases and config files...
if not exist "%BACKUP%" mkdir "%BACKUP%"
:: Backs up files with "db" in the name, sqlite files, and .env files
xcopy "%TARGET%\*db*" "%BACKUP%\" /S /I /Y /Q >nul 2>&1
xcopy "%TARGET%\*.sqlite" "%BACKUP%\" /S /I /Y /Q >nul 2>&1
xcopy "%TARGET%\.env" "%BACKUP%\" /S /I /Y /Q >nul 2>&1

echo  Removing old installation...
if exist "%TARGET%" del /f /s /q "%TARGET%\*.*" >nul 2>&1
if exist "%TARGET%" rmdir /s /q "%TARGET%" >nul 2>&1

echo.
echo  [ SUCCESS ] Uninstallation complete.
echo  [ NOTE ] Your databases and configs were saved to: 
echo           %BACKUP%
echo.
pause
exit /b


:DeleteAndClone
cls
echo.
echo  =================================================================
echo                     P R E P A R I N G...
echo  =================================================================
echo.
echo  [ WARNING ] Stopping background services...
taskkill /F /IM node.exe /T >nul 2>&1

echo  [ INFO ] Backing up databases and config files to prevent data loss...
if not exist "%BACKUP%" mkdir "%BACKUP%"
xcopy "%TARGET%\*db*" "%BACKUP%\" /S /I /Y /Q >nul 2>&1
xcopy "%TARGET%\*.sqlite" "%BACKUP%\" /S /I /Y /Q >nul 2>&1
xcopy "%TARGET%\.env" "%BACKUP%\" /S /I /Y /Q >nul 2>&1

echo  Wiping previous codebase...
if exist "%TARGET%" del /f /s /q "%TARGET%\*.*" >nul 2>&1
if exist "%TARGET%" rmdir /s /q "%TARGET%" >nul 2>&1

timeout /t 2 /nobreak >nul

if exist "%TARGET%" (
    echo.
    echo  [ ERROR ] Windows blocked the deletion! Close VS Code/Terminals.
    echo.
    pause
    exit /b
)
goto CloneFresh


:CloneFresh
cls
echo.
echo  =================================================================
echo                     Downloading Files...
echo  =================================================================
echo.
git clone "%REPO%" "%TARGET%"

if %errorlevel% neq 0 (
    echo.
    echo  [ ERROR ] Failed to download the repository.
    echo.
    pause
    exit /b
)

:: Restore the backed-up data into the fresh clone
if exist "%BACKUP%" (
    echo  [ INFO ] Restoring databases and environment variables...
    xcopy "%BACKUP%\*" "%TARGET%\" /S /I /Y /Q >nul 2>&1
    rmdir /s /q "%BACKUP%" >nul 2>&1
)

goto RunExisting


:RunExisting
cls
cd /d "%TARGET%"

echo  =================================================================
echo                     Starting Server...
echo  =================================================================
echo.

if exist "start.bat" (
    echo  [ INFO ] Waiting for server to boot at localhost:4000...
    start /b powershell -NoProfile -Command "$port=4000; while($true){ try{ $tcp=New-Object System.Net.Sockets.TcpClient; $tcp.Connect('127.0.0.1',$port); $tcp.Close(); break; } catch { Start-Sleep -Milliseconds 200 } }; Start-Process 'http://localhost:4000'"
    
    echo  [ INFO ] Launching core services...
    echo.
    call start.bat
) else (
    echo  [ ERROR ] start.bat NOT FOUND!
    echo.
    pause
)
