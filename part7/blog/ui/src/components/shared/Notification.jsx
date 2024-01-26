import './Notification.css';
import {useSelector} from 'react-redux';
export const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification?.message) {
    return null;
  }

  return (
    <div
      className={`notification ${notification?.type === 'error' ? 'error' : 'success'}`}
    >
      {notification.message}
    </div>
  );
};
