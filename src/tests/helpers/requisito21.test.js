import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { questionsResponse } from './mock/questions';
import { act } from 'react-dom/test-utils';

afterEach(() => jest.clearAllMocks());

describe('Teste o componentes da Page Game', () => {
  it('testa se ao logar no jogo existe 1 pergunta', async () => {
    const tokenResponse = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };
    jest.spyOn(global, 'fetch').mockImplementation(async (endpoint) => ({
      json: jest.fn().mockImplementation( async () => {
        if(endpoint === 'https://opentdb.com/api_token.php?command=request'){
          return tokenResponse;
        }
        if(endpoint === `https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`) {
         return questionsResponse;
        }
      })
    }))

    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', { name: /nome/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste teste')
    userEvent.type(inputEmail, 'teste@teste.com')

    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay)
    expect(await screen.findByTestId('question-category'))
    expect(await screen.findByRole('heading', { name: /show do milhão/i }))
    expect(global.fetch).toHaveBeenCalled()
    expect(history.location.pathname).toBe('/game')
    //teste resposta certa
    expect(screen.getByText('The Republic of Malta is the smallest microstate worldwide.')).toBeInTheDocument();
    const btnCorrect = screen.getByRole('button', { name: /False/i });
    userEvent.click(btnCorrect);
    expect(btnCorrect).toHaveAttribute('class', 'correct-answer');

    const btnNext = screen.getByRole('button', { name: /next/i });
    userEvent.click(btnNext);

    // teste resposta errada
    expect(screen.getByText('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?')).toBeInTheDocument();
    const btnWrong = screen.getByRole('button', { name: /Z boson/i });
    userEvent.click(btnWrong);
    expect(btnWrong).toHaveAttribute('class', 'wrong-answer');

    userEvent.click(btnNext);
    
    //teste se ao clicar desabilita os botões e revela todas as respostas
    expect(screen.getByText('Generally, which component of a computer draws the most power?')).toBeInTheDocument();
    const btnTestQuestionWrong = screen.getAllByTestId(/wrong-answer/i);
    const btnTestQuestionCorrect = screen.getAllByTestId('correct-answer');

    userEvent.click(btnTestQuestionCorrect[0]);

    expect(btnTestQuestionWrong).toHaveLength(3);
    expect(btnTestQuestionCorrect).toHaveLength(1);

    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    expect(await screen.findByText('teste teste')).toBeInTheDocument();

    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(btnRanking);

    expect(screen.getByRole('heading', { name: /teste teste/i }))


    

  })
  it('testando o timer', async () => {
    const tokenResponse = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };
    jest.spyOn(global, 'fetch').mockImplementation(async (endpoint) => ({
      json: jest.fn().mockImplementation( async () => {
        if(endpoint === 'https://opentdb.com/api_token.php?command=request'){
          return tokenResponse;
        }
        if(endpoint === `https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`) {
         return questionsResponse;
        }
      })
    }))

    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', { name: /nome/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste teste')
    userEvent.type(inputEmail, 'teste@teste.com')
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay)
    expect(await screen.findByTestId('question-category'))
    expect(await screen.findByRole('heading', { name: /show do milhão/i }))

    expect(await screen.findByText('20', {}, { timeout: 10000 })).toBeInTheDocument();
  }, 11000)

  it('Testa o caminho do play again', async () => {
    const tokenResponse = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    };
    jest.spyOn(global, 'fetch').mockImplementation(async (endpoint) => ({
      json: jest.fn().mockImplementation( async () => {
        if(endpoint === 'https://opentdb.com/api_token.php?command=request'){
          return tokenResponse;
        }
        if(endpoint === `https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`) {
         return questionsResponse;
        }
      })
    }))

    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', { name: /nome/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste teste')
    userEvent.type(inputEmail, 'teste@teste.com')

    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay)
    expect(await screen.findByTestId('question-category'))
    expect(await screen.findByRole('heading', { name: /show do milhão/i }))
    expect(global.fetch).toHaveBeenCalled()
    expect(history.location.pathname).toBe('/game')
    //teste resposta certa
    expect(screen.getByText('The Republic of Malta is the smallest microstate worldwide.')).toBeInTheDocument();
    const btnCorrect = screen.getByRole('button', { name: /False/i });
    userEvent.click(btnCorrect);
    expect(btnCorrect).toHaveAttribute('class', 'correct-answer');

    const btnNext = screen.getByRole('button', { name: /next/i });
    userEvent.click(btnNext);

    // teste resposta errada
    expect(screen.getByText('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?')).toBeInTheDocument();
    const btnWrong = screen.getByRole('button', { name: /Z boson/i });
    userEvent.click(btnWrong);
    expect(btnWrong).toHaveAttribute('class', 'wrong-answer');

    userEvent.click(btnNext);
    
    //teste se ao clicar desabilita os botões e revela todas as respostas
    expect(screen.getByText('Generally, which component of a computer draws the most power?')).toBeInTheDocument();
    const btnTestQuestionWrong = screen.getAllByTestId(/wrong-answer/i);
    const btnTestQuestionCorrect = screen.getAllByTestId('correct-answer');

    userEvent.click(btnTestQuestionCorrect[0]);

    expect(btnTestQuestionWrong).toHaveLength(3);
    expect(btnTestQuestionCorrect).toHaveLength(1);

    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    expect(await screen.findByText('teste teste')).toBeInTheDocument();
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    userEvent.click(btnPlayAgain)
    expect(history.location.pathname).toBe('/')
    expect(await screen.findByRole('button', { name: /play/i}))
  })

  it('teste se o token estiver errado volta a pagina inicial', async () => {
    const tokenResponse = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127"
    };
    jest.spyOn(global, 'fetch').mockImplementation(async (endpoint) => ({
      json: jest.fn().mockImplementation( async () => {
        if(endpoint === 'https://opentdb.com/api_token.php?command=request'){
          return tokenResponse;
        }
        if(endpoint === `https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`) {
         return questionsResponse;
        }
      })
    }))

    const { history } = renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', { name: /nome/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste teste')
    userEvent.type(inputEmail, 'teste@teste.com')

    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay)
    expect(await screen.findByRole('button', { name: /play/i}))
    expect(history.location.pathname).toBe('/')
  })
})