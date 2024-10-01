// アプリケーション全体で使用するページを定義する
export enum AppPages {
  landing = 'landing.ejs',
  request = 'request.ejs',
}

// 全てのページで渡すデータを定義する
export interface RenderData {
  title: string
}

// ホームページで渡すデータを定義する
export interface HomeRenderData extends RenderData {
  body: string
}

export interface requestRenderData extends RenderData {
  body: string
}
