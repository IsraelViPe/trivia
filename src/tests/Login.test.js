import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

import Login from '../pages/Login'


describe('if Login renders inputs fields', () => {
  it('checks if name input exist', () => {
    renderWithRouterAndRedux(<Login />)
    const input = screen.getByRole('textbox', {
      name: /nome/i
    })

    expect(input).toBeInTheDocument()
  })
  it('checks if email input exist', () => {
    renderWithRouterAndRedux(<Login />)
    const input = screen.getByRole('textbox', {
      name: /email/i
    })

    expect(input).toBeInTheDocument()
  })
  it('check if name and email are typped corectly on inputs', () => {
    renderWithRouterAndRedux(<Login />, { initialEntries: ['/'] });
    const inputEmail = screen.getByRole('textbox', {
      name: /email/i
    })
    const inputName = screen.getByRole('textbox', {
      name: /nome/i
    })

    userEvent.type(inputEmail, 'teste@teste.com')
    expect(inputEmail.value).toBe('teste@teste.com')

    userEvent.type(inputName, 'Fulaninho')
    expect(inputName.value).toBe('Fulaninho')
  })
})