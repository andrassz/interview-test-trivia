import { render } from '@testing-library/react';

import Final from './Final';

describe('Final', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Final />);
    expect(baseElement).toBeTruthy();
  });
});
