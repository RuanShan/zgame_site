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
function caseByTermUrl(doc, options) {
  return doc.id ? `/case/category/${doc.id}` : '/case'
}
function pageUrl( page, options) {
  let baseUrl =  options.data.koa.request.path
  return (`${baseUrl}?page=${page}`);
}
function postCoverUrl( post ){
  let images = post.Covers
  return images.length > 0  ? images[0].previewUrl : ''
}

function gameRoundSlideUrl( round ){
  let images = round.Slides
  return images.length > 0  ? images[0].previewUrl : ''
}

function toJSON(obj) {    return JSON.stringify(obj, null, 3); }
function serverTime() {    return new Date().getTime(); }
function bodyCssClass( options ){
  console.debug( "options=", options.data.view)
  if( options.data.view=='index' ){
    return 'tg-site-layout--stretched'
  }else if ( this.currentPage.type=='news' ){
    return ''
  }else{
    return 'tg-site-layout--default'
  }
}



module.exports = {toJSON, serverTime,
  postUrl,  caseUrl, pageUrl, caseByTermUrl,
  postCoverUrl,
  bodyCssClass,
  gameRoundSlideUrl,
  paginate }
