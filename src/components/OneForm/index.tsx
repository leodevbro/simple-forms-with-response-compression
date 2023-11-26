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
  position: relative;
  /* border: 7px solid blue; */
  padding: 12px;
  /* border: 4px solid #0000003b; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  border-radius: 12px;
  width: 600px;
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const GroundBackground = styled.div`
  border-radius: 12px;
  position: absolute;
  z-index: -100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-image: linear-gradient(
    45deg,
    #f200ff 0%,
    #ffae00 52%,
    #00ff6e 90%
  );

  opacity: 0.15;

  /* background-color: #d9afd9;
  background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%); */
`;

const TopBox = styled.div`
  /* border: 7px solid green; */
  /* height: 100%; */

  flex-grow: 0;
  flex-shrink: 0;
`;

const BottomBox = styled.div`
  /* border: 7px solid green; */
  /* height: 100%; */

  flex-grow: 0;
  flex-shrink: 0;
`;

const QuestionsList = styled.div`
  /* border: 5px solid brown; */
  flex-grow: 1;
  flex-shrink: 1;

  overflow-y: auto;
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
      <GroundBackground />

      <TopBox>
        <div>{trnslt(currDomain.name.text, currLang)}</div>
      </TopBox>

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

      <BottomBox>
        <div>{JSON.stringify(fillingOfTheForm)}</div>
        <div>{generateNiceCodeFromFilling(fillingOfTheForm)}</div>
      </BottomBox>
    </Ground>
  );
};
