'use client';
import { FormShower } from '@/components/FormShower';
import styled from 'styled-components';
// import Image from 'next/image';

const Main = styled.main`
  position: relative;
  height: 100%;
  /* border: 2px solid blue; */
`;

export default function Home() {
  return (
    <Main>
      <FormShower />
    </Main>
  );
}
