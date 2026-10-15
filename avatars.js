// =====================================================================
//  アバター100パターン(スマホの登録画面で選ぶ)。司会者側とスマホ側の両方が読む
//  先頭の「ネタ枠」は手で作ったもの。社員に似せたい場合はここを編集する
//
//  look の項目(番号は avatar.js の配列の添字):
//    skin      肌色 0〜5(0 が明るい、5 が濃い)
//    hair      髪型 0なし 1ショート 2ロング 3ボブ 4ツンツン 5横分け 6おだんご 7アフロ 8センター分け 9ポニーテール 10ツインテール 11坊主
//    hairColor 髪色 0黒 1こげ茶 2茶 3明るい茶 4金 5グレー 6白 7赤 8青 9ピンク
//    eyes      目 0〜5   brows 眉 0ふつう 1困り 2キリッ 3アーチ 4太眉
//    nose      鼻 0〜3   mouth 口 0笑顔 1大笑い 2真一文字 3歯 4おちょぼ 5波 6への字
//    glasses   0なし 1丸めがね 2四角めがね 3サングラス
//    extra     0なし 1あごひげ 2口ひげ 3ほっぺ
//    shirt     服の色 0〜13(12 白、13 黒)
// =====================================================================
const AVATAR_PRESETS = [
  // ---- ネタ枠(編集してください。名前は登録画面には出ない。管理用) ----
  { name: "ツルツル",       look: { skin: 1, hair: 0,  hairColor: 0, eyes: 0, brows: 0, nose: 0, mouth: 0, glasses: 0, extra: 0, shirt: 8 } },
  { name: "ツルツル(ひげ)", look: { skin: 2, hair: 0,  hairColor: 0, eyes: 3, brows: 4, nose: 1, mouth: 2, glasses: 0, extra: 1, shirt: 13 } },
  { name: "金髪ヤンキー",   look: { skin: 1, hair: 4,  hairColor: 4, eyes: 3, brows: 2, nose: 0, mouth: 6, glasses: 3, extra: 0, shirt: 13 } },
  { name: "金髪ロング",     look: { skin: 0, hair: 2,  hairColor: 4, eyes: 4, brows: 3, nose: 3, mouth: 0, glasses: 0, extra: 3, shirt: 7 } },
  { name: "坊主",           look: { skin: 2, hair: 11, hairColor: 0, eyes: 0, brows: 4, nose: 0, mouth: 3, glasses: 0, extra: 0, shirt: 12 } },
  { name: "アフロ",         look: { skin: 3, hair: 7,  hairColor: 0, eyes: 5, brows: 0, nose: 2, mouth: 1, glasses: 1, extra: 0, shirt: 2 } },
  { name: "白髪の重鎮",     look: { skin: 1, hair: 5,  hairColor: 6, eyes: 2, brows: 0, nose: 0, mouth: 2, glasses: 2, extra: 2, shirt: 8 } },
  { name: "サングラス",     look: { skin: 2, hair: 1,  hairColor: 0, eyes: 0, brows: 2, nose: 3, mouth: 2, glasses: 3, extra: 1, shirt: 13 } },
  { name: "ピンク髪",       look: { skin: 0, hair: 10, hairColor: 9, eyes: 5, brows: 3, nose: 3, mouth: 0, glasses: 0, extra: 3, shirt: 7 } },
  { name: "青髪おだんご",   look: { skin: 1, hair: 6,  hairColor: 8, eyes: 4, brows: 0, nose: 3, mouth: 5, glasses: 1, extra: 0, shirt: 5 } },
  { name: "困り顔",         look: { skin: 1, hair: 8,  hairColor: 1, eyes: 1, brows: 1, nose: 0, mouth: 6, glasses: 0, extra: 0, shirt: 9 } },
  { name: "ほっぺ笑顔",     look: { skin: 0, hair: 3,  hairColor: 2, eyes: 2, brows: 3, nose: 3, mouth: 1, glasses: 0, extra: 3, shirt: 10 } },
];

// ---- 残りは固定の乱数で生成(毎回同じ顔。seed を変えると別の顔になる) ----
(function () {
  var TOTAL = 100, seed = 20261228;
  while (AVATAR_PRESETS.length < TOTAL) {
    AVATAR_PRESETS.push({ name: "#" + (AVATAR_PRESETS.length + 1), look: AVATAR.randomLook(seed + AVATAR_PRESETS.length * 7919) });
  }
})();
