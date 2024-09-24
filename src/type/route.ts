// アプリケーション全体で使用するページを定義する
export enum AppPages {
  home = 'home.ejs',
  card = 'card.ejs',
}

// 全てのページで渡すデータを定義する
export interface RenderData {
  title: string
}

// ホームページで渡すデータを定義する
export interface HomeRenderData extends RenderData {
  body: string
}
