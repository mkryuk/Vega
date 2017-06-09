'use strict';
const gulp = require('gulp');
const gulp_tslint = require('gulp-tslint');

gulp.task('tslint', () => {
  gulp.src(['ClientApp/**/*.ts'])
    .pipe(gulp_tslint({
      formatter: "prose"
    }))
    .pipe(gulp_tslint.report({
      emitError: false
    }));
});
