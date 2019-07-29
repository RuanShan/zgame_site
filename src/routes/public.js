const Router = require("koa-router");
const router = new Router();


// Public Routes
// =============
import HomeController from '../controllers/home_controller'
import PostsController from '../controllers/posts_controller'
import CasesController from '../controllers/cases_controller'

const homeController = new HomeController()
const casesController = new CasesController()

router.get( '/', homeController.index );
router.get( '/news', postsController.index );
router.get( '/news/:category', postsController.index );
router.get( '/news/:category/:slug', postsController.show );
router.get( '/cases', casesController.index );
router.get( '/cases/:category', casesController.index );
router.get( '/cases/:category/:slug', casesController.show );
// router.get( '/page/:page', require( './index' ) );
// // router.use( '/search', require( './search' ) );
// // router.use( '/:year/:month', require( './archive-year-month' ) );
// router.get( '/:year/:month/:slug', require( './single' ) );
// router.use( '/tags/:tag', require( './tag' ) );
// router.use( '/categories/:category', require( './category' ) );

module.exports = router;
