import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetAvatar from '../public/src/components/SetAvatar'; 

describe('SetAvatar Component Tests', () => {
  test('renders without crashing', () => {
    render(<SetAvatar />);
    expect(screen.getByText('Set Profile Picture')).toBeInTheDocument();
  
  });

  test('handles setting profile picture without selecting an avatar', async () => {
    render(<SetAvatar />);
    const setProfilePictureButton = screen.getByText('Set Profile Picture');

    userEvent.click(setProfilePictureButton);

    // Wait for the toast error message to appear
    await waitFor(() => {
      expect(screen.getByText('Please select an avatar')).toBeInTheDocument();
    });
  });

  
});
