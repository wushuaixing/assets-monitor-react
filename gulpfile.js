const { series, task } = require('gulp');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');

task('watchFun', browserSync.reload);
task('browserSyncFun', () => {
	browserSync.init({
		server: {
			baseDir: './template/result',
		},
	});

	watch('./template/src/*.css', series('watchFun'));
	watch('./template/result/*.js', series(['watchFun']));
	watch('src/index.html', series(['watchFun']));
});

exports.default = series('browserSyncFun');
