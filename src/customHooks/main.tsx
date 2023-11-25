import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';
import queryString from 'query-string';
import { langCodes } from '@/types/mainTypes';

export const fallbackLang: nsGlo.LangCode = 'ka';

export type MainParamsOfUrl = {
  formLang?: nsGlo.LangCode;
  domainId?: nsGlo.GoodId;
  vId?: nsGlo.GoodId;
  aaaa790?: string;
};

export const useEasyUrlQuery = <T extends nsGlo.UrlParams>() => {
  const pathname = usePathname();
  const pathname_ref = useRef(pathname);
  pathname_ref.current = pathname;

  const searchParams = useSearchParams();
  const searchParams_ref = useRef(searchParams);
  searchParams_ref.current = searchParams;

  const router = useRouter();
  const router_ref = useRef(router);
  router_ref.current = router;

  const parsed = useMemo(() => {
    const asArrOfArrs = Array.from(searchParams.entries());
    const asObj: nsGlo.UrlParams = {};

    asArrOfArrs.forEach((par) => {
      asObj[par[0]] = par[1];
    });

    const nowParsed = asObj as T;

    return nowParsed;
  }, [searchParams]);

  const parsed_ref = useRef(parsed);
  parsed_ref.current = parsed;

  const updateUrlQueryParams = useCallback(
    ({
      newQuery,
      mode,
    }: {
      newQuery: Partial<T>;
      mode: 'merge' | 'fullReplace';
    }) => {
      const newQueryObj: Partial<T> = {
        ...(mode === 'merge' ? parsed_ref.current : {}),
        ...newQuery,
      };

      const newHref = `${pathname_ref.current}?${queryString.stringify(
        newQueryObj,
      )}`;

      router_ref.current.push(newHref);
    },
    [],
  );

  const returningObj = {
    urlQueryParams: parsed,
    updateUrlQueryParams,
  };

  return returningObj;
};

export const useCurrLang = ({
  formLangFromUrl,
}: {
  formLangFromUrl?: string;
}): nsGlo.LangCode => {
  const currLang = useMemo(() => {
    if (!formLangFromUrl) {
      return fallbackLang;
    }

    const inLangCodes = langCodes[formLangFromUrl as nsGlo.LangCode];

    if (!inLangCodes) {
      return fallbackLang;
    }

    return formLangFromUrl as nsGlo.LangCode;
  }, [formLangFromUrl]);

  return currLang;
};
