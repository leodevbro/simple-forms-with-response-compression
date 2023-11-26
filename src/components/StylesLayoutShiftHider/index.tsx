'use client';

import { GlobalStyles } from '@/app/globalStyles';
import { useEffect } from 'react';

export const StylesLayoutShiftHider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const theHtmlBody = document.body;

      if (!theHtmlBody) {
        throw new Error(
          `theHtmlBody is falsy --- useEffect --- StylesLayoutShiftHider`,
        );
      }

      theHtmlBody.style.opacity = '1';
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};

/*
export const TrueClientRenderer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
};
*/
