'use client';
import { OneForm } from '@/components/OneForm';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid red;
`;

export const FormShower = () => {
  return (
    <Ground>
      <OneForm />
    </Ground>
  );
};
