const router = express.Router();
const tweetRepository = require('./tweetRepository');

router.route('/getAll').get(tweetRepository.getAll);
router.route('/getMy').get(tweetRepository.getAllByUser);
router.route('/create').post(StudentController.create);


module.exports = router;