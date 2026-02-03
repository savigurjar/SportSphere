import { useState } from 'react'

import './App.css'
import AnimatedBackground from "./Animated"

function App() {


  return (
    <>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="relative z-10">
          {/* Your content here */} hello
        </div>
      </div>

    </>
  )
}

export default App
