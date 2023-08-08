'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addTemplate } from '@/api'
import Modal from 'react-modal'

export default function TemplateForm({
  templates,
  createModalVisible,
  setCreateModalVisible,
}) {
  const [templateName, setTemplateName] = useState('')
  const [templateSubject, setTemplateSubject] = useState('')
  const [templateBody, setTemplateBody] = useState('')
  const [templateNameError, setTemplateNameError] = useState('')
  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  const router = useRouter()

  const saveTemplate = async (e) => {
    e.preventDefault()
    if (!templateName || !templateSubject || !templateBody) {
      return
    }

    if (templates.find((template) => template.name === templateName.trim())) {
      setTemplateNameError('Template name must be unique')
      return
    }

    const template = {
      name: templateName,
      subject: templateSubject,
      body: templateBody,
    }

    await addTemplate(template).then(() => {
      closeCreateModal()
      router.refresh()
    })
  }

  const validateTemplateName = () => {
    if (templateName.length < 3) {
      setTemplateNameError('Template name must be at least 3 characters long')
      return
    } else {
      setTemplateNameError('')
    }
  }

  const togglePreviewModal = () => {
    setPreviewModalVisible(!previewModalVisible)
  }

  const closePreviewModal = () => {
    setPreviewModalVisible(false)
  }

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value)
  }

  const handleTemplateSubjectChange = (e) => {
    setTemplateSubject(e.target.value)
  }

  const handleTemplateBodyChange = (e) => {
    setTemplateBody(e.target.value)
  }

  function closeCreateModal() {
    setTemplateName('')
    setTemplateSubject('')
    setTemplateBody('')
    setTemplateNameError('')
    setCreateModalVisible(false)
  }

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
    content: {
      overflow: 'hidden',
    },
  }

  return (
    <Modal
      isOpen={createModalVisible}
      onRequestClose={closeCreateModal}
      contentLabel='Create Modal'
      ariaHideApp={false}
      style={customStyles}
    >
      <div className='app-modal-content app-modal'>
        <div className='app-modal-content__header'>
          <h1 className='app-modal-content__header__title'>
            Create a New Email Template
          </h1>
          <a
            onClick={closeCreateModal}
            className='app-modal-content__header__close'
          >
            X
          </a>
        </div>

        <div className='app-modal-content__body'>
          <form
            className='app-modal-content__body__form'
            onSubmit={saveTemplate}
          >
            <div className='app-modal-content__body__item'>
              <label htmlFor='template-name'>Name</label>
              <input
                type='text'
                value={templateName}
                id='template-name'
                required
                className={templateNameError ? 'error' : ''}
                onBlur={validateTemplateName}
                onChange={(e) => {
                  handleTemplateNameChange(e)
                }}
              />
              {templateNameError && (
                <div className='app-modal-content__body__item__error'>
                  {templateNameError}
                </div>
              )}
            </div>
            <div className='app-modal-content__body__item'>
              <label htmlFor='template-subject'>Subject Line</label>
              <input
                type='text'
                value={templateSubject}
                id='template-subject'
                required
                onChange={(e) => {
                  handleTemplateSubjectChange(e)
                }}
              />
            </div>
            <div className='app-modal-content__body__item'>
              <label htmlFor='template-body'>Message</label>
              <textarea
                value={templateBody}
                id='template-body'
                required
                onChange={(e) => {
                  handleTemplateBodyChange(e)
                }}
              />
            </div>
            <div className='app-modal-content__body__buttons'>
              <button
                type='submit'
                className={`app-modal-content__body__buttons__button ${
                  (!templateName || !templateSubject || !templateBody) &&
                  'disabled'
                }`}
              >
                Create New Email Template
              </button>
              <a
                className='app-modal-content__body__buttons__preview-link'
                onClick={togglePreviewModal}
              >
                Preview Email Template
              </a>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  )
}
