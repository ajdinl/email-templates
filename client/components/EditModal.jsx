'use client'

import Modal from 'react-modal'
import { useState } from 'react'
import { editTemplate } from '../api'
import { useRouter } from 'next/navigation'

export default function EditModal({
  template,
  editModalVisible,
  closeEditModal,
  templates,
}) {
  const [formData, setFormData] = useState({
    templateName: template.name,
    templateSubject: template.subject,
    templateBody: template.body,
  })
  const [templateNameError, setTemplateNameError] = useState('')

  const router = useRouter()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { templateName, templateSubject, templateBody } = formData

  const validateTemplateName = () => {
    if (!templateName) {
      setTemplateNameError('Template name is required')
      return
    } else {
      setTemplateNameError('')
    }

    if (
      templates.find((t) => t.name === templateName) &&
      templateName !== template.name
    ) {
      setTemplateNameError('Template name must be unique')
      return
    } else {
      setTemplateNameError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedTemplate = {
      ...template,
      name: templateName,
      subject: templateSubject,
      body: templateBody,
    }

    await editTemplate(updatedTemplate)
    closeEditModal()
    router.refresh()
  }

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
  }

  return (
    <Modal
      isOpen={editModalVisible}
      onRequestClose={closeEditModal}
      ariaHideApp={false}
      style={customStyles}
      className='app-modal-wrapper app-modal-wrapper--dialog edit-modal'
    >
      <div className='app-modal-content'>
        <div className='app-modal-content__header'>
          <h1 className='app-modal-content__header__title'>
            Edit Email Template
          </h1>
          <div
            className='app-modal-content__header__close'
            onClick={closeEditModal}
          >
            X
          </div>
        </div>
        <div className='app-modal-content__body'>
          <form
            className='app-modal-content__body__form'
            onSubmit={handleSubmit}
          >
            <div className='app-modal-content__body__item'>
              <label htmlFor='template-name'>Name</label>
              <input
                id='template-name'
                type='text'
                value={templateName}
                name='templateName'
                required
                className={templateNameError ? 'error' : ''}
                onBlur={validateTemplateName}
                onChange={onChange}
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
                id='template-subject'
                type='text'
                value={templateSubject}
                name='templateSubject'
                required
                onChange={onChange}
              />
            </div>
            <div className='app-modal-content__body__item'>
              <label htmlFor='template-body'>Message</label>
              <textarea
                id='template-body'
                value={templateBody}
                name='templateBody'
                required
                onChange={onChange}
              />
            </div>
            <div className='app-modal-content__body__buttons'>
              <button
                type='submit'
                className={`app-modal-content__body__buttons__button ${
                  templateNameError ||
                  !templateName ||
                  !templateSubject ||
                  !templateBody
                    ? 'disabled'
                    : ''
                }`}
              >
                Save Changes
              </button>
              <a
                className='app-modal-content__body__buttons__preview-link'
                onClick={() => console.log('Preview clicked')}
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
