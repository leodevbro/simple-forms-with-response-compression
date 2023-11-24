import { n001_soulStyle_v01 } from '@/feed/domains/n001_soulStyle/versions/v01';
import { n001_soulStyle_v02 } from '@/feed/domains/n001_soulStyle/versions/v02';
import { n002_howInformedAboutEcology_v01 } from '@/feed/domains/n002_howInformedAboutEcology/versions/v01';
import { n002_howInformedAboutEcology_v02 } from '@/feed/domains/n002_howInformedAboutEcology/versions/v02';
import { n003_artTaste_v01 } from '@/feed/domains/n003_artTaste/versions/v01';
import { n003_artTaste_v02 } from '@/feed/domains/n003_artTaste/versions/v02';

/*

{
  n001_soulStyle: {
    v01: nsForm.One;
    v02: nsForm.One;
  };
  n002_howInformedAboutEcology: {
    v01: nsForm.One;
    v02: nsForm.One;
  };
  n003_artTaste: {
    v01: nsForm.One;
    v02: nsForm.One;
  };
}

*/

export const allForms = {
  n001_soulStyle: {
    v01: n001_soulStyle_v01,
    v02: n001_soulStyle_v02,
  },
  n002_howInformedAboutEcology: {
    v01: n002_howInformedAboutEcology_v01,
    v02: n002_howInformedAboutEcology_v02,
  },
  n003_artTaste: {
    v01: n003_artTaste_v01,
    v02: n003_artTaste_v02,
  },
} as const;

export type TyOneVersion = {
  id: nsGlo.GoodId;
  form: nsForm.One;
};

export type TyOneDomain = {
  id: nsGlo.GoodId;
  versions: TyOneVersion[];
};

export type TyAllForms = {
  aaa: 'a';
  domains: TyOneDomain[];
};

export const allForms741: TyAllForms = (() => {
  const theThing: TyAllForms = {
    aaa: 'a',
    domains: [],
  };

  const allFormsToArr = Object.entries(allForms);

  allFormsToArr
    .sort((a, b) => {
      // a[0] --> 'n001_soulStyle' --- slice(1, 4) --> '001'
      const nOfA = Number(a[0].slice(1, 4));
      const nOfB = Number(b[0].slice(1, 4));

      if (nOfA === nOfB) {
        throw new Error(`nOfA === nOfB --- sort --- allFormsToArr`);
      }

      return nOfA > nOfB ? 1 : -1;
    })
    .forEach((item) => {
      // const currDomain: TyOneDomain = {
      //   id: item[0],
      // }
      // theThing.domains.push();
    });

  console.log('allFormsToArr:', allFormsToArr);

  return theThing;
})();

export const allFormsAsArr = (() => {
  const arrOfDomains = Object.values(allForms);

  const finalArr: nsForm.One[] = [];

  arrOfDomains.forEach((domain) => {
    // TODO:
  });
})();
