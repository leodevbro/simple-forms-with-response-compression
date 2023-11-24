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
    throw new Error(`Domain not found --- useMemo --- currForm --- OneForm`);
  }

  const foundForm = foundDomain.versions.find((ver) => ver.id === vId);
  if (!foundForm) {
    throw new Error(
      `Form version not found --- useMemo --- currForm --- OneForm`,
    );
  }

  return foundForm;
};
