import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a header as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/IP-Lookup/gi)).toBeTruthy();
  });
});
