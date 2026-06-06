"use client";

import { useEffect, useRef, useState } from "react";
import { isSpeechSupported, type SpeechStatus } from "@/lib/speech";

export function useSpeechPlayer() {
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [activeText, setActiveText] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = () => {
    if (!isSpeechSupported()) {
      setStatus("unsupported");
      return;
    }

    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setStatus("idle");
    setActiveText("");
  };

  const speak = (text: string) => {
    if (!isSpeechSupported()) {
      setStatus("unsupported");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    utterance.onstart = () => setStatus("playing");
    utterance.onend = () => {
      setStatus("idle");
      setActiveText("");
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      setStatus("error");
      setActiveText("");
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    setActiveText(text);
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (!isSpeechSupported()) {
      setStatus("unsupported");
      return;
    }
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  const resume = () => {
    if (!isSpeechSupported()) {
      setStatus("unsupported");
      return;
    }
    window.speechSynthesis.resume();
    setStatus("playing");
  };

  return {
    activeText,
    status,
    speak,
    stop,
    pause,
    resume,
  };
}
