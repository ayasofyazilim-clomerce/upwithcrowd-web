export function isServerSide() {
  return typeof window === "undefined";
}

export type ResourceResult = Record<
  string,
  | {
      texts?: Record<string, string> | null | undefined;
      baseResources?: string[] | null | undefined;
    }
  | undefined
>;

export async function getLocalizationResources(
  languageCode: string,
): Promise<ResourceResult> {
  try {
    await Promise.resolve();
    return {};
  } catch (error) {
    return { texts: { texts: { languageCode } } };
  }
}

export function getBaseLink(location: string, locale?: string) {
  if (isServerSide()) {
    return `/${locale || "en"}/${location}`;
  }
  const pathname = window.location.pathname;
  const pathnameParts = pathname.split("/");
  return `/${locale || pathnameParts[1] || "en"}/${location}`;
}
