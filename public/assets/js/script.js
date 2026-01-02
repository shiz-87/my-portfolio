document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
    ハンバーガーメニューとドロワーの制御
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
    Swiperの初期化（トップページ Works）
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
    ページトップボタンの制御
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

  /* ============================================
    スクロールアニメーション（要素のフェードイン）
  ============================================ */
  // 監視対象の要素を取得（.u-fade-upがついた要素すべて）
  const fadeElements = document.querySelectorAll(".u-fade-up");

  // IntersectionObserverのオプション設定
  const fadeOptions = {
    root: null, // ビューポートを基準
    rootMargin: "0px 0px -20% 0px", // 画面の下から20%の位置に来たら発火
    threshold: 0, // 要素が少しでも見えたら反応
  };

  // 監視機能の定義
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // 画面内に入った場合
      if (entry.isIntersecting) {
        entry.target.classList.add("is-show"); // クラスを付与してCSSアニメーション開始
        observer.unobserve(entry.target); // 一度表示したら監視をやめる（パフォーマンス負荷軽減）
      }
    });
  }, fadeOptions);

  // ループさせて監視を開始
  if (fadeElements.length > 0) {
    fadeElements.forEach((el) => {
      fadeObserver.observe(el);
    });
  }
});
