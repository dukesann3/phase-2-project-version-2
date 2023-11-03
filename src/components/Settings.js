import { useOutletContext } from "react-router-dom";

function Settings() {

    const [isLoggedIn] = useOutletContext();

    return (
      <div>
        {isLoggedIn ? `Welcome to Settings User` : 'Welcome to Settings'}
      </div>
    );
  }
  
  export default Settings;