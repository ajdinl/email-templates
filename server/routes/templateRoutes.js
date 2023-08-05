const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  getEmailTemplates,
  getEmailTemplate,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} = require('../controllers/templateController')

router
  .route('/')
  .get(/*protect,*/ getEmailTemplates)
  .post(/*protect,*/ createEmailTemplate)

router
  .route('/:id')
  .get(/*protect,*/ getEmailTemplate)
  .put(/*protect,*/ updateEmailTemplate)
  .delete(/*protect,*/ deleteEmailTemplate)

module.exports = router
