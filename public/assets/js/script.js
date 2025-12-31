document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
     1. ハンバーガーメニューとドロワーの制御
  ============================================ */
  const hamburger = document.getElementById("js-hamburger");
  const drawer = document.querySelector(".p-drawer-nav");
  const header = document.querySelector(".l-header");
  const drawerLinks = drawer ? drawer.querySelectorAll("a") : [];

  if (hamburger && drawer) {
    // ハンバーガーボタンをクリックした時の処理
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("is-active");
      drawer.classList.toggle("is-active");
      header.classList.toggle("is-active");

      // アクセシビリティ対応
      const isActive = hamburger.classList.contains("is-active");
      hamburger.setAttribute("aria-expanded", isActive);

      // 背景固定
      document.body.classList.toggle("u-overflow-hidden");
    });

    // ドロワー内のリンクをクリックした時の処理（メニューを閉じる）
    drawerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("is-active");
        drawer.classList.remove("is-active");
        header.classList.remove("is-active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("u-overflow-hidden");
      });
    });
  }

  /* ============================================
     2. Swiperの初期化（トップページ Works）
  ============================================ */
  const swiperElement = document.querySelector("#js-top-works-swiper");
  if (swiperElement) {
    new Swiper(swiperElement, {
      loop: true,
      spaceBetween: 70,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: "#js-top-works-next",
        prevEl: "#js-top-works-prev",
      },
    });
  }

  /* ============================================
     3. ページトップボタンの制御
  ============================================ */
  const pageTopBtn = document.querySelector("#js-page-top");
  // 色反転の基準となる要素（Contactセクション、無ければFooterを基準にする）
  const targetSection =
    document.querySelector("#contact") || document.querySelector("#footer");

  if (pageTopBtn) {
    // クリック時のスムーススクロール
    pageTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // スクロール時の表示切り替え ＆ 色反転
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // --- 表示・非表示（300pxスクロールしたら表示） ---
      if (scrollY > 300) {
        pageTopBtn.classList.add("is-active");
      } else {
        pageTopBtn.classList.remove("is-active");
      }

      // --- 色反転（赤いエリアに入ったらクラス付与） ---
      if (targetSection) {
        const targetRect = targetSection.getBoundingClientRect();
        const triggerPoint = windowHeight - 100; // 画面下から100pxの位置を判定ラインに

        if (targetRect.top < triggerPoint) {
          pageTopBtn.classList.add("is-reverse");
        } else {
          pageTopBtn.classList.remove("is-reverse");
        }
      }
    });
  }
});
