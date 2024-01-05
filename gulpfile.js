//Requerimos extraer las dependencias
const { src, dest, watch, series } = require('gulp');

//CSS Y SASS
const sass =  require('gulp-sass')(require('sass'));
const postcss =  require('gulp-postcss');
const autoprefixer =  require('autoprefixer');
// var globalThis = require('globalthis/polyfill')();

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

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

// function tareaDefault(done){
//     console.log('Soy la tarea por default');
//     done();
// }

function primerTarea(done){
    console.log('Primer tarea');
    done();
}

function images(done){
    src('src/img/**/*')
        .pipe( imagemin( { optimizationLevel: 3 } ) )
        .pipe(dest('build/img'));
    done();
}

function versionWebp(){
    //Solo requerimos estas extensiones
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp() ) //Convertirla en webp
        .pipe( dest('build/img') )
}

function versionAvif(){
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif() )
        .pipe ( dest('build/img') )
}
  
exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp; 
exports.versionAvif = versionAvif;
exports.default = series(images,versionWebp,versionAvif,css,dev);
exports.primerTarea = primerTarea;

//series- se inicia una tarea y hasta que finaliza inicia la siguiente

//parallel - todas inician al mismo tiempo