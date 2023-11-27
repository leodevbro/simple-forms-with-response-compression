import { TyAndwerOneQuestion } from '@/components/OneForm';
import { OneSelectableAnswer } from '@/components/OneForm/OneSelectableAnswer';

// import { trnslt } from '@/utils/main';
import styled from 'styled-components';

const Ground = styled.div`
  /* border: 1px solid brown; */
  /* margin: 30px; */
  background-color: rgba(255, 255, 255, 0.4);
  /* border: 2px solid rgba(250, 213, 6, 0.5); */
  border: 2px solid rgb(255, 255, 255);
  border-radius: 6px;

  padding: 4px;
`;

const IndexOneIndicator = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));

  font-weight: 700;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  margin-right: 6px;

  font-size: 18px;
`;

const QuestionText = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const SelectableAnswersList = styled.div`
  /* border: 1px solid yellow; */
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
        <QuestionText>{questionBox.question}</QuestionText>
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
