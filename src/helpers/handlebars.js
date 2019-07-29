// helpers.js

// Same instance, because node modules are cached
var Handlebars = require('handlebars');

function postUrl(post, options) {
  // /{{post.date|get-year}}/{{post.date|get-month}}/{{post.slug}}
  return new Handlebars.SafeString(`/${post.slug}`);
}

function toJSON(obj) {    return JSON.stringify(obj, null, 3); }
function serverTime() {    return new Date().getTime(); }



module.exports = { postUrl, toJSON, serverTime }
