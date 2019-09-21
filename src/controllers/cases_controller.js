require('promise-hash')
//const joi  = require( 'joi')
const {
  SharedPost,
  SharedTerm,
  ZTouPiaoGameRound,
  ZTouPiaoAlbum,
  Sequelize
} = require('../models')

const getPagination = require('../helpers/pagination');

const currentPage = {
  hasSidebar: false
}

const Op = Sequelize.Op;

const termRootId = 4


function CasesController() {}
/**
 * 显示案例列表,  by_category, by_tag
 * @param {*} ctx
 * @param {int} tagId
 * @param {int} categoryId
 *
 */
CasesController.prototype.index = async function(ctx) {
  const query = ctx.query
  let termId = ctx.params.termId
  let paging = getPagination(ctx.query.page);

  let options = {
    include: [{association:'Slides'}],
    where: {},
    limit: paging.paginate,
    offset: paging.offset
  }
  let currentTerm = null
  if (termId) {
    options.include.push({
      association: 'TermRelationships',
      where: {
        term_id: termId
      }
    })
    currentTerm = SharedTerm.findByPk(termId)
  } else {
    currentTerm = SharedTerm.findByPk(termRootId)
  }

  // 案例分类 根分类id = 4
  let sidebar = await getSidebarContext()
  // 过滤条件
  let terms = await SharedTerm.findAll({
    where: {
      parent: termRootId
    }
  })
  let filters = terms.map((term) => {
    return {
      id: term.id,
      name: term.name,
      active: (term.id == termId)
    }
  })

  filters.unshift({
    id: null,
    name: '全部',
    active: (null == termId)
  })

  const {
    rows,
    count
  } = await ZTouPiaoGameRound.findAndCount(options)
  let pages = Math.ceil(count / paging.paginate)

  console.debug(" pages, total", pages, count, filters)
  const posts = rows
  const pagination = {
    page: paging.page,
    pageCount: pages
  }
  //Get paginated list of notes
  try {
    let context = await Promise.hash({
      currentPage, // 当前页面设置hasSidebar
      currentTerm,
      filters,
      title: 'pageTitle',
      // Primary page content
      posts,
      pagination,
      sidebar
    })

    await ctx.render('cases/index', context)

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
CasesController.prototype.show = async function(ctx) {
  const id = ctx.params.id
  let gameRound = await ZTouPiaoGameRound.findByPk(id)
  let currentTerm = await SharedTerm.findByPk(termRootId)

  let gameAlbums = await ZTouPiaoAlbum.findAll({
    where: {
      game_round_id: gameRound.id,
    },
    include: [{
      attributes: ['okey'],
      association: 'Photos'
    }]
  })

  let context = {
    currentPage,
    currentTerm,
    gameRound,
    gameAlbums
  }
  await ctx.render('cases/show', context)
}

async function getSidebarContext() {

  // 案例分类 根分类id = 4
  let terms = await SharedTerm.findAll({
    where: {
      parent: termRootId
    }
  })
  return {
    categories: terms
  }
}



export default CasesController
