/**
 * gulpfile
 * Created by dcorns on 9/15/15
 * Copyright © 2015 Dale Corns
 */
'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var karma = require('gulp-karma');
var sass = require('gulp-sass');
var del = require('del');
var livereload = ('gulp-livereload');

gulp.task('webpack', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(webpack({
      output:{
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpackTests', function(){
  return gulp.src('test/**/*_test.js')
    .pipe(webpack({
      output: {
        filename: 'testmain.js'
      }
    }))
    .pipe(gulp.dest('test'));
});

gulp.task('angularTests', ['webpackTests'], function(){
  return gulp.src(['test/testmain.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
  //.on('error', function(err){
  //  throw err;
  //});
});

gulp.task('watch', function(){
  gulp.watch('app/**/*.js', ['webpack']);
  gulp.watch('scss/**/*.scss', ['buildDev']);
  gulp.watch('app/index.html', ['copyBuild']);
  gulp.watch('app/views/**/*.html', ['copyBuild']);
});

gulp.task('sass', function(){
  gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

gulp.task('angularTest', ['webpackTests'], function(){
  return gulp.src(['test/testmain.js'])
    .pipe(karma({
      configfile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('cleanBuild', function(){
  del([
    'build/**/*'
  ])
});

gulp.task('copyBuild', function(){
  //return gulp.src(['app/index.html', 'app/img']).pipe(gulp.dest('./build'));
  return function(){
    gulp.src(['app/index.html', 'app/img']).pipe(gulp.dest('./build'));
    gulp.src(['app/img/**/*']).pipe(gulp.dest('./build/img'));
    gulp.src(['app/views/**/*']).pipe(gulp.dest('./build/views'));
  }();
});

gulp.task('default', ['watch']);
gulp.task('unitTests', ['webpackTests', 'angularTests']);
gulp.task('buildDev', ['cleanBuild', 'copyBuild', 'webpack', 'sass']);