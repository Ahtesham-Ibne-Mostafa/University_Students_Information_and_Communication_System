const userController = require('../controllers/userController');
const donerController = require('../controllers/donerController');
const router = express.Router();


router.post('/register', userController.signUp);
router.post('/login', userController.login);


module.exports = router;
