import { TyAndwerOneQuestion } from '@/components/OneForm';
import { indexToLatinLowercaseLetter } from '@/utils/main';
import styled from 'styled-components';

const Ground = styled.div`
  /* border: 1px solid brown; */

  border-width: 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);

  border-radius: 6px;

  padding: 4px;
  margin: 10px;

  &:hover {
    /* border-color: rgba(126, 230, 240, 0.6) !important; */
    background-color: rgba(126, 230, 240, 0.2);
    cursor: pointer;
  }

  &.isSelected {
    background-color: #14d6f024;
    border-color: #06cef165;
  }

  &.isSelectedByOtherPerson {
    outline: 4px solid #f8d3039e;
  }
`;

const Abc = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-width: 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);

  &.isSelected {
    background-color: rgb(201, 250, 255);
    border-color: rgb(106, 226, 238);
  }
`;

type OneSelectableAnswerProps = {
  selectableAnswer: nsFormMin.SelectableAnswer;
  selectableAnswerIndex: number;
  formLang: nsGlo.LangCode;
  // fillingOfTheForm: nsForm.Filling;
  isSelected: boolean;
  isSelectedByOtherPerson: boolean;
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
  isSelectedByOtherPerson,
  answerOneQuestion,
  questionIndex,
}: OneSelectableAnswerProps) => {
  return (
    <Ground
      className={`${isSelected ? 'isSelected' : ''} ${
        isSelectedByOtherPerson ? 'isSelectedByOtherPerson' : ''
      }`}
      onClick={() => {
        answerOneQuestion({
          questionIndex,
          newAnswer: selectableAnswerIndex,
        });
      }}
    >
      <span>
        <Abc className={isSelected ? 'isSelected' : ''}>
          {indexToLatinLowercaseLetter(selectableAnswerIndex)}
        </Abc>
      </span>
      <span>{` `}</span>
      <span>{selectableAnswer.t}</span>
    </Ground>
  );
};
