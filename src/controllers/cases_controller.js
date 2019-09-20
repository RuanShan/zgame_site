
require('promise-hash')
//const joi  = require( 'joi')
const  { SharedPost, SharedTerm, ZTouPiaoGameRound, Sequelize } = require('../models')

const getPagination = require( '../helpers/pagination' );


const { mainmenu } = require( '../services/site' );

const currentPage = { hasSidebar: true }

const Op = Sequelize.Op;



class CasesController {

   /**
   * 显示案例列表,  by_category, by_tag
   * @param {*} ctx
   * @param {int} tagId
   * @param {int} categoryId
   *
   */
    async index(ctx) {
        const query = ctx.query
        let termId = ctx.params.termId
        let paging = getPagination( ctx.query.page );

        let options = { where: {}, limit: paging.paginate, offset: paging.offset }

        if( termId){
          options.include=[{ association: 'TermRelationships', where:{term_id:termId}}]
        }
        // 案例分类 根分类id = 4
        let categories = await SharedTerm.findAll({where:{ parent: 4}})
        let sidebar = { categories }
        const { rows, count } = await ZTouPiaoGameRound.findAndCount(options)
        let pages = Math.ceil( count/paging.paginate )
        console.debug( " pages, total", pages, count)
        const posts = rows
        const pagination = { page: paging.page, pageCount: pages }
        //Get paginated list of notes
        try {
          let context = await Promise.hash({
            currentPage,// 当前页面设置hasSidebar
            archiveBase: '',
            pages: mainmenu,
            title: 'pageTitle',
            // Primary page content
            posts,
            pagination,
            sidebar
          })

          await ctx.render( 'cases/index', context )

        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }

    /**
    * 显示案例详细信息
    * @param {*} ctx
    *
    */
    async show(ctx) {
      const id = ctx.params.id
      let round = await ZTouPiaoGameRound.findByPk( id )

      let context = {
        currentPage,
        round
      }
      await ctx.render( 'cases/show', context )
    }

}


export default CasesController
