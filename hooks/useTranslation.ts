import { useAppStore } from "@/lib/store";
import { translations, Translations } from "@/lib/translations";

export function useTranslation(): Translations {
  const { language } = useAppStore();
  return translations[language] || translations.en;
}

