import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'adminaccount',
        password: 'adminspassword12345!',
        password1: 'adminspassword12345!'
      },
    });
    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('returns false for empty inputs', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '',
        password: '',
        password1: ''
      },
    });
    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
    });
  });

  test('returns false for empty passwords', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'adminaccount',
        password: '',
        password1: ''
      },
    });
    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
    });
  });

  test('returns false for mismatching passwords', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'adminaccount',
        password: 'adminspassword12345!',
        password1: 'adminspassword12345'
      },
    });
    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
    });
  });
});


