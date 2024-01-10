import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ChatContainer from '../public/src/components/ChatContainer'; // Update the path accordingly

describe('ChatContainer Component Tests', () => {
  const mockSocket = {
    current: {
      on: jest.fn(),
      emit: jest.fn(),
    },
  };

  const mockCurrentChat = { _id: 'chatId' };

  test('renders without crashing', () => {
    render(<ChatContainer currentChat={mockCurrentChat} socket={mockSocket} />);
    expect(screen.getByTestId('chat-container')).toBeInTheDocument();
  });

  test('sends and receives messages', async () => {
    const mockMessages = [
      { _id: '1', fromSelf: false, message: 'Hello' },
      { _id: '2', fromSelf: true, message: 'Hi there' },
    ];

    // Mock the axios.post and axios.delete requests
    const axiosMock = new MockAdapter(axios);
    axiosMock.onPost('/receiveMessageRoute').reply(200, mockMessages);
    axiosMock.onPost('/sendMessageRoute').reply(200, { status: true });

    render(<ChatContainer currentChat={mockCurrentChat} socket={mockSocket} />);

    // Simulate sending a message
    const inputField = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(inputField, { target: { value: 'Test message' } });
    fireEvent.keyPress(inputField, { key: 'Enter', code: 13, charCode: 13 });

    // Wait for message to be sent and received
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(mockSocket.current.emit).toHaveBeenCalledWith('send-msg', expect.any(Object));
      expect(mockSocket.current.on).toHaveBeenCalledWith('msg-recieve', expect.any(Function));
    });

    // Simulate receiving a message
    mockSocket.current.on.mock.calls[0][1]('Received message');

    // Wait for the received message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Received message')).toBeInTheDocument();
    });
  });

  test('deletes a message', async () => {
    const mockMessages = [
      { _id: '1', fromSelf: false, message: 'Hello' },
      { _id: '2', fromSelf: true, message: 'Hi there' },
    ];

    const axiosMock = new MockAdapter(axios);
    axiosMock.onPost('/receiveMessageRoute').reply(200, mockMessages);
    axiosMock.onPost('/sendMessageRoute').reply(200, { status: true });
    axiosMock.onDelete('/deleteMessageRoute/1').reply(200, { status: true });

    render(<ChatContainer currentChat={mockCurrentChat} socket={mockSocket} />);

    // Simulate deleting a message
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Wait for the message to be deleted
    await waitFor(() => {
      expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });
  });
});
