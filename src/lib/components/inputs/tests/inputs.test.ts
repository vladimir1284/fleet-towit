import { render, fireEvent } from '@testing-library/svelte';
import NameInputComponent from '../NameInputComponent.svelte';
import { expect, test, it } from "vitest";
import EmailInputComponent from '../EmailInputComponent.svelte';

test('EmailInputComponent', () => {
  it('renders correctly', () => {
    const { container } = render(EmailInputComponent, {
      props: {
        placeholder: 'Enter email',
        constraints: {},
        errors: {},
        form: { email: '' },
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('handles input changes', async () => {
    const { getByRole } = render(EmailInputComponent, {
      props: {
        placeholder: 'Enter email',
        constraints: {},
        errors: {},
        form: { email: '' },
      },
    });

    const input = getByRole('textbox') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: 'test@example.com' } });

    expect(input.value).toBe('test@example.com');
  });
});


test('NameInputComponent', () => {
  it('renders the component', () => {
    const { getByPlaceholderText } = render(NameInputComponent, {
      props: { placeholder: 'Enter your name', constraints: {}, errors: {}, form: {} },
    });

    expect(getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });
});
