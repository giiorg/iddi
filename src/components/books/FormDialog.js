import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, ErrorMessage } from 'formik'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import prepareTitle from '../../utils/prepareTitle'
import DatePicker from '../DatePicker'
import bookSchema from '../../api/books/validationSchema'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}))

const BookFormDialog = ({
  editMode,
  book,
  index,
  open,
  toggle,
  save,
  isTitleUnique,
}) => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  const initialValues = editMode
    ? {
        ...book,
        date: new Date(book.date),
      }
    : {
        title: '',
        author: '',
        date: new Date(),
      }

  const validateTitle = value => {
    if (prepareTitle(value) === '') {
      return 'Required'
    }
    return !isTitleUnique(value, index) ? 'Title is already in use' : undefined
  }

  const submit = ({ title, author, date }, actions) => {
    if (!isTitleUnique(title, index)) {
      actions.setFieldError('title', 'Title is already in use')
      actions.setSubmitting(false)
      return
    }

    const bookToSave = {
      title,
      author: author.trim(),
      date,
    }

    save(bookToSave, index)

    if (isMounted.current) {
      actions.setSubmitting(false)
      toggle()
    }
  }

  const classes = useStyles()

  return (
    <Dialog
      fullWidth
      disableRestoreFocus
      open={open}
      onClose={toggle}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {editMode ? `Edit book: ${book.title}` : 'Create book'}
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={bookSchema}
        onSubmit={submit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          isSubmitting,
          isValid,
          submitCount,
        }) => {
          const isSubmitted = submitCount > 0

          return (
            <form onSubmit={handleSubmit} autoComplete="off">
              <DialogContent>
                <Field type="text" name="title" validate={validateTitle}>
                  {({ field }) => (
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={isSubmitted && errors.title && touched.title}
                    >
                      <InputLabel required htmlFor="title">
                        Title
                      </InputLabel>
                      <Input
                        {...field}
                        id="title"
                        autoFocus
                        aria-describedby="title-error-text"
                      />
                      {isSubmitted && (
                        <ErrorMessage
                          name="title"
                          render={errMessage => (
                            <FormHelperText id="title-error-text">
                              {errMessage}
                            </FormHelperText>
                          )}
                        />
                      )}
                      {field.value && (
                        <FormHelperText>
                          Will be displayed as "{prepareTitle(field.value)}"
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>

                <Field type="text" name="author">
                  {({ field }) => (
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={isSubmitted && errors.author && touched.author}
                    >
                      <InputLabel required htmlFor="author">
                        Author
                      </InputLabel>
                      <Input
                        {...field}
                        id="author"
                        aria-describedby="author-error-text"
                      />
                      {isSubmitted && (
                        <ErrorMessage
                          name="author"
                          render={errMessage => (
                            <FormHelperText id="author-error-text">
                              {errMessage}
                            </FormHelperText>
                          )}
                        />
                      )}
                    </FormControl>
                  )}
                </Field>

                <FormControl
                  fullWidth
                  className={classes.formControl}
                  error={isSubmitted && errors.date && touched.date}
                >
                  <Field name="date" component={DatePicker} />
                  {isSubmitted && (
                    <ErrorMessage
                      name="date"
                      render={errMessage => (
                        <FormHelperText id="date-error-text">
                          {errMessage}
                        </FormHelperText>
                      )}
                    />
                  )}
                </FormControl>
              </DialogContent>

              <DialogActions>
                <Button
                  variant="contained"
                  onClick={toggle}
                  color="default"
                  size="small"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="small"
                  disabled={isSubmitting || (isSubmitted && !isValid)}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </DialogActions>
            </form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

BookFormDialog.defaultProps = {
  editMode: false,
  open: false,
}

BookFormDialog.propTypes = {
  editMode: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date).isRequired,
    ]),
  }),
  index: PropTypes.number,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  isTitleUnique: PropTypes.func.isRequired,
}

export default BookFormDialog
