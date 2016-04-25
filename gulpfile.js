const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const babel = require("gulp-babel");
const sass =require("gulp-sass");
const types=sass.compiler.types;

gulp.task('clean',()=>{
   return gulp.src('public', {read: false})
    .pipe(clean());
});

gulp.task('static',['clean'],()=>{
   return gulp.src('src/content/**/*.*')
    .pipe(gulp.dest("public/assets"));
});

gulp.task('conf',['clean'],()=>{
   return gulp.src('src/conf/**/*.*')
    .pipe(gulp.dest("public/conf"));
});

gulp.task('views',['clean'],()=>{   
   return gulp.src('src/views/**/*.*')
    .pipe(gulp.dest("public/views"));
});

gulp.task('sass',['clean'],()=>{
   return gulp.src(['src/styles/admin.scss','src/styles/index.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        functions:{
            'lang($lang:ja)':(lang)=>{            
              return types.Color(0xff000000);  
            }
        },
        sourceMap: true
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("public/assets/css"));
}); 

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task("build",['views', 'conf', 'static','sass:watch'],() => {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: `${__dirname}/src`}))
        .pipe(gulp.dest("public"));
});