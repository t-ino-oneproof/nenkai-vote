// Mii風アバター生成(SVG)。パーツの組み合わせで描く。被り(同じ見た目)は許容。
// 使い方: AVATAR.randomLook(seed) で見た目データ、AVATAR.svg(look) で SVG 文字列
const AVATAR = (() => {
  const SKIN = ['#ffe3c8', '#f7cda6', '#e5b088', '#c88a5e', '#9c6240', '#6e4028'];
  const HAIR_COLOR = ['#2b2118', '#4a2f1b', '#7a4a24', '#b07a3c', '#d9b25a', '#4b5560', '#bfc4c9', '#b23a3a', '#3f6fd6', '#d06bb0'];
  const SHIRT = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#e84393', '#34495e', '#7f8c8d', '#ff7f50', '#00b894', '#ffffff', '#222222'];

  // 髪型: back は頭の後ろ、front は頭の前に描く。HC は髪色に置換される
  const HAIR = [
    // 頭は cx50 cy52 rx30 ry34(頭頂 y=18)。外側の曲線は制御点 y≈0 で頭頂より上に出す
    { name: 'なし', back: '', front: '' },
    { name: 'ショート', back: '', front: '<path d="M19,50 C19,0 81,0 81,50 C78,34 66,28 50,28 C34,28 22,34 19,50 Z" fill="HC"/>' },
    { name: 'ロング', back: '<path d="M17,46 C17,-2 83,-2 83,46 L86,106 L14,106 Z" fill="HC"/>', front: '<path d="M19,50 C19,0 81,0 81,50 C76,36 64,32 50,32 C36,32 24,36 19,50 Z" fill="HC"/>' },
    { name: 'ボブ', back: '<path d="M17,46 C17,-2 83,-2 83,46 L83,82 C83,88 77,90 71,88 L29,88 C23,90 17,88 17,82 Z" fill="HC"/>', front: '<path d="M19,52 C19,0 81,0 81,52 L79,42 C72,30 60,28 50,28 C40,28 28,30 21,42 Z" fill="HC"/>' },
    { name: 'ツンツン', back: '', front: '<path d="M19,50 L15,30 L27,34 L29,10 L41,24 L50,2 L59,24 L71,10 L73,34 L85,30 L81,50 C72,34 28,34 19,50 Z" fill="HC"/>' },
    { name: '横分け', back: '', front: '<path d="M19,52 C19,0 81,0 81,52 C79,34 70,26 60,24 L55,40 C46,30 32,32 19,52 Z" fill="HC"/>' },
    { name: 'おだんご', back: '', front: '<circle cx="50" cy="10" r="11" fill="HC"/><path d="M19,50 C19,0 81,0 81,50 C78,34 66,28 50,28 C34,28 22,34 19,50 Z" fill="HC"/>' },
    { name: 'アフロ', back: '<circle cx="50" cy="42" r="44" fill="HC"/>', front: '' },
    { name: 'センター分け', back: '', front: '<path d="M19,52 C19,0 81,0 81,52 L77,42 C69,30 58,28 52,32 L50,42 L48,32 C42,28 31,30 23,42 Z" fill="HC"/>' },
    { name: 'ポニーテール', back: '<path d="M76,42 C98,48 94,82 86,100 L76,100 C86,82 84,60 72,50 Z" fill="HC"/>', front: '<path d="M19,50 C19,0 81,0 81,50 C78,34 66,28 50,28 C34,28 22,34 19,50 Z" fill="HC"/>' },
    { name: 'ツインテール', back: '<path d="M22,44 C2,50 6,86 14,102 L24,102 C16,84 18,60 28,50 Z M78,44 C98,50 94,86 86,102 L76,102 C84,84 82,60 72,50 Z" fill="HC"/>', front: '<path d="M19,52 C19,0 81,0 81,52 L79,42 C72,30 60,28 50,28 C40,28 28,30 21,42 Z" fill="HC"/>' },
    { name: '坊主', back: '', front: '<path d="M20,48 C20,4 80,4 80,48 C76,30 64,26 50,26 C36,26 24,30 20,48 Z" fill="HC" opacity=".45"/>' },
  ];

  function eye(E, style) {
    switch (style) {
      case 0: return `<circle cx="${E}" cy="52" r="3.5" fill="#222"/>`;
      case 1: return `<ellipse cx="${E}" cy="52" rx="3" ry="5" fill="#222"/>`;
      case 2: return `<path d="M${E - 5},54 q5,-7 10,0" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      case 3: return `<path d="M${E - 5},52 h10" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`;
      case 4: return `<ellipse cx="${E}" cy="52" rx="5" ry="6" fill="#fff" stroke="#222" stroke-width="1.5"/><circle cx="${E}" cy="53" r="2.8" fill="#222"/>`;
      case 5: return `<ellipse cx="${E}" cy="52" rx="4" ry="5" fill="#222"/><circle cx="${E + 1.5}" cy="50" r="1.5" fill="#fff"/>`;
    }
    return '';
  }
  const EYE_COUNT = 6;

  function brow(E, dir, style) {
    // dir: -1 左目, +1 右目(内側が高い/低いを左右対称にする)
    const a = E - 5, b = E + 5;
    const inner = dir < 0 ? b : a, outer = dir < 0 ? a : b;
    switch (style) {
      case 0: return `<path d="M${a},43 h10" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`;
      case 1: return `<path d="M${outer},42 L${inner},45" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`; // 困り
      case 2: return `<path d="M${outer},45 L${inner},42" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`; // キリッ
      case 3: return `<path d="M${a},45 q5,-5 10,0" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      case 4: return `<path d="M${a},43 h10" stroke="#222" stroke-width="4.5" stroke-linecap="round"/>`; // 太眉
    }
    return '';
  }
  const BROW_COUNT = 5;

  const NOSE = [
    '<path d="M50,56 q3,4 0,8" stroke="#222" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/>',
    '<path d="M46,62 q4,3 8,0" stroke="#222" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/>',
    '<circle cx="50" cy="61" r="2" fill="#222" opacity=".4"/>',
    '',
  ];
  const MOUTH = [
    '<path d="M42,68 q8,8 16,0" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    '<path d="M41,67 q9,13 18,0 z" fill="#b03a3a" stroke="#222" stroke-width="1.5"/>',
    '<path d="M43,70 h14" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>',
    '<path d="M40,66 q10,14 20,0 z" fill="#fff" stroke="#222" stroke-width="1.8"/>',
    '<ellipse cx="50" cy="70" rx="3" ry="4" fill="#b03a3a"/>',
    '<path d="M42,68 q4,5 8,0 q4,5 8,0" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    '<path d="M42,72 q8,-7 16,0" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
  ];
  const GLASSES = [
    '',
    '<g stroke="#222" stroke-width="2" fill="none"><circle cx="38" cy="52" r="8"/><circle cx="62" cy="52" r="8"/><path d="M46,52 h8"/></g>',
    '<g stroke="#222" stroke-width="2" fill="none"><rect x="30" y="45" width="16" height="13" rx="2"/><rect x="54" y="45" width="16" height="13" rx="2"/><path d="M46,51 h8"/></g>',
    '<g stroke="#222" stroke-width="2" fill="rgba(40,40,60,.5)"><rect x="29" y="45" width="18" height="12" rx="4"/><rect x="53" y="45" width="18" height="12" rx="4"/><path d="M47,50 h6"/></g>',
  ];
  const EXTRA = [
    '',
    '<path d="M38,78 q12,10 24,0 v4 q-12,8 -24,0 z" fill="HC"/>', // あごひげ
    '<path d="M42,63 q8,-5 16,0 q-8,2 -16,0 z" fill="HC"/>', // 口ひげ
    '<circle cx="30" cy="62" r="4" fill="#ff8aa0" opacity=".55"/><circle cx="70" cy="62" r="4" fill="#ff8aa0" opacity=".55"/>', // ほっぺ
  ];

  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  const pick = (r, n) => Math.floor(r() * n);

  function randomLook(seed) {
    const r = rng(seed == null ? Math.floor(Math.random() * 1e9) : seed);
    return {
      skin: pick(r, SKIN.length),
      hair: pick(r, HAIR.length),
      hairColor: pick(r, HAIR_COLOR.length),
      eyes: pick(r, EYE_COUNT),
      brows: pick(r, BROW_COUNT),
      nose: pick(r, NOSE.length),
      mouth: pick(r, MOUTH.length),
      glasses: r() < 0.3 ? 1 + pick(r, GLASSES.length - 1) : 0,
      extra: r() < 0.35 ? 1 + pick(r, EXTRA.length - 1) : 0,
      shirt: pick(r, SHIRT.length),
    };
  }

  function svg(look, attrs) {
    const skin = SKIN[look.skin], hc = HAIR_COLOR[look.hairColor], shirt = SHIRT[look.shirt];
    const hair = HAIR[look.hair];
    const col = s => s.replace(/HC/g, hc);
    return `<svg viewBox="0 0 100 120" ${attrs || ''}>` +
      col(hair.back) +
      `<rect x="43" y="76" width="14" height="18" fill="${skin}"/>` +
      `<path d="M12,120 L12,106 C12,92 30,88 42,88 L58,88 C70,88 88,92 88,106 L88,120 Z" fill="${shirt}" stroke="rgba(0,0,0,.15)" stroke-width="1"/>` +
      `<ellipse cx="20" cy="56" rx="6" ry="7" fill="${skin}"/><ellipse cx="80" cy="56" rx="6" ry="7" fill="${skin}"/>` +
      `<ellipse cx="50" cy="52" rx="30" ry="34" fill="${skin}"/>` +
      brow(38, -1, look.brows) + brow(62, 1, look.brows) +
      eye(38, look.eyes) + eye(62, look.eyes) +
      NOSE[look.nose] + MOUTH[look.mouth] +
      col(EXTRA[look.extra]) +
      col(hair.front) +
      GLASSES[look.glasses] +
      `</svg>`;
  }

  return { randomLook, svg, SKIN, HAIR_COLOR, SHIRT, HAIR, EYE_COUNT, BROW_COUNT, NOSE_COUNT: NOSE.length, MOUTH_COUNT: MOUTH.length, GLASSES_COUNT: GLASSES.length, EXTRA_COUNT: EXTRA.length };
})();
