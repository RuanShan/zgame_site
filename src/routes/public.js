const Router = require("koa-router");
const router = new Router();


// Public Routes
// =============
import PagesController from '../controllers/pages_controller'
import PostsController from '../controllers/posts_controller'
import CasesController from '../controllers/cases_controller'

const pageController = new PagesController()
const postsController = new PostsController()
const casesController = new CasesController()

router.get( '/', pageController.index );
router.get( '/about-us', pageController.aboutUs );
router.get( '/news', postsController.index );
router.get( '/news/category', postsController.index );
router.get( '/news/category/:termId', postsController.index );
router.get( '/case', casesController.index );
router.get( '/case/category', casesController.index );
router.get( '/case/category/:termId', casesController.index );
router.get( '/case/tag/:tagId', casesController.show );
router.get( '/case/detail/:id', casesController.show );
// router.get( '/page/:page', require( './index' ) );
// // router.use( '/search', require( './search' ) );
// // router.use( '/:year/:month', require( './archive-year-month' ) );
// router.get( '/:year/:month/:slug', require( './single' ) );
// router.use( '/tags/:tag', require( './tag' ) );
// router.use( '/categories/:category', require( './category' ) );

module.exports = router;
