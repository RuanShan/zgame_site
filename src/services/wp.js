var WP = require( 'wpapi' );

let config = require( '../config/wordpress') 

var wp = new WP( config );

module.exports = wp;
