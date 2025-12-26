import { use, useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //use ref hook
  const passwordRef=useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password);
  }, [password])

  const passWordGenerator = useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*()_+=[]"
    }
    for(let i=1; i<=length; i++)
    {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passWordGenerator()
  }, [length, numberAllowed, charAllowed, passWordGenerator])

  return (
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-900">
    <h1 className="text-white text-center my-3 text-lg">
      Password generator
    </h1>

    <div className="flex shadow-inner rounded-lg overflow-hidden mb-4 bg-slate-800">
      <input
        type="text"
        value={password}
        className="outline-none w-full bg-white text-black py-2 px-3 bg-slate-900 text-black placeholder-gray-400"
        placeholder="Password"
        readOnly
        ref={passwordRef}
      />
      <button
        className="outline-none bg-blue-600 text-white px-4 py-2 shrink-0"
        onClick={copyPasswordToClipboard}
      >
        copy
      </button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
            type="range"
            id="LengthInput"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
        />
        <label htmlFor="LengthInput"className='text-white'>Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} 
        />
        <label htmlFor="numberInput" className='text-white'>Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=>{
              setCharAllowed((prev)=> !prev)
            }} 
        />
        <label htmlFor="charInput" className='text-white'>Character</label>
      </div>

    </div>

  </div>
);

}

export default App
