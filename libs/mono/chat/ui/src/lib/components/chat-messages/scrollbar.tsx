import React, { useCallback } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const Scroller = React.forwardRef(
  ({ children, className, style, ...props }, ref) => {
    const refSetter = useCallback(
      (scrollbarsRef) => {
        if (scrollbarsRef) {
          ref.current = scrollbarsRef.osInstance().getElements().viewport;
        }
      },
      [ref]
    );

    return (
      <OverlayScrollbarsComponent
        ref={refSetter}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </OverlayScrollbarsComponent>
    );
  }
);
