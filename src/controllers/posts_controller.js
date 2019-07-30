require('promise-hash')
//const joi  = require( 'joi')
const {
  WpPost,
  WpTerm,
  WpTermTaxonomy,
  Sequelize
} = require('../models')
const wp = require('../services/wp');
const contentService = require('../services/content-service');
const pageNumbers = require('../services/page-numbers');
const pageTitle = require('../services/page-title');
const {
  getPageCssClass
} = require('../helpers/wp_page');

const Op = Sequelize.Op;



class PostsController {
  async index(ctx) {
    const category = ctx.params.category

    let pages = pageNumbers(ctx.params.page);
    const mainmenu = WpPost.scope(['isPage']).findAll({
      where: {
        menu_order: {
          [Op.gt]: 0
        }
      },
      order: ['menu_order']
    })
    // news id = 9
    const terms = await WpTerm.findAll({
      include: [{
        association: 'WpTermTaxonomy',
        where: {
          parent: 9
        }
      }]
    })

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
    const termTaxonomyIds = []
    terms.map((term) => {
      return term.getWpTermTaxonomy().term_taxonomy_id
    })
    const posts = WpPost.findAll({
      include: [{
        association: 'WpTermTaxonomies',
        where: {
          term_taxonomy_id: {
            [Op.in]: termTaxonomyIds
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
        terms: terms, // 新闻分类
        title: pageTitle(),
        // Primary page content
        posts: posts,
        sidebar: contentService.getSidebarContent()
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
