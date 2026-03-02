/**
 * Composable para normalizar números telefónicos
 */

export const usePhoneFormatter = (): {
  normalizeDigits: (value: string) => string;
  normalizeTel: (value: string) => string;
} => {
  /**
   * Elimina todo excepto dígitos
   */
  const normalizeDigits = (value: string): string => value.replace(/\D/g, '');

  /**
   * Elimina todo excepto dígitos y signo +
   */
  const normalizeTel = (value: string): string => value.replace(/[^\d+]/g, '');

  return {
    normalizeDigits,
    normalizeTel,
  };
};
