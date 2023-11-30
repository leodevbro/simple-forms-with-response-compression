import { fallbackLang } from '@/customHooks/main';
import { domainsMap } from '@/feed';
import { ArrElement } from '@/types/helperTypes';
import { MAX_COUNT_OF_QUESTIONS } from '@/utils/constants';

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

export const allLowercaseLatinLetters_set = new Set<TyLowercaseLatinLetter>(
  allLowercaseLatinLetters,
);

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

export const generateNiceCodeFromFilling = (
  filling: nsFormMin.Filling,
): {
  text: string;
  myJsx: React.ReactNode;
} => {
  if (!filling) {
    return {
      text: ' code could not be generated',
      myJsx: ' code could not be generated',
    };
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

  const myJsx = (
    <span>
      {filling.map((answerIndex, questionIndex) => {
        const isNum = typeof answerIndex === 'number';

        return (
          <span key={questionIndex} className={isNum ? 'isTruthy' : 'isNull'}>
            <span
              style={{
                borderRadius: `4px`,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))`,
              }}
            >
              {questionIndex + 1}
            </span>
            <span
              style={{
                color: isNum ? 'rgb(12, 98, 228)' : 'red',
              }}
            >
              {isNum ? indexToLatinLowercaseLetter(answerIndex) : '-'}
            </span>
          </span>
        );
      })}
    </span>
  );

  return { text: strObj.v, myJsx };
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

export const regexOfAnyLatinLowercaseLetter = new RegExp(
  `[${allLowercaseLatinLetters_fromSystem}]`,
);

export const checkValidityOfResponseCode = (inp: string) => {
  if (typeof inp !== 'string') {
    throw new Error(`inp is not a string --- checkValidityOfResponseCode`);
  }

  if (inp.length > MAX_COUNT_OF_QUESTIONS * 10) {
    return false;
  }

  // can be an empty string
  if (inp.length === 0) {
    return true;
  }

  const inpSet = new Set(inp.split(''));

  // should not have new line character
  for (const nl of allNewLines) {
    if (inpSet.has(nl)) {
      return false;
    }
  }

  const arrBuild: {
    v: TyLowercaseLatinLetter[];
  } = {
    v: [],
  };

  for (let i = 0; i < inp.length; i += 1) {
    const nowStepOne = arrBuild.v.length + 1;
    const nowStepOne_str = String(nowStepOne);
    const digitsCountOfNowStepOne = nowStepOne_str.length;

    const shouldBeNumStr = inp.slice(i, i + digitsCountOfNowStepOne);

    if (nowStepOne_str !== shouldBeNumStr) {
      return false;
    }

    const shouldBeLowLetter = inp.slice(
      i + digitsCountOfNowStepOne,
      i + digitsCountOfNowStepOne + 1,
    );
    if (
      !allLowercaseLatinLetters_set.has(
        shouldBeLowLetter as TyLowercaseLatinLetter,
      ) &&
      shouldBeLowLetter !== '-'
    ) {
      return false;
    }

    arrBuild.v.push(shouldBeLowLetter as TyLowercaseLatinLetter);

    i += digitsCountOfNowStepOne;
  }

  if (arrBuild.v.length > MAX_COUNT_OF_QUESTIONS) {
    alert('Max number of questions is 50');
    return false;
  }

  return arrBuild.v;
};

export const handleCopy_oldWay = (textToCopy: string) => {
  const element = document.createElement('textarea');
  element.value = textToCopy;
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
  // alert('📋 Coppied to clipboard!');
};
