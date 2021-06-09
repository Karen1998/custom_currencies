import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { Container, makeStyles, Typography, Box, Button, TextField, InputLabel, InputAdornment, Icon, fade } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as _ from 'lodash';

import TableContainer from 'src/containers/TableContainer';
import DialogComponent from 'src/components/Dialog';
import { icons } from 'src/vendor/icons';
import { addCurrency } from 'src/store/reducers/currenciesSlice'
import { postCurrenciesData } from 'src/API/postCurrencyData';


const useStyles = makeStyles((theme) => ({
  currenciesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.text.primary
  },
  dialogInputBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    color: theme.palette.text.primary,

    '& .MuiFormHelperText-root': {
      color: theme.palette.text.primary
    },

    '&:last-child': {
      marginBottom: 0
    }
  },
  dialogInputLabel: {
    marginBottom: 5,
    color: theme.palette.text.primary
  },
  tableWrapper: {
    marginTop: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: fade(theme.palette.secondary.main, .2)
  },
  searchInputWrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  tableBox: {
    marginTop: 15
  },
}))

const AddDialogBody = ({
  handleUpdate = () => { }
}) => {
  const [newNameValue, setNewNameValue] = useState('')
  const [newRateValue, setNewRateValue] = useState(0)
  const classes = useStyles();

  // Send updated value to parent component
  useEffect(() => {
    handleUpdate({
      name: newNameValue,
      rate: newRateValue,
    });
  }, [newNameValue, newRateValue]);


  return (
    <Box>
      <Box className={classes.dialogInputBox}>
        <InputLabel
          className={classes.dialogInputLabel}
          htmlFor="currency_name"
        >
          Name
        </InputLabel>
        <TextField
          autoFocus
          id="currency_name"
          variant="outlined"
          placeholder="Enter name"
          value={newNameValue}
          onChange={({ target }) => setNewNameValue((target.value))}
        />
      </Box>

      <Box className={classes.dialogInputBox}>
        <InputLabel
          className={classes.dialogInputLabel}
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
          value={newRateValue}
          onChange={({ target }) => {
            if (target.value < 0) {
              return false
            }
            setNewRateValue((Number(target.value)))
          }}
        />
      </Box>
    </Box>
  )
}

const TabletWrapper = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const classes = useStyles();

  return (
    <Box className={classes.tableWrapper}>
      <Box className={classes.searchInputWrapper}>
        <TextField
          placeholder="Search currency by Currency name"
          variant="outlined"
          onChange={({ target }) => setSearchValue(target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon component={icons.search} />
              </InputAdornment>
            )
          }}
          style={{
            minWidth: 316
          }}
        />
      </Box>

      <Box className={classes.tableBox}>
        {cloneElement(children, { searchValue })}
      </Box>
    </Box >
  )
}


const CurrenciesList = props => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const newCurrencyRef = useRef({
    name: '',
    rate: 0
  });

  const dispatch = useDispatch();

  const handleAddNewCurrency = () => {
    // Creating new currency object with unique id
    const newCurrency = {
      ...newCurrencyRef.current,
      id: _.uniqueId(),
    };
    // Sending data to firebase
    postCurrenciesData(newCurrency)
      .then(() => {
        // Init data to redux after success
        dispatch(addCurrency(newCurrency))
      })
      .finally(() => setOpenAddDialog(false));
  }

  const classes = useStyles();

  return (
    <Container>
      <DialogComponent
        open={openAddDialog}
        title="Add Currency"
        onDecline={() => setOpenAddDialog(false)}
        onAccept={handleAddNewCurrency}
      >
        <AddDialogBody
          handleUpdate={(newCurrency) => newCurrencyRef.current = { ...newCurrency }}
        />
      </DialogComponent>

      <Box component="main" paddingTop="15px">
        <Box className={classes.currenciesHeader}>
          <Typography component="h2" variant="h3">
            Custom Currencies
          </Typography>

          <Button
            variant="contained"
            style={{
              alignSelf: 'flex-end'
            }}
            onClick={() => setOpenAddDialog(true)}
          >
            ADD CURRENCY
          </Button>
        </Box>

        <TabletWrapper>
          <TableContainer />
        </TabletWrapper>
      </Box>
    </Container>
  )
}

export default CurrenciesList
