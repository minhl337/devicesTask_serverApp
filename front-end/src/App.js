import React from "react"
import "./App.css"

import Card from "./components/Card"
import Modal from "./components/Modal"

const deviceOptions = ["All", "Windows Workstation", "Mac", "Windows Server"]
const sortOptions = ["", "System Name", "HDD Capacity"]

function App() {
  const [initialDevices, setInitialDevices] = React.useState([])
  const [devices, setDevices] = React.useState([])

  const [sortOption, setSortOption] = React.useState("")
  const [filterOption, setFilterOption] = React.useState("All")

  const [modalOpen, setModalOpen] = React.useState(false)
  const [activeDevice, setActiveDevice] = React.useState({})

  React.useEffect(() => {
    fetch("http://localhost:5000/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data)
        setInitialDevices(data)
      })
  }, [])

  React.useEffect(() => {
    let deviceArray = [...devices]

    if (sortOption === "System Name") {
      setDevices(
        deviceArray.sort((a, b) => {
          return a.system_name > b.system_name ? 1 : -1
        })
      )
    } else if (sortOption === "HDD Capacity") {
      setDevices(
        deviceArray.sort((a, b) => {
          return parseInt(a.hdd_capacity) > parseInt(b.hdd_capacity) ? 1 : -1
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption])

  React.useEffect(() => {
    if (filterOption === "All") {
      setDevices(initialDevices)
    } else {
      let sortedDevices = [...initialDevices].filter((device) => {
        return device.type === filterOption.replace(/ /g, "_").toUpperCase()
      })
      setDevices(sortedDevices)
    }
    setSortOption("")
  }, [initialDevices, filterOption])

  const createOption = (option) => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    )
  }

  const deleteDevice = (id) => {
    fetch("http://localhost:5000/devices/" + id, {
      method: "DELETE",
    })
    let initialDeviceArray = [...initialDevices].filter(
      (device) => device.id !== id
    )

    setInitialDevices(initialDeviceArray)
  }

  const saveDevice = (id, body, type) => {
    const options = {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
    const url =
      type === "PUT"
        ? `http://localhost:5000/devices/${id}`
        : "http://localhost:5000/devices/"

    fetch(url, options)

    let updatedDevies = [...initialDevices]
    if (type === "PUT") {
      updatedDevies.map((device, index) => {
        if (device.id === id) {
          updatedDevies.splice(index, 1, {
            id,
            ...body,
          })
        }
      })
    } else {
      updatedDevies = [
        ...updatedDevies,
        {
          system_name: body.system_name,
          type: body.type,
          hdd_capacity: body.hdd_capacity,
        },
      ]
    }
    setInitialDevices(updatedDevies)
    setModalOpen(!modalOpen)
  }

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleNewClick = () => {
    setActiveDevice({})
    handleModal()
  }

  return (
    <div className="App">
      {modalOpen ? (
        <Modal
          close={handleModal}
          activeDevice={activeDevice}
          saveDevice={saveDevice}
        />
      ) : (
        <>
          <div id="selection-container">
            <div id="filter">
              <label htmlFor="device-types">Device Type: </label>
              <select
                value={filterOption}
                name="device-types"
                id="device-types"
                onChange={(e) => setFilterOption(e.target.value)}
              >
                {deviceOptions.map((option) => createOption(option))}
              </select>
            </div>
            <div id="sortBy">
              <label htmlFor="sort-by">Sort By: </label>
              <select
                value={sortOption}
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map((option) => createOption(option))}
              </select>
            </div>
            <div id="add-new">
              <button id="add-new-button" onClick={handleNewClick}>
                Add New
              </button>
            </div>
          </div>
          <div id="card-container">
            {devices.map((device) => (
              <Card
                setActiveDevice={setActiveDevice}
                cardInfo={device}
                key={device.id}
                deleteDevice={deleteDevice}
                edit={handleModal}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
