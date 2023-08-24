'use client'

import Modal from 'react-modal'
import { useState } from 'react'
import { editTemplate } from '../api'
import { useRouter } from 'next/navigation'
import PreviewModal from './PreviewModal'
import { useSession } from 'next-auth/react'

export default function EditModal({
  template,
  editModalVisible,
  closeEditModal,
  templates,
}) {
  const [formData, setFormData] = useState({
    name: template.name,
    subject: template.subject,
    body: template.body,
  })
  const [templateNameError, setTemplateNameError] = useState('')
  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  const { data: session } = useSession()
  const token = session?.user?.token

  const router = useRouter()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { name, subject, body } = formData

  const togglePreviewModal = () => {
    setPreviewModalVisible(!previewModalVisible)
  }

  const validateTemplateName = () => {
    if (!name) {
      setTemplateNameError('Template name is required')
      return
    } else {
      setTemplateNameError('')
    }

    if (templates.find((t) => t.name === name) && name !== template.name) {
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
      name,
      subject,
      body,
    }

    await editTemplate(updatedTemplate, token)
    closeEditModal()
    router.refresh()
  }

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
  }

  return (
    <>
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
                  value={name}
                  name='name'
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
                  value={subject}
                  name='subject'
                  required
                  onChange={onChange}
                />
              </div>
              <div className='app-modal-content__body__item'>
                <label htmlFor='template-body'>Message</label>
                <textarea
                  id='template-body'
                  value={body}
                  name='body'
                  required
                  onChange={onChange}
                />
              </div>
              <div className='app-modal-content__body__buttons'>
                <button
                  type='submit'
                  className={`app-modal-content__body__buttons__button ${
                    templateNameError || !name || !subject || !body
                      ? 'disabled'
                      : ''
                  }`}
                >
                  Save Changes
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
      <PreviewModal
        template={template}
        previewModalVisible={previewModalVisible}
        closePreviewModal={togglePreviewModal}
      />
    </>
  )
}
