export {};

export const langCodes = {
  ka: 'Georgia',
  en: 'English',
};

declare global {
  namespace nsGlo {
    type GoodId = string;

    type LangCode = keyof typeof langCodes;

    type OmniText = {
      [Key in nsGlo.LangCode]?: string;
    };

    type UrlParams = {
      [Key: string]: string;
    };
  }

  namespace nsForm {
    type SelectableAnswer = {
      id: nsGlo.GoodId;
      text: nsGlo.OmniText;
    };

    type Question = {
      id: nsGlo.GoodId;
      text: nsGlo.OmniText;
      selectedAnswer: null | {
        index: number;
        id: nsGlo.GoodId;
      };
      selectableAnswers: SelectableAnswer[];
    };

    type One = {
      id: nsGlo.GoodId;
      versionId: nsGlo.GoodId;
      questions: Question[];
    };
  }
}
