import React from "react";

interface TextMessage {
  message: string;
}

function ErrorContainer({ message }: TextMessage) {
  if (!message) return <div></div>;
  return (
    <div
      className="error-container"
      style={{
        borderRadius: 0,
        margin: 0,
        top: 0,
        paddingTop: 10,
        paddingBottom: 10
      }}
    >
      {message}
    </div>
  );
}

export default ErrorContainer;
