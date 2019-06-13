import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

import prepareTitle from '../../utils/prepareTitle'
import BookFormDialog from './FormDialog'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
}))

const Book = ({ book, index, remove, update, isTitleUnique }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [isRemoveOpened, setRemoveOpened] = useState(false)
  const toggleRemoveDialog = () => {
    setRemoveOpened(prev => !prev)
  }

  const [isEditOpened, setEditOpened] = useState(false)
  const toggleEditDialog = () => {
    setEditOpened(prev => !prev)
  }

  const save = (values, i) => {
    update(values, i)
    enqueueSnackbar('Book updated successfully', {
      variant: 'success',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
  }

  const deleteBook = e => {
    e.preventDefault()
    remove(index)
    enqueueSnackbar('Book deleted successfully', {
      variant: 'success',
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
  }

  const classes = useStyles()

  return (
    <React.Fragment>
      <Dialog
        open={isRemoveOpened}
        onClose={toggleRemoveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this book?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={toggleRemoveDialog}
            color="default"
            variant="contained"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={deleteBook}
            color="secondary"
            autoFocus
            variant="contained"
            size="small"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <BookFormDialog
        open={isEditOpened}
        toggle={toggleEditDialog}
        book={book}
        index={index}
        save={save}
        isTitleUnique={isTitleUnique}
        editMode
      />

      <TableRow key={book.title}>
        <TableCell component="th" scope="row">
          {prepareTitle(book.title)}
        </TableCell>
        <TableCell>{book.author}</TableCell>
        <TableCell align="right">
          {dayjs(book.date).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell align="right">
          <Fab
            onClick={toggleEditDialog}
            size="small"
            color="primary"
            aria-label="Edit"
            className={classes.fab}
          >
            <Tooltip title="Edit">
              <EditIcon />
            </Tooltip>
          </Fab>
          <Fab
            onClick={toggleRemoveDialog}
            size="small"
            color="secondary"
            aria-label="Delete"
            className={classes.fab}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </Fab>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.instanceOf(Date).isRequired,
    ]),
  }).isRequired,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  isTitleUnique: PropTypes.func.isRequired,
}

export default Book
