import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react'

import TaskAdd from '../../../src/components/Project/TaskAdd'

describe('<TaskAdd />', () => {
    let container: HTMLDivElement

    const onAddTaskClickImplementation = (id: string, task: string) => {
        return `Received ${id} ${task}`
    }

    const onAddTaskClick = jest.fn(onAddTaskClickImplementation)

    const hideShowAddTask = jest.fn()

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<TaskAdd id={'26'} onAddTaskClick={onAddTaskClick} hideShowAddTask={hideShowAddTask} />, container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()

        jest.clearAllMocks()
    })

    test('Default', () => {
        const textareas = document.querySelectorAll('textarea')
        const inputs = document.querySelectorAll('input')

        expect(textareas).toHaveLength(1)
        expect(textareas[0].value).toBe('')

        expect(inputs).toHaveLength(2)

        expect(inputs[0].value).toBe('Save')
        expect(inputs[1].value).toBe('Cancel')

        const label = document.querySelector('label')

        expect(label!.textContent).toContain('Task')
    })

    test('Inputting Task and Save', () => {
        const textareas = document.querySelectorAll('textarea')
        const inputs = document.querySelectorAll('input')

        const taskTextarea = textareas[0]
        const saveButton = inputs[0]

        fireEvent.change(taskTextarea, { target: { value: 'Hello World' } })
        fireEvent.click(saveButton)

        expect(onAddTaskClick).toHaveBeenCalled()
        expect(onAddTaskClick).toHaveBeenCalledWith('26', 'Hello World')
        expect(onAddTaskClick).toReturnWith('Received 26 Hello World')
    })

    test('Cancel Click', () => {
        const inputs = document.querySelectorAll('input')

        const cancelButton = inputs[1]

        fireEvent.click(cancelButton)

        expect(hideShowAddTask).toHaveBeenCalled()
        expect(hideShowAddTask).toReturn()
    })

    test('Form Submit', () => {
        const textareas = document.querySelectorAll('textarea')
        const forms = document.querySelectorAll('form')

        fireEvent.submit(forms[0])

        expect(textareas[0].value).toBe('')
    })
})

export { }