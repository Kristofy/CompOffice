import { render, screen, waitFor } from '@testing-library/react';
import {ConnectedFormItem} from './connected';

describe('ConnectedFormItem'        , () => {
  const mockProps = {
    props: {
      type: {
        connected_table: 'mockTable',
        connected_value: 'mockValue',
        connected_label: 'mockLabel',
      },
    },
    field: {
      onChange: jest.fn(),
      value: 'mockValue',
    },
  };

  it('should render a loading state when data is loading', async () => {
    const mockUseQuery = jest.fn(() => ({
      data: null,
      status: 'loading',
    }));
    jest.mock('@/trpc/client/client', () => ({
      serverGetByTableName: mockUseQuery,
    }));

    render(<ConnectedFormItem {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('should render an error state when data is in error state', async () => {
    const mockUseQuery = jest.fn(() => ({
      data: null,
      status: 'error',
    }));
    jest.mock('@/trpc/client/client', () => ({
      serverGetByTableName: mockUseQuery,
    }));

    render(<ConnectedFormItem {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  it('should render a select component with connected data when data is loaded successfully', async () => {
    const mockData = [
      {
        mockValue: 'value1',
        mockLabel: 'label1',
      },
      {
        mockValue: 'value2',
        mockLabel: 'label2',
      },
    ];
    const mockUseQuery = jest.fn(() => ({
      data: mockData,
      status: 'success',
    }));
    jest.mock('@/trpc/client/client', () => ({
      serverGetByTableName: mockUseQuery,
    }));

    render(<ConnectedFormItem {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('label1')).toBeInTheDocument();
      expect(screen.getByText('label2')).toBeInTheDocument();
    });
  });
});