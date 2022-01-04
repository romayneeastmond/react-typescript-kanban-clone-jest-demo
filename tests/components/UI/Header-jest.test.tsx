import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from '../../../src/components/UI/Header'

describe('<Header /> Jest', () => {
    let container: HTMLDivElement

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    const renderHeaderComponent = (title: string | undefined): void => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<Router><Header title={title} /></Router>, container)
    }

    test('Default', () => {
        renderHeaderComponent(undefined)

        const title = document.querySelector('h5')

        expect(title!.textContent).toContain('React TypeScript Demo')
    })

    test('Title Changed', () => {
        renderHeaderComponent('Hello World')

        const title = document.querySelector('h5')

        expect(title!.textContent).toContain('Hello World')
    })
})

export { }