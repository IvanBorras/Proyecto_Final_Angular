# CineStreamFront



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.



## INSTALAR ANGULAR 17

npm install -g @angular/cli@17

## GITHUB
git reset --soft HEAD~1  ----> vuelve a una versión anterior 2,3.

git stash------> elimina todos los cambios.....

git init ----->     Inicializa un repositorio Git en tu proyecto si aún no lo has hecho.

git remote add origin url_del_repositorio --------> Asocia tu repositorio remoto de GitHub con tu repositorio local.

git clone ---------> clona el repositorio de github.



git status ----------> puedo ver las cosas que estan sin actualizar o en la rama en la que estoy.

git remote -v    -----> para ver en que directorio estoy.

git remote set-url origin https://github.com/IvanBorras/Proyecto_React.git --------> para cambiar de repositorio.



// ACTUALIZAR PROYECTO
git add . --------->    Agrega todos los archivos de tu proyecto al área de preparación (staging area).

git commit -m "Mensaje descriptivo de tu commit"     -------->  Realiza un commit de tus cambios con un mensaje descriptivo. 

git push --set-upstream origin master   ---------> sube tus cambios al repositorio remoto en GitHub.


//CREAR RAMAS

git checkout -b iss8 (numero del issue creado en GitHub) para crear y colocarte en una nueva rama... ya puedes hacer git add . comit y push.

git branch -----> muestra todas las ramas y te indica con * donde te encuentras.

git checkout nombreDeLaRama ----->para cambiar de rama (main o master para volver a la principal).

git push -f origin iss20 para subirlo a la rama iss20.


la "U" podría indicar que hay archivos no seguimientos (untracked) en tu proyecto, es decir, archivos que Git no está rastreando actualmente. Esto significa que estos archivos no se incluirán en los commits hasta que los agregues al área de preparación (staging area) con el comando git add.

La "A" podría indicar que hay archivos en tu proyecto que han sido agregados al área de preparación (staging area) pero aún no se han confirmado (commited). Esto significa que estos archivos están listos para ser incluidos en el próximo commit.

Para confirmar estos archivos, normalmente necesitarías realizar un commit en tu repositorio Git. Puedes hacerlo utilizando la interfaz gráfica o ejecutando el comando  git commit -m "Mensaje descriptivo de tu commit"



## poner en produccion VERCEL

ng build --configuration production    (te crea una carpeta dist donde se encuentra el html)
esto sera lo q se subira a vercel

asociar github a vercel

al crear nuevo proyecto, elegir el repositorio 
{
            Root Directory: ./
            Build Command: ng build --configuration production
            Output Directory: dist/cinestream/browser (o el nombre que hayas especificado en angular.json    "outputPath": "dist/cinestream").
}

en dentro de browser en dist/cinestream/browser se encuentra el html que tiene que leer el navegador.

// URL

Desarrollo: El frontend se ejecuta en http://localhost:4200, y el backend en http://localhost:4040/api/users. ESTO SE ENCUENTRA EN APP/SERVICE/auth.sevice.ts
Producción: Cambiarás la URL en tu frontend para que apunte a tu backend en Vercel, que es https://cinestreamback.vercel.app/api.

estas urls estan en src/environments

se usara ng serve para desarrollo y ng build para produccion



(cambiar tambien en los demas services)
