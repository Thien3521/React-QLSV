import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Message() {
  const location = useLocation();
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setIsError(location.state.isError);

      const timeoutId = setTimeout(() => {
        setMessage(null);
        setIsError(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state]);

  if (!message) {
    return <></>;
  }

  return (
    <div className={`alert alert-${isError ? "danger" : "success"}`}>
      {message}
    </div>
  );
}

export default Message;
