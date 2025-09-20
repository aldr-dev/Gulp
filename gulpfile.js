import gulp from "gulp";
import rename from "gulp-rename";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';

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

function optimizeImages() {
    return gulp
        .src("./images/**/*.{jpg,jpeg,png,gif,svg}", { encoding: false })
        .pipe(imagemin([
            gifsicle({interlaced: true}),
            mozjpeg({quality: 90, progressive: true}),
            optipng({optimizationLevel: 5}),
            svgo({
                plugins: [
                    {
                        name: 'removeViewBox',
                        active: true
                    },
                    {
                        name: 'cleanupIDs',
                        active: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest("./images"));
}



function watch() {
    gulp.watch("./scss/**/*.scss", buildCss);
    gulp.watch("./images/**/*.{jpg,jpeg,png,gif,svg}", optimizeImages);
}

gulp.task("default", gulp.series(watch));