import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent } from '@testing-library/react'

import TaskEdit from '../../../src/components/Project/TaskEdit'

describe('<TaskEdit />', () => {
    let container: HTMLDivElement

    const onEditTaskClickImplementation = (id: string, task: string, content: string) => {
        return `Received ${id} ${task} ${content}`
    }

    const onEditTaskClick = jest.fn(onEditTaskClickImplementation)

    const hideShowEditTask = jest.fn()

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)

        ReactDOM.render(<TaskEdit id={'2000'} taskId={'11'} content={'Hello World'} onEditTaskClick={onEditTaskClick} hideShowEditTask={hideShowEditTask} />, container)
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
        expect(textareas[0].value).toBe('Hello World')

        expect(inputs).toHaveLength(2)

        expect(inputs[0].value).toBe('Update')
        expect(inputs[1].value).toBe('Cancel')

        const label = document.querySelector('label')

        expect(label!.textContent).toContain('Edit Task')
    })

    test('Inputting Task and Save', () => {
        const textareas = document.querySelectorAll('textarea')
        const inputs = document.querySelectorAll('input')

        const taskTextarea = textareas[0]
        const saveButton = inputs[0]

        fireEvent.change(taskTextarea, { target: { value: 'foo bar' } })
        fireEvent.click(saveButton)

        expect(onEditTaskClick).toHaveBeenCalled()
        expect(onEditTaskClick).toHaveBeenCalledWith('2000', '11', 'foo bar')
        expect(onEditTaskClick).toReturnWith('Received 2000 11 foo bar')
    })

    test('Cancel Click', () => {
        const inputs = document.querySelectorAll('input')

        const cancelButton = inputs[1]

        fireEvent.click(cancelButton)

        expect(hideShowEditTask).toHaveBeenCalled()
        expect(hideShowEditTask).toReturn()
    })

    test('Form Submit', () => {
        const textareas = document.querySelectorAll('textarea')
        const forms = document.querySelectorAll('form')

        fireEvent.submit(forms[0])

        expect(textareas[0].value).toBe('Hello World')
    })
})

export { }