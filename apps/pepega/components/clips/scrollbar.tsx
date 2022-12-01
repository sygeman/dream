import React, { useCallback } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const Scroller = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ({ children, className, style, ...props }, ref) => {
    const refSetter = useCallback(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (scrollbarsRef) => {
        if (scrollbarsRef) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
