'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTemplate } from '../../api'
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
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'

export default function HomePage({ templates }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [currentSortType, setCurrentSortType] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [userFirstLetter, setUserFirstLetter] = useState('')
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  useEffect(() => {
    const filtered = templates.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTemplates(filtered)
  }, [searchQuery, templates])

  useEffect(() => {
    setFilteredTemplates(sortTemplatesBy(currentSortType))
  }, [currentSortType])

  const router = useRouter()

  const sortTemplatesBy = (sortType) => {
    setCurrentSortType(sortType)

    if (sortType === 'name-desc') {
      return [...filteredTemplates].sort((a, b) => (a.name > b.name ? -1 : 1))
    } else if (sortType === 'name-asc') {
      return [...filteredTemplates].sort((a, b) => (a.name > b.name ? 1 : -1))
    } else if (sortType === 'user-desc') {
      return [...filteredTemplates].sort((a, b) => (a.user > b.user ? -1 : 1))
    } else if (sortType === 'user-asc') {
      return [...filteredTemplates].sort((a, b) => (a.user > b.user ? 1 : -1))
    } else if (sortType === 'date-desc') {
      return [...filteredTemplates].sort((a, b) =>
        new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1
      )
    } else if (sortType === 'date-asc') {
      return [...filteredTemplates].sort((a, b) =>
        new Date(a.updatedAt) > new Date(b.updatedAt) ? 1 : -1
      )
    } else {
      return filteredTemplates
    }
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
                          className={`application__content__list__header__cell__items__arrowup ${
                            currentSortType === 'name-desc' ? 'active' : ''
                          }`}
                          onClick={() => sortTemplatesBy('name-desc')}
                        >
                          <BiUpArrowAlt></BiUpArrowAlt>
                        </div>
                        <div
                          className={`application__content__list__header__cell__items__arrowdown ${
                            currentSortType === 'name-asc' ? 'active' : ''
                          }`}
                          onClick={() => sortTemplatesBy('name-asc')}
                        >
                          <BiDownArrowAlt></BiDownArrowAlt>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className='application__content__list__header__cell'>
                    <div className='application__content__list__header__cell__items'>
                      <div className='application__content__list__header__cell__items__title'>
                        Last Modified By
                      </div>
                      <div>
                        <div
                          className={`application__content__list__header__cell__items__arrowup ${
                            currentSortType === 'user-desc' ? 'active' : ''
                          }`}
                          onClick={() => sortTemplatesBy('user-desc')}
                        >
                          <BiUpArrowAlt></BiUpArrowAlt>
                        </div>
                        <div
                          className={`application__content__list__header__cell__items__arrowdown ${
                            currentSortType === 'user-asc' ? 'active' : ''
                          }`}
                          onClick={() => sortTemplatesBy('user-asc')}
                        >
                          <BiDownArrowAlt></BiDownArrowAlt>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className='application__content__list__header__cell'>
                    <div className='application__content__list__header__cell__items'>
                      <div className='application__content__list__header__cell__items__title'>
                        Last Modified On
                      </div>
                      <div>
                        <div
                          className={`application__content__list__header__cell__items__arrowup ${
                            currentSortType === 'date-desc' ? 'active' : ''
                          }`}
                          onClick={() => sortTemplatesBy('date-desc')}
                        >
                          <BiUpArrowAlt></BiUpArrowAlt>
                        </div>
                        <div
                          className={`application__content__list__header__cell__items__arrowdown ${
                            currentSortType === 'date-asc' ? 'active' : ''
                          }`}
                          onClick={() => sortTemplatesBy('date-asc')}
                        >
                          <BiDownArrowAlt></BiDownArrowAlt>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className='application__content__list__header__cell'></th>
                </tr>
              </thead>
              <tbody className='application__content__list__items'>
                {filteredTemplates.map((template) => {
                  const updatedAt = new Date(template.updatedAt)
                  return (
                    <tr
                      className='application__content__list__items__row'
                      key={template._id}
                    >
                      <td className='application__content__list__items__cell name'>
                        <span onClick={() => openPreviewModal(template)}>
                          {template.name}
                        </span>
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
          templates={filteredTemplates}
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
