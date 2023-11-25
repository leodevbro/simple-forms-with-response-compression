import { indexToLatinLowercaseLetter, trnslt } from '@/utils/main';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid brown;
`;

const Abc = styled.div`
  width: 20px;
  height: 20px;
  background-color: gray;
  display: inline-block;
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
  return (
    <Ground>
      <span>
        <Abc>{indexToLatinLowercaseLetter(selectableAnswerIndex)}</Abc>
      </span>
      <span>{` `}</span>
      <span>{trnslt(selectableAnswer.text, formLang)}</span>
    </Ground>
  );
};
