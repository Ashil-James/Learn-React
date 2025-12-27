import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  console.log("App rendered", Math.random())
  const [value, setValue] = useState({
    value: 0,
  })
  //const [multipliedValue, setMultipliedValue] = useState(1)

  // let multipliedValue= value*5

  // const multiplybyfive = () =>{
  //     //setMultipliedValue(value*5)   
  //     setValue(value+1)
  // }
  // return (
  //   <>
  //       <h1>Main Value: {value} </h1>
  //       <button
  //       onClick={multiplybyfive}
  //       >
  //         Click to multiply by 5 
  //       </button>
  //       <h2>Multiplied Value: {multipliedValue} </h2>
  //   </>
  // )

  const clickMe = () =>{
    setValue({
      value:0
    })
  } 
  return (
    <>
         <h1>Main Value: {value.value} </h1>
         <button
         onClick={clickMe}
         >
           Click to multiply by 5 
         </button>
    </>
  )
}

export default App

/* 
  When state changes the entire component re-renders
*/
