import { useEffect, useRef, useState } from 'react';

export const useChatScroll = ({ updateTriggers }) => {
  const ref = useRef<any>();
  const [scrollPosition, setScrollPosition] = useState(1);

  const toBottom = () => {
    if (!ref.current) return;
    const el = ref.current.getScrollElement();
    el.scrollTop = el.scrollHeight;
  };

  const chatScroll = () => {
    const el = ref.current.getScrollElement();
    const p = Math.round(el.scrollTop);
    const max = el.scrollHeight - el.clientHeight;
    setScrollPosition(p / max);
  };

  useEffect(() => {
    if (ref?.current) {
      ref.current.recalculate();
      ref.current.getScrollElement().addEventListener('scroll', chatScroll);

      return () => {
        ref.current
          .getScrollElement()
          .removeEventListener('scroll', chatScroll);
      };
    }
  }, [ref]);

  useEffect(() => {
    toBottom();
  }, []);

  useEffect(() => {
    if (scrollPosition === 1) {
      toBottom();
    }
  }, [scrollPosition, updateTriggers]);

  return { ref, isBottom: scrollPosition === 1, toBottom };
};
