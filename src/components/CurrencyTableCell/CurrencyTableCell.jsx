import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, TableCell, Icon, IconButton, makeStyles, TableRow, TextField, Typography, InputLabel } from '@material-ui/core'
import clsx from 'clsx'

import DialogComponent from 'src/components/Dialog'
import { icons } from 'src/vendor/icons'
import { useDispatch } from 'react-redux'
import { editCurrency, removeCurrency } from 'src/store/reducers/currenciesSlice'
import { updateCurrenciesData } from 'src/API/updateCurrencyData'
import { removeCurrencyData } from 'src/API/removeCurrencyData'


const useStyles = makeStyles((theme) => ({
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,

    '&:last-child': {
      marginRight: 0
    }
  },
  editIcon: {
    color: theme.palette.success.light
  },
  removeIcon: {
    color: theme.palette.error.main
  },
  editBodyInputBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,

    '& .MuiFormHelperText-root': {
      color: theme.palette.text.primary
    },

    '&:last-child': {
      marginBottom: 0
    }
  },
  exitBodyInputLabel: {
    marginBottom: 5,
    color: theme.palette.text.primary
  },
  text: {
    color: theme.palette.text.primary
  }
}))

const EditDialogBody = ({
  defaultValues = {
    name: '',
    rate: 0
  },
  handleUpdate = () => { }
}) => {
  const [nameValue, setNameValue] = useState(defaultValues.name)
  const [rateValue, setRateValue] = useState(defaultValues.rate)
  const classes = useStyles();

  // Send updated value to parent component
  useEffect(() => {
    handleUpdate({
      name: nameValue,
      rate: rateValue,
    });
  }, [nameValue, rateValue]);


  return (
    <Box>
      <Box className={classes.editBodyInputBox}>
        <InputLabel
          className={classes.exitBodyInputLabel}
          htmlFor="currency_name"
        >
          Name
        </InputLabel>
        <TextField
          id="currency_name"
          variant="outlined"
          placeholder="Enter name"
          value={nameValue}
          onChange={({ target }) => setNameValue(target.value)}
        />
      </Box>

      <Box className={classes.editBodyInputBox}>
        <InputLabel
          className={classes.exitBodyInputLabel}
          htmlFor="currency_rate"
        >
          Rate
        </InputLabel>
        <TextField
          id="currency_rate"
          variant="outlined"
          placeholder="Enter rate"
          type="number"
          helperText="Type only number"
          value={rateValue}
          onChange={({ target }) => setRateValue(Number(target.value))}
        />
      </Box>
    </Box>
  )
}

const RemoveDialogBody = () => {
  return (
    <Box>
      <Typography
        component="p"
        variant="body1"
        color="textPrimary"
      >
        Are you sure want to remove this Currency ?
      </Typography>
    </Box>
  )
}

const CurrencyTableCell = ({
  id, name, rate, idForShow
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const updatedCurrencyRef = useRef({
    id,
    name,
    rate
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEditCurrency = () => {
    setLoading(true);

    updateCurrenciesData(updatedCurrencyRef.current)
      .then(() => {
        dispatch(editCurrency(updatedCurrencyRef.current))
      })
      .finally(() => {
        setEditDialogOpen(false);
        setLoading(false);
      })
  }

  const handleRemoveCurrency = () => {
    setLoading(true);

    removeCurrencyData(id)
      .then(() => {
        dispatch(removeCurrency(id));
      })
      .finally(() => {
        setRemoveDialogOpen(false);
        setLoading(false);
      })
  }

  const classes = useStyles();


  return (
    <TableRow>
      <DialogComponent
        open={editDialogOpen}
        title="Edit Currency"
        onDecline={() => setEditDialogOpen(false)}
        onAccept={handleEditCurrency}
        loading={loading}
      >
        <EditDialogBody
          defaultValues={{
            name,
            rate
          }}
          handleUpdate={(updatedCurrency) => {
            updatedCurrencyRef.current = {
              ...updatedCurrencyRef.current,
              ...updatedCurrency
            }
          }}
        />
      </DialogComponent>

      <DialogComponent
        open={removeDialogOpen}
        title="Remove Currency"
        onDecline={() => setRemoveDialogOpen(false)}
        onAccept={() => handleRemoveCurrency()}
        loading={loading}
      >
        <RemoveDialogBody />
      </DialogComponent>

      <TableCell component="th" scope="row" className={classes.text}>
        {idForShow}
      </TableCell>
      <TableCell className={classes.text}>
        {name}
      </TableCell>
      <TableCell className={classes.text}>
        {rate}
      </TableCell>

      <TableCell align="right">
        <Box>
          <IconButton
            size="small"
            className={clsx(classes.editIcon, {
              [classes.icon]: true
            })}
            onClick={() => setEditDialogOpen(true)}
          >
            <Icon component={icons.edit} />
          </IconButton>

          <IconButton
            size="small"
            className={clsx(classes.removeIcon, {
              [classes.icon]: true
            })}
            onClick={() => setRemoveDialogOpen(true)}
          >
            <Icon component={icons.trash} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

CurrencyTableCell.propTypes = {
  id: PropTypes.string.isRequired,
  idForShow: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number
}

export default CurrencyTableCell
