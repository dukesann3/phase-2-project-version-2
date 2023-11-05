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
        <h1>ERROR PAGE NOT FOUND 404</h1>
      </>
    );
  }
  
  export default ErrorPage;