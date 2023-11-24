'use client';
import { OneQuestion } from '@/components/OneForm/OneQuestion';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { MainParamsOfUrl, useEasyUrlQuery } from '@/customHooks/main';

import { getFormByDomainAndVersion } from '@/utils/main';

const Ground = styled.div`
  border: 1px solid blue;
`;

const QuestionsList = styled.div`
  border: 1px solid green;
`;

type OneFormProps = {
  // formFeed: nsForm.One;
  aaaa?: 'a';
};

export const OneForm = ({ aaaa }: OneFormProps) => {
  const { urlQueryParams, updateUrlQueryParams } =
    useEasyUrlQuery<MainParamsOfUrl>();

  const currForm = useMemo<nsForm.One | null>(() => {
    const foundForm = getFormByDomainAndVersion({
      domainId: urlQueryParams.domainId,
      vId: urlQueryParams.vId,
    });

    return foundForm;
  }, [urlQueryParams]);

  console.log('urlQueryParams:::', urlQueryParams);

  const [fillingOfTheForm, setFillingOfTheForm] = useState<nsForm.One | null>(
    structuredClone(currForm),
  );

  useEffect(() => {
    // if form changes, reset the filling entirely

    const foundForm = getFormByDomainAndVersion({
      domainId: urlQueryParams.domainId,
      vId: urlQueryParams.vId,
    });

    setFillingOfTheForm(structuredClone(foundForm));

    return () => {
      // clean up anything?
    };
  }, [urlQueryParams.domainId, urlQueryParams.vId]);

  if (!fillingOfTheForm) {
    if (!urlQueryParams.domainId) {
      return <div>Please select domain</div>;
    }
    if (!urlQueryParams.vId) {
      return <div>Please select form version for this domain</div>;
    }
    throw new Error(`Form not found --- !fillingOfTheForm --- OneForm`);
  }

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
        {fillingOfTheForm.questions.map((question, questionIndex) => {
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
