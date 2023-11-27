import { TyAndwerOneQuestion } from '@/components/OneForm';
import { OneSelectableAnswer } from '@/components/OneForm/OneSelectableAnswer';

// import { trnslt } from '@/utils/main';
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
  questionBox: nsFormMin.QuestionBox;
  questionIndex: number;
  formLang: nsGlo.LangCode;
  answerOneQuestion: TyAndwerOneQuestion;
  fillingOfTheForm: nsFormMin.Filling;
};

export const OneQuestion = ({
  questionBox,
  questionIndex,
  formLang,
  fillingOfTheForm,
  answerOneQuestion,
}: OneQuestionProps) => {
  return (
    <Ground>
      <div>
        <IndexOneIndicator>{questionIndex + 1}</IndexOneIndicator>
        <span>{` `}</span>
        <span>
          {
            // trnslt(question.text, formLang)
            questionBox.question
          }
        </span>
      </div>

      <SelectableAnswersList>
        {questionBox.selectableAnswers.map(
          (selectableAnswer, selectableAnswerIndex) => {
            const theKey = selectableAnswer.id;
            if (!theKey) {
              throw new Error(
                `theKey is falsy --- questionBox.selectableAnswers.map`,
              );
            }

            return (
              <OneSelectableAnswer
                key={theKey}
                selectableAnswer={selectableAnswer}
                selectableAnswerIndex={selectableAnswerIndex}
                formLang={formLang}
                isSelected={
                  fillingOfTheForm
                    ? fillingOfTheForm[questionIndex] === selectableAnswerIndex
                    : false
                }
                // fillingOfTheForm={fillingOfTheForm}
                answerOneQuestion={answerOneQuestion}
                // question={question}
                questionIndex={questionIndex}
              />
            );
          },
        )}
      </SelectableAnswersList>
    </Ground>
  );
};
