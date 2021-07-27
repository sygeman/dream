import React, { useCallback } from 'react';
import { ScrollerProps } from 'react-virtuoso';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const Scroller: React.ComponentType<ScrollerProps> = React.forwardRef(
  ({ children, style }, ref) => {
    const refSetter = useCallback(
      (scrollbarsRef) => {
        if (scrollbarsRef) {
          ref.current = scrollbarsRef.osInstance().getElements().viewport;
        }
      },
      [ref]
    );

    return (
      <OverlayScrollbarsComponent ref={refSetter} style={style}>
        {children}
      </OverlayScrollbarsComponent>
    );
  }
);
