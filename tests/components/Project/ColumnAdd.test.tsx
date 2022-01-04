import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react'

import ColumnAdd from '../../../src/components/Project/ColumnAdd'

describe('<ColumnAdd />', () => {
    let container: HTMLDivElement

    const onAddColumnClickImplementation = (columnName: string) => {
        return `Received ${columnName}`
    }

    const onAddColumnClick = jest.fn(onAddColumnClickImplementation)

    const hideShowAddColumn = jest.fn()

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<ColumnAdd onAddColumnClick={onAddColumnClick} hideShowAddColumn={hideShowAddColumn} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()

        jest.clearAllMocks()
    })

    test('Default', () => {
        const inputs = document.querySelectorAll('input')

        expect(inputs).toHaveLength(3)

        expect(inputs[0].value).toBe('')
        expect(inputs[1].value).toBe('Save')
        expect(inputs[2].value).toBe('Cancel')

        const label = document.querySelector('label')

        expect(label!.textContent).toContain('Column Name')
    })

    test('Inputting Column Name and Save', () => {
        const inputs = document.querySelectorAll('input')

        const columnNameInput = inputs[0]
        const saveButton = inputs[1]

        fireEvent.change(columnNameInput, { target: { value: 'Hello World' } })
        fireEvent.click(saveButton)

        expect(onAddColumnClick).toHaveBeenCalled()
        expect(onAddColumnClick).toHaveBeenCalledWith('Hello World')
        expect(onAddColumnClick).toReturnWith('Received Hello World')
    })

    test('Cancel Click', () => {
        const inputs = document.querySelectorAll('input')

        const cancelButton = inputs[2]

        fireEvent.click(cancelButton)

        expect(hideShowAddColumn).toHaveBeenCalled()
        expect(hideShowAddColumn).toReturn()
    })

    test('Form Submit', () => {
        const inputs = document.querySelectorAll('input')
        const forms = document.querySelectorAll('form')

        fireEvent.submit(forms[0])

        expect(inputs[0].value).toBe('')
    })
})

export { }