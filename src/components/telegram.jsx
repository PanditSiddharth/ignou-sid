// TelegramLogin.js
import { toast } from 'react-toastify';
import TelegramLoginButton from 'react-telegram-login';

const TelegramLogin = () => {
  const handleTelegramResponse = (response) => {
    toast.success(
      'Logged in as ' +
        response.first_name +
        ' ' +
        ' (' +
        response.id +
        (response.username ? ', @' + response.username : '') +
        ')'
    );
    // You can perform further actions upon successful authentication
  };

  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName="sid_sharma_bot"
      size="large"
      requestAccess="write"
    />
  );
};

export default TelegramLogin;

