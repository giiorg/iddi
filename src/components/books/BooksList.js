/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

import useBooks from '../../api/books/useBooks'
import BookFormDialog from './FormDialog'
import Book from './Book'

const apiEndpoint = '/books.json'

const useStyles = makeStyles(theme => ({
  heading: {
    marginBottom: 40,
  },
  table: {
    minWidth: 350,
  },
  fab: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  progress: {
    margin: theme.spacing(2),
  },
}))

const Books = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [isAddOpened, setAddOpened] = useState(false)
  const toggleAddDialog = () => {
    setAddOpened(prev => !prev)
  }

  const {
    books,
    loading,
    setLoading,
    setBooks,
    add,
    update,
    remove,
    isTitleUnique,
  } = useBooks()

  const save = values => {
    add(values)
    enqueueSnackbar('Book created successfully', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
  }

  useEffect(() => {
    setLoading(true)

    axios
      .get(apiEndpoint)
      .then(res => {
        setBooks(res.data)
      })
      .catch(err => {
        setLoading(false)
        enqueueSnackbar('Something goes wrong while loading books', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
        console.log('err:', err)
      })
  }, [])

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography
        className={classes.heading}
        align="center"
        variant="h1"
        component="h2"
      >
        Books Library
      </Typography>

      <Button
        onClick={toggleAddDialog}
        color="primary"
        variant="contained"
        className={classes.button}
      >
        <AddIcon className={classes.leftIcon} />
        Add new book
      </Button>

      <BookFormDialog
        open={isAddOpened}
        toggle={toggleAddDialog}
        save={save}
        isTitleUnique={isTitleUnique}
      />

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={4}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            books.map((book, index) => (
              <Book
                key={book.title}
                book={book}
                index={index}
                update={update}
                remove={remove}
                isTitleUnique={isTitleUnique}
              />
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default Books
