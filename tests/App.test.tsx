import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../src/App'

describe('<App />', () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<Router><App /></Router>, container)
    })    

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    test('Default', () => {
        
    })
})

export { }