
require('promise-hash')
//const joi  = require( 'joi')
const  { Sequelize } = require('../models')
const pageNumbers = require( '../services/page-numbers' );
const { getPageCssClass } = require( '../helpers/wp_page' );

const { mainmenu } = require( '../services/site' );

const Op = Sequelize.Op;



class HomeController {
    async index(ctx) {
        const query = ctx.query
        // Home 案例 动态 帮助 关于 Contact 创建

        // const mainmenu = [{url: '/', title:'首页'},{url: '/case', title:'案例'},
        //   {url: '/news', title:'动态'},{url: '/help', title:'帮助'},{url: '/about-us', title:'关于'}]
        const posts = [] //WpPost.findAll()
        const page = { menu_order: 1 }
        page.cssClass = getPageCssClass( page )
        //Get paginated list of notes
        try {
          let context = await Promise.hash({
            archiveBase: '',
            pages: mainmenu,
            page: page, // 当前页面信息, 决定当前页面类型，
            title: 'pageTitle',
            // Primary page content
            posts: posts, //wp.posts().page( pages.current ),
            //sidebar: contentService.getSidebarContent()
          })

          await ctx.render( 'index', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }


}



export default HomeController
