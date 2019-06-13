import React from 'react'
import BooksList from './books/BooksList'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    flexGrow: 1,
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <Container fixed className={classes.root} maxWidth="md">
      <BooksList />
    </Container>
  )
}

export default App
