import { OneSelectableAnswer } from '@/components/OneForm/OneSelectableAnswer';

import { trnslt } from '@/utils/main';
import styled from 'styled-components';

const Ground = styled.div`
  border: 1px solid brown;
`;

const IndexOneIndicator = styled.span`
  width: 30px;
  height: 30px;
  background-color: aqua;
  display: inline-block;
`;

const SelectableAnswersList = styled.div`
  border: 1px solid yellow;
`;

type OneQuestionProps = {
  question: nsForm.Question;
  questionIndex: number;
  formLang: nsGlo.LangCode;
};

export const OneQuestion = ({
  question,
  questionIndex,
  formLang,
}: OneQuestionProps) => {
  return (
    <Ground>
      <div>
        <IndexOneIndicator>{questionIndex + 1}</IndexOneIndicator>
        <span>{` `}</span>
        <span>{trnslt(question.text, formLang)}</span>
      </div>

      <SelectableAnswersList>
        {question.selectableAnswers.map(
          (selectableAnswer, selectableAnswerIndex) => {
            return (
              <OneSelectableAnswer
                key={selectableAnswer.id}
                selectableAnswer={selectableAnswer}
                selectableAnswerIndex={selectableAnswerIndex}
                formLang={formLang}
              />
            );
          },
        )}
      </SelectableAnswersList>
    </Ground>
  );
};
