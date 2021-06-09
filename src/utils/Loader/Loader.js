import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

const Loader = (styles) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="#fff"
      {...styles}
    >
      <CircularProgress style={{ color: "#fff" }} />
    </Box>
  )
}


export default Loader
