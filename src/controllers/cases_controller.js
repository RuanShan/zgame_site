
require('promise-hash')
//const joi  = require( 'joi')
const  { WpPost, Sequelize } = require('../models')
const wp = require( '../services/wp' );
const contentService = require( '../services/content-service' );
const pageNumbers = require( '../services/page-numbers' );
const pageTitle = require( '../services/page-title' );
const { getPageCssClass } = require( '../helpers/wp_page' );

const Op = Sequelize.Op;



class CasesController {
    async index(ctx) {
        const query = ctx.query
        let pages = pageNumbers( ctx.params.page );

        const mainmenu = WpPost.scope(['isPage']).findAll( {where:{ menu_order:{ [Op.gt]: 0}}, order:[ 'menu_order']})
        // const page = WpPost.scope(['isPage']).findOne( {where:{ menu_order:{ [Op.eq]: 1}}, order:[ 'menu_order']})
        const page = { menu_order: 2 }
        page.cssClass = getPageCssClass( page )
        //Get paginated list of notes
        try {
          let context = await Promise.hash({
            page: page, // 当前页面信息, 决定当前页面类型，
            archiveBase: '',
            pages: mainmenu,
            title: pageTitle(),
            // Primary page content
            posts: wp.posts().page( pages.current ),
            sidebar: contentService.getSidebarContent()
          })

          await ctx.render( 'posts', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }
    async show(ctx) {

    }

}


export default CasesController
