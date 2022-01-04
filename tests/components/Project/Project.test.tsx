import React from 'react'
import ReactDOM from 'react-dom'

import Project from '../../../src/components/Project/Project'

describe('<App />', () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<Project />, container)
    })    

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    test('Default', () => {
        
    })
})

export {}