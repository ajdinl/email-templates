const asyncHandler = require('express-async-handler')

const Template = require('../models/templateModel')
const User = require('../models/userModel')

const getEmailTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({ user: req.user.id })
  res.status(200).json(templates)
})

const getEmailTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id)
  res.status(200).json(template)
})

const createEmailTemplate = asyncHandler(async (req, res) => {
  const { name, subject, body } = req.body
  if (!name || !subject || !body) {
    res.status(400)
    throw new Error('Please fill in all fields')
  }

  const template = await Template.create({
    name: req.body.name,
    subject: req.body.subject,
    body: req.body.body,
    user: req.user.id,
  })

  res.status(200).json(template)
})

const updateEmailTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id)

  if (!template) {
    res.status(404)
    throw new Error('Template not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (template.user.toString() !== req.user.id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const editTemplate = await Template.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(editTemplate)
})

const deleteEmailTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id)

  if (!template) {
    res.status(404)
    throw new Error('Template not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (template.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Template.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: 'Template deleted' })
})

module.exports = {
  getEmailTemplates,
  getEmailTemplate,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
}
