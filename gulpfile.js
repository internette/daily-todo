var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var cp = require('child_process');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
* Build the Jekyll Site
*/
var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll, ['build', '--watch'], { stdio: 'inherit' })
      .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});
/**
 * Compile files from _scss into both css and _includes
 */
gulp.task('sass-main', function () {
    console.log('Compiling SCSS');
    return gulp.src('_scss/styles.scss')
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifycss())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('_includes'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('sass-mq', function () {
    return gulp.src('_scss/media_queries.scss')
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifycss())
        .pipe(rename('media_queries.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('_includes'))
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * Watch scss files for changes & recompile AND lint :)
 * Watch html/md files, run jekyll & reload BrowserSync
 * Minify images too
 */
gulp.task('watch', function () {
    gulp.watch('_scss/**/*.scss', ['sass-main', 'sass-mq']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html'], ['jekyll-rebuild']);
    gulp.watch(['images/*'], ['jekyll-build']);
    gulp.watch(['js/*.js'], ['jekyll-build']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);