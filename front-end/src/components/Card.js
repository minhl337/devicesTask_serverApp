import React from "react"

export const deviceTypes = {
  WINDOWS_WORKSTATION: "Windows Workstation",
  WINDOWS_SERVER: "Windows Server",
  MAC: "Mac",
}

const Card = ({ cardInfo, deleteDevice, edit, setActiveDevice }) => {
  const handleClick = () => {
    setActiveDevice(cardInfo)
    edit()
  }

  return (
    <div id="card">
      <div>{cardInfo.system_name}</div>
      <div id="deviceType">{deviceTypes[cardInfo.type]}</div>
      <div>{cardInfo.hdd_capacity} GB</div>
      <div id="buttons">
        <button id="button" className="edit" onClick={handleClick}>
          Edit
        </button>
        <button
          id="button"
          className="delete"
          onClick={() => deleteDevice(cardInfo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Card
