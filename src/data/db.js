import { v4 as uuid } from 'uuid'

const predefinedItems = [
    { id: uuid(), content: 'Clicking on a task or column should add a focus css class. Adds conditional styles based on the click or mouse down event.' },
    {
        id: uuid(), content: <>
            <h3>React</h3>
            <p>
                A JavaScript library for building user interfaces.
            </p>
        </>
    },
    {
        id: uuid(), content: <>
            <h5>TypeScript is JavaScript with syntax for types.</h5>
            <p>
                TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
            </p>
        </>
    },
    {
        id: uuid(), content: <>
            <h1>h1. Bootstrap heading</h1>
            <h2>h2. Bootstrap heading</h2>
            <h3>h3. Bootstrap heading</h3>
            <h4>h4. Bootstrap heading</h4>
            <h5>h5. Bootstrap heading</h5>
            <h6>h6. Bootstrap heading</h6>
        </>
    },
    { id: uuid(), content: <><strong>Task with code block</strong><br />For example, <code>&lt;section&gt;</code> should be wrapped as inline.</> },
    { id: uuid(), content: <>Will need to test what a task with lots of text looks like.</> },
    { id: uuid(), content: <><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Task with two paragraphs.</p></> },
    { id: uuid(), content: <>This is a test task with a body that contains a link and some HTML code.<br /><a href='https://www.google.com'>Hello World</a></> },
    { id: uuid(), content: <>The quick brown fox jumps over the lazy dog</> },
    { id: uuid(), content: <>😀 😎 👍 💯<br /><br />Emoji hype!</> }
]

const predefinedColumns =
{
    [uuid()]: {
        name: 'To Do',
        items: predefinedItems
    },
    [uuid()]: {
        name: 'In Progress',
        items: []
    },
    [uuid()]: {
        name: 'Done',
        items: []
    },
    [uuid()]: {
        name: 'Backlog',
        items: []
    },
    [uuid()]: {
        name: 'Bugs',
        items: []
    }
}

export const project = {
    id: uuid(),
    name: 'Kanban Project Clone',
    description: 'Testing drag and drop functionality and horizontal mouse scrolling.',
    columns: predefinedColumns
}