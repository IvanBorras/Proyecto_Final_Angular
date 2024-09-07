# CineStreamFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## instalar angular 

npm install -g @angular/cli@17


## github
git reset --soft HEAD~1  ----> vuelve a una versión anterior 2,3 
git stash------> elimina todos los cambios.....
git init ----->     Inicializa un repositorio Git en tu proyecto si aún no lo has hecho.
git remote add origin url_del_repositorio --------> Asocia tu repositorio remoto de GitHub con tu repositorio local
git clone ---------> clona el repositorio de github


git status ----------> puedo ver las cosas que estan sin actualizar o en la rama en la que estoy
git remote -v    -----> para ver en que directorio estoy
git remote set-url origin https://github.com/IvanBorras/Proyecto_React.git --------> para cambiar de repositorio


// ACTUALIZAR PROYECTO
git add . --------->    Agrega todos los archivos de tu proyecto al área de preparación (staging area) 
git commit -m "Mensaje descriptivo de tu commit"     -------->  Realiza un commit de tus cambios con un mensaje descriptivo 
git push --set-upstream origin master   ---------> sube tus cambios al repositorio remoto en GitHub


//CREAR RAMAS
Sube tu proyecto original a main, como siempre, después en la terminal pones git checkout -b iss8 (numero del issue creado en GitHub)
para crear y colocarte en una nueva rama... ya puedes hacer git add comit y push

para cambiar de rama git checkout nombreDeLaRama (main para volver a la principal)

git push -f origin iss20 para subirlo a la rama






la "U" podría indicar que hay archivos no seguimientos (untracked) en tu proyecto, es decir, archivos que Git no está rastreando actualmente. Esto significa que estos archivos no se incluirán en los commits hasta que los agregues al área de preparación (staging area) con el comando git add.



La "A" podría indicar que hay archivos en tu proyecto que han sido agregados al área de preparación (staging area) pero aún no se han confirmado (commited). Esto significa que estos archivos están listos para ser incluidos en el próximo commit.

Para confirmar estos archivos, normalmente necesitarías realizar un commit en tu repositorio Git. Puedes hacerlo utilizando la interfaz gráfica o ejecutando el comando  git commit -m "Mensaje descriptivo de tu commit"
