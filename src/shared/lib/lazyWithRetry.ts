import { lazy, type ComponentType } from "react";

type Importer<T extends ComponentType<any>> = () => Promise<{ default: T }>;

const RELOAD_FLAG_PREFIX = "lazyWithRetry:";

/**
 * React.lazy sarğısı: yeni deploy-dan sonra brauzerdə köhnə chunk
 * referansı qalıbsa (`Failed to fetch dynamically imported module`),
 * səhifəni bir dəfə yeniləyib təzə chunk-ları yükləyir.
 *
 * Reload cəhdi sessionStorage-də bayraqla qeydə alınır ki,
 * xəta davam edərsə sonsuz reload döngüsünə düşməsin.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importer: Importer<T>,
  chunkName: string,
) {
  return lazy<T>(async () => {
    const flagKey = `${RELOAD_FLAG_PREFIX}${chunkName}`;

    try {
      const component = await importer();
      window.sessionStorage.removeItem(flagKey);
      return component;
    } catch (error) {
      const alreadyReloaded = window.sessionStorage.getItem(flagKey) === "1";

      if (!alreadyReloaded) {
        window.sessionStorage.setItem(flagKey, "1");
        window.location.reload();
        // Reload gedənə qədər Suspense fallback-də qalması üçün.
        return new Promise<never>(() => {});
      }

      throw error;
    }
  });
}
