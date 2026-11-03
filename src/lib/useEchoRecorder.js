import { useCallback, useEffect, useRef, useState } from "react";
import { voiceRequest } from "./echo";

const recognitionClass = () => window.SpeechRecognition || window.webkitSpeechRecognition;
export function useEchoRecorder({ onText, setError, beforeStart }) {
  const [state, setState] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const run = useRef({ id: 0 });
  const callbacks = useRef({ onText, beforeStart });
  callbacks.current = { onText, beforeStart };
  const cancel = useCallback(() => {
    const item = run.current;
    run.current = { id: item.id + 1 };
    clearTimeout(item.timer); clearTimeout(item.timeout); clearInterval(item.clock);
    item.abort?.abort(); item.recognition?.abort();
    if (item.recorder?.state === "recording") item.recorder.stop();
    item.stream?.getTracks().forEach((track) => track.stop());
    setState("idle"); setElapsed(0);
  }, []);
  const finish = useCallback(() => {
    clearTimeout(run.current.timer); clearInterval(run.current.clock);
    run.current.recognition?.stop();
    if (run.current.recorder?.state === "recording") run.current.recorder.stop();
  }, []);
  const start = useCallback(async (mode) => {
    cancel(); setError(""); callbacks.current.beforeStart();
    const item = run.current;
    const id = item.id;
    setState("permission");
    const isCurrent = () => id === run.current.id;
    try {
      if (mode === "browser") {
        const Recognition = recognitionClass();
        if (!Recognition) throw new Error("Browser speech recognition isn't supported here. Select AI voice instead.");
        const recognition = new Recognition();
        item.recognition = recognition;
        recognition.lang = "en-IN"; recognition.interimResults = false; recognition.continuous = false;
        recognition.onstart = () => { if (isCurrent()) setState("listening"); };
        let received = false;
        recognition.onresult = (event) => {
          if (!isCurrent()) return;
          const text = Array.from(event.results).map((r) => r[0].transcript).join(" ").trim();
          if (text) { received = true; callbacks.current.onText(text); }
        };
        recognition.onerror = (event) => {
          if (!isCurrent() || event.error === "aborted") return;
          received = true;
          setError(event.error === "not-allowed" ? "Microphone access was denied. Allow microphone access in browser settings, or type your question." : "Browser recognition couldn't hear you. Try AI voice or type your question.");
        };
        recognition.onend = () => {
          if (!isCurrent()) return;
          clearTimeout(item.timer); clearInterval(item.clock);
          setState("idle");
          if (!received) setError("No speech heard. Please try again or type your question.");
        };
        recognition.start();
      } else {
        if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error("Recording isn't supported here. Try browser voice or type your question.");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!isCurrent()) { stream.getTracks().forEach((track) => track.stop()); return; }
        item.stream = stream;
        const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
        const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
        item.recorder = recorder;
        const chunks = [];
        recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
        recorder.onerror = () => { if (isCurrent()) { cancel(); setError("Recording failed. Please try again or type your question."); } };
        recorder.onstop = async () => {
          stream.getTracks().forEach((track) => track.stop());
          clearInterval(item.clock); clearTimeout(item.timer);
          if (!isCurrent()) return;
          setState("transcribing");
          try {
            const blob = new Blob(chunks, { type: recorder.mimeType });
            const data = new FormData();
            data.append("audio", blob, recorder.mimeType.includes("mp4") ? "question.mp4" : "question.webm");
            const abort = new AbortController(); item.abort = abort;
            item.timeout = setTimeout(() => abort.abort(), 50000);
            const result = await voiceRequest("transcribe", data, abort.signal);
            if (isCurrent()) { setState("idle"); callbacks.current.onText(result.text); }
          } catch (error) {
            if (isCurrent()) { setState("idle"); setError(error.name === "AbortError" ? "Transcription timed out. Try browser voice or type your question." : error.message); }
          } finally { clearTimeout(item.timeout); }
        };
        recorder.start(); setState("listening");
      }
      const started = Date.now();
      item.clock = setInterval(() => { if (isCurrent()) setElapsed(Math.floor((Date.now() - started) / 1000)); }, 1000);
      item.timer = setTimeout(() => { if (isCurrent()) finish(); }, 45000);
    } catch (error) {
      if (!isCurrent()) return;
      cancel();
      setError(error.name === "NotAllowedError" ? "Microphone access was denied. Allow microphone access in browser settings, or type your question." : error.name === "NotFoundError" ? "No microphone found. Connect a microphone or type your question." : error.message);
    }
  }, [cancel, finish, setError]);
  useEffect(() => cancel, [cancel]);
  return { state, elapsed, start, finish, cancel, browserSupported: !!recognitionClass() };
}
