// 必要なプラグイン（道具）を読み込む
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Sassコンパイラ
const postcss = require('gulp-postcss'); // CSS加工ツール
const autoprefixer = require('autoprefixer'); // ベンダープレフィックス付与
const cssSorter = require("css-declaration-sorter"); // CSSの並び順整理
const mmq = require("gulp-merge-media-queries"); // メディアクエリのおまとめ
const browserSync = require("browser-sync").create(); // ブラウザ自動リロード

// 1. Sassコンパイル設定（SassをCSSに翻訳する作業）
function compileSass() {
  return gulp.src("./src/assets/sass/**/*.scss") // 1. scssファイルを取得
    .pipe(sass()) // 2. SassをCSSに変換
    .pipe(postcss([autoprefixer(), cssSorter()])) // 3. ベンダープレフィックス付与＆並び替え
    .pipe(mmq()) // 4. メディアクエリをまとめる
    .pipe(gulp.dest("./public/assets/css/")) // 5. 指定の場所に保存
    .pipe(browserSync.stream()); // 6. ブラウザに反映
}

// 2. 監視設定（ファイル変更を見張る作業）
function watch() {
  // ブラウザを立ち上げる
  browserSync.init({
    server: {
      baseDir: "./public" // このフォルダをルートとして表示
    }
  });

  // ファイルが変わったら、それぞれの処理を実行
  gulp.watch("./src/assets/sass/**/*.scss", compileSass); // Sassが変わったらコンパイル
  gulp.watch("./public/**/*.html").on("change", browserSync.reload); // HTMLが変わったらリロード
}

// コマンド実行設定（'npx gulp' で動く処理）
exports.default = gulp.series(compileSass, watch);