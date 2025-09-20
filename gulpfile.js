const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("gulp-autoprefixer").default;

function buildScssFromCss() {
    return gulp
        .src("./scss/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([cssnano()]))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ["last 2 versions", "> 1%", "ie 11"]
        }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./css/"));
}

exports.buildScssFromCss = buildScssFromCss;
