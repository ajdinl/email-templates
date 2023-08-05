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
    <div>
      <h1>Create a New Email Template</h1>
      {!previewModalVisible && (
        <form onSubmit={saveTemplate}>
          <div>
            <label htmlFor='template-name'>Name</label>
            <input
              type='text'
              value={templateName}
              id='template-name'
              required
              className={templateNameError ? 'error' : ''}
              onBlur={validateTemplateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            {templateNameError && (
              <div className='app-modal-content__body__item__error'>
                {templateNameError}
              </div>
            )}
          </div>
          <div>
            <label htmlFor='template-subject'>Subject Line</label>
            <input
              type='text'
              value={templateSubject}
              id='template-subject'
              required
              onChange={(e) => setTemplateSubject(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='template-body'>Message</label>
            <textarea
              value={templateBody}
              id='template-body'
              required
              onChange={(e) => setTemplateBody(e.target.value)}
            />
          </div>
          <div>
            <button
              type='submit'
              className={`app-modal-content__body__buttons__button ${
                (templateNameError || !templateSubject || !templateBody) &&
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
      )}
      {previewModalVisible && (
        <div className='app-modal-overlay'>
          {/* Preview Modal */}
          <div>
            <div>You are previewing "{templateName}"</div>
            <div> {/* Preview image */}</div>
          </div>
          <div>
            <div>X</div>
            <h3>{templateSubject}</h3>
          </div>
          <div>
            <p>{templateBody}</p>
          </div>
          <button onClick={togglePreviewModal}>Close</button>
        </div>
      )}
      {!previewModalVisible && <Link href='/'>Go to the home page</Link>}
    </div>
  )
}
