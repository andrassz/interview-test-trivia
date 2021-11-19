import { act, renderHook } from '@testing-library/react-hooks';
import useLocalStorageState from './use-local-storage-state';

describe('useLocalStorageState', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useLocalStorageState());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
