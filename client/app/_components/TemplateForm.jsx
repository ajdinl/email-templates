'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addTemplate } from '@/api/'
import Modal from 'react-modal'
import PreviewModal from './PreviewModal'
import { useSession } from 'next-auth/react'

export default function TemplateForm({
  templates,
  createModalVisible,
  setCreateModalVisible,
}) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
  })
  const [templateNameError, setTemplateNameError] = useState('')
  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  const { data: session } = useSession()
  const token = session?.user?.token

  const router = useRouter()

  const { name, subject, body } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const saveTemplate = async (e) => {
    e.preventDefault()
    if (!name || !subject || !body) {
      return
    }

    if (templates.find((template) => template.name === name.trim())) {
      setTemplateNameError('Template name must be unique')
      return
    }

    const template = {
      name,
      subject,
      body,
    }

    await addTemplate(template, token).then(() => {
      closeCreateModal()
      router.refresh()
    })
  }

  const validateTemplateName = () => {
    if (name.length < 3) {
      setTemplateNameError('Template name must be at least 3 characters long')
      return
    } else {
      setTemplateNameError('')
    }
  }

  const togglePreviewModal = () => {
    setPreviewModalVisible(!previewModalVisible)
    setCreateModalVisible(!createModalVisible)
  }

  function closeCreateModal() {
    setFormData({ name: '', subject: '', body: '' })
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
    <>
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
                  value={name}
                  name='name'
                  id='template-name'
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
                  type='text'
                  value={subject}
                  name='subject'
                  id='template-subject'
                  required
                  onChange={onChange}
                />
              </div>
              <div className='app-modal-content__body__item'>
                <label htmlFor='template-body'>Message</label>
                <textarea
                  value={body}
                  name='body'
                  id='template-body'
                  required
                  onChange={onChange}
                />
              </div>
              <div className='app-modal-content__body__buttons'>
                <button
                  type='submit'
                  className='app-modal-content__body__buttons__button'
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
      <PreviewModal
        template={formData}
        previewModalVisible={previewModalVisible}
        closePreviewModal={togglePreviewModal}
      />
    </>
  )
}
