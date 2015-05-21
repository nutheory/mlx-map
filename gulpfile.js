var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;

gulp.task('styles', function() {
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./css/'))
})

gulp.task('default',function() {
    gulp.watch('./assets/sass/*.scss',['styles']);
});


// var gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     bourbon = require('node-bourbon').includePaths,
//     plumber = require('gulp-plumber'),
//     concat = require('gulp-concat'),
//     neat = require('node-neat').includePaths

// var paths = {
//     scss: './assets/sass/default.scss'
// };

// gulp.task('styles', function () {
//     return gulp.src(paths.scss)
//         .pipe(sass({
//             includePaths: ['styles'].concat(neat)
//         }))
//         .pipe(gulp.dest('./public/css'));
// });

// gulp.task('default',function(){
//     gulp.start('styles');
// });

// var gulp, sass, sourcemaps, neat, browserify, coffeeify, source, util, watchify, _;

// gulp = require('gulp');
// util = require('gulp-util');
// watchify = require('watchify');
// sass = require('gulp-sass');
// sourcemaps = require('gulp-sourcemaps');
// neat = require('node-neat').includePaths;
// browserify = require('browserify');
// coffeeify = require('coffeeify');
// source = require('vinyl-source-stream');
// _ = require('lodash');

// function browserifyInstance(fileName, userOpts) {
//   if(!userOpts) {
//     userOpts = {};
//   }

//   var defaultOpts = {
//     extensions: ['.coffee', '.js']
//   };

//   return browserify(fileName, _.assign(defaultOpts, userOpts))
// }

// gulp.task('watch', ['watch-scss', 'watch-coffee']);

// gulp.task('watch-scss', function() {
//   gulp.watch('assets/stylesheets/**/*.scss', ['compile-scss']);
// });

// gulp.task('watch-coffee', function() {
//   var watchBrowserify = watchify(browserifyInstance('./app/assets/javascripts/application.coffee', _.assign(watchify.args, { debug: true })));

//   var updateOnChange = function() {
//     return watchBrowserify
//      .bundle()
//      .on('error', util.log.bind(util, 'Browserify Error'))
//      .pipe(source('bundle.js'))
//      .pipe(gulp.dest('public/assets'));
//   };

//   watchBrowserify
//     .transform('coffeeify')
//     .on('log', util.log)
//     .on('update', updateOnChange)
//   updateOnChange();
// });

// gulp.task('default', ['compile-scss']);

// gulp.task('compile-scss', function() {
//   gulp.src('./assets/sass/default.scss')
//       // .pipe(sourcemaps.init())
//       .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
//       // .pipe(sourcemaps.write())
//       .pipe(gulp.dest('./public/css'));
// });

// gulp.task('compile-coffee', function() {
//   var stream = browserifyInstance('./app/assets/javascripts/application.coffee',
//     { debug: true  /* enables source maps */ }
//   )
//   .transform('coffeeify')
//    .bundle();

//   stream.pipe(source('bundle.js'))
//         .pipe(gulp.dest('public/assets'));
// });

// var gulp = require('gulp');
// var sass = require('gulp-sass');
 
// var gulp = require('gulp');
// var concat = require('gulp-concat');
// var sass = require('gulp-sass');

// gulp.task('styles', function() {
//   return gulp.src('styles/**/*.scss')
//       .pipe(concat('style.css'))
//       .pipe(sass({
//         includePaths: [require('node-bourbon').includePaths]
//       }))
//       .pipe(gulp.dest('./public/css');
// });

// gulp.task('default',function(){
//     gulp.start('styles');
// });

// var gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     neat = require('node-neat').includePaths;

// var paths = {
//     scss: './assets/sass/*.scss'
// };

// gulp.task('styles', function () {
//     return gulp.src(paths.scss)
//         .pipe(sass({
//             includePaths: ['styles'].concat(neat)
//         }))
//         .pipe(gulp.dest('./public/css'));
// });

// gulp.task('default',function(){
//     gulp.start('styles');
// });