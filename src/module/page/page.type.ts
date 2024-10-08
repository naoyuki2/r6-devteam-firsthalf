import { SignUp } from '../user/user.type'
import { CustomError } from '../../error/CustomError'
import { Request } from '../request/request.entity'

// アプリケーション全体で使用するページを定義する
export enum AppPages {
  landing = 'landing.ejs',
  home = 'home.ejs',
  lp = 'lp.ejs',
  request = 'request.ejs',
  detail = 'detail.ejs',
  login = 'login.ejs',
  signup = 'signup.ejs',
  success = 'success.ejs',
}

// 全てのページで渡すデータを定義する
export interface RenderData {
  title: string
}

// ホームページで渡すデータを定義する
export interface HomeRenderData extends RenderData {
  title: string
  data: any
}

export interface SignUpRenderData extends RenderData {
  data: SignUp.res | null
  error: CustomError | null
}

export interface HeaderFooterRenderData extends RenderData {
  body: string
}

export interface DetailRenderData extends RenderData {
  data: Request
}
