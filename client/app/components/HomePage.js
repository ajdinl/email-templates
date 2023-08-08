'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTemplate } from '@/api'
import Link from 'next/link'
import { Menu, MenuItem } from '@szhsin/react-menu'
import Moment from 'react-moment'
import TemplateForm from './TemplateForm'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import PreviewModal from './PreviewModal'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import {
  BsFillSendFill,
  BsFillPersonFill,
  BsInbox,
  BsSearch,
} from 'react-icons/bs'
import { RxExit } from 'react-icons/rx'
import { MdEmail } from 'react-icons/md'

export default function HomePage({ templates }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [userFirstLetter, setUserFirstLetter] = useState('')
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  const router = useRouter()

  const sortTemplatesBy = (sortType) => {
    // Implement sorting logic here
    if (sortType === 'name-desc') {
      // Sort by name descending

      return templates.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    } else if (sortType === 'name-asc') {
      // Sort by name ascending

      return templates.sort((a, b) => {
        return a.name < b.name ? 1 : -1
      })
    }
  }

  const validateTemplateName = () => {
    // Implement validation logic here
  }

  const saveTemplate = () => {
    // Implement save template logic here
  }

  const removeTemplate = async () => {
    await deleteTemplate(selectedTemplate)
    closeDeleteModal()
    router.refresh()
  }

  const openPreviewModal = (template) => {
    setSelectedTemplate(template)
    setPreviewModalVisible(true)
  }

  const closePreviewModal = () => {
    setPreviewModalVisible(false)
    setSelectedTemplate(null)
  }

  const openEditModal = (template) => {
    setSelectedTemplate(template)
    setEditModalVisible(true)
  }

  const closeEditModal = () => {
    setEditModalVisible(false)
    setSelectedTemplate(null)
  }

  function openDeleteModal(templateId) {
    setSelectedTemplate(templateId)
    setDeleteModalVisible(true)
  }

  function closeDeleteModal() {
    setDeleteModalVisible(false)
    setSelectedTemplate(null)
  }

  function openCreateModal() {
    setCreateModalVisible(true)
  }

  return (
    <>
      <main className='application'>
        <div className='app-sidebar'>
          <div className='app-sidebar__upper'>
            <Link href='/'>
              <MdEmail className='app-sidebar__upper__logo'></MdEmail>
            </Link>
            <ul>
              <li>
                <BsFillPersonFill className='app-sidebar__upper__icon1'></BsFillPersonFill>
              </li>
              <li>
                <BsFillSendFill className='app-sidebar__upper__icon2'></BsFillSendFill>
              </li>
              <li>
                <BsInbox className='app-sidebar__upper__icon3'></BsInbox>
              </li>
            </ul>
          </div>
          <div className='app-sidebar__lower'>
            <ul>
              <li>
                <RxExit className='app-sidebar__upper__icon4'></RxExit>
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
          <BsSearch className='app-header__search__icon'></BsSearch>
          <div className='app-header__user'>
            <Menu
              menuButton={<a>T</a>}
              transition
              className='app-header__user__user-menu user-menu'
            >
              <MenuItem className='app-header__user__user-menu__item'>
                Log out
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className='application__content'>
          <div className='application__content__header'>
            <h1 className='application__content__header__title'>
              Email Templates
            </h1>
            <a
              onClick={openCreateModal}
              className='application__content__header__link'
            >
              + New Template
            </a>
          </div>
          {templates.length === 0 && 'No templates found'}
          {templates.length > 0 && (
            <table className='application__content__list'>
              <thead className='application__content__list__header'>
                <tr className='application__content__list__header__row'>
                  <th className='application__content__list__header__cell'>
                    <div className='application__content__list__header__cell__items'>
                      <div className='application__content__list__header__cell__items__title'>
                        Name
                      </div>
                      <div>
                        <div
                          className='application__content__list__header__cell__items__arrowup'
                          onClick={() => sortTemplatesBy('name-desc')}
                        ></div>
                        <div
                          className='application__content__list__header__cell__items__arrowdown'
                          onClick={() => sortTemplatesBy('name-asc')}
                        ></div>
                      </div>
                    </div>
                  </th>
                  <th className='application__content__list__header__cell'>
                    <div className='application__content__list__header__cell__items'>
                      <div className='application__content__list__header__cell__items__title'>
                        Last Modified By
                      </div>
                      <div>
                        {/* <div
                  className="application__content__list__header__cell__items__arrowup"
                  {{on "click" (fn this.sortTemplatesBy "user-desc")}}
                ></div><div
                  className="application__content__list__header__cell__items__arrowdown"
                  {{on "click" (fn this.sortTemplatesBy "user-asc")}}
                ></div> */}
                      </div>
                    </div>
                  </th>
                  <th className='application__content__list__header__cell'>
                    <div className='application__content__list__header__cell__items'>
                      <div className='application__content__list__header__cell__items__title'>
                        Last Modified On
                      </div>
                      <div>
                        {/* <div
                  className="application__content__list__header__cell__items__arrowup"
                  {{on "click" (fn this.sortTemplatesBy "date-desc")}}
                ></div><div
                  className="application__content__list__header__cell__items__arrowdown"
                  {{on "click" (fn this.sortTemplatesBy "date-asc")}}
                ></div> */}
                      </div>
                    </div>
                  </th>
                  <th className='application__content__list__header__cell'></th>
                </tr>
              </thead>
              <tbody className='application__content__list__items'>
                {templates.map((template) => {
                  const updatedAt = new Date(template.updatedAt)
                  return (
                    <tr
                      className='application__content__list__items__row'
                      key={template._id}
                    >
                      <td className='application__content__list__items__cell name'>
                        {template.name}
                      </td>
                      <td className='application__content__list__items__cell'>
                        {template.user}
                      </td>
                      <td className='application__content__list__items__cell'>
                        <Moment format='MM/DD/YY @ h:mm a'>{updatedAt}</Moment>
                      </td>
                      <td className='application__content__list__items__cell'>
                        <Menu
                          menuButton={
                            <div className='application__content__list__items__cell__button'>
                              <p className='application__content__list__items__cell__button__text'>
                                Actions
                              </p>
                              <span>&gt;</span>
                            </div>
                          }
                          transition
                        >
                          <MenuItem>
                            <ul className='application__content__list__items__cell__content__list'>
                              <MenuItem
                                className='application__content__list__items__cell__content__list__item'
                                onClick={() => openEditModal(template)}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                className='application__content__list__items__cell__content__list__item'
                                onClick={() => openPreviewModal(template)}
                              >
                                Preview
                              </MenuItem>
                              <MenuItem
                                className='application__content__list__items__cell__content__list__item'
                                onClick={() => openDeleteModal(template._id)}
                              >
                                Delete
                              </MenuItem>
                            </ul>
                          </MenuItem>
                        </Menu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* createModal */}
        <TemplateForm
          createModalVisible={createModalVisible}
          setCreateModalVisible={setCreateModalVisible}
          templates={templates}
        />
        {/* {deleteModal */}
        <DeleteModal
          deleteModalVisible={deleteModalVisible}
          closeDeleteModal={closeDeleteModal}
          deleteTemplate={removeTemplate}
        />
        {/* {editModal */}

        {editModalVisible && selectedTemplate && (
          <EditModal
            template={selectedTemplate}
            editModalVisible={editModalVisible}
            closeEditModal={closeEditModal}
            templates={templates}
          />
        )}
        {/* )} */}
        {previewModalVisible && selectedTemplate && (
          <PreviewModal
            template={selectedTemplate}
            previewModalVisible={previewModalVisible}
            closePreviewModal={closePreviewModal}
          />
        )}
      </main>
    </>
  )
}
