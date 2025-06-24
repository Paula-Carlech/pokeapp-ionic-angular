@echo off
echo Starting project installation...

echo Installing npm packages...
npm install

echo Installing Ionic CLI globally...
npm install -g @ionic/cli

echo Building project...
npm run build

echo Installation completed! You can now run the project using:
echo ionic serve
pause
