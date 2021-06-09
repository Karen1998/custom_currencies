import React, { useEffect, useState } from 'react';
import { makeStyles, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CircularProgress, fade } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Loader from 'src/utils/Loader'
import CurrencyTableCell from 'src/components/CurrencyTableCell';
import { currenciesSelector } from 'src/store/reducers/currenciesSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: fade(theme.palette.secondary.main, 0)
  },
  table: {
    minWidth: 650,
  },
  text: {
    color: theme.palette.text.primary
  }
}));

const tableHeadIfo = [{
  name: 'ID',
  id: 'some_unique_4684646315_id'
}, {
  name: 'Currency Name',
  id: 'some_unique_8603458606_id'
}, {
  name: 'Rate(1$ = X rate)',
  id: 'some_unique_2257759847_id'
}];


const CustomTableContainer = ({ searchValue }) => {
  const { data, loading } = useSelector(currenciesSelector);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    setCurrencies(data);

    if (searchValue.trim() !== '') {
      setCurrencies(data.filter((currency) => {
        return currency.name.toLowerCase().includes(searchValue)
      }))
    }
  }, [data, searchValue])


  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadIfo.map(({ name, id }) => (
              <TableCell
                key={id}
                align="left"
                className={classes.text}
              >
                {name}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>

        {loading === 'pending' ? (
          <Loader height="150px" />
        ) : (
          <TableBody>
            {currencies.map((row, index) => (
              <CurrencyTableCell
                {...row}
                key={row.id}
                idForShow={index + 1}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  )
}

export default CustomTableContainer
