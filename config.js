// =====================================================================
//  接続設定(司会者側 quiz.html とスマホ側 vote.html の両方が読む)
//  Supabase のプロジェクトを作ったら URL と anon キーをここに入れる
//  ※ このファイルはスマホ側にも配るので、ここには公開してよい値だけを書く
// =====================================================================
const NET = {
  // Supabase の Project URL(例: https://abcdefghijklmnop.supabase.co)
  supabaseUrl: "https://hfdfnklsdvushrkoyvnq.supabase.co",
  // Supabase の anon(public)キー。新形式の publishable キー(sb_publishable_...)でも、旧形式(Legacy の anon, eyJ...)でもよい
  anonKey: "sb_publishable_8JV8wQzUzBgP9G5t_eBm7A_CNWe8096",
  // 設定のバージョン。司会者側とスマホ側で一致しないとスマホに警告が出る
  configVersion: "2",
  // スマホ用ページを公開した URL(QR コードはこの URL で作られる)
  votePageUrl: "https://t-ino-oneproof.github.io/nenkai-vote/vote.html",
  // 名前の文字数上限
  nameMax: 8,
  // スマホが状態を読みに行く間隔(ミリ秒)
  pollMs: 1000,
};
