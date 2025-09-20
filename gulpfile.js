const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("gulp-autoprefixer").default;
const sourcemaps = require("gulp-sourcemaps");

function buildCss() {
    return gulp
        .src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([cssnano()]))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ["last 2 versions", "> 1%", "ie 11"]
        }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./css/"));
}

function print(cb) {
    console.log('print gulp');
    cb();
}

function watchSass() {
    gulp.watch("./scss/**/*.scss", buildCss);
}

gulp.task("default", gulp.series(print, watchSass));
