import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '../pages/home/index';

describe('Home Page', () => {
  it('Should Not Be Null', () => {
    const subject = render(<Home />);

    expect(subject).not.toBeNull();
    expect(subject).not.toBeUndefined();
  });

  it('Should Contain a Login Button', async () => {
    render(<Home />);
    const loginButton = await screen.findAllByTestId('login_button');

    expect(loginButton).not.toBeNull();
    expect(loginButton).not.toBeUndefined();
    expect(loginButton).toBeEnabled();
  });

  it('Should contain a Signup Button', async () => {
    render(<Home />);
    const loginButton = await screen.findAllByTestId('signup_button');

    expect(loginButton).not.toBeNull();
    expect(loginButton).not.toBeUndefined();
    expect(loginButton).toBeEnabled();
  });
});
