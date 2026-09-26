document.addEventListener('DOMContentLoaded', function () {
  new Splide('.Splide', {
    type   : 'loop',  // 画像をループさせる
    perPage: 1,       // 1度に1枚表示する
  }).mount();
});