import { domain___n001_soulStyle } from '@/feed/domains/n001_soulStyle';

import { domain___n002_howInformedAboutEcology } from '@/feed/domains/n002_howInformedAboutEcology';

import { domain___n003_artTaste } from '@/feed/domains/n003_artTaste';

export type TyOneDomain = {
  id: nsGlo.GoodId;
  name: string;
  versions: nsForm.One[];
};

export type TyAllForms = {
  aaa: 'a';
  domains: TyOneDomain[];
};

export const allFormsAsSmart2D: TyAllForms = {
  aaa: 'a',
  domains: [
    domain___n001_soulStyle,
    domain___n002_howInformedAboutEcology,
    domain___n003_artTaste,
  ],
};

export const domainsMap = (() => {
  const myMap = new Map<nsGlo.GoodId, TyOneDomain>([]);

  allFormsAsSmart2D.domains.forEach((domain) => {
    const currId = domain.id;

    const inTheMap = myMap.get(currId);

    if (inTheMap) {
      throw new Error(`domain id should be unique --- forEach --- domainsMap`);
    }

    myMap.set(currId, domain);

    // check that forms of this domain has unique versionIds in the domain
    const setOfVersionIdsInThisDomain = new Set(
      domain.versions.map((x) => x.versionId),
    );
    console.log('setOfVersionIdsInThisDomain', setOfVersionIdsInThisDomain);
    if (setOfVersionIdsInThisDomain.size !== domain.versions.length) {
      throw new Error(
        `versionIds of this domain ${domain.id} is not unique (unique in this domain, it can be non-unique globally)`,
      );
    }
  });

  return myMap;
})();
