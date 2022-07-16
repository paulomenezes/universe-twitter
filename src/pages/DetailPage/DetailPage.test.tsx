import { render, screen } from '@testing-library/react';

import { DetailPage } from './DetailPage';

describe('<DetailPage />', () => {
  it('should render DetailPage', () => {
    render(<DetailPage />);

    const linkElement = screen.getByText(/Detail Page/i);
    expect(linkElement).toBeInTheDocument();
  });
});
