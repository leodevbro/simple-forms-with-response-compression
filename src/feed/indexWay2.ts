// maybe good hosting for future:
// npoint.io

import { assignBasicIdsToQuestionsAndAnswers } from '@/utils/main';

const vars = {
  otherOrNothingOrNotWant:
    'სხვა პასუხი მაქვს, ან არ მსურს პასუხის გაცემა, ან არ მაქვს პასუხი.',
} as const;

const form001: nsFormMin.One = {
  id: `form001`,
  title: '',
  info: '',
  details: 'sdfsfd',
  versionId: '1',

  questions: [
    {
      question: 'ასაკი',
      selectableAnswers: [
        { t: '18-19' },
        { t: '20-22' },
        { t: '23-26' },
        { t: '27-29' },
        { t: '30-32' },
        { t: '33-36' },
        { t: '37-39' },
        { t: '40-42' },
        { t: '43-46' },
        { t: '47-49' },
        { t: '50+' },
        { t: vars.otherOrNothingOrNotWant },
      ],
    },
    {
      question: 'sdfsd',
      selectableAnswers: [
        { t: 'sdfsdfsdfsdfsdfdsfdsfsdfssdfsdfsdfsdfsdfdfsdsd' },
        // vars.otherOrNothingOrNotWant,
      ],
    },
    {
      question: 'sdfsd',
      selectableAnswers: [],
    },
    {
      question: 'sdfsd',
      selectableAnswers: [],
    },
    {
      question: 'sdfsd',
      selectableAnswers: [],
    },
    {
      question: 'sdfsd',
      selectableAnswers: [],
    },
    {
      question: 'sdfsd',
      selectableAnswers: [],
    },
  ],
};

export const form001_withIds = assignBasicIdsToQuestionsAndAnswers(form001);
