// アプリケーション全体で使用するページを定義する
export enum AppPages {
  home = 'home.ejs',
  headerFooter = 'header-footer.ejs',
  card = 'card.ejs',
  landing = 'landing.ejs',
  request = 'request.ejs',
  login = 'login.ejs',
  newregistraition = 'newregistraition.ejs',
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
