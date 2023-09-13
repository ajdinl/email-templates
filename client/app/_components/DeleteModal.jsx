'use client'

import Modal from 'react-modal'

export default function DeleteModal({
  deleteModalVisible,
  closeDeleteModal,
  deleteTemplate,
}) {
  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
  }

  return (
    <>
      <Modal
        isOpen={deleteModalVisible}
        onRequestClose={closeDeleteModal}
        contentLabel='Delete Modal'
        ariaHideApp={false}
        style={customStyles}
        className='app-modal-wrapper app-modal-wrapper--dialog delete-modal'
      >
        <div className='app-modal-content'>
          <div className='app-modal-content__header'>
            <div
              className='app-modal-content__header__close for-delete-modal'
              onClick={closeDeleteModal}
            >
              X
            </div>
            <h3 className='app-modal-content__header__title'>
              Are you sure you want to delete this email template?
            </h3>
          </div>
          <div className='app-modal-content__body'>
            <p>
              By deleting this email template, you will no longer be able to use
              this template to send emails. All history attached to this email
              template will be deleted — this cannot be undone. Are you sure you
              want to continue?
            </p>
          </div>
          <div className='app-modal-content__body__buttons'>
            <button
              type='button'
              className='app-modal-content__body__buttons__warning-button'
              onClick={deleteTemplate}
            >
              Yes, Delete Email Template
            </button>
            <a
              className='app-modal-content__body__buttons__preview-link'
              onClick={closeDeleteModal}
            >
              No, Cancel
            </a>
          </div>
        </div>
      </Modal>
    </>
  )
}
