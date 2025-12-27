import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [isLoggedIn, setisLoggedIn] = useState(0)
  return (
    <div style={{padding: "2rem"}}>
        <h1>Welcome to chai code</h1>
        <button
        onClick={()=>setisLoggedIn(!isLoggedIn)}
        >
          Toggle Login
        </button>
        <div>
          <h3>
            && Operator
          </h3>
          {!!isLoggedIn && <p>Welcome Here</p>}
        </div>

        <div>
          <h3>Ternery Opeartor</h3>
          {!!isLoggedIn ? <p>Welcome Here also</p> : "please login"}
        </div>
    </div>
  )
}

export default App
