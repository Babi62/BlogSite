const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();



// blog routes
router.get('/', blogController.blogIndex)

router.post('/', blogController.blogPost)

router.get('/create', blogController.blogCreate)

router.get('/:id', blogController.blogDetail);

router.delete('/:id', blogController.blogDelete);



module.exports = router;