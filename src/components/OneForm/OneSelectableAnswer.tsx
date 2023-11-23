import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid brown;
`;

type OneSelectableAnswerProps = {
  selectableAnswer: nsForm.SelectableAnswer;
  selectableAnswerIndex: number;
};

export const OneSelectableAnswer = ({
  selectableAnswer,
  selectableAnswerIndex,
}: OneSelectableAnswerProps) => {
  return <Ground>{selectableAnswer.text.ka}</Ground>;
};
