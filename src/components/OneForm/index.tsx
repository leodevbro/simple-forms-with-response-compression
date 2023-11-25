'use client';
import { OneQuestion } from '@/components/OneForm/OneQuestion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  MainParamsOfUrl,
  useCurrLang,
  useEasyUrlQuery,
} from '@/customHooks/main';

import {
  formIntoEmptyFilling,
  generateNiceCodeFromFilling,
  getFormByDomainAndVersion,
  trnslt,
} from '@/utils/main';
import { FormLangSelector } from '@/components/OneForm/FormLangSelector';
import { domainsMap } from '@/feed';

const Ground = styled.div`
  border: 1px solid blue;
`;

const QuestionsList = styled.div`
  border: 1px solid green;
`;

export type TyAndwerOneQuestion = ({
  questionIndex,
  newAnswer,
}: {
  questionIndex: number;
  newAnswer: number;
}) => void;

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

  // console.log('urlQueryParams:::', urlQueryParams);

  const [fillingOfTheForm, setFillingOfTheForm] = useState<nsForm.Filling>(
    formIntoEmptyFilling(currForm),
  );

  const andwerOneQuestion: TyAndwerOneQuestion = useCallback(
    ({ questionIndex, newAnswer }) => {
      if (!fillingOfTheForm) {
        throw new Error(`fillingOfTheForm is falsy --- andwerOneQuestion`);
      }

      const copyOfFillingOfTheForm = structuredClone(fillingOfTheForm);

      copyOfFillingOfTheForm[questionIndex] = newAnswer;

      setFillingOfTheForm(copyOfFillingOfTheForm);
    },
    [fillingOfTheForm],
  );

  useEffect(() => {
    // if form changes, reset the filling entirely

    const foundForm = getFormByDomainAndVersion({
      domainId: urlQueryParams.domainId,
      vId: urlQueryParams.vId,
    });

    setFillingOfTheForm(formIntoEmptyFilling(foundForm));

    return () => {
      // clean up anything?
    };
  }, [urlQueryParams.domainId, urlQueryParams.vId]);

  const currDomain = useMemo(() => {
    const found = domainsMap.get(urlQueryParams.domainId || '');
    return found || null;
  }, [urlQueryParams.domainId]);

  const currLang = useCurrLang({
    formLangFromUrl: urlQueryParams.formLang,
  });

  if (!currForm) {
    if (!urlQueryParams.domainId) {
      return <div>Please select domain</div>;
    }
    if (!urlQueryParams.vId) {
      return <div>Please select form version for this domain</div>;
    }
    return (
      <div>{`Form not found with the domainId (${urlQueryParams.domainId}) and versionId (${urlQueryParams.vId})`}</div>
    );
    // throw new Error(`Form not found --- !fillingOfTheForm --- OneForm`);
  }

  if (!currDomain) {
    throw new Error(`currDomain is falsy --- OneForm`);
  }

  return (
    <Ground>
      <div>{trnslt(currDomain.name.text, currLang)}</div>

      <div>{JSON.stringify(fillingOfTheForm)}</div>
      <div>{generateNiceCodeFromFilling(fillingOfTheForm)}</div>

      <QuestionsList>
        {currForm.questions.map((question, questionIndex) => {
          return (
            <OneQuestion
              key={question.id}
              questionIndex={questionIndex}
              question={question}
              formLang={currLang}
              fillingOfTheForm={fillingOfTheForm}
              answerOneQuestion={andwerOneQuestion}
            />
          );
        })}
      </QuestionsList>
    </Ground>
  );
};
