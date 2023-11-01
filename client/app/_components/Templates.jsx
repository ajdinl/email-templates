import { useState, useEffect } from 'react'
import {
  BiUpArrowAlt,
  BiDownArrowAlt,
  useSession,
  ImSpinner9,
  Menu,
  MenuItem,
  Moment,
} from '@app/_components/ExternalComponents'

export default function Templates({
  templates,
  currentSortType,
  filteredTemplates,
  dispatch,
}) {
  const { data: session } = useSession()
  const userName = session?.user?.name
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (filteredTemplates) {
      dispatch({
        type: 'SET_FILTERED_TEMPLATES',
        payload: sortTemplatesBy(currentSortType),
      })
    }

    if (userName) {
      setLoading(false)
    }
  }, [currentSortType, userName])

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

  function openCreateModal() {
    dispatch({
      type: 'SET_CREATE_MODAL_VISIBLE',
      payload: true,
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
                    {loading ? (
                      <ImSpinner9 size={15} color='#4f9bec' />
                    ) : (
                      userName
                    )}
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
  )
}
