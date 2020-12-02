const express= require('express');

const blogController= require('../controllers/blogController')
const router=express.Router();
const {requireAuth} = require('../middleware/authMiddleware')



router.get('/create',blogController.blog_create_get);

router.get('/', blogController.blog_index);

router.post('/', requireAuth, blogController.blog_create_post);

router.get('/:id', requireAuth, blogController.blog_details)


router.delete('/:id',blogController.blog_delete);

router.get('/:id/edit', blogController.blog_edit)

module.exports= router;