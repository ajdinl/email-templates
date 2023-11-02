'use client'

import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import { reducer, initialState } from '@app/state/reducer'
import { deleteTemplate } from '@/api/'
import TemplateForm from './forms/TemplateForm'
import DeleteModal from './modals/DeleteModal'
import EditModal from './modals/EditModal'
import PreviewModal from './modals/PreviewModal'
import Header from './Header'
import SideBar from './SideBar'
import Templates from './templates/Templates'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { signOut, useSession } from '@app/_components/ExternalComponents'

export default function Page({ templates }) {
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
