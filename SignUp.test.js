import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../src/Pages/SignUp/SignUp';

jest.mock('../src/Utils/Logger', () => ({
  handleError: jest.fn(),
  handleSuccess: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignUp Component', () => {
  beforeEach(() => jest.clearAllMocks());

  test('renders form fields', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByText('SignUp Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  test('shows error when inputs are empty', async () => {
    const { handleError } = require('../src/Utils/Logger');
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('SignUp'));
    await waitFor(() =>
      expect(handleError).toHaveBeenCalledWith('Missing email , password or name')
    );
  });

  test('handles successful signup', async () => {
    const { handleSuccess } = require('../src/Utils/Logger');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, message: 'Signup successful!' }),
      })
    );

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { name: 'name', value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { name: 'email', value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { name: 'password', value: '123456' },
    });

    fireEvent.submit(screen.getByText('SignUp'));

    await waitFor(() => expect(handleSuccess).toHaveBeenCalledWith('Signup successful!'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
