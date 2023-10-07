import { useOverlayScrollbars } from 'overlayscrollbars-react';
import React, { useEffect } from 'react';

export const ScrollerBase = (
  // @ts-ignore
  { children, className, style, ...properties },
  // @ts-ignore
  reference
) => {
  const [initialize] = useOverlayScrollbars({ defer: true });

  useEffect(() => {
    initialize(reference.current);
  }, [initialize, reference]);

  return (
    <div ref={reference} className={className} style={style} {...properties}>
      {children}
    </div>
  );
};

export const Scroller = React.forwardRef(ScrollerBase);
