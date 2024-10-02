// アプリケーション全体で使用するページを定義する
export enum AppPages {
  landing = 'landing.ejs',
  home = 'home.ejs',
  request = 'request.ejs',
  detail = 'detail.ejs',
  login = 'login.ejs',
  signup = 'signup.ejs',
}

// 全てのページで渡すデータを定義する
export interface RenderData {
  title: string
}

// ホームページで渡すデータを定義する
export interface HomeRenderData extends RenderData {
  body: string
}

export interface HeaderFooterRenderData extends RenderData {
  body: string
}
