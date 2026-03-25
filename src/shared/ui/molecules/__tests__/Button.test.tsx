import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('calls onPress when enabled', () => {
    const onPress = jest.fn();

    render(<Button label="Continuar" onPress={onPress} />);

    fireEvent.press(screen.getByText('Continuar'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();

    render(<Button disabled label="Continuar" onPress={onPress} />);

    fireEvent.press(screen.getByText('Continuar'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
