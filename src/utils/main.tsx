import { fallbackLang } from '@/customHooks/main';
import { domainsMap } from '@/feed';

export const getFormByDomainAndVersion = ({
  domainId,
  vId,
}: {
  domainId?: string;
  vId?: string;
}): nsForm.One | null => {
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
