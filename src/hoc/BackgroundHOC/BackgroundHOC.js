import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
}))

const BackgroundHOC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

BackgroundHOC.propTypes = {
  children: PropTypes.node.isRequired
}

export default BackgroundHOC
