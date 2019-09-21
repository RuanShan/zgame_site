
const mainmenu = [{url: '/', title:'首页'},{url: '/case', title:'案例'},
  {url: '/posts', title:'动态'},{url: '/help', title:'帮助'},{url: '/about-us', title:'关于'}]


  /**
   * 取得sidebar 上下文数据
   * @constructor
   * @param {string} path - 书本的标题.
   * @return {Object} categories - 边栏菜单.
   */
async function getSidebarContext( path ){
  let categories = []
  return { categories }
}

module.exports = {
  mainmenu
}
