import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
 
  test('should be able to submit form', () => {
    const logger = jest.spyOn(console, "log");
    const { getByRole, getByTestId } = render(<CreateAccount />);
    const button = getByRole('button');
    expect(button).toBeTruthy();
    fireEvent.submit(getByTestId("form"));
    expect(logger).toBeCalledTimes(1);
  })

});
