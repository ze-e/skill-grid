import React from 'react'

import DataLayer from './DataLayer/DataLayer'
import Header from './Header/Header'
import SkillView from './SkillView'
import Modal from './Modal/ModalContainer'

function App () {
  return (
    <DataLayer>
      <Header />
        <div className='main'>
          <SkillView />
          <Modal />
        </div>
      </DataLayer>
  )
}

export default App
