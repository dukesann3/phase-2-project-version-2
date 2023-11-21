import { useState, useEffect } from "react";

const useDark = () => {

  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDark')) || false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isDark')) === false || JSON.parse(localStorage.getItem('isDark')) === null) {
      setIsDark(false);
      localStorage.setItem('isDark', false);
      window.document.body.style.background = 'white';
      window.document.body.style.color = 'black';
    }
    else {
      setIsDark(true);
      localStorage.setItem('isDark', true);
      window.document.body.style.background = 'black';
      window.document.body.style.color = 'white';
    }
  }, []);

  return [isDark, setIsDark];

}

export default useDark;