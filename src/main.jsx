import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Sparkles, Play, Wand2, Check, ChevronDown, Clock3, Film,
  Download, Trash2, ImagePlus, Volume2, Lightbulb, ArrowRight,
  HelpCircle, Menu, X, Zap, Layers3, Clapperboard
} from "lucide-react";
import "./index.css";

const examples = [
  "A peaceful beach at sunset with waves moving slowly and birds flying across the sky.",
  "A futuristic city at night, glowing neon lights, flying cars and a cinematic camera.",
  "A cute little robot walking through a magical forest filled with glowing flowers."
];

const styles = [
  ["Cinematic", "🎬", "Movie-like and dramatic"],
  ["Realistic", "📷", "Looks like real footage"],
  ["Anime", "🌸", "Colorful anime style"],
  ["3D Cartoon", "🧸", "Fun 3D animation"],
  ["Fantasy", "✨", "Magical and imaginative"],
  ["Vintage", "📼", "Classic film feeling"]
];

const ratios = [
  ["16:9", "Landscape", "Best for YouTube"],
  ["9:16", "Portrait", "Best for TikTok"],
  ["1:1", "Square", "Best for social posts"]
];

const starter = [
  { id: 1, title: "A peaceful beach at sunset", style: "Cinematic", ratio: "16:9", time: "Today" },
  { id: 2, title: "Robot in a magical forest", style: "Fantasy", ratio: "9:16", time: "Yesterday" },
  { id: 3, title: "Future city at night", style: "Realistic", ratio: "16:9", time: "Yesterday" }
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("8");
  const [sound, setSound] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState(starter);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!generating) return;
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(id);
          setGenerating(false);
          setVideos(v => [{
            id: Date.now(),
            title: prompt || "My new AI video",
            style,
            ratio,
            time: "Just now"
          }, ...v]);
          setMessage("Your video is ready! 🎉");
          return 100;
        }
        return p + 4;
      });
    }, 110);
    return () => clearInterval(id);
  }, [generating, prompt, style, ratio]);

  const start = () => {
    if (!prompt.trim()) {
      setMessage("First, tell Vance what you want your video to show.");
      document.getElementById("prompt")?.focus();
      return;
    }
    setMessage("");
    setProgress(0);
    setGenerating(true);
  };

  const useExample = text => {
    setPrompt(text);
    setMessage("Great! You can edit this idea before generating.");
    document.getElementById("prompt")?.focus();
  };

  return (
    <div className="min-h-screen bg-[#070711]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070711]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
              <Clapperboard size={20}/>
            </div>
            <div>
              <div className="font-bold tracking-tight">Vance Video</div>
              <div className="text-[10px] text-zinc-500">GENERATION</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#create" className="text-white">Create video</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#videos" className="hover:text-white">My videos</a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400">
              <Zap size={12} className="mr-1 inline text-yellow-300"/> 120 credits
            </div>
            <button className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black">Get credits</button>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X/> : <Menu/>}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 p-4 md:hidden">
            <a onClick={() => setMobileOpen(false)} href="#create" className="block rounded-lg p-3 text-sm">Create video</a>
            <a onClick={() => setMobileOpen(false)} href="#how" className="block rounded-lg p-3 text-sm">How it works</a>
            <a onClick={() => setMobileOpen(false)} href="#videos" className="block rounded-lg p-3 text-sm">My videos</a>
          </div>
        )}
      </header>

      <section className="hero-grid relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"/>
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-20 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-200">
            <Sparkles size={14}/> No editing experience needed
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Your idea.<br/><span className="gradient-text">Your video.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Vance turns simple words into videos. Just describe what you want, choose a style, and let AI do the hard work.
          </p>
        </div>
      </section>

      <main id="create" className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <Step n="1" title="Describe your idea" text="Tell us what you want to see." active/>
          <Step n="2" title="Choose your style" text="Pick a look for your video."/>
          <Step n="3" title="Create your video" text="Press generate and wait."/>
        </div>

        <section className="card rounded-3xl p-5 shadow-glow sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">What should your video show?</h2>
                  <p className="mt-1 text-xs text-zinc-500">You don't need special words. Just describe your idea normally.</p>
                </div>
                <HelpCircle size={18} className="text-zinc-600"/>
              </div>

              <div className={`rounded-2xl border ${message && !generating ? "border-violet-500/40" : "border-white/10"} bg-black/20 p-4`}>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={7}
                  placeholder="Example: A golden retriever running happily on a beach during sunset..."
                  className="w-full resize-none bg-transparent text-sm leading-7 text-white outline-none placeholder:text-zinc-600"
                />
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500 hover:bg-white/5 hover:text-white">
                    <ImagePlus size={15}/> Add a picture
                  </button>
                  <span className="text-[10px] text-zinc-600">{prompt.length}/500</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <Lightbulb size={14} className="text-yellow-300"/> Need an idea?
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {examples.map((x,i) => (
                    <button key={i} onClick={() => useExample(x)} className="rounded-xl border border-white/10 bg-white/[.02] p-3 text-left text-xs leading-5 text-zinc-500 transition hover:border-violet-400/30 hover:bg-violet-500/5 hover:text-zinc-300">
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <SettingTitle number="2" title="Choose a style" />
              <div className="grid grid-cols-2 gap-2">
                {styles.map(([name,icon,desc]) => (
                  <button key={name} onClick={() => setStyle(name)} className={`rounded-xl border p-3 text-left transition ${style === name ? "border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/10" : "border-white/10 bg-white/[.02] hover:border-white/20"}`}>
                    <div className="text-xl">{icon}</div>
                    <div className="mt-2 text-xs font-semibold">{name}</div>
                    <div className="mt-1 text-[10px] text-zinc-600">{desc}</div>
                    {style === name && <Check size={14} className="mt-2 text-violet-300"/>}
                  </button>
                ))}
              </div>

              <div className="mt-7">
                <SettingTitle number="3" title="Choose your video shape" />
                <div className="grid grid-cols-3 gap-2">
                  {ratios.map(([r,title,desc]) => (
                    <button key={r} onClick={() => setRatio(r)} className={`rounded-xl border p-3 text-center ${ratio === r ? "border-cyan-300 bg-cyan-400/10" : "border-white/10 bg-white/[.02]"}`}>
                      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-md border border-current text-[9px] text-zinc-400">{r}</div>
                      <div className="text-[11px] font-semibold">{title}</div>
                      <div className="mt-1 text-[9px] text-zinc-600">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <MiniSelect label="Length" value={duration} setValue={setDuration} options={["5","8","10","15"]} suffix="sec"/>
                <MiniSelect label="Sound" value={sound ? "On" : "Off"} setValue={() => setSound(!sound)} options={["On","Off"]}/>
              </div>

              <button onClick={start} disabled={generating} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] disabled:opacity-60">
                {generating ? <><span className="animate-spin"><Sparkles size={17}/></span> Creating your video... {progress}%</> : <><Wand2 size={18}/> Generate my video <ArrowRight size={16}/></>}
              </button>

              {message && <div className="mt-3 rounded-xl bg-white/5 p-3 text-center text-xs text-zinc-400">{message}</div>}
            </div>
          </div>

          {generating && (
            <div className="mt-7 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-5">
              <div className="mb-3 flex justify-between text-xs"><span className="text-zinc-300">Vance is creating your video...</span><span className="text-violet-300">{progress}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-black/40">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-100" style={{width:`${progress}%`}}/>
              </div>
              <div className="mt-3 grid grid-cols-3 text-[10px] text-zinc-600"><span>✓ Understanding prompt</span><span>{progress > 35 ? "✓ Creating scenes" : "○ Creating scenes"}</span><span>{progress > 75 ? "✓ Adding finishing touches" : "○ Finishing touches"}</span></div>
            </div>
          )}
        </section>

        <section id="how" className="py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-violet-300">It's really that simple</p>
            <h2 className="mt-3 text-3xl font-bold">Make your first video in 3 steps</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <How n="01" icon="💭" title="Describe" text="Write what you want your video to show. You can use everyday language."/>
            <How n="02" icon="🎨" title="Customize" text="Choose a style, shape, length and whether you want sound."/>
            <How n="03" icon="🚀" title="Generate" text="Click the button and Vance creates the video for you."/>
          </div>
        </section>

        <section id="videos">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-600">Your creations</p>
              <h2 className="mt-2 text-2xl font-bold">My videos</h2>
            </div>
            <span className="text-xs text-zinc-600">{videos.length} videos</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map(v => (
              <VideoCard key={v.id} video={v} remove={() => setVideos(vs => vs.filter(x => x.id !== v.id))}/>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 text-center">
        <div className="flex justify-center items-center gap-2 font-bold"><Clapperboard size={17}/> Vance Video Generation</div>
        <p className="mt-2 text-xs text-zinc-600">Making video creation simple for everyone.</p>
      </footer>
    </div>
  );
}

function Step({n,title,text,active}) {
  return <div className={`rounded-2xl border p-4 ${active ? "border-violet-400/30 bg-violet-500/5" : "border-white/10 bg-white/[.02]"}`}>
    <div className={`mb-2 grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${active ? "bg-violet-500" : "bg-zinc-800 text-zinc-500"}`}>{n}</div>
    <div className="text-sm font-semibold">{title}</div><div className="mt-1 text-xs text-zinc-600">{text}</div>
  </div>
}

function SettingTitle({number,title}) {
  return <div className="mb-3 flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full bg-zinc-800 text-[10px] font-bold">{number}</span><h3 className="text-sm font-bold">{title}</h3></div>
}

function MiniSelect({label,value,setValue,options,suffix=""}) {
  return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{label}</span>
    <div className="relative"><select value={value} onChange={e=>setValue(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[.03] px-3 py-3 text-xs outline-none">{options.map(x=><option key={x} value={x}>{x}{suffix}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-3.5 text-zinc-600"/></div>
  </label>
}

function How({n,icon,title,text}) {
  return <div className="card rounded-2xl p-6"><div className="flex items-center justify-between"><span className="text-xs text-zinc-600">{n}</span><span className="text-2xl">{icon}</span></div><h3 className="mt-8 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>
}

function VideoCard({video,remove}) {
  return <article className="card overflow-hidden rounded-2xl">
    <div className="relative aspect-video bg-zinc-900 hero-grid">
      <div className="absolute inset-0 grid place-items-center"><button className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-xl hover:scale-105"><Play size={18} fill="currentColor"/></button></div>
      <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-[10px]">{video.style}</span>
      <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-[10px]">{video.ratio}</span>
    </div>
    <div className="p-4">
      <h3 className="truncate text-sm font-semibold">{video.title}</h3>
      <p className="mt-1 flex items-center gap-1 text-[10px] text-zinc-600"><Clock3 size={11}/>{video.time}</p>
      <div className="mt-4 flex gap-2"><button className="flex-1 rounded-lg border border-white/10 py-2 text-xs hover:bg-white/5">Open video</button><button className="grid w-9 place-items-center rounded-lg border border-white/10"><Download size={13}/></button><button onClick={remove} className="grid w-9 place-items-center rounded-lg border border-white/10 text-zinc-600 hover:text-red-400"><Trash2 size={13}/></button></div>
    </div>
  </article>
}

createRoot(document.getElementById("root")).render(<App />);
