import styled from 'styled-components';
import CopySvg from '@/assets/vectorItems/Copy.svg';
import { allNewLines, handleCopy_oldWay } from '@/utils/main';

const Ground = styled.div`
  position: relative;
  border-radius: 400px;
  background-image: radial-gradient(
    rgba(37, 165, 25, 0.707),
    rgba(146, 214, 58, 0.697)
  );
  padding: 6px;

  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
    background-image: radial-gradient(
      rgba(38, 197, 23, 0.875),
      rgba(148, 233, 36, 0.789)
    );
  }

  &:active {
    background-image: radial-gradient(
      rgba(38, 197, 23, 1),
      rgba(148, 233, 36, 1)
    );
  }
`;

export const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const doTheCopy = async () => {
    for (const nl of allNewLines) {
      if (textToCopy.includes(nl)) {
        alert(
          `ტექსტში დაფიქსირდა ერთზე მეტი ხაზი, გთხოვთ მხოლოდ ერთი ხაზის ტექსტი შეიყვანოთ`,
        );
        return;
      }
    }

    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      handleCopy_oldWay(textToCopy);
    }

    if (textToCopy === '') {
      alert(`Copied text is an empty string`);
      return;
    }

    alert(`Copied text is: ${`\n`} ${textToCopy}`);
  };

  return (
    <Ground onClick={doTheCopy}>
      <CopySvg style={{ width: 18, height: 18 }} />
    </Ground>
  );
};
