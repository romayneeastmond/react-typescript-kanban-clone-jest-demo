import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import Header from '../../../src/components/UI/Header'

describe('<Header /> testing-library/react', () => {
    test('Default', () => {
        render(
            <Router><Header /></Router>,
        )

        expect(screen.getByText('React TypeScript Demo', { exact: false })).toBeInTheDocument()
    })

    test('Title Changed', () => {
        render(
            <Router><Header title='Hello World' /></Router>,
        )

        expect(screen.getByText('Hello World', { exact: false })).toBeInTheDocument()
    })
})

export { }