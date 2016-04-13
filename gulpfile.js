const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const babel = require("gulp-babel");

gulp.task('clean',()=>{
   return gulp.src('public', {read: false})
    .pipe(clean());
});

gulp.task('static',()=>{
   return gulp.src('src/content/**/*.*')
    .pipe(gulp.dest("public/assets"));
});

gulp.task('conf',()=>{
   return gulp.src('src/conf/**/*.*')
    .pipe(gulp.dest("public/conf"));
});

gulp.task('views',()=>{
   return gulp.src('src/views/**/*.*')
    .pipe(gulp.dest("public/views"));
});

gulp.task('resource',['clean'],()=>{
   return gulp.start('views', 'conf', 'static'); 
});

gulp.task("build",['resource'],() => {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: `${__dirname}/src`}))
        .pipe(gulp.dest("public"));
});