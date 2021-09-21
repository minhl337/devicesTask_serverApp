import React from "react"

const types = ["WINDOWS_WORKSTATION", "MAC", "WINDOWS_SERVER"]

const Modal = ({ activeDevice, close, saveDevice }) => {
  const [name, setName] = React.useState(activeDevice.system_name)
  const [type, setType] = React.useState(activeDevice.type)
  const [hdd, setHDD] = React.useState(activeDevice.hdd_capacity)
  const isNew = activeDevice.system_name ? false : true

  const handleChange = (input, value) => {
    if (value === "name") {
      setName(input)
    } else if (value === "type") {
      setType(input)
    } else if (value === "hdd") {
      setHDD(input)
    }
  }

  const handleSave = () => {
    saveDevice(
      activeDevice.id,
      {
        system_name: name,
        type,
        hdd_capacity: hdd,
      },
      isNew ? "POST" : "PUT"
    )
  }

  return (
    <div id="modal">
      <div id="title">
        <div>{isNew ? "Add" : "Edit"} Device</div>
      </div>
      <div id="input-area">
        <div id="input-block">
          <div id="input-label">
            <label>System Name * </label>
          </div>
          <div>
            <input
              type="text"
              id="input"
              required
              value={name}
              onChange={(e) => handleChange(e.target.value, "name")}
            />
          </div>
        </div>
        <div id="input-block">
          <div id="input-label">
            <label>Type * </label>
          </div>
          <div>
            <select
              value={type || "default"}
              onChange={(e) => handleChange(e.target.value, "type")}
              id="input-select"
              required
            >
              <option value="default" disabled hidden>
                Select Type
              </option>
              {types.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id="input-block">
          <div id="input-label">
            <label>HDD Capacity (GB) * </label>
          </div>
          <div>
            <input
              type="text"
              id="input"
              required
              value={hdd}
              onChange={(e) => handleChange(e.target.value, "hdd")}
            />
          </div>
        </div>
        <div></div>
      </div>
      <div id="input-buttons">
        <button id="input-button" className="save" onClick={handleSave}>
          Save
        </button>
        <button id="input-button" className="close" onClick={() => close()}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
