import { n001_soulStyle_v01 } from '@/feed/domains/n001_soulStyle/versions/v01';
import { n001_soulStyle_v02 } from '@/feed/domains/n001_soulStyle/versions/v02';
import { TyOneDomain } from '@/feed';

export const domain___n001_soulStyle: TyOneDomain = {
  id: 'n001_soulStyle',
  name: {
    text: {
      ka: 'Soul Style',
    },
  },
  versions: [n001_soulStyle_v01, n001_soulStyle_v02],
};
