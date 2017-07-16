import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpwebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log,colors} from 'gulp-util';
import args from './util/args';

gulp.task('scripts',()=>{
    return gulp.src(['app/js/index.js']).pipe(plumber({
        errorHandler:function () {

        }
    })).pipe(named()).pipe(gulpwebpack({
        module:{
            loaders:[
                {
                    test:/\.js$/,
                    loader:'babel'
                }
            ]
        }
    }),null,(error,status)=>{
        log(`Finished '${colors.cyan('scripts')}'`,status.toString({
            chunks:false
        }))
    }).pipe(gulp.dest('server/public/js')).pipe(rename({
        basename:'cp',
        extname:'.min.js'
    }))
})
