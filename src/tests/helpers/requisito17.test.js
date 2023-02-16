import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

afterEach(() => jest.clearAllMocks());


describe('Testes na tela de Feedback', () => {
  it('verifica se as informações aparece na tela corretamente', async () => {
    const initialState = {
      name: 'teste',
      assertions: 4,
      score: 60,
      gravatarEmail: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
      token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
      error: '',
    }
    const initialEntries = '/feedback'
    const {history} = renderWithRouterAndRedux(<App />, {player: initialState}, initialEntries )
    expect(await screen.findByText('teste')).toBeInTheDocument();
    const banner = await screen.findByRole('banner')
    expect(within(banner).getByText(/60/i))
    expect(screen.getByText(/Well Done!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ranking/i })).toBeInTheDocument();
  })

  // it('verifica se as os botão Play Again direciona corretamente', async () => {
  //   const initialState = {
  //     name: 'teste',
  //     assertions: 4,
  //     score: 60,
  //     gravatarEmail: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
  //     token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
  //     error: '',
  //   }
  //   const initialEntries = '/feedback'
  //   const {history} = renderWithRouterAndRedux(<Feedback />, {player: initialState}, initialEntries )

  //   const btnPlayAgain = await screen.findByRole('button', { name: /play again/i })
  //   // expect(history.location.pathname).toBe('/feedback');
  //   userEvent.click(btnPlayAgain);
  //   console.log(history);
  //   // expect(screen.getByText(/nome/i)).toBeInTheDocument();
  //   // expect(history.location.pathname).toBe('/');
    
  //   // const btnRanking = screen.getByRole('button', { name: /ranking/i })
  // })
})