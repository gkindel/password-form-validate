import type { Meta, StoryObj } from '@storybook/react';
import ValidatingForm from '../module/ValidatingForm.tsx';
import { userEvent, within, expect } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ValidatingForm',
  component: ValidatingForm,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ValidatingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const GoodPassword: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('input_password'), 'Aa3#56');

    await userEvent.type(canvas.getByTestId('confirm_password'), 'Aa3#56');

    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Successfully validated!')).toBeInTheDocument();
  },
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BadPassword: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 👇 Simulate interactions with the component
    await userEvent.type(canvas.getByTestId('input_password'), ' ');

    await userEvent.type(canvas.getByTestId('confirm_password'), 'Aa3#56');

    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByRole('button'));

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Password requires at least 1 uppercase character')).toBeInTheDocument();
  },
};
