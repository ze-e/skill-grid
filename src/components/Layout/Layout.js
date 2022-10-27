import React from 'react'
import PropTypes from 'prop-types'
import DataLayer from '../DataLayer/DataLayer'
import Header from '../Header/Header'
import Modal from '../Modal/ModalContainer'
import Footer from '../Footer/Footer'

export default function Layout ({ children }) {
  return (
    <DataLayer>
      <Header />
      <div className='main'>
        {children}
        <Modal />
      </div>
      <Footer />
    </DataLayer>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
