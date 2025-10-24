import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signin from '../src/Pages/SignIn/SignIn';

jest.mock('../src/Utils/Logger', () => ({
  handleError: jest.fn(),
  handleSuccess: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignIn Component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  test('shows error if missing credentials', async () => {
    const { handleError } = require('../src/Utils/Logger');
    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Login'));
    await waitFor(() =>
      expect(handleError).toHaveBeenCalledWith('Missing email or password ')
    );
  });

  test('handles successful login', async () => {
    const { handleSuccess } = require('../src/Utils/Logger');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            message: 'Login successful!',
            token: 'fake-token',
          }),
      })
    );

    render(
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { name: 'email', value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { name: 'password', value: '123456' },
    });

    fireEvent.submit(screen.getByText('Login'));

    await waitFor(() => expect(handleSuccess).toHaveBeenCalledWith('Login successful!'));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});
