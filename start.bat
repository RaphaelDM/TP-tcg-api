@echo off
echo 🚀 Lancement de l'API Express...
start cmd /k "cd back-API && node app.js"

echo 📱 Lancement de l'application mobile Expo...
cd front-mobile
npx expo start
