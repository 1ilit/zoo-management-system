import nodeLogo from './assets/node.svg'
import { useState } from 'react'
import Update from '@/components/update'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='App'>
      <h1>Hello world <i className='fa-regular fa-heart'></i></h1>
      <div className='card'>
        <button className = 'btn btn-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    
      <Update />
    </div>
  )
}

export default App
