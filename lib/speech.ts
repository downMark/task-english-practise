export type SpeechStatus = "idle" | "playing" | "paused" | "unsupported" | "error";

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}
