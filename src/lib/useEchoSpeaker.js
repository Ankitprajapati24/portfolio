import { useCallback, useEffect, useRef, useState } from "react";
import { voiceRequest } from "./echo";

export function useEchoSpeaker(setError) {
  const [state, setState] = useState("idle");
  const [enabled, setEnabledState] = useState(false);
  const enabledRef = useRef(false);
  const active = useRef({ id: 0 });
  const stop = useCallback(() => {
    const current = active.current;
    active.current = { id: current.id + 1 };
    current.abort?.abort();
    clearTimeout(current.timer);
    if (current.audio) { current.audio.pause(); current.audio.removeAttribute("src"); }
    if (current.url) URL.revokeObjectURL(current.url);
    window.speechSynthesis?.cancel();
    setState("idle");
  }, []);
  const setEnabled = useCallback((value) => {
    enabledRef.current = value;
    setEnabledState(value);
    if (!value) stop();
  }, [stop]);
  const speak = useCallback(async (text, mode, force = false) => {
    if ((!enabledRef.current && !force) || !text.trim()) return;
    stop();
    const task = active.current;
    const id = task.id;
    const browserSpeak = () => {
      if (!window.speechSynthesis) throw new Error("Spoken replies aren't supported in this browser. Your text reply is available.");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.rate = 1;
      utterance.onend = () => { if (id === active.current.id) setState("idle"); };
      utterance.onerror = (event) => {
        if (id === active.current.id && event.error !== "interrupted" && event.error !== "canceled") {
          setError("Audio couldn't play. Tap a reply's play button to try again."); setState("idle");
        }
      };
      task.utterance = utterance;
      setState("speaking");
      window.speechSynthesis.speak(utterance);
    };
    try {
      if (mode === "browser") { browserSpeak(); return; }
      setState("loading");
      const abort = new AbortController();
      task.abort = abort;
      task.timer = setTimeout(() => abort.abort(), 50000);
      const blob = await voiceRequest("speech", { text: text.slice(0, 1800) }, abort.signal, true);
      clearTimeout(task.timer);
      if (id !== active.current.id) return;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      Object.assign(task, { url, audio });
      audio.onended = () => { if (id === active.current.id) stop(); };
      audio.onerror = () => { if (id === active.current.id) { stop(); setError("Audio couldn't play. Your text reply is available."); } };
      await audio.play();
      if (id === active.current.id) setState("speaking");
    } catch (error) {
      clearTimeout(task.timer);
      if (id !== active.current.id) return;
      setState("idle");
      if (error.name === "NotAllowedError") { setError("Your browser paused audio. Tap the play button on the reply to listen."); return; }
      if (mode === "ai" && window.speechSynthesis) {
        setError("AI voice is unavailable — using your browser's voice for this reply.");
        try { browserSpeak(); } catch (err) { setError(err.message); }
      } else setError(error.message);
    }
  }, [setError, stop]);
  useEffect(() => stop, [stop]);
  const getGeneration = useCallback(() => active.current.id, []);
  return { state, enabled, setEnabled, speak, stop, getGeneration };
}
