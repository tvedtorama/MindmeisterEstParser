var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var mocha = require('gulp-mocha');
var gulpBabel = require('gulp-babel');
var ts = require('gulp-typescript');
var tsify = require('tsify')

function runTests() {
    return gulp.src('build/tests/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));	
}

gulp.task('runTests', () => {
	return runTests();
});


	function compileBrowserify(file, folder, watch, typescript) {
		var bundlerRaw = browserify(file, { debug: true, cache: {}, packageCache: {}}) // cache and packageCache is required for watchify to perform, debug produces sourcemaps.
		var bundler = watch ? watchify(bundlerRaw) : bundlerRaw

		bundler = typescript ? bundler.plugin(tsify, { noImplicitAny: false,  jsx: 'react', moduleResolution: 'node', target: 'ES6'}) : bundler
		bundler.transform(babelify.configure({
	        presets: ['react', 'es2015', 'stage-0'],
	    	}))
			
		var rebundle = function() {
			return bundler
				.bundle()
				.on('error', function(err) { console.error(err.toString()); this.emit('end'); })
				.on('end', function() { console.log('Done browserifying'); })
				.pipe(source("app/main.js"))
				.pipe(buffer())
				.pipe(sourcemaps.init({ loadMaps: true }))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(folder));
		}
		bundler.on('update', rebundle)
		return rebundle()
	}

function compile(fileSpec, folder) {
	return gulp
		.src(fileSpec)
		.on('end', function() { console.log('Done compiling'); })
		.pipe(sourcemaps.init())
		.pipe(gulpBabel({presets: ['react', 'es2015', 'stage-0']}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

function compileTypescript(fileSpec, folder, singleFile) {
	var options = {jsx: 'react', moduleResolution: 'node', target: 'ES6', module: 'CommonJS'}
	if (singleFile)
		options.out = singleFile
	return gulp
		.src(fileSpec)
		.on('end', function() { console.log('Done compiling typescript, or actually just started'); })
		.pipe(sourcemaps.init())
		.pipe(ts(options))
 		.pipe(gulpBabel({presets: ['react', 'es2015', 'stage-0']})) // This blows up the module import
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(folder));
}

function compileRuntime(watch) {
  return compileBrowserify("./app/main.tsx", 'build/web', watch, true);
}

var serverPath = './server/**/*.ts'
var testsPath = './tests/**/*.js'
var testsTsPath = './tests/**/*.ts'
var appPath = './app/**/*.js'
var appTsPath = './app/**/*.ts*'


function compileServer() {
	return compileTypescript(serverPath, './build/server') 
}

function compileTsAppForTests() {
	return compileTypescript(appTsPath, './build/app') // Note: typescript requires the modules to be in the same relative directory.
}

function compileTests() {
	return compile(testsPath, './build/tests')
}

function compileTestsTs() {
	return compileTypescript(testsTsPath, './build/tests')
}

function sassIt(path) {
  console.log('sassing...')
  return gulp.src(path).
    pipe(sass().on('error', sass.logError)).
    pipe(gulp.dest('./build/web/css/'));
}

gulp.task('buildServer', function() { return compileServer(); });
gulp.task('buildAppForTests', function() {return compileTsAppForTests(); })
gulp.task('buildTestsCore', function() { return compileTests(); })
gulp.task('buildTests', ['buildAppForTests', 'buildTestsCore']);
gulp.task('buildRuntime', function() { return compileRuntime(); });
gulp.task('watchServer', function() { return gulp.watch(serverPath, function() {compileServer()}) });
gulp.task('watchTestsCore', function() { return gulp.watch(testsPath, function() {compileTests()}) });
gulp.task('watchTestsTsCore', function() { return gulp.watch(testsTsPath, function() {compileTestsTs()}) });
gulp.task('watchTests', ['watchServer', 'watchTestsCore', 'watchTestsTsCore', 'watchAppForTests', 'watchTsAppForTests']);
gulp.task('watchAppForTests', function() { return gulp.watch(appTsPath, function() {compileTsAppForTests()}) });
// Note: This runs tests on changed outputs, but exits on problems.  Run watchTests and npm test instead.
gulp.task('watchRunTests', function() { return gulp.watch('./build/**/*.js', function() {runTests()})});
gulp.task('watchRuntime', function() { return compileRuntime(true); });

var sassPath = 'sass/**/*.scss'

gulp.task('styles', function() {  
	return sassIt(sassPath)
	gulp.watch(sassPath, function () {
	 sassIt(sassPath)
	});
});

gulp.task('watchStyles', function() {  
	gulp.watch(sassPath, function () {
		sassIt(sassPath)
	});
});

gulp.task('build', ['buildRuntime', 'buildServer', 'buildTests', 'styles'])
gulp.task('watch', ['styles', 'watchStyles', 'buildServer', 'watchServer', 'watchTests', 'watchRuntime']);
gulp.task('ci', ['build'])

gulp.task('default', ['watch', 'styles']);
