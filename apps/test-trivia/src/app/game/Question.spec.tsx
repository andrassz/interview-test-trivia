import { render } from '@testing-library/react';

import Question from './Question';

describe('Question', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Question />);
    expect(baseElement).toBeTruthy();
  });
});
