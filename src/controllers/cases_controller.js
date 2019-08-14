
require('promise-hash')
//const joi  = require( 'joi')
const  { SharedPost, SharedTerm, Sequelize } = require('../models')

const pageNumbers = require( '../services/page-numbers' );

const { getPageCssClass } = require( '../helpers/wp_page' );

const { mainmenu } = require( '../services/site' );

const Op = Sequelize.Op;



class CasesController {
    async index(ctx) {
        const query = ctx.query
        let pages = pageNumbers( ctx.params.page );
        // 案例分类 根分类id = 4
        let categories = await SharedTerm.findAll({where:{ parent: 4}})
        let sidebar = { categories }
        // const page = WpPost.scope(['isPage']).findOne( {where:{ menu_order:{ [Op.eq]: 1}}, order:[ 'menu_order']})
        const posts = SharedPost.findAll()
        const page = { menu_order: 2 }
        page.cssClass = getPageCssClass( page )
        //Get paginated list of notes
        try {
          let context = await Promise.hash({
            page: page, // 当前页面信息, 决定当前页面类型，
            archiveBase: '',
            pages: mainmenu,
            title: 'pageTitle',
            // Primary page content
            posts: posts,
            sidebar
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
