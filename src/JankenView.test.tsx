import React from 'react'
import {render} from '@testing-library/react'
import JankenView from './JankenView'

describe('JankeView', () => {
  test('タイトルを表示する', () => {
    const {queryByText} = render(<JankenView/>)
    const titleElement = queryByText('Janken Game')

    expect(titleElement).toBeInTheDocument()
  })
})

