require('promise-hash')
//const joi  = require( 'joi')
const {

  Sequelize,
  SharedPost,
  SharedTerm
} = require('../models')
const getPagination = require('../helpers/pagination');

const { mainmenu } = require( '../services/site' );

const Op = Sequelize.Op;
const currentPage = { type: 'news', hasSidebar: true }
const termRootId = 7



class PostsController {
  async index(ctx) {
    let termId = ctx.params.termId

    let paging = getPagination( ctx.query.page );

    let options = { include:[{association:'Covers'}], where: {}, limit: paging.paginate, offset: paging.offset }
    let currentTerm = null

    if( termId){
      options.include.push({ association: 'Terms', where:{ id:termId}})
      currentTerm = SharedTerm.findByPk(termId)
    }else{
      options.include.push({ association: 'Terms'})
      currentTerm = SharedTerm.findByPk(termRootId)
    }


    // news id = 9
    let sidebar = getSidebarContext()

    // 找到最近的12篇文章
    // const termids = categories.map((term) => {
    //   return term.id
    // })

    const { rows, count } = await SharedPost.findAndCount(options)
    let pages = Math.ceil( count/paging.paginate )
    console.debug( " pages, total termId", pages, count, termId)
    const posts = rows
    const pagination = { page: paging.page, pageCount: pages }

    //Get paginated list of notes
    try {
      let context = await Promise.hash({
        currentPage: currentPage, // 当前页面信息, 决定当前页面类型，
        currentTerm,
        pages: mainmenu,
        title: 'pageTitle',
        // Primary page content
        posts,
        pagination,
        sidebar
      })
      await ctx.render('posts/index', context)

    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA' + error)
    }
  }
  async show(ctx) {

  }

}

async function  getSidebarContext(){

      // 案例分类 根分类id = 4
      let terms = await SharedTerm.findAll({where:{ parent: termRootId}})
      return { categories:terms }
}

export default PostsController
