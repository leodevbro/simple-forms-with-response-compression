import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

export const PortalToAnywhere = ({
  children,
  to_querySelector,
}: {
  children: React.ReactNode;
  to_querySelector: string; // `.appPageBody` | `#root`
}) => {
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  useEffect(() => {
    // console.log(
    //   `before document.querySelector(to_querySelector)`,
    //   to_querySelector
    // );
    const elAsTarget = document.querySelector(to_querySelector);
    // console.log(`after document.querySelector:`, elAsTarget);

    if (!elAsTarget) {
      throw new Error('elAsTarget not found');
    }

    setPortalTarget(elAsTarget);
  }, [to_querySelector]);

  if (!portalTarget) {
    return null;
  }

  // console.log(`outlet happens`);

  const elThroughPortal = createPortal(children, portalTarget);

  return elThroughPortal;
};
