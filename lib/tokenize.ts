import type { VocabularyMap } from "@/data/types";

export type TextToken = {
  value: string;
  normalized: string;
  isWord: boolean;
  hasMeaning: boolean;
};

const WORD_PATTERN = /^[A-Za-z']+$/;
const PUNCTUATION_PATTERN = /^[,.;:!?)]$/;

export function normalizeWord(word: string) {
  return word.toLowerCase().replace(/^[^a-z']+|[^a-z']+$/g, "");
}

export function tokenizeText(text: string, words: VocabularyMap): TextToken[] {
  const rawTokens = text.match(/[A-Za-z']+|[0-9]+|[^\sA-Za-z0-9]/g) ?? [];

  return rawTokens.map((value) => {
    const normalized = normalizeWord(value);
    const isWord = WORD_PATTERN.test(value);

    return {
      value,
      normalized,
      isWord,
      hasMeaning: Boolean(isWord && normalized && words[normalized]),
    };
  });
}

export function needsLeadingSpace(previous: TextToken | null, current: TextToken) {
  if (!previous) return false;
  if (current.value === "(") return true;
  if (PUNCTUATION_PATTERN.test(current.value)) return false;
  if (previous.value === "(") return false;
  return true;
}
