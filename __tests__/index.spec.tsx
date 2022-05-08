import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';
describe('index page', () => {
  it('Should Render', () => {
    const subject = render(<Index />);
    expect(subject).not.toBeNull();
    expect(subject).not.toBeUndefined();
  });
});
