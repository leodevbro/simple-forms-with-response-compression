import { n001_soulStyle_v01 } from '@/feed/n001_soulStyle/index_v01';
import { n001_soulStyle_v02 } from '@/feed/n001_soulStyle/index_v02';
import { n002_howInformedAboutEcology_v01 } from '@/feed/n002_howInformedAboutEcology/index_v01';
import { n002_howInformedAboutEcology_v02 } from '@/feed/n002_howInformedAboutEcology/index_v02';
import { n003_artTaste_v01 } from '@/feed/n003_artTaste/index_v01';
import { n003_artTaste_v02 } from '@/feed/n003_artTaste/index_v02';

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
