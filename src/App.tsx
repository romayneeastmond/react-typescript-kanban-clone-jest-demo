import React from 'react'
import { Routes, Route } from 'react-router-dom'

import About from './components/Pages/About'

import Header from './components/UI/Header'
import Project from './components/Project/Project'

import './App.scss'

const App: React.FC<{}> = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Project />} />
                <Route path='/about/*' element={<About />} />
                <Route path='*' element={<Project />} />
            </Routes>
        </>
    )
}

export default App
