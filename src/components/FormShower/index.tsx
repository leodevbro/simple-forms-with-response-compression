'use client';

import { OneForm } from '@/components/OneForm';

import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid red;
  padding: 8px;

  height: 100%;
`;

export const FormShower = () => {
  // const allFormsFeed = useMemo<typeof allFormsAsSmart2D>(() => {
  //   if (!allFormsAsSmart2D) {
  //     throw new Error(`allForms is falsy --- useMemo --- FormShower`);
  //   }
  //   return allFormsAsSmart2D;
  // }, []);

  // const [currForm, setCurrForm] = useState<nsForm.One>(
  //   allFormsFeed.domains[0].versions[0],
  // );

  return (
    <Ground>
      <OneForm />
    </Ground>
  );
};
