# Practica-Gitflow-Original

# DadoVirtual

Un dado de 6 caras para tirar desde el navegador. Pulsas un botón, el dado rueda en 3D y te dice qué número ha salido.

## Qué puedes hacer

- **Tirar el dado**: pulsando el botón "Tirar dado" o la barra espaciadora.
- **Ver el resultado**: el dado gira y se para mostrando la cara que ha salido. Debajo aparece un texto del tipo "Ha salido un 4".
- **Consultar el historial**: se muestran las últimas 10 tiradas, con la más reciente resaltada, y el número total de tiradas que llevas.
- **Borrar el historial**: con el enlace "Borrar historial" vuelves a empezar de cero.

## Cómo se comporta

- **Resultado aleatorio**: cada cara (del 1 al 6) tiene la misma probabilidad de salir. El número lo decide el servidor, no el navegador.
- **Un giro a la vez**: mientras el dado está rodando, el botón se bloquea. No puedes tirar otra vez hasta que se pare.
- **Memoria entre recargas**: si recargas la página, el dado se queda en la última cara que salió y el historial sigue ahí.
- **Memoria por navegador**: el historial es solo tuyo y se guarda mientras dure tu sesión. Si cierras el navegador o borras las cookies, empiezas de cero. Otra persona que abra la página ve su propio historial.
- **Pantallas**: se ve bien tanto en ordenador como en móvil.
- **Animaciones reducidas**: si tu sistema tiene activada la opción de reducir movimiento, el dado cambia de cara casi al instante en lugar de rodar.

## Si algo falla

- Si el servidor no está en marcha, al tirar aparece un mensaje avisando de que no se ha podido tirar.
- Si el dado deja de responder tras haber tocado el código, borra las cookies del sitio o abre la página en una ventana de incógnito.

## Cómo abrirlo

Necesita PHP instalado. Desde la carpeta del proyecto:

```
php -S localhost:8000
```

y abre [http://localhost:8000](http://localhost:8000) en el navegador.