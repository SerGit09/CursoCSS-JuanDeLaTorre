//Requerimos extraer las dependencias
const { src, dest, watch, series } = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const postcss =  require('gulp-postcss');
const autoprefixer =  require('autoprefixer');

function css(done){
    //Compilar sass 
    //pasos: 1- Identificar archivo , 2- Compilarla, 3- Guardar el .css
    src('src/scss/app.scss')
        .pipe( sass() )
        .pipe( postcss([autoprefixer()]) )
        .pipe( dest('build/css') )
    done();
}

function dev(){
    //Atento a lo que pase en este archivo y el archivo que mandara a llamar
    watch('src/scss/**/*.scss',css);//Buscaremos todos los archivos que tengan la extension de scss
}

function tareaDefault(done){
    console.log('Soy la tarea por default');
    done();
}
  
exports.css = css;
exports.dev = dev;
exports.default = series(css,dev);

//series- se inicia una tarea y hasta que finaliza inicia la siguiente

//parallel - todas inician al mismo tiempo