'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userFirstLetter, setUserFirstLetter] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const listTemplates = [] // Your template data array

  const sortTemplatesBy = () => {
    // Implement sorting logic here
  }

  const validateTemplateName = () => {
    // Implement validation logic here
  }

  const saveTemplate = () => {
    // Implement save template logic here
  }

  const deleteTemplate = () => {
    // Implement delete template logic here
  }

  const openPreviewModal = (template) => {
    setSelectedTemplate(template)
    setPreviewModalVisible(true)
  }

  const closePreviewModal = () => {
    setPreviewModalVisible(false)
    setSelectedTemplate(null)
  }

  return (
    <>
      <main className='application'>
        <div className='app-sidebar'>
          <div className='app-sidebar__upper'>
            <div className='app-sidebar__upper__logo'></div>
            <ul>
              <li>
                <div className='app-sidebar__upper__icon1'></div>
              </li>
              <li>
                <div className='app-sidebar__upper__icon2'></div>
              </li>
              <li>
                <div className='app-sidebar__upper__icon3'></div>
              </li>
            </ul>
          </div>
          <div className='app-sidebar__lower'>
            <ul>
              <li>
                <div className='app-sidebar__upper__icon4'></div>
              </li>
            </ul>
          </div>
        </div>
        <div className='app-header'>
          <input
            type='text'
            className='app-header__search'
            placeholder="Search by user's name, email, company name or location"
            aria-label='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className='app-header__search__icon'></span>
          <div className='app-header__user'>
            {/* Dropdown component for user */}
          </div>
        </div>
        <div className='application__content'>
          <div className='application__content__header'>
            <h1 className='application__content__header__title'>
              Email Templates
            </h1>
            <Link
              href='/templates/new'
              className='application__content__header__link'
            >
              + New Template
            </Link>
          </div>
          <table className='application__content__list'>
            {/* Table header and body */}
          </table>
        </div>
        {/* Modals */}
        {editModalVisible && (
          <div className='app-modal-overlay'>{/* Edit Modal */}</div>
        )}
        {deleteModalVisible && (
          <div className='app-modal-overlay'>{/* Delete Modal */}</div>
        )}
        {previewModalVisible && selectedTemplate && (
          <div className='app-modal-overlay'>{/* Preview Modal */}</div>
        )}
      </main>
    </>
  )
}
