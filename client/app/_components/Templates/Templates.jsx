import { useState, useEffect } from 'react'
import TemplatesListSkeleton from './TemplatesListSkeleton'
import TemplatesList from './TemplatesList'

export default function Templates({
  templates,
  currentSortType,
  filteredTemplates,
  dispatch,
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (filteredTemplates) {
      dispatch({
        type: 'SET_FILTERED_TEMPLATES',
        payload: sortTemplatesBy(currentSortType),
      })

      setLoading(false)
    }
  }, [currentSortType])

  function openCreateModal() {
    dispatch({
      type: 'SET_CREATE_MODAL_VISIBLE',
      payload: true,
    })
  }

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

  return (
    <div className='application__content'>
      <div className='application__content__header'>
        <h1 className='application__content__header__title'>Email Templates</h1>
        <a
          onClick={openCreateModal}
          className='application__content__header__link'
        >
          + New Template
        </a>
      </div>
      {loading ? (
        <TemplatesListSkeleton templatesLength={templates.length} />
      ) : templates.length === 0 ? (
        'No templates found'
      ) : (
        <TemplatesList
          filteredTemplates={filteredTemplates}
          currentSortType={currentSortType}
          sortTemplatesBy={sortTemplatesBy}
          dispatch={dispatch}
        />
      )}
    </div>
  )
}
