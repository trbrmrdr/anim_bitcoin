var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
const javascriptObfuscator = require('gulp-javascript-obfuscator');


// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");


gulp.task('scripts', function () {

    console.log(' task -> scripts')

 
//     return tsProject.src()
//         .pipe(ts(tsProject))
//         .js.pipe(gulp.dest('./public/dist/'));

    return gulp.src([
        //   './lib/*.js'// путь к папке со скриптами
        // "./public/lib/v6.0.0-rc.2/pixi.js",
        "./public/lib/main.js",
        // "./public/lib/pixi-spine/dist/pixi-spine.umd.js",
    ])

        // .pipe(babel({
        //     presets: ["@babel/preset-env"]
        // }))
        // .pipe(browserify())

        // .pipe(javascriptObfuscator())
        // .pipe(uglify())

        .pipe(concat('main.js')) // в какой файл объединить
        .pipe(gulp.dest('./public/dist/'))

    //.pipe(browserSync.reload())

    console.log("this")
});

gulp.task('js_watch', gulp.series('scripts', function (done) {
    console.log(' task -> js_watch')
    browserSync.reload();
    done()


}));

gulp.task('server', gulp.series('scripts', function (done) {

    console.log(' task -> server')

    browserSync.init({
        server: {
            baseDir: "./public/",
            index: "index.html"
        },
    });


    gulp.watch("./public/lib/*.js").on('change', gulp.series('js_watch'));
    gulp.watch("./public/*.js").on('change', gulp.series('js_watch'));
    gulp.watch("*.js").on('change', browserSync.reload);

    gulp.watch("./public/*.html").on('change', browserSync.reload);
    gulp.watch("./public/data/*.*").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('server'));


//###################################################################################################################
//###################################################################################################################


gulp.task('release_src', function () {


   



    return gulp.src([
        "./public/lib/main.js",
        // "./public/lib/v6.0.0-rc.2/pixi.js",
        // "./public/lib/main.js",
        // "./public/lib/pixi-spine/dist/pixi-spine.umd.js",
    ])

        .pipe(javascriptObfuscator())
        .pipe(uglify())

        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/dist/'))

});


const shell = require('gulp-shell');
gulp.task('release', gulp.series('release_src', function (done) {
    shell.task([
        'firebase deploy'
    ])()
    done()
})
)