import { useState, useEffect } from "react";

const useDark = () => {

    const [isDark, setIsDark] = useState(localStorage.getItem('isDark') ? JSON.parse(localStorage.getItem('isDark')) : false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('isDark')) === false) {
          setIsDark(false);
          window.document.body.style.background = 'white';
          window.document.body.style.color = 'black';
        }
        else {
          setIsDark(true);
          window.document.body.style.background = 'black';
          window.document.body.style.color = 'white';
        }
      },[]);

      return [isDark, setIsDark];

}

export default useDark;