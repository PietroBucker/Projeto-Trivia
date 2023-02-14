import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Ranking from '../../pages/Ranking';

afterEach(() => jest.clearAllMocks());


describe('Testes na tela de Ranking', () => {
    it('verifica se as informações aparece na tela corretamente', async () => {
      const initialState = {
        name: 'teste',
        assertions: 4,
        score: 60,
        gravatarEmail: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
        token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
        error: '',
      }
      const initialEntries = '/Ranking'
      const {history} = renderWithRouterAndRedux(<App />, {player: initialState}, initialEntries )

      expect(await screen.findByRole('heading', { name: /teste/i})).toBeInTheDocument();
      const btnInicio = screen.getByRole('button', { name: /voltar ao início/i})

      
      // expect(await screen.findByRole('heading', { name: /teste2/i})).toBeInTheDocument();
  });
});
