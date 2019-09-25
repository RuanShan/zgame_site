// helpers.js

// Same instance, because node modules are cached
var Handlebars = require('handlebars');
var paginate1 = require('ghost-paginator')
var paginate = require('handlebars-paginate');
const { urlBase } = require('../config/game')

function isCurrentUrl( url, options ){
  let currentUrl =  options.data.koa.request.path

  if ( url == currentUrl ) {
      return options.fn(this);
  }
  return options.inverse(this);
}
function postUrl(post, options) {
  // /{{post.date|get-year}}/{{post.date|get-month}}/{{post.slug}}
  return new Handlebars.SafeString(`/posts/detail/${post.id}`);
}
function caseUrl(doc, options) {
  return (`/case/detail/${doc.id}`);
}
function caseByTermUrl(doc, options) {
  return doc.id ? `/case/category/${doc.id}` : '/case'
}
function pageUrl( page, options) {
  let url =  options.data.koa.request.path
  return (`${url}?page=${page}`);
}
function postCoverUrl( post ){
  let images = post.Covers
  return images.length > 0  ? images[0].previewUrl : ''
}

function gameRoundSlideUrl( round ){
  let images = round.Slides
  return images.length > 0  ? images[0].previewUrl : ''
}
// 用在background:url() 中
function albumPhotoUrl( album ){
  let images = album.Photos
  return images.length > 0  ? images[0].previewUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCBAMAAAB4LQ3OAAAAElBMV…EKQrzPiFRWYGjjD35lMWowdH+iMIDhKbsrgqUKhcKt8w6XuLks4SGmbAAAAABJRU5ErkJggg=='
}

function gamePreviewUrl( round ){
  return `${urlBase}/${round.code}.html?number=${round.number}&preview=yes`
}


function toJSON(obj) {    return JSON.stringify(obj, null, 3); }

function pageTitle( options ){
  let title=''
  let post = this.post
  let gameRound = this.gameRound
  let currentTerm = this.currentTerm
  if( post ){
    title +=  post.title + ' - '
  }
  if( gameRound ){
    title +=  gameRound.name + ' - '
  }
  if( currentTerm && currentTerm.name ){
    title +=  currentTerm.name + ' - '
  }
  return `${title}${options.data.site.name}-大连软山网络有限公司`
}
function serverTime() {    return new Date().getTime(); }

function formatDatetime( date ){
  return date.toLocaleString()
}

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



module.exports = {
  toJSON, serverTime,formatDatetime,
  pageTitle,
  isCurrentUrl,
  postUrl,  caseUrl, pageUrl, caseByTermUrl,
  postCoverUrl,
  bodyCssClass,
  gameRoundSlideUrl,
  gamePreviewUrl,
  albumPhotoUrl,
  paginate }
