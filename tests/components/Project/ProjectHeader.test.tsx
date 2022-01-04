import React from 'react'
import ReactDOM from 'react-dom'

import ProjectHeader from '../../../src/components/Project/ProjectHeader'

describe('<ProjectHeader />', () => {
    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        const project = {
            name: 'Hello World',
            description: 'foo bar'
        }

        ReactDOM.render(<ProjectHeader project={project} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    test('Default', () => {
        const title = document.querySelector('h1')
        const subTitle = document.querySelector('h2')

        expect(title!.textContent).toContain('Hello World')
        expect(subTitle!.textContent).toContain('foo bar')
    })
})

export { }