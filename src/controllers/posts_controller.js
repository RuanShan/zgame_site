require('promise-hash')
//const joi  = require( 'joi')
const {

  Sequelize,
  SharedPost,
  SharedTerm
} = require('../models')
const pageNumbers = require('../services/page-numbers');

const {
  getPageCssClass
} = require('../helpers/wp_page');
const { mainmenu } = require( '../services/site' );

const Op = Sequelize.Op;



class PostsController {
  async index(ctx) {
    const category = ctx.params.category

    let pages = pageNumbers(ctx.params.page);

    // news id = 9
    let categories = await SharedTerm.findAll({where:{ parent: 7}})
    let sidebar = { categories }

    // let termTaxonomies = WpTermTaxonomy.findAll({
    //   where: {
    //     parent: 9
    //   },
    //   includes: [{
    //     association: 'WpTerm'
    //   }, {
    //     association: 'WpPost'
    //   }]
    // })

    // 找到最近的12篇文章
    const termids = categories.map((term) => {
      return term.id
    })
    const posts = SharedPost.findAll({
      include: [{
        association: 'TermRelationships',
        where: {
          term_id: {
            [Op.in]: termids
          }
        }
      }]
    })
    const page = {
      menu_order: 2
    }
    page.cssClass = getPageCssClass(page)
    //Get paginated list of notes
    try {
      let context = await Promise.hash({
        archiveBase: '',
        pages: mainmenu,
        page: page, // 当前页面信息, 决定当前页面类型，
        title: 'pageTitle',
        // Primary page content
        posts: posts,
        sidebar
      })

      await ctx.render('posts', context)

    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA' + error)
    }
  }
  async show(ctx) {

  }

}


export default PostsController
