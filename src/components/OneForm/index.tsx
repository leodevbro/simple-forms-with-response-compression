'use client';
import { OneQuestion } from '@/components/OneForm/OneQuestion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
} from '@/utils/main';

import { form001_withIds } from '@/feed/indexWay2';
import { NiceCodesArea } from '@/components/OneForm/NiceCodesArea';

const Ground = styled.div`
  color: rgba(24, 24, 24, 1);
  position: relative;
  /* border: 7px solid blue; */
  padding: 6px;
  padding-left: 0;
  padding-right: 0;
  /* border: 4px solid #0000003b; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */

  border-radius: 12px;
  width: 600px;
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  /* row-gap: 8px; */
`;

export const GroundBackground = styled.div`
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

  padding: 6px 12px;
`;

const BottomBox = styled.div`
  /* border: 7px solid green; */
  /* height: 100%; */

  flex-grow: 0;
  flex-shrink: 0;

  padding: 12px 12px 6px 12px;
`;

const QuestionsList = styled.div`
  position: relative;
  /* border: 3px solid rgb(241, 254, 255); */
  /* border: 1px solid rgba(0, 0, 0, 0.07); */
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px; */

  /* box-shadow: 0 0 10px 0 rgba(0,0,0,0.1) inset; */

  /* border-radius: 6px; */
  padding: 6px;
  padding-top: 12px;
  padding-bottom: 12px;
  /* padding-left: 0; */
  flex-grow: 1;
  flex-shrink: 1;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  row-gap: 24px;
`;

const NiceSeparator = styled.div`
  height: 1px;
  min-height: 1px;
  background-image: linear-gradient(90deg, #585858, gray);
  /* background: black; */
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

  const currForm = useMemo<nsFormMin.One | null>(() => {
    const externalForm: nsFormMin.One = form001_withIds;

    if (!externalForm) {
      throw new Error(`Could not get externalForm --- currForm`);
    }

    return externalForm;

    // const foundForm = getFormByDomainAndVersion({
    //   domainId: urlQueryParams.domainId,
    //   vId: urlQueryParams.vId,
    // });

    // return foundForm;
  }, [urlQueryParams]);

  // console.log('urlQueryParams:::', urlQueryParams);

  const [fillingOfTheForm, setFillingOfTheForm] = useState<nsFormMin.Filling>(
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

    // const foundForm = getFormByDomainAndVersion({
    //   domainId: urlQueryParams.domainId,
    //   vId: urlQueryParams.vId,
    // });
    // TODO:
    const foundForm = form001_withIds;

    setFillingOfTheForm(formIntoEmptyFilling(foundForm));

    return () => {
      // clean up anything?
    };
  }, [urlQueryParams.domainId, urlQueryParams.vId]);

  /*
  const currDomain = useMemo(() => {
    const found = domainsMap.get(urlQueryParams.domainId || '');
    return found || null;
  }, [urlQueryParams.domainId]);

  

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
  */

  const currLang = useCurrLang({
    formLangFromUrl: urlQueryParams.formLang,
  });

  if (!currForm) {
    return <div>...</div>;
  }

  return (
    <Ground>
      <GroundBackground />

      <TopBox>
        <div>{currForm.title}</div>
        <div>sfsdfsdfsdfsdf</div>
        <div>sfsdfsdfsdfsdf</div>
        <div>sfsdfsdfsdfsdf</div>
      </TopBox>

      <NiceSeparator />

      <QuestionsList>
        {currForm.questions.map((question, questionIndex) => {
          const theKey = question.id;
          if (!theKey) {
            throw new Error(`theKey is falsy --- currForm.questions.map`);
          }

          return (
            <OneQuestion
              key={theKey}
              questionIndex={questionIndex}
              questionBox={question}
              formLang={currLang}
              fillingOfTheForm={fillingOfTheForm}
              answerOneQuestion={andwerOneQuestion}
            />
          );
        })}
      </QuestionsList>

      <NiceSeparator />

      <BottomBox>
        <NiceCodesArea fillingOfTheForm={fillingOfTheForm} />
      </BottomBox>
    </Ground>
  );
};
