import gulp from "gulp";
import terser from "gulp-terser";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import Osass from "sass";
import gulpsass from "gulp-sass";
import browserSync from "browser-sync";
import cssbeautify from "gulp-cssbeautify"; 

const sass = gulpsass(Osass);

const browser_Sync = browserSync.create();

// Sass Task

gulp.task("Wsass", (done) => {
  gulp
    .src("app/scss/**/**/*.scss", { sourcemaps: true })
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(postcss([cssnano()]))
    //compressed or expanded
    .pipe(cssbeautify())
    .pipe(gulp.dest("css", { sourcemaps: "." }));
  done();
});
// JS task

gulp.task("js", (done) => {
  gulp
    .src("app/js/**/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(gulp.dest("dist/minJs", { sourcemaps: "." }));
  done();
});

// browsersync

gulp.task("syncBrowser", (done) => {
  browser_Sync.init({
    server: {
      baseDir: ".",
    },
  });
  done();
});

// Reload

gulp.task("reload", (done) => {
  browser_Sync.reload();
  done();
});

// watch

gulp.task("watch", (done) => {
  gulp.watch("*.html", gulp.series("reload"));
  gulp.watch("app/scss/**/*.scss", gulp.series("Wsass", "reload"));
  gulp.watch("app/js/**/*.js", gulp.series("js", "reload"));
  done();
});

gulp.task("default", gulp.series("Wsass", "js", "syncBrowser", "watch"));
