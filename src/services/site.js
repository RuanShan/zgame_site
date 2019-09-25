
const mainmenu = [{url: '/', title:'首页'},{url: '/case', title:'案例'},
  {url: '/posts', title:'动态'},{url: '/faq', title:'帮助'},{url: '/about-us', title:'关于'}]
const  site = {
  name: '星投票',
  description: '简单专业的投票活动制作平台',
  metaKeywords:'星投票,微信投票系统,投票系统,微信投票活动制作,评选系统,微信评选系统',
  metaDescription:'星投票系统是国内专业第三方微信公众号投票评选活动制作平台,提供免费在线创建微信公众号投票活动,图文投票活动,视频投票评选活动,关注微信公众号投票活动,送礼物投票活动服务'
}


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
  site,
  mainmenu
}
