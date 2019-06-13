import { useReducer } from 'react'
import {
  BOOKS_LOAD,
  BOOK_ADD,
  BOOK_UPDATE,
  BOOK_DELETE,
  SET_LOADING,
} from './actionTypes'
import reducer from './reducer'
import prepareTitle from '../../utils/prepareTitle'

const initialState = {
  books: [],
  loading: false,
}

const useBooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setBooks = books => {
    dispatch({
      type: BOOKS_LOAD,
      payload: books,
    })
  }

  const setLoading = isLoading => {
    dispatch({
      type: SET_LOADING,
      payload: isLoading,
    })
  }

  const add = book => {
    dispatch({
      type: BOOK_ADD,
      payload: book,
    })
  }

  const update = (book, index) => {
    dispatch({
      type: BOOK_UPDATE,
      payload: {
        book,
        index,
      },
    })
  }

  const remove = index => {
    dispatch({
      type: BOOK_DELETE,
      payload: index,
    })
  }

  const isTitleUnique = (title, index) =>
    state.books.findIndex((book, i) => {
      return index !== i && prepareTitle(book.title) === prepareTitle(title)
    }) === -1

  return {
    books: state.books,
    loading: state.loading,
    dispatch,
    setBooks,
    setLoading,
    add,
    update,
    remove,
    isTitleUnique,
  }
}

export default useBooks
