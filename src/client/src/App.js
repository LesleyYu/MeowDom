import React, {useState, useEffect} from 'react'

// useState will be used to create a state variable which will contain the data retreived from the backend, and also render the data on the page.
// useEffect will be used to fetch the backend api on the first render.

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      { (typeof data.members === "undefined" ) ? (
        <p> Loading... </p>
      ): (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  )
}

export default App