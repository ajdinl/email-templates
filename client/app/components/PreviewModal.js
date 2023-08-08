'use client'

import Modal from 'react-modal'

export default function PreviewModal({
  template,
  previewModalVisible,
  closePreviewModal,
}) {
  return (
    <Modal
      isOpen={previewModalVisible}
      onRequestClose={closePreviewModal}
      className='app-modal-wrapper app-modal-wrapper--dialog preview-modal'
      ariaHideApp={false}
    >
      <div className='app-modal-content'>
        <div className='app-modal-content__upper'>
          <div className='app-modal-content__upper__title for-preview-modal'>
            You are previewing "{template.name}"
          </div>
          <div className='app-modal-content__upper__image'></div>
        </div>
        <div className='app-modal-content__header for-preview-modal'>
          <div
            className='app-modal-content__header__close for-preview-modal'
            onClick={closePreviewModal}
          >
            X
          </div>
          <h3 className='app-modal-content__header__title for-preview-modal'>
            {template.subject}
          </h3>
        </div>
        <div className='app-modal-content__body'>
          <p className='app-modal-content__body__text'>{template.body}</p>
        </div>
      </div>
    </Modal>
  )
}
