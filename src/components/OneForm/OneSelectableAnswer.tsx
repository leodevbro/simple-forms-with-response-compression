import { trnslt } from '@/utils/main';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid brown;
`;

type OneSelectableAnswerProps = {
  selectableAnswer: nsForm.SelectableAnswer;
  selectableAnswerIndex: number;
  formLang: nsGlo.LangCode;
};

export const OneSelectableAnswer = ({
  selectableAnswer,
  selectableAnswerIndex,
  formLang,
}: OneSelectableAnswerProps) => {
  return <Ground>{trnslt(selectableAnswer.text, formLang)}</Ground>;
};
