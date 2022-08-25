import React, { useReducer, useState } from 'react'

import { DataContext } from '../../contexts/DataContext'
import { ModalContext } from '../../contexts/ModalContext'
import { UserContext } from '../../contexts/UserContext'

import DataReducer, { initialState, ACTIONS } from '../../reducers/DataReducer'
import PropTypes from 'prop-types'

function DataLayer ({ children }) {
  const [state, dispatch] = useReducer(DataReducer, initialState)
  const [user, setUser] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(<></>)

  return (
      <DataContext.Provider value={{ state, dispatch, ACTIONS }}>
      <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={{ modalOpen, setModalOpen, modalContent, setModalContent }}>
        {children}
      </ModalContext.Provider>
      </UserContext.Provider>
      </DataContext.Provider>
  )
}

DataLayer.propTypes = {
  children: PropTypes.node
}

export default DataLayer
