import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa tela de login', () => {
  it('verifica se existe inputs de Nome e Email na tela', () => {
    renderWithRouterAndRedux(<App />)
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  })
  
  it('verifica se existe botôes Play e Configuração na tela', () => {
    renderWithRouterAndRedux(<App />)
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /configuração/i })).toBeInTheDocument();
  })

  it('verifica se o botao play esta desabilitado e fica abilitado apos preencher os campos corretamente, e se clicado direciona para pagina /game ', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', { name: /nome/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const btnPlay = screen.getByRole('button', { name: /play/i });

    expect(btnPlay).toBeDisabled();

    userEvent.type(inputName, 'teste teste')
    userEvent.type(inputEmail, 'teste@teste.com')

    expect(btnPlay).toBeEnabled();

    userEvent.click(btnPlay);
    expect(await screen.findByRole('heading', { name: /show do milhão/i, level: 2 }))
    expect(history.location.pathname).toBe('/game');
    expect(await screen.findByText('teste teste')).toBeInTheDocument()
  })

  it('verifica se ao clicar no botao configurações e direciona a pagina para /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const btnSetting = screen.getByRole('button', { name: /configuração/i });
    userEvent.click(btnSetting)
    expect(history.location.pathname).toBe('/settings');
  })
})