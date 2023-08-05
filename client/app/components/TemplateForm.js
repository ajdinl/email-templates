'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TemplateForm() {
  const [templateName, setTemplateName] = useState('')
  const [templateSubject, setTemplateSubject] = useState('')
  const [templateBody, setTemplateBody] = useState('')
  const [templateNameError, setTemplateNameError] = useState('')
  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  const saveTemplate = (e) => {
    e.preventDefault()
    // Implement save template logic here
  }

  const validateTemplateName = () => {
    // Implement template name validation logic here
  }

  const togglePreviewModal = () => {
    setPreviewModalVisible(!previewModalVisible)
  }
  return (
    <div className='app-modal-content'>
      <div className='app-modal-content__header'>
        <h1 className='app-modal-content__header__title'>
          Create a New Email Template
        </h1>
        <Link href='/' className='app-modal-content__header__close'>
          X
        </Link>
      </div>

      <div className='app-modal-content__body'>
        <form className='app-modal-content__body__form' onSubmit={saveTemplate}>
          <div className='app-modal-content__body__item'>
            <label htmlFor='template-name'>Name</label>
            <input
              type='text'
              // value={template.name}
              id='template-name'
              required
              className={templateNameError ? 'error' : ''}
              onBlur={validateTemplateName}
              onChange={(e) => {} /* Handle change */}
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
              // value={template.subject}
              id='template-subject'
              required
              onChange={(e) => {} /* Handle change */}
            />
          </div>
          <div className='app-modal-content__body__item'>
            <label htmlFor='template-body'>Message</label>
            <textarea
              // value={template.body}
              id='template-body'
              required
              onChange={(e) => {} /* Handle change */}
            />
          </div>
          <div className='app-modal-content__body__buttons'>
            <button
              type='submit'
              className={`app-modal-content__body__buttons__button ${
                // (templateNameError || !template.subject || !template.body) &&
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
  )
}
