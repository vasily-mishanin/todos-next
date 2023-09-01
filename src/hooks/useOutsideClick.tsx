import { MouseEvent, useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClick(ref: any, callback: Function) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }
    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
    //}, [ref]);
  });
}
