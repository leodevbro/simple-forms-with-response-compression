import styled from 'styled-components';
import CopySvg from '@/assets/vectorItems/Copy.svg';

const Ground = styled.div`
  position: relative;
  border-radius: 4px;
  background-image: linear-gradient(rgb(37, 165, 25), rgb(146, 214, 58));
  padding: 6px;

  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(rgb(38, 197, 23), rgb(147, 233, 36));
  }

  &:active {
    background-image: linear-gradient(rgb(32, 226, 14), rgb(142, 238, 16));
  }
`;

export const CopyButton = () => {
  return (
    <Ground>
      <CopySvg style={{ width: 18, height: 18 }} />
    </Ground>
  );
};
