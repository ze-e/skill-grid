import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";

export default function ProfileImg({ img }) {
    const history = useHistory();

  return (
    <div className='profileImg'>
      <div className='profileImg__img' style={{ backgroundImage: `url(${img.src})` }}></div>
      <button className='profileImg__edit m-button' type='button' onClick={()=>{history.push("/editAvatar");}} >Edit Avatar</button>
    </div>
  )
}

ProfileImg.propTypes = {
  img: PropTypes.object
}
