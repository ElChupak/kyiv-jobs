const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

gulp.task("server", function () {
	browserSync({
		server: {
			baseDir: "dist",
		},
	});

	gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
	return gulp
		.src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(rename({ suffix: ".min", prefix: "" }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

gulp.task("watch", function () {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
	gulp.watch("src/*.html").on("change", gulp.parallel("html"));
	gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
	gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
	gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
	gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
	gulp.watch("src/policies/**/*").on("all", gulp.parallel("policy"));
	gulp.watch("src/*.php").on("all", gulp.parallel("php"));

});

gulp.task("html", function () {
	return gulp
		.src("src/**/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
	return gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

gulp.task("fonts", function () {
	return gulp
		.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"))
		.pipe(browserSync.stream());
});

gulp.task("icons", function () {
	return gulp
		.src("src/icons/**/*")
		.pipe(gulp.dest("dist/icons"))
		.pipe(browserSync.stream());
});

gulp.task("images", function () {
	return gulp
		.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"))
		.pipe(browserSync.stream());
});

gulp.task("policy", function () {
	return gulp
		.src("src/policies/**/*")
		.pipe(gulp.dest("dist/policies"))
		.pipe(browserSync.stream());
});

gulp.task("php", function () {
	return gulp
		.src("src/*.php")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist/"));
});



gulp.task(
	"default",
	gulp.parallel(
		"watch",
		"server",
		"styles",
		"scripts",
		"fonts",
		"icons",
		"html",
		"images",
		"policy",
		"php"
	)
);
