import { OneSelectableAnswer } from '@/components/OneForm/OneSelectableAnswer';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid brown;
`;

const SelectableAnswersList = styled.div`
  border: 1px solid yellow;
`;

type OneQuestionProps = {
  question: nsForm.Question;
  questionIndex: number;
};

export const OneQuestion = ({ question, questionIndex }: OneQuestionProps) => {
  return (
    <Ground>
      <div>sdfsdf222</div>
      <div>sdfsdf777</div>

      <SelectableAnswersList>
        {question.selectableAnswers.map(
          (selectableAnswer, selectableAnswerIndex) => {
            return (
              <OneSelectableAnswer
                key={selectableAnswer.id}
                selectableAnswer={selectableAnswer}
                selectableAnswerIndex={selectableAnswerIndex}
              />
            );
          },
        )}
      </SelectableAnswersList>
    </Ground>
  );
};
