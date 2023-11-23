'use client';
import { OneForm } from '@/components/OneForm';
import { allForms } from '@/feed';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid red;
`;

export const FormShower = () => {
  const allFormsFeed = useMemo<typeof allForms>(() => {
    if (!allForms) {
      throw new Error(`allForms is falsy --- useMemo --- FormShower`);
    }
    return allForms;
  }, []);

  const [currForm, setCurrForm] = useState<nsForm.One>(
    allFormsFeed.n001_soulStyle.v01,
  );

  return (
    <Ground>
      <OneForm formFeed={currForm} />
    </Ground>
  );
};
