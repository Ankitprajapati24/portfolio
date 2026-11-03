import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { streamEcho } from "../lib/echo";
import { useEchoSpeaker } from "../lib/useEchoSpeaker";
import { useEchoRecorder } from "../lib/useEchoRecorder";
import { ECHO_GREETING, ECHO_OFFLINE_REPLIES } from "../data/content";
import { EchoPanel } from "./EchoPanel";

export default function EchoPet() {
  const [open, setOpen] = useState(false);
  const [pet, setPet] = useState(() => { try { return localStorage.getItem("echo-pet") === "robot" ? "robot" : "cat"; } catch { return "cat"; } });
  const [mode, setMode] = useState("browser");
  const [messages, setMessages] = useState([{ role: "assistant", content: ECHO_GREETING }]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const busyRef = useRef(false);
  const session = useRef(crypto.randomUUID());
  const speaker = useEchoSpeaker(setError);
  const { stop: stopSpeaking, speak, setEnabled: enableSpeech, getGeneration } = speaker;
  const modeRef = useRef(mode); modeRef.current = mode;
  const send = useCallback(async (value) => {
    const text = value.trim().slice(0, 2000);
    if (!text || busyRef.current) return;
    stopSpeaking(); setError("");
    const generation = getGeneration();
    const replyMode = modeRef.current;
    busyRef.current = true; setBusy(true);
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    let full = "";
    const update = (content, source) => setMessages((m) => [...m.slice(0, -1), { role: "assistant", content, source }]);
    await streamEcho({ message: text, sessionId: session.current,
      onDelta: (delta) => { full += delta; update(full); },
      onDone: (source) => {
        busyRef.current = false; setBusy(false); update(full, source);
        if (source === "partial") setError("Echo's connection was interrupted. This reply may be incomplete.");
        if (generation === getGeneration()) speak(full, replyMode);
      },
      onError: () => {
        busyRef.current = false; setBusy(false);
        if (full) { update(full, "partial"); setError("Echo's connection was interrupted. Please try again."); }
        else { update(ECHO_OFFLINE_REPLIES[0], "fallback"); if (generation === getGeneration()) speak(ECHO_OFFLINE_REPLIES[0], replyMode); }
      },
    });
  }, [stopSpeaking, speak, getGeneration]);
  const recorder = useEchoRecorder({ onText: send, setError, beforeStart: () => { speaker.stop(); speaker.setEnabled(true); } });
  const { start: startRecording, cancel: cancelRecording } = recorder;
  const close = () => { setOpen(false); recorder.cancel(); speaker.setEnabled(false); };
  const startVoice = useCallback(() => {
    setOpen(true);
    if (!busyRef.current) startRecording(modeRef.current);
  }, [startRecording]);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("echo:open", show);
    window.addEventListener("echo:voice", startVoice);
    return () => { window.removeEventListener("echo:open", show); window.removeEventListener("echo:voice", startVoice); };
  }, [startVoice]);
  useEffect(() => {
    const hide = () => { if (document.hidden) { cancelRecording(); enableSpeech(false); } };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, [cancelRecording, enableSpeech]);
  const changePet = (value) => { setPet(value); try { localStorage.setItem("echo-pet", value); } catch {} };
  const changeMode = (value) => { recorder.cancel(); speaker.stop(); setMode(value); setError(""); };
  return <>
    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }} className="echo-panel fixed right-3 sm:right-5 bottom-[86px] z-50 w-[calc(100vw-24px)] max-w-[390px] h-[560px] max-h-[calc(100dvh-106px)] bg-dock border border-white/15 rounded-2xl overflow-hidden shadow-2xl" data-testid="echo-chat-panel" role="dialog" aria-label="Chat with Echo" onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
        <EchoPanel {...{ pet, changePet, mode, changeMode, messages, busy, error, setError, speaker, recorder, send, close }} />
      </motion.div>}
    </AnimatePresence>
    {!open && <button data-testid="echo-pet-avatar" onClick={() => setOpen(true)} aria-label="Talk to Echo, the pet" className="fixed right-3 sm:right-5 bottom-[82px] sm:bottom-5 z-40 group flex flex-col items-center">
      <span className="bg-white border border-ink rounded-full px-3 py-1 font-mono text-[10px] shadow-sm group-hover:bg-hot group-hover:text-white transition-colors">Hey, I'm Echo!</span>
      <img src={`assets/echo-${pet}-transparent.png`} alt={`${pet === "cat" ? "Orange pixel cat" : "Blue pixel robot"} Echo`} className="pet-float w-[76px] h-[86px] sm:w-[90px] sm:h-[100px] object-contain drop-shadow-md" data-testid="echo-avatar-image" />
    </button>}
  </>;
}
