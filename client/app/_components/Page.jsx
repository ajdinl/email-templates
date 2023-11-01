'use client'

import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTemplate } from '@/api/'
import TemplateForm from './forms/TemplateForm'
import DeleteModal from './modals/DeleteModal'
import EditModal from './modals/EditModal'
import PreviewModal from './modals/PreviewModal'
import Header from './Header'
import SideBar from './SideBar'
import Templates from './Templates'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { signOut, useSession } from '@app/_components/ExternalComponents'

export default function Page({ templates }) {
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
    if (userName) {
      dispatch({
        type: 'SET_USER_FIRST_LETTER',
        payload: userName[0].toUpperCase(),
      })
    }
  }, [userName])

  const router = useRouter()

  const removeTemplate = async () => {
    await deleteTemplate(selectedTemplate, token)
    closeDeleteModal()
    router.refresh()
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

  return (
    <>
      <main className='application'>
        <SideBar />
        <Header
          searchQuery={searchQuery}
          userAvatar={userAvatar}
          userFirstLetter={userFirstLetter}
          signOut={signOut}
          dispatch={dispatch}
        />
        <Templates
          templates={templates}
          currentSortType={currentSortType}
          filteredTemplates={filteredTemplates}
          dispatch={dispatch}
        />
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
