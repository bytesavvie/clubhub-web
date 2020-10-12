import { useStyletron } from 'baseui';
import React from 'react';

const Container = ({ children, innerStyle, outerStyle }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        ...outerStyle,
      })}
    >
      <div
        className={css({
          boxSizing: 'border-box',
          maxWidth: '1407px',
          padding: '0 45.5px',
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
