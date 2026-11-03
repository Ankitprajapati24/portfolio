import { useEffect, useRef, useState } from "react";
import { X, Send, Mic, Square, Volume2, VolumeX, Play, Cat, Bot, Loader2 } from "lucide-react";

export const EchoPanel = ({ pet, changePet, mode, changeMode, messages, busy, error, setError, speaker, recorder, send, close }) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, busy, recorder.state]);
  useEffect(() => { if (window.innerWidth >= 768) inputRef.current?.focus(); }, []);
  const recording = recorder.state === "listening";
  const recordingBusy = recorder.state !== "idle";
  const playing = speaker.state !== "idle";
  const status = recording ? `Listening · ${recorder.elapsed}s / 45s` : recorder.state === "permission" ? "Waiting for microphone…" : recorder.state === "transcribing" ? "Transcribing…" : busy ? "Thinking…" : speaker.state === "loading" ? "Preparing voice…" : speaker.state === "speaking" ? "Speaking…" : "Ankit's little sidekick";
  const iconButton = "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40";
  const submit = (event) => { event.preventDefault(); if (!input.trim() || busy || recordingBusy) return; send(input); setInput(""); };
  return <div className="flex flex-col h-full min-h-0 text-white" data-lenis-prevent>
    <header className="flex items-center gap-2 px-3 py-3 border-b border-white/10 bg-[#141417]">
      <img src={`assets/echo-${pet}-transparent.png`} alt="" className={`w-10 h-11 object-contain ${recording || playing ? "pet-float" : ""}`} />
      <div className="flex-1 min-w-0"><p data-testid="echo-name" className="text-sm font-semibold">Echo<span className="text-hot ml-2 font-mono text-[10px]">AI PET</span></p><p data-testid="echo-status" role="status" className="text-[11px] text-slate-400 mt-1">{status}</p></div>
      <div className="flex border border-white/15 rounded-lg" role="group" aria-label="Echo appearance">
        {[{ id: "cat", Icon: Cat, title: "Orange cat" }, { id: "robot", Icon: Bot, title: "Blue robot" }].map(({ id, Icon, title }) => <button key={id} onClick={() => changePet(id)} data-testid={`echo-pet-select-${id}`} aria-label={title} title={title} aria-pressed={pet === id} className={`${iconButton} ${pet === id ? "!text-hot bg-white/10" : ""}`}><Icon className="w-4 h-4" /></button>)}
      </div>
      <button data-testid="echo-chat-close-button" onClick={close} aria-label="Close chat" title="Close chat" className={iconButton}><X className="w-4 h-4" /></button>
    </header>
    <div className="px-3 py-2 border-b border-white/10 bg-[#141417]">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs text-slate-400 flex items-center gap-2">Voice
          <select data-testid="echo-voice-mode" aria-label="Voice mode" value={mode} onChange={(e) => changeMode(e.target.value)} className="bg-[#242426] text-white text-xs rounded-md border border-white/20 px-2 py-1.5 focus:outline-hot">
            <option value="ai" disabled>AI voice (unavailable)</option><option value="browser" disabled={!recorder.browserSupported}>Browser voice{!recorder.browserSupported ? " (unsupported)" : ""}</option>
          </select>
        </label>
        <button data-testid="echo-voice-output-toggle" aria-label={speaker.enabled ? "Mute spoken replies" : "Enable spoken replies"} title={speaker.enabled ? "Mute spoken replies" : "Enable spoken replies"} aria-pressed={speaker.enabled} onClick={() => speaker.setEnabled(!speaker.enabled)} className={`${iconButton} ${speaker.enabled ? "!text-hot" : ""}`}>{speaker.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}</button>
      </div>
      <p data-testid="echo-voice-disclosure" className="text-[10px] leading-relaxed text-slate-400 mt-1.5">{mode === "ai" ? "AI-generated voice · audio processed in the cloud, not stored." : "Browser speech services · availability varies by browser."}</p>
    </div>
    <div ref={scrollRef} data-testid="echo-chat-messages" className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-4 space-y-3 dot-grid-dark" role="log" aria-label="Conversation">
      {messages.map((m, i) => <div key={i} className={`max-w-[90%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
        <div data-testid={`echo-chat-message-${m.role}-${i}`} className={`px-3 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap break-words ${m.role === "user" ? "bg-hot text-white rounded-br-sm" : "bg-white/10 text-slate-100 rounded-bl-sm"}`}>{m.content || "…"}</div>
        {m.source === "fallback" && <p data-testid={`echo-fallback-${i}`} className="text-[10px] text-amber-300 mt-1">Offline reply · AI unavailable</p>}
        {m.role === "assistant" && m.content && !(busy && i === messages.length - 1) && <button data-testid={`echo-play-reply-${i}`} onClick={() => { recorder.cancel(); setError(""); speaker.speak(m.content, mode, true); }} aria-label="Read reply aloud" title="Read reply aloud" className="mt-1 w-7 h-7 flex items-center justify-center text-slate-400 hover:text-hot transition-colors"><Play className="w-3 h-3" /></button>}
      </div>)}
    </div>
    {error && <div data-testid="echo-voice-error" role="alert" className="mx-3 mb-2 px-3 py-2 bg-amber-950/50 border border-amber-700/60 rounded-lg text-xs text-amber-200 flex items-start gap-2"><span className="flex-1">{error}</span><button data-testid="echo-dismiss-error" className="shrink-0" onClick={() => setError("")} aria-label="Dismiss error"><X className="w-4 h-4" /></button></div>}
    {(recordingBusy || playing || (busy && speaker.enabled)) && <div className="px-3 pb-2 flex items-center justify-between gap-2">
      <span data-testid="echo-audio-state" className="text-xs text-hot flex items-center gap-2">{recording ? <span className="w-2 h-2 rounded-full bg-hot animate-pulse" /> : <Loader2 className="w-3 h-3 animate-spin" />}{status}</span>
      <button data-testid="echo-stop-audio-button" onClick={() => { recorder.cancel(); speaker.stop(); }} className="text-xs text-slate-300 hover:text-white flex items-center gap-1"><Square className="w-3 h-3" />Cancel</button>
    </div>}
    <form onSubmit={submit} className="p-3 border-t border-white/10 bg-[#141417] flex items-center gap-2">
      <button type="button" data-testid="echo-record-button" disabled={busy || (recordingBusy && !recording)} onClick={() => recording ? recorder.finish() : recorder.start(mode)} aria-label={recording ? "Stop recording and send" : "Record a question"} title={recording ? "Stop recording and send" : "Record a question"} className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors disabled:opacity-40 ${recording ? "bg-hot text-white animate-pulse" : "bg-white/10 text-hot hover:bg-white/20"}`}>{recording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}</button>
      <input ref={inputRef} data-testid="echo-chat-input" aria-label="Message Echo" value={input} maxLength={2000} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Ankit…" disabled={recordingBusy} className="flex-1 w-0 min-w-0 bg-white/10 border border-white/15 rounded-full px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-hot disabled:opacity-50" />
      <button type="submit" data-testid="echo-chat-send-button" disabled={busy || recordingBusy || !input.trim()} aria-label="Send message" title="Send message" className="shrink-0 w-10 h-10 rounded-full bg-hot disabled:bg-white/10 disabled:text-slate-500 flex items-center justify-center hover:bg-hotdark transition-colors"><Send className="w-4 h-4" /></button>
    </form>
  </div>;
};
