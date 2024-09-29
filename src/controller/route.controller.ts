import 'reflect-metadata'
import { Controller, Get, Render } from 'routing-controllers'
import { AppPages, HomeRenderData ,HeaderFooterRenderData} from '../type/route'


@Controller()
export class RouteController {
  @Get('/')
  @Render(AppPages.home)
  home(): HomeRenderData {
    return {
      title: 'Home',
      body: 'Welcome to the home page',
    }
  }@Get('/header-footer')
  @Render(AppPages.headerFooter)
  headerFooter(): HeaderFooterRenderData {
    return {
      title: '',
      body: '',
    };
  }
}
