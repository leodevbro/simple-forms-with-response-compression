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
  }

  namespace nsForm {
    type SelectableAnswer = {
      id: nsGlo.GoodId;
      text: nsGlo.OmniText;
    };

    type Question = {
      id: nsGlo.GoodId;
      text: nsGlo.OmniText;
      selectableAnswers: SelectableAnswer[];
    };

    type One = {
      id: nsGlo.GoodId;
      questions: Question[];
    };
  }
}
