'use client';
import { FormSelector } from '@/components/FormShower/FormSelector';
import { FormLangSelector } from '@/components/OneForm/FormLangSelector';
import { PortalToAnywhere } from '@/components/PortalToAnywhere';
import { useState } from 'react';

import styled from 'styled-components';

const SuperParent = styled.div`
  z-index: 500;
  position: absolute;
  right: 0;
  top: 0;

  /* &:hover {
    cursor: pointer;
    opacity: 0.9;
  } */

  /* &:hover: {
    cursor: pointer;
    opacity: 0.9;
  } */
`;

const ShowerHider = styled.div`
  z-index: 500;
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 200px;
  background: radial-gradient(#000000, #ffffff);

  opacity: 0;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  &:active {
    opacity: 0.8;
  }
`;

const GroundOfControlBox = styled.div`
  z-index: 500;
  min-width: 400px;
  position: absolute;
  right: 26px;
  top: 0;
  min-height: 30px;
  padding: 10px;
  border-radius: 6px;
  background: linear-gradient(rgba(211, 211, 211, 0.7), rgba(78, 78, 78, 0.7));

  /* display: flex;
  flex-wrap: nowrap;
  column-gap: 20px;
  row-gap: 10px; */

  &:hover {
    cursor: pointer;
  }
`;

const Blaaaa = styled.div`
  border: 1px solid red;
  &:hover {
    border: 1px solid blue;
  }
`;

const TheControlBox = () => {
  return (
    <GroundOfControlBox>
      <FormLangSelector />
      <FormSelector />
    </GroundOfControlBox>
  );
};

export const DevControlForTesting = () => {
  const [showControl, setShowControl] = useState(false);

  return (
    <PortalToAnywhere to_querySelector=".superCoolBody">
      <SuperParent>
        <ShowerHider
          className="vaaaaax"
          onClick={() => setShowControl((prev) => !prev)}
        />
        {showControl && <TheControlBox />}
      </SuperParent>
    </PortalToAnywhere>
  );
};
