import {
  BOOKS_LOAD,
  BOOK_ADD,
  BOOK_UPDATE,
  BOOK_DELETE,
  SET_LOADING,
} from './actionTypes'

const reducer = (state, action) => {
  switch (action.type) {
    case BOOKS_LOAD:
      return {
        ...state,
        books: action.payload,
        loading: false,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }

    case BOOK_ADD:
      return {
        ...state,
        books: [action.payload, ...state.books],
      }

    case BOOK_UPDATE: {
      return {
        ...state,
        books: [
          ...state.books.slice(0, action.payload.index),
          action.payload.book,
          ...state.books.slice(action.payload.index + 1),
        ],
      }
    }

    case BOOK_DELETE: {
      return {
        ...state,
        books: [
          ...state.books.slice(0, action.payload),
          ...state.books.slice(action.payload + 1),
        ],
      }
    }

    default:
      return state
  }
}

export default reducer
