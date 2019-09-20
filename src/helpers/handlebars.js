// helpers.js

// Same instance, because node modules are cached
var Handlebars = require('handlebars');
var paginate1 = require('ghost-paginator')
var paginate = require('handlebars-paginate');

function postUrl(post, options) {
  // /{{post.date|get-year}}/{{post.date|get-month}}/{{post.slug}}
  return new Handlebars.SafeString(`/${post.slug}`);
}
function caseUrl(doc, options) {
  return (`/case/detail/${doc.id}`);
}
function pageUrl( page, options) {
  let baseUrl =  options.data.koa.request.path
  return (`${baseUrl}?page=${page}`);
}


function toJSON(obj) {    return JSON.stringify(obj, null, 3); }
function serverTime() {    return new Date().getTime(); }
function bodyCssClass( ){
  if( this.currentPage.hasSidebar ){
    return ''
  }else{
    return 'tg-site-layout--stretched'
  }

}



module.exports = {toJSON, serverTime, postUrl,  caseUrl, pageUrl, bodyCssClass, paginate, paginate1 }
