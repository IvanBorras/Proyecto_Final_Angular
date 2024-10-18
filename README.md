# CineStreamFront



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.



## instalar angular 

npm install -g @angular/cli@17

## poner en produccion 

ng build --configuration production    (te crea una carpeta dist)


## github
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
