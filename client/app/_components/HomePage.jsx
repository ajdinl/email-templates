'use client'

import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTemplate } from '@/api/'
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
import { signOut, useSession } from 'next-auth/react'

export default function HomePage({ templates }) {
  const initialState = {
    searchQuery: '',
    filteredTemplates: templates,
    currentSortType: null,
    selectedTemplate: null,
    userFirstLetter: '',
    createModalVisible: false,
    editModalVisible: false,
    deleteModalVisible: false,
    previewModalVisible: false,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_SEARCH_QUERY':
        return { ...state, searchQuery: action.payload }
      case 'SET_FILTERED_TEMPLATES':
        return { ...state, filteredTemplates: action.payload }
      case 'SET_CURRENT_SORT_TYPE':
        return { ...state, currentSortType: action.payload }
      case 'SET_SELECTED_TEMPLATE':
        return { ...state, selectedTemplate: action.payload }
      case 'SET_USER_FIRST_LETTER':
        return { ...state, userFirstLetter: action.payload }
      case 'SET_CREATE_MODAL_VISIBLE':
        return { ...state, createModalVisible: action.payload }
      case 'SET_EDIT_MODAL_VISIBLE':
        return { ...state, editModalVisible: action.payload }
      case 'SET_DELETE_MODAL_VISIBLE':
        return { ...state, deleteModalVisible: action.payload }
      case 'SET_PREVIEW_MODAL_VISIBLE':
        return { ...state, previewModalVisible: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    searchQuery,
    filteredTemplates,
    currentSortType,
    selectedTemplate,
    userFirstLetter,
    createModalVisible,
    editModalVisible,
    deleteModalVisible,
    previewModalVisible,
  } = state

  const { data: session } = useSession()
  const userName = session?.user?.name
  const userAvatar = session?.user?.image
  const token = session?.user?.token

  useEffect(() => {
    if (templates) {
      const filtered = templates.filter((template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      dispatch({
        type: 'SET_FILTERED_TEMPLATES',
        payload: filtered,
      })
    }
  }, [searchQuery, templates])

  useEffect(() => {
    if (filteredTemplates) {
      dispatch({
        type: 'SET_FILTERED_TEMPLATES',
        payload: sortTemplatesBy(currentSortType),
      })
    }
  }, [currentSortType, filteredTemplates])

  useEffect(() => {
    if (userName) {
      dispatch({
        type: 'SET_USER_FIRST_LETTER',
        payload: userName[0].toUpperCase(),
      })
    }
  }, [userName])

  const router = useRouter()

  const sortTemplatesBy = (sortType) => {
    dispatch({
      type: 'SET_CURRENT_SORT_TYPE',
      payload: sortType,
    })

    switch (sortType) {
      case 'name-desc':
        return [...filteredTemplates].sort((a, b) =>
          b.name.localeCompare(a.name)
        )
      case 'name-asc':
        return [...filteredTemplates].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      case 'user-desc':
        return [...filteredTemplates].sort((a, b) =>
          b.user.localeCompare(a.user)
        )
      case 'user-asc':
        return [...filteredTemplates].sort((a, b) =>
          a.user.localeCompare(b.user)
        )
      case 'date-desc':
        return [...filteredTemplates].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      case 'date-asc':
        return [...filteredTemplates].sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        )
      default:
        return filteredTemplates
    }
  }

  const removeTemplate = async () => {
    await deleteTemplate(selectedTemplate, token)
    closeDeleteModal()
    router.refresh()
  }

  const openPreviewModal = (template) => {
    dispatch({
      type: 'SET_SELECTED_TEMPLATE',
      payload: template,
    })
    dispatch({
      type: 'SET_PREVIEW_MODAL_VISIBLE',
      payload: true,
    })
  }

  const closePreviewModal = () => {
    dispatch({
      type: 'SET_PREVIEW_MODAL_VISIBLE',
      payload: false,
    })
    dispatch({
      type: 'SET_SELECTED_TEMPLATE',
      payload: null,
    })
  }

  const openEditModal = (template) => {
    dispatch({
      type: 'SET_SELECTED_TEMPLATE',
      payload: template,
    })
    dispatch({
      type: 'SET_EDIT_MODAL_VISIBLE',
      payload: true,
    })
  }

  const closeEditModal = () => {
    dispatch({
      type: 'SET_EDIT_MODAL_VISIBLE',
      payload: false,
    })
    dispatch({
      type: 'SET_SELECTED_TEMPLATE',
      payload: null,
    })
  }

  function openDeleteModal(templateId) {
    dispatch({
      type: 'SET_SELECTED_TEMPLATE',
      payload: templateId,
    })
    dispatch({
      type: 'SET_DELETE_MODAL_VISIBLE',
      payload: true,
    })
  }

  function closeDeleteModal() {
    dispatch({
      type: 'SET_DELETE_MODAL_VISIBLE',
      payload: false,
    })
    dispatch({
      type: 'SET_SELECTED_TEMPLATE',
      payload: null,
    })
  }

  function openCreateModal() {
    dispatch({
      type: 'SET_CREATE_MODAL_VISIBLE',
      payload: true,
    })
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
            onChange={(e) =>
              dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
            }
          />
          <BsSearch className='app-header__search__icon'></BsSearch>
          <div className='app-header__user'>
            <Menu
              menuButton={
                userAvatar ? (
                  <img
                    src={userAvatar}
                    className='app-header__user__avatar'
                  ></img>
                ) : (
                  <div className='app-header__user__avatar__placeholder'>
                    {userFirstLetter}
                  </div>
                )
              }
              transition
              className='app-header__user__user-menu user-menu'
            >
              <MenuItem
                className='app-header__user__user-menu__item'
                onClick={signOut}
              >
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
                        {userName}
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
          templates={filteredTemplates}
          dispatch={dispatch}
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
