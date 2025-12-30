document.addEventListener("DOMContentLoaded", function () {
  // 1. 要素の取得
  const hamburger = document.getElementById("js-hamburger");
  const drawer = document.querySelector(".p-drawer-nav");
  const header = document.querySelector(".l-header");
  const drawerLinks = drawer.querySelectorAll("a"); // ドロワー内の全リンク

  // 2. ハンバーガーボタンをクリックした時の処理
  hamburger.addEventListener("click", function () {
    // ボタンとドロワーに is-active クラスを付け外し（トグル）
    hamburger.classList.toggle("is-active");
    drawer.classList.toggle("is-active");
    header.classList.toggle("is-active");

    // アクセシビリティ対応（aria-expandedの更新）
    const isActive = hamburger.classList.contains("is-active");
    hamburger.setAttribute("aria-expanded", isActive);

    // オプション：背景固定（スクロール防止）
    document.body.classList.toggle("u-overflow-hidden");
  });

  // 3. ドロワー内のリンクをクリックした時の処理（メニューを閉じる）
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-active");
      drawer.classList.remove("is-active");
      header.classList.remove("is-active");
      hamburger.setAttribute("aria-expanded", "false");

      // オプション：背景固定解除
      document.body.classList.remove("u-overflow-hidden");
    });
  });
});

// WORKSセクションSwiper
const topWorksSwiper = new Swiper("#js-top-works-swiper", {
  loop: true,
  spaceBetween: 70,
  speed: 1000,

  // 自動再生の設定
  autoplay: {
    delay: 3000, // 3秒ごとにスライド
    disableOnInteraction: false, // 矢印操作などをしても自動再生を止めない！
  },

  // ナビゲーション矢印の設定
  navigation: {
    nextEl: "#js-top-works-next",
    prevEl: "#js-top-works-prev",
  },
});

/* script.js の最後に追加 */

document.addEventListener("DOMContentLoaded", function () {
  /* --------------------------------------------
     ページトップボタンの制御
  -------------------------------------------- */
  const pageTopBtn = document.querySelector("#js-page-top");

  // 色反転の基準となる要素（Contactセクション、無ければFooterを基準にする）
  const targetSection =
    document.querySelector("#contact") || document.querySelector("#footer");

  if (pageTopBtn) {
    // 1. クリック時の処理（スムーススクロール）
    pageTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // 2. スクロール時の処理（表示切り替え ＆ 色反転）
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // --- A. 表示・非表示（300pxスクロールしたら表示） ---
      if (scrollY > 300) {
        pageTopBtn.classList.add("is-active");
      } else {
        pageTopBtn.classList.remove("is-active");
      }

      // --- B. 色反転（赤いエリアに入ったらクラス付与） ---
      if (targetSection) {
        // ターゲット（赤いエリア）の上端の位置を取得
        const targetRect = targetSection.getBoundingClientRect();

        // 画面の下から少し上の位置（ボタンがあるあたり）を境界線にする
        // ここでは画面下から100pxの位置を基準に設定
        const triggerPoint = windowHeight - 100;

        if (targetRect.top < triggerPoint) {
          // 赤いエリアに入った（反転モード：白背景・赤矢印）
          pageTopBtn.classList.add("is-reverse");
        } else {
          // 赤いエリアより上にいる（通常モード：赤背景・白矢印）
          pageTopBtn.classList.remove("is-reverse");
        }
      }
    });
  }
});
