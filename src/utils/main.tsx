import { fallbackLang } from '@/customHooks/main';
import { domainsMap } from '@/feed';
import { ArrElement } from '@/types/helperTypes';

export const getFormByDomainAndVersion = ({
  domainId,
  vId,
}: {
  domainId?: string;
  vId?: string;
}): nsOldForm.One | null => {
  if (!domainId || !vId) {
    return null;
  }

  const foundDomain = domainsMap.get(domainId);
  if (!foundDomain) {
    console.log(`'domain (${domainId}) not found`);
    return null;
    // throw new Error(`Domain not found --- useMemo --- currForm --- OneForm`);
  }

  const foundForm = foundDomain.versions.find((ver) => ver.versionId === vId);
  if (!foundForm) {
    console.log(`version (${vId}) not found for curr domain (${domainId}):`);
    return null;
    // throw new Error(
    //   `Form version not found --- useMemo --- currForm --- OneForm`,
    // );
  }

  return foundForm;
};

export const trnslt = (text: nsGlo.OmniText, lng: nsGlo.LangCode) => {
  const thisLngStringInTheText = text[lng];
  if (thisLngStringInTheText) {
    return thisLngStringInTheText;
  }

  const fallBackLangStringInTheText = text[fallbackLang];
  if (fallBackLangStringInTheText) {
    return fallBackLangStringInTheText;
  }

  console.error(
    `both input lng ${lng} and fallbackLang ${fallbackLang} not found in text:`,
    text,
  );

  return '';
};

export const allLowercaseLatinLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
] as const;

export type TyLowercaseLatinLetter = ArrElement<
  typeof allLowercaseLatinLetters
>;

export const allLowercaseLatinLetters_fromSystem = String.fromCharCode(
  ...Array(123).keys(),
).slice(97);

(() => {
  // check that the manully written letters are correct

  if (
    allLowercaseLatinLetters_fromSystem.length !==
    allLowercaseLatinLetters.length
  ) {
    throw new Error(
      `allLowercaseLatinLetters_fromSystem.length !== allLowercaseLatinLetters.length`,
    );
  }

  allLowercaseLatinLetters.forEach((ch, index) => {
    if (ch !== allLowercaseLatinLetters_fromSystem[index]) {
      throw new Error(
        `ch !== allLowercaseLatinLetters_fromSystem[index] --- check that the manully written letters are correct`,
      );
    }
  });
})();

export const indexToLatinLowercaseLetter = (ind: number) => {
  if (typeof ind !== 'number') {
    throw new Error(`typeof ind !== "number" --- indexToLatinLowercaseLetter`);
  }

  if (ind < 0 || ind >= allLowercaseLatinLetters.length) {
    throw new Error(
      `ind < 0 || ind >= allLowercaseLatinLetters.length --- indexToLatinLowercaseLetter`,
    );
  }

  const letter = allLowercaseLatinLetters[ind];
  return letter;
};

export const formIntoEmptyFilling = (form: nsFormMin.One | null) => {
  return form ? form.questions.map((question) => null) : null;
};

export const generateNiceCodeFromFilling = (filling: nsFormMin.Filling) => {
  if (!filling) {
    return ' code could not be generated';
  }

  const strObj: {
    v: string;
  } = {
    v: '',
  };

  filling.forEach((answerIndex, questionIndex) => {
    strObj.v += `${String(questionIndex + 1)}${
      typeof answerIndex === 'number'
        ? indexToLatinLowercaseLetter(answerIndex)
        : '-'
    }`;
  });

  return strObj.v;
};

export const assignBasicIdsToQuestionsAndAnswers = (
  form: nsFormMin.One,
): nsFormMin.One => {
  const copiedForm = structuredClone(form);

  copiedForm.questions.forEach((qBox, qIndex) => {
    qBox.id = String(qIndex + 1);

    qBox.selectableAnswers.forEach((ansBox, ansIndex) => {
      ansBox.id = String(ansIndex + 1);
    });
  });

  return copiedForm;
};

export const allNewLines = [
  `
`,
  `\n`,
  `\r`,
];
