import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card.jsx'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    username: "Ash",
    age: 21
  }

  let newArray = [1,2,3,4,5]  
  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb--2'>Tailwind Test</h1>
      <Card username="chai aur code" someObj={newArray} btnText="Click Me"/>
      <Card username="Ashil"  />
    </>
  )
}

export default App
