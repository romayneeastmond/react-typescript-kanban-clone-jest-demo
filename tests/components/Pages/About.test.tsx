import React from 'react'
import ReactDOM from 'react-dom'

import About from '../../../src/components/Pages/About'

describe('<About />', () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<About />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    test('Default', () => {

    })
})

export { }