import { TyAndwerOneQuestion } from '@/components/OneForm';
import { indexToLatinLowercaseLetter, trnslt } from '@/utils/main';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid brown;

  margin: 10px;

  &:hover {
    outline: 4px solid green;
    cursor: pointer;
  }

  &.isSelected {
    background-color: #14f0f052;
  }
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
  // fillingOfTheForm: nsForm.Filling;
  isSelected: boolean;
  answerOneQuestion: TyAndwerOneQuestion;
  // question: nsForm.Question
  questionIndex: number;
};

export const OneSelectableAnswer = ({
  selectableAnswer,
  selectableAnswerIndex,
  formLang,
  // fillingOfTheForm,
  isSelected,
  answerOneQuestion,
  questionIndex,
}: OneSelectableAnswerProps) => {
  return (
    <Ground
      className={isSelected ? 'isSelected' : ''}
      onClick={() => {
        answerOneQuestion({
          questionIndex,
          newAnswer: selectableAnswerIndex,
        });
      }}
    >
      <span>
        <Abc>{indexToLatinLowercaseLetter(selectableAnswerIndex)}</Abc>
      </span>
      <span>{` `}</span>
      <span>{trnslt(selectableAnswer.text, formLang)}</span>
    </Ground>
  );
};
