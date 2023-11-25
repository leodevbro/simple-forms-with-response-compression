import { MainParamsOfUrl, useEasyUrlQuery } from '@/customHooks/main';
import { TyOneDomain, allFormsAsSmart2D, domainsMap } from '@/feed';
import { useMemo } from 'react';
import styled from 'styled-components';

const Ground = styled.div`
  //
`;

export const FormSelector = () => {
  const { urlQueryParams, updateUrlQueryParams } =
    useEasyUrlQuery<MainParamsOfUrl>();

  const currDomain = useMemo<TyOneDomain | null>(() => {
    if (!urlQueryParams.domainId) {
      return null;
    }
    const found = domainsMap.get(urlQueryParams.domainId);

    return found || null;
  }, [urlQueryParams.domainId]);

  return (
    <Ground>
      <div>
        <label htmlFor="selectOfFormDomainId">Select domain</label>
        <select
          // disabled={disableSelectBox}
          value={urlQueryParams.domainId || '-'}
          id={'selectOfFormDomainId'}
          onChange={(e) => {
            const newDomainIdCand = e.target.value;
            updateUrlQueryParams({
              mode: 'merge',
              newQuery: {
                domainId: newDomainIdCand,
              },
            });
          }}
        >
          <option hidden value={'-'}></option>
          {allFormsAsSmart2D.domains.map((formDomain) => {
            return (
              <option key={formDomain.id} value={formDomain.id}>
                {formDomain.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label htmlFor="selectOfFormVersionInCurrDomain">Select version</label>
        {currDomain ? (
          <select
            // disabled={disableSelectBox}
            value={urlQueryParams.vId || '-'}
            id={'selectOfFormVersionInCurrDomain'}
            onChange={(e) => {
              const newVersionIdCand = e.target.value;
              updateUrlQueryParams({
                mode: 'merge',
                newQuery: {
                  vId: newVersionIdCand,
                },
              });
            }}
          >
            <option hidden value={'-'}></option>
            {currDomain.versions.map((formVersion) => {
              return (
                <option
                  key={formVersion.versionId}
                  value={formVersion.versionId}
                >
                  {formVersion.versionId}
                </option>
              );
            })}
          </select>
        ) : (
          <div>Please select a domain first before selecting version</div>
        )}
      </div>
    </Ground>
  );
};
