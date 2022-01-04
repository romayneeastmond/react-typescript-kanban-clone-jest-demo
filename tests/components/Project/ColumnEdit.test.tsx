import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react'

import ColumnEdit from '../../../src/components/Project/ColumnEdit'

describe('<ColumnEdit />', () => {
    let container: HTMLDivElement

    const onEditColumnClickImplementation = (id: string, columnName: string) => {
        return `Received ${id} ${columnName}`
    }

    const onEditColumnClick = jest.fn(onEditColumnClickImplementation)

    const hideShowEditColumn = jest.fn()

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<ColumnEdit id={'11'} name={'Hello World'} onEditColumnClick={onEditColumnClick} hideShowEditColumn={hideShowEditColumn} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()

        jest.clearAllMocks()
    })

    test('Default', () => {
        const inputs = document.querySelectorAll('input')

        expect(inputs).toHaveLength(3)

        expect(inputs[0].value).toBe('Hello World')
        expect(inputs[1].value).toBe('Update')
        expect(inputs[2].value).toBe('Cancel')

        const label = document.querySelector('label')

        expect(label!.textContent).toContain('Column Name')
    })

    test('Inputting Column Name and Save', () => {
        const inputs = document.querySelectorAll('input')

        const columnNameInput = inputs[0]
        const saveButton = inputs[1]

        fireEvent.change(columnNameInput, { target: { value: 'foo bar' } })
        fireEvent.click(saveButton)

        expect(onEditColumnClick).toHaveBeenCalled()
        expect(onEditColumnClick).toHaveBeenCalledWith('11', 'foo bar')
        expect(onEditColumnClick).toReturnWith('Received 11 foo bar')
    })

    test('Cancel Click', () => {
        const inputs = document.querySelectorAll('input')

        const cancelButton = inputs[2]

        fireEvent.click(cancelButton)

        expect(hideShowEditColumn).toHaveBeenCalled()
        expect(hideShowEditColumn).toReturn()
    })

    test('Form Submit', () => {
        const inputs = document.querySelectorAll('input')
        const forms = document.querySelectorAll('form')

        fireEvent.submit(forms[0])

        expect(inputs[0].value).toBe('Hello World')
    })
})

export { }