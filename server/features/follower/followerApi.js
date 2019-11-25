const router = express.Router();
const followerRepository = require('./followerRepository');

router.route('/getAll').get(followerRepository.getAllUser);
router.route('/getFollowers').get(followerRepository.getAllFollowers);
router.route('/getFollowings').get(followerRepository.getAllFollowings);
router.route('/createRequest').post(followerRepository.create);


module.exports = router;