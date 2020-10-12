import { useStyletron } from 'baseui';
import React from 'react';

const Container = ({ children, innerStyle, outerStyle }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        margin: '0 24px',
        width: '100%',
        ...outerStyle,
      })}
    >
      <div
        className={css({
          maxWidth: '40em',
          width: '100%',
          ...innerStyle,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
