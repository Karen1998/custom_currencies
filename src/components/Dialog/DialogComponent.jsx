import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from '@material-ui/core'
import BackgroundHOC from 'src/hoc/BackgroundHOC'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
  }
}))

const DialogComponent = ({
  open,
  title,
  children,
  onDecline,
  onAccept,
  acceptValid,
  loading
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onDecline}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
      fullWidth
    >
      <BackgroundHOC>
        <DialogTitle
          id="alert-dialog-title"
          color="#fff"
        >
          {title}
        </DialogTitle>

        <DialogContent>
          {children}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onDecline}
            color="#fff"
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={onAccept}
            variant="contained"
            autoFocus
            disabled={!acceptValid || loading}
          >
            {loading ? 'Loading ...' : 'Confirm'}
          </Button>
        </DialogActions>
      </BackgroundHOC>
    </Dialog>
  )
}

DialogComponent.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  onDecline: PropTypes.func,
  onAccept: PropTypes.func,
  acceptValid: PropTypes.bool,
  loading: PropTypes.bool,
}

DialogComponent.defaultProps = {
  acceptValid: true
}

export default DialogComponent
