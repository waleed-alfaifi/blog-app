import React from 'react';

function Message(props) {
  const { text, position, marginDirection, marginSize } = props;
  return (
    <div>
      <h4
        className={`text-${position} text-muted m${marginDirection}-${marginSize}`}
      >
        {text}
      </h4>
    </div>
  );
}

export default Message;
