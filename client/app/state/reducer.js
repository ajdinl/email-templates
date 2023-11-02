export const reducer = (state, action) => {
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

export const initialState = {
  searchQuery: '',
  filteredTemplates: [],
  currentSortType: null,
  selectedTemplate: null,
  userFirstLetter: '',
  createModalVisible: false,
  editModalVisible: false,
  deleteModalVisible: false,
  previewModalVisible: false,
}
