import React, { useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const DataLayerContext = React.createContext()

export const DataLayer = ({ initialstate, DataReducer, children }) => (
  <DataLayerContext.Provider value={useReducer(DataReducer, initialstate)}>
    {children}
  </DataLayerContext.Provider>
)

export const useDataLayerValue = () => useContext(DataLayerContext)

DataLayer.propTypes = {
  initialstate: PropTypes.any,
  DataReducer: PropTypes.any,
  children: PropTypes.any
}
