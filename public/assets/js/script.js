document.addEventListener("DOMContentLoaded", function () {
  // 1. 要素の取得
  const hamburger = document.getElementById("js-hamburger");
  const drawer = document.querySelector(".p-drawer-nav");
  const drawerLinks = drawer.querySelectorAll("a"); // ドロワー内の全リンク

  // 2. ハンバーガーボタンをクリックした時の処理
  hamburger.addEventListener("click", function () {
    // ボタンとドロワーに is-active クラスを付け外し（トグル）
    hamburger.classList.toggle("is-active");
    drawer.classList.toggle("is-active");

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
      hamburger.setAttribute("aria-expanded", "false");

      // オプション：背景固定解除
      document.body.classList.remove("u-overflow-hidden");
    });
  });
});
