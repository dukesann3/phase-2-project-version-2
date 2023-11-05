//add redirect functionality 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    },3000)
  })

    return (
      <>
        error bro
      </>
    );
  }
  
  export default ErrorPage;