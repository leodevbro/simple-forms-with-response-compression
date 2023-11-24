'use client';
import { OneQuestion } from '@/components/OneForm/OneQuestion';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { MainParamsOfUrl, useEasyUrlQuery } from '@/customHooks/main';
import { allForms } from '@/feed';

const Ground = styled.div`
  border: 1px solid blue;
`;

const QuestionsList = styled.div`
  border: 1px solid green;
`;

type OneFormProps = {
  formFeed: nsForm.One;
};

export const OneForm = ({ formFeed }: OneFormProps) => {
  const { urlQueryParams, updateUrlQueryParams } =
    useEasyUrlQuery<MainParamsOfUrl>();

  const currForm = useMemo(() => {
    // const foundForm = allForms.n0
  }, [urlQueryParams]);

  console.log('urlQueryParams:::', urlQueryParams);

  const [fillingOfTheForm, setFillingOfTheForm] = useState<nsForm.One>(
    structuredClone(formFeed),
  );

  const currFormLang = urlQueryParams.formLang;

  useEffect(() => {
    // if formFeed changes, reset the filling entirely

    setFillingOfTheForm(structuredClone(formFeed));

    return () => {
      // clean up anything?
    };
  }, [formFeed]);


  return (
    <Ground>
      <div
        onClick={() => {
          updateUrlQueryParams({
            mode: 'merge',
            newQuery: {
              // aaaa778: String(Math.random()),
              aaaa790: String(Math.random()),
            },
          });
        }}
      >
        sfsdfsd_iIlL
      </div>
      <div>sfsdfsdsdfvsf</div>

      <QuestionsList>
        {formFeed.questions.map((question, questionIndex) => {
          return (
            <OneQuestion
              key={question.id}
              questionIndex={questionIndex}
              question={question}
            />
          );
        })}
      </QuestionsList>
    </Ground>
  );
};
