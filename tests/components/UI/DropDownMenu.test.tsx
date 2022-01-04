import React from 'react'
import ReactDOM from 'react-dom'

import DropDownMenu from '../../../src/components/UI/DropDownMenu'

describe('<DropDownMenu />', () => {
    let container: HTMLDivElement

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })

    const renderDropDownMenuComponent = (title: string | undefined, children?: JSX.Element): void => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<DropDownMenu title={title}>{children}</DropDownMenu>, container)
    }

    test('Default', () => {
        renderDropDownMenuComponent(undefined)

        const title = document.querySelector('h6')

        expect(title!.textContent).toContain('Menu Options')
    })

    test('Title Change', () => {
        renderDropDownMenuComponent('Hello World')

        const title = document.querySelector('h6')

        expect(title!.textContent).toContain('Hello World')
    })

    test('With Children', () => {
        renderDropDownMenuComponent('Test Options', <><a href=''>Link 1</a><a href=''>Link 2</a></>)

        const title = document.querySelector('h6')
        const children = document.querySelectorAll('a')

        expect(title!.textContent).toContain('Test Options')
        expect(children.length).toBe(2)
    })
})

export { }