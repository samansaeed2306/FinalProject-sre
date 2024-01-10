import { render, screen, fireEvent } from '@testing-library/react';
import Contacts from '../public/src/components/Contacts'; // Update the path accordingly

describe('Contacts Component Tests', () => {
  const mockContacts = [
    { _id: '1', username: 'User1', avatarImage: 'avatar1' },
    { _id: '2', username: 'User2', avatarImage: 'avatar2' },
    
  ];

  const mockChangeChat = jest.fn();

  test('renders without crashing', () => {
    render(<Contacts contacts={mockContacts} changeChat={mockChangeChat} />);
    // Check if the component renders without any errors
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  test('changes current chat on contact click', () => {
    render(<Contacts contacts={mockContacts} changeChat={mockChangeChat} />);

    // Assuming the first contact is rendered initially
    const firstContact = screen.getByText('User1');

    // Simulate a click on the first contact
    fireEvent.click(firstContact);

    // Check if the changeChat function is called with the correct contact
    expect(mockChangeChat).toHaveBeenCalledWith(mockContacts[0]);
  });

});
