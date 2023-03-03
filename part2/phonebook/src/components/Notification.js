import React from 'react'

const Notification = ({ message, success }) => {
  if(message === null) return null

  return(
    <div className='error' style={{ color: `${success ? "green" : "red"}` }}>
      {message}
    </div>
  )
}

export default Notification