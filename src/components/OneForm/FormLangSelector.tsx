import { MainParamsOfUrl, useEasyUrlQuery } from '@/customHooks/main';
import { langCodesArr } from '@/types/mainTypes';
import styled from 'styled-components';

const Ground = styled.div`
  //
`;

export const FormLangSelector = () => {
  const { urlQueryParams, updateUrlQueryParams } =
    useEasyUrlQuery<MainParamsOfUrl>();

  return (
    <Ground>
      <div>
        <label htmlFor="formLangSelector">Lang</label>
        <select
          id={'formLangSelector'}
          // disabled={disableSelectBox}
          value={urlQueryParams.formLang || '-'}
          onChange={(e) => {
            const newLangCand = e.target.value as nsGlo.LangCode;
            updateUrlQueryParams({
              mode: 'merge',
              newQuery: {
                formLang: newLangCand,
              },
            });
          }}
        >
          <option hidden value={'-'}></option>
          {langCodesArr.map((langCode) => {
            return (
              <option key={langCode} value={langCode}>
                {langCode}
              </option>
            );
          })}
        </select>
      </div>
    </Ground>
  );
};
