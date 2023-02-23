# Trazabilización con QR

Este proyecto utiliza la plataforma **Firebase** y la librería **React-QR-Reader** para trazabilizar el reciclaje de botellas de plástico. Los usuarios pueden iniciar sesión con su correo o su cuenta de Google, y luego escanear códigos QR que identifican las botellas. Estos datos se registran en Firebase para poder rastrear el camino de las botellas desde su origen hasta la planta de reciclaje.


## Comandos

- Para instalar las dependencias necesarias, utiliza el comando `npm i`.
- Para iniciar la aplicación, utiliza el comando `npm start`.

## Librerías
- react 17.0.2
- firebase 9.6.3
- react-qr-reader 3.0.0

## Deploy
- https://fidelizame-auth.netlify.app/

## Uso

La primera pantalla de la aplicación es la pantalla de inicio de sesión. El usuario puede ingresar su correo o utilizar su cuenta de Google para acceder. Una vez iniciada la sesión, la cámara se activará automáticamente y el usuario podrá escanear los códigos QR de las botellas. Cada vez que se escanea un código, se registra la información correspondiente en Firebase.
