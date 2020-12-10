import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';

import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('Should be able to sign in', () => {
    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user-123',
        name: 'Jogn Doe',
        email: 'johndoe@example.com',
      },
      token: 'token-123',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });
});
