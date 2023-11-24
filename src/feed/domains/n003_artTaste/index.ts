import { TyOneDomain } from '@/feed';
import { n003_artTaste_v01 } from '@/feed/domains/n003_artTaste/versions/v01';
import { n003_artTaste_v02 } from '@/feed/domains/n003_artTaste/versions/v02';

export const domain___n003_artTaste: TyOneDomain = {
  id: 'n003_artTaste',
  name: 'Art Taste',
  versions: [n003_artTaste_v01, n003_artTaste_v02],
};
