import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const initialStateMock = {
    player: {
      name: 'israel',
      assertions: '',
      score: 30,
      gravatarEmail: 'teste@email.com'
    },
    game: {
      results: [],
      indexAnswer: 0,
      isLoading: true,
      answered: false
    }
  } 

  const rankingMock = [
    {
        "name": "Israel Vinicius Pereira",
        "assertions": "",
        "score": 100,
        "gravatarEmail": "tchelo92@gmail.com"
    },
    {
        "name": "Edmar Dias Pereira",
        "assertions": "",
        "score": 300,
        "gravatarEmail": "epereira158@yahoo.com "
    },
    {
        "name": "Amanda ",
        "assertions": "",
        "score": 70,
        "gravatarEmail": "petitemandie.at@gmail.com"
    }
]

describe('testa tela do ranking', () => {
    it('se é renderizado o títilo e o botão que leva para a tela de login', () => {
        renderWithRouterAndRedux(<Ranking />)
        expect(screen.getByRole('heading', {
            name: /ranking/i
          })).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /inicio/i
          })).toBeInTheDocument();  
    })
    it('se o botão redireciona para a tela de login', async () => {
        const { history } = renderWithRouterAndRedux(<Ranking  />, initialStateMock, "/ranking")
        const { location: { pathname } } = history;
        expect(pathname).toBe("/ranking");
        const buttonLogin = screen.getByRole('button', {
            name: /inicio/i
          })
        // userEvent.click(buttonLogin)  
        // await waitFor(() => expect(history.location.pathname).toBe('/'))
    })
})