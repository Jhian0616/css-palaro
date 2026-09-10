import React, { useState } from "react";
import {
  MapPin, Clock, Trophy, User, Search, CheckCircle2, AlertTriangle,
  ArrowLeft, ChevronRight, LogOut, Shield, Users, ClipboardList,
  X, Eye, CalendarDays, LogIn, KeyRound
} from "lucide-react";

// ---------------------------------------------------------------------------
// MOCK DATA
// ---------------------------------------------------------------------------


const ARNIS = {
  sport: "ARNIS",
  venue: "TBA",
  schedule: "7:00 AM - 5:00 PM",
  date: "DAY 3 - WEDNESDAY",
  code: "PALARO2026ARNIS",
  facilitator: "Reyes, Marco\nVillaflor, Anne",
};

const ATHLETICS = {
  sport: "ATHLETICS",
  venue: "GRANDSTAND",
  schedule: "7:00 AM - 7:00 AM",
  date: "DAY 2-3 - (TUESDAY-WEDNESDAY)",
  code: "PALARO2026ARNIS",
  facilitator: "Reyes, Marco\nVillaflor, Anne",
};


const INITIAL_SECTIONS = [
  { id: "BSCS", name: "BSCS 2A", rep: "ARJAY TANJAY", expected: 40, present: 38 },
  { id: "BSCS", name: "BSCS 1A", rep: "SHEN BOADO", expected: 40, present: 28 },
  { id: "BSCS", name: "BSCS 3A", rep: "JHIAN MANACPO", expected: 40, present: 37 },
  { id: "BSCS", name: "BSCS 4A", rep: "NINJA VAN", expected: 40, present: 35 },
  { id: "BSCS", name: "BSCS 1B", rep: "SHOPEE DELIVERY", expected: 40, present: 34 },

];
const section = INITIAL_SECTIONS.find(section => section.id === "BSCS 1A");

const DIRECTORY = [
  { id: "2026-12345", name: "Jhian Carlo A. Manacpo", section: "BSCS 1B", sport: "Volleyball", password: "pass123" },
  { id: "2026-12346", name: "Andrea Nicole B. Santos", section: "BSCS 1A", sport: "Basketball", password: "pass123" },
  { id: "2026-12347", name: "Miguel R. Torres", section: "BSCS 1A", sport: "Basketball", password: "pass123" },
  { id: "2026-12348", name: "Kyla Mae D. Fernandez", section: "BSCS 1A", sport: "Basketball", password: "pass123" },
  { id: "2026-12349", name: "Rafael G. Ocampo", section: "BSCS 1A", sport: "Basketball", password: "pass123" },
  { id: "2026-12350", name: "Bea Cristine M. Valdez", section: "BSCS 1A", sport: "Basketball", password: "pass123" },
];

// Attendance records span multiple event days — each record is tied to a
// specific date so a student's history builds up across the whole Palaro.
const INITIAL_ATTENDANCE = [
  { studentId: "2026-12345", date: "Day 1 · September 9, 2026", timeIn: "7:58 AM", timeOut: "12:10 PM" },
  { studentId: "2026-12346", date: "Day 1 · September 9, 2026", timeIn: "8:02 AM", timeOut: "12:05 PM" },
  { studentId: "2026-12345", date: "Day 2 · September 10, 2026", timeIn: "8:03 AM", timeOut: null },
  { studentId: "2026-12346", date: "Day 2 · September 10, 2026", timeIn: "8:05 AM", timeOut: null },
  { studentId: "2026-12348", date: "Day 2 · September 10, 2026", timeIn: "8:07 AM", timeOut: "12:04 PM" },
];

// ---------------------------------------------------------------------------
// STYLE
// ---------------------------------------------------------------------------

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

      .ccs-root {
        --maroon-900: #3E0B16;
        --maroon-700: #6B1220;
        --maroon-600: #7E1729;
        --gold-500: #D9A94C;
        --gold-300: #EAC97E;
        --cream-50: #FAF6EF;
        --cream-100: #F3ECDD;
        --ink-900: #221A16;
        --ink-600: #5B4F47;
        --line: #E4D9C6;
        --green-600: #2F7D5E;
        --green-50: #E7F3EC;
        --amber-600: #B9791F;
        --amber-50: #FBF0DD;
        --red-600: #B23A3A;
        --red-50: #FBEAEA;
        font-family: 'Inter', sans-serif;
        color: var(--ink-900);
        background: var(--cream-50);
        min-height: 100%;
        width: 100%;
        position: relative;
      }
      .ccs-root .display {
        font-family: 'Anton', sans-serif;
        letter-spacing: 0.01em;
      }
      .ccs-stripes {
        background-image: repeating-linear-gradient(
          -45deg,
          var(--gold-500) 0px, var(--gold-500) 10px,
          transparent 10px, transparent 20px
        );
      }
      .ccs-card {
        background: #fff;
        border: 1.5px solid var(--line);
        border-radius: 14px;
      }
      .ccs-btn-primary {
        background: var(--maroon-700);
        color: #fff;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        transition: background 0.15s ease, transform 0.1s ease;
      }
      .ccs-btn-primary:hover { background: var(--maroon-900); }
      .ccs-btn-primary:active { transform: scale(0.98); }
      .ccs-btn-gold {
        background: var(--gold-500);
        color: var(--maroon-900);
        border: none;
        border-radius: 12px;
        font-weight: 800;
      }
      .ccs-btn-gold:hover { background: var(--gold-300); }
      .ccs-btn-outline {
        background: transparent;
        border: 1.5px solid var(--line);
        color: var(--ink-900);
        border-radius: 12px;
        font-weight: 600;
      }
      .ccs-btn-outline:hover { border-color: var(--maroon-700); color: var(--maroon-700); }
      .ccs-pill-green { background: var(--green-50); color: var(--green-600); }
      .ccs-pill-amber { background: var(--amber-50); color: var(--amber-600); }
      .ccs-pill-red { background: var(--red-50); color: var(--red-600); }
      .ccs-progress-track { background: var(--cream-100); border-radius: 999px; overflow: hidden; }
      .ccs-progress-fill { background: var(--green-600); }
      .ccs-input {
        border: 1.5px solid var(--line);
        border-radius: 10px;
        padding: 12px 14px;
        font-size: 15px;
        width: 100%;
        background: #fff;
        color: var(--ink-900);
      }
      .ccs-input:focus { outline: 2px solid var(--maroon-700); outline-offset: 1px; }
      .ccs-input.mono { letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; }
      .ccs-tab {
        border-bottom: 2.5px solid transparent;
        color: var(--ink-600);
        font-weight: 600;
        font-size: 13px;
        white-space: nowrap;
      }
      .ccs-tab.active { border-color: var(--maroon-700); color: var(--maroon-700); }
      .ccs-scroll::-webkit-scrollbar { display: none; }
      .ccs-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid var(--maroon-700); outline-offset: 2px; }
      @media (prefers-reduced-motion: reduce) {
        .ccs-root * { transition: none !important; animation: none !important; }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// SMALL BUILDING BLOCKS
// ---------------------------------------------------------------------------

function TopBar({ title, subtitle, onBack, right }) {
  return (
    <div className="px-5 pt-5 pb-4 flex items-start justify-between" style={{ background: "var(--maroon-700)" }}>
      <div className="flex items-start gap-3">
        {onBack && (
          <button onClick={onBack} className="mt-1 text-white/80 hover:text-white" aria-label="Back">
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <div className="display text-white" style={{ fontSize: 22, lineHeight: 1.05 }}>{title}</div>
          {subtitle && <div className="text-white/70 text-sm mt-0.5">{subtitle}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    present: { cls: "ccs-pill-green", label: "PRESENT" },
    pending: { cls: "ccs-pill-amber", label: "NOT YET TIMED IN" },
    out: { cls: "ccs-pill-green", label: "TIMED OUT" },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`${s.cls} text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1`}>
      {status !== "pending" && <CheckCircle2 size={12} />}
      {s.label}
    </span>
  );
}

function EventInfoGrid({ event }) {
  const items = [
    { icon: CalendarDays, label: "EVENT DAY", value: event.date },
    { icon: Trophy, label: "SPORT", value: event.sport },
    { icon: MapPin, label: "VENUE", value: event.venue },
    { icon: Clock, label: "SCHEDULE", value: event.schedule },
  ];
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((it) => (
        <div key={it.label} className="ccs-card p-3 flex flex-col gap-1.5">
          <it.icon size={16} color="var(--maroon-700)" />
          <div className="text-[10px] font-bold tracking-wide" style={{ color: "var(--ink-600)" }}>{it.label}</div>
          <div className="text-[13px] font-semibold leading-snug">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function VenueAlertBanner({ change, onAck }) {
  if (!change) return null;
  return (
    <div className="mx-5 mt-4 ccs-card p-4" style={{ borderColor: "var(--red-600)", background: "var(--red-50)" }}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} color="var(--red-600)" />
        <div className="font-extrabold text-sm" style={{ color: "var(--red-600)" }}>IMPORTANT VENUE CHANGE</div>
      </div>
      <div className="text-sm mb-2">
        <span className="font-semibold">{change.sport}</span> has moved.
      </div>
      <div className="flex items-center gap-2 text-sm mb-3">
        <span className="line-through" style={{ color: "var(--ink-600)" }}>{change.oldVenue}</span>
        <ChevronRight size={14} />
        <span className="font-bold">{change.newVenue}</span>
      </div>
      <button onClick={onAck} className="ccs-btn-primary w-full py-2.5 text-sm">ACKNOWLEDGE UPDATE</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LANDING
// ---------------------------------------------------------------------------

function Landing({ go }) {
  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--maroon-700)" }}>
      <div className="h-1.5 ccs-stripes" />
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.1)" }}>
            <Trophy size={13} color="var(--gold-300)" />
            <span className="text-[11px] font-bold tracking-wide text-white/90">WMSU · COLLEGE OF COMPUTING STUDIES</span>
          </div>
          <div className="display text-white" style={{ fontSize: 46, lineHeight: 0.95 }}>
            CCS PALARO<br />2026
          </div>
          <div className="text-white/70 text-sm mt-2 font-medium">Attendance &amp; Support System</div>
        </div>

        <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
          <button onClick={() => go("adminLogin")} className="ccs-btn-gold py-4 px-5 flex items-center justify-between w-full">
            <span className="flex items-center gap-3"><Shield size={19} /> ADMIN LOGIN</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => go("repLogin")} className="py-4 px-5 flex items-center justify-between w-full rounded-xl font-bold"
            style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)" }}>
            <span className="flex items-center gap-3"><ClipboardList size={19} /> REPRESENTATIVE LOGIN</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => go("studentLogin")} className="py-4 px-5 flex items-center justify-between w-full rounded-xl font-bold"
            style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1.5px solid rgba(255,255,255,0.18)" }}>
            <span className="flex items-center gap-3"><Eye size={19} /> STUDENT LOGIN</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="text-center pb-6">
        <div className="text-white/50 text-[12px] italic">"Smarter Attendance. Better Support. One CCS."</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LOGIN SCREENS
// ---------------------------------------------------------------------------

function LoginScreen({ role, back, onSuccess, eventCode }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const labels = {
    admin: { title: "ADMIN LOGIN", idLabel: "ADMIN ID", placeholder: "ADM-0001", icon: Shield, hint: "Admin access is provisioned by CCS Palaro organizers." },
    rep: { title: "REPRESENTATIVE LOGIN", idLabel: "REPRESENTATIVE ID", placeholder: "REP-BSCS1A", icon: ClipboardList, hint: "Enter your Representative ID and today's Event Code, given by the admin, to log in and record attendance." },
    student: { title: "STUDENT LOGIN", idLabel: "STUDENT ID", placeholder: "2026-12345", icon: Eye, hint: "Use your registered Student ID and password to check your own attendance." },
  }[role];
  const Icon = labels.icon;

  const submit = () => {
    if (role === "rep") {
      if (!id.trim()) { setError("Please enter your Representative ID."); return; }
      if (!code.trim()) { setError("Please enter today's Event Code."); return; }
      if (code.trim().toUpperCase() !== String(eventCode).toUpperCase()) {
        setError("Invalid Event Code. Check with your CCS Palaro admin for today's code.");
        return;
      }
      setError("");
      onSuccess(id);
      return;
    }
    if (role !== "student") { onSuccess(id); return; }
    const student = DIRECTORY.find((d) => d.id === id.trim());
    if (!student) { setError("No registered student found with that ID."); return; }
    if (pw && student.password !== pw) { setError("Incorrect password."); return; }
    setError("");
    onSuccess(student.id);
  };

  return (
    <div className="min-h-full flex flex-col">
      <TopBar title={labels.title} onBack={back} />
      <div className="flex-1 px-6 py-10 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: "var(--cream-100)" }}>
            <Icon size={24} color="var(--maroon-700)" />
          </div>
          <div className="text-sm" style={{ color: "var(--ink-600)" }}>{labels.hint}</div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>{labels.idLabel}</label>
            <input className="ccs-input mt-1" placeholder={labels.placeholder} value={id} onChange={(e) => setId(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>

          {role === "rep" ? (
            <div>
              <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--ink-600)" }}>
                <KeyRound size={12} /> EVENT CODE
              </label>
              <input
                className="ccs-input mono mt-1"
                placeholder="e.g. PLR-0910"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <div className="text-[11px] mt-1.5" style={{ color: "var(--ink-600)" }}>
                Posted by the admin for each event day — ask them if you don't have it yet.
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>PASSWORD</label>
              <input type="password" className="ccs-input mt-1" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
            </div>
          )}

          {error && (
            <div className="ccs-card p-3 flex items-center gap-2" style={{ background: "var(--red-50)", borderColor: "var(--red-600)" }}>
              <AlertTriangle size={15} color="var(--red-600)" />
              <span className="text-[13px]" style={{ color: "var(--red-600)" }}>{error}</span>
            </div>
          )}
          <button onClick={submit} className="ccs-btn-primary py-3.5 mt-1 flex items-center justify-center gap-2">
            <LogIn size={17} /> LOG IN
          </button>
          {role === "student" && (
            <div className="text-center text-[12px]" style={{ color: "var(--ink-600)" }}>
              Try ID 2026-12345 · password pass123
            </div>
          )}
          {role === "rep" && (
            <div className="text-center text-[12px]" style={{ color: "var(--ink-600)" }}>
              Try any Representative ID · today's code {eventCode}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ADMIN DASHBOARD
// ---------------------------------------------------------------------------

function AdminApp({ event, sections, onUpdateVenue, onUpdateCode, logout }) {
  const [tab, setTab] = useState("overview");
  const totalExpected = 450;
  const totalTimedIn = 387;
  const totalNotYet = totalExpected - totalTimedIn;

  return (
    <div className="min-h-full flex flex-col">
      <TopBar
        title="CCS PALARO ADMIN"
        subtitle="Event & System Control Center"
        right={<button onClick={logout} className="text-white/80 hover:text-white" aria-label="Log out"><LogOut size={19} /></button>}
      />
      <div className="px-5 pt-3 flex gap-5 border-b ccs-scroll overflow-x-auto" style={{ borderColor: "var(--line)", background: "#fff" }}>
        {[
          ["overview", "Overview"],
          ["sections", "Sections"],
          ["monitor", "Attendance Monitor"],
          ["venue", "Manage Venue"],
          ["code", "Event Code"],
        ].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`ccs-tab pb-3 pt-1 ${tab === k ? "active" : ""}`}>{label}</button>
        ))}
      </div>

      <div className="flex-1 px-5 py-5">
        {tab === "overview" && (
          <AdminOverview event={event} totalExpected={totalExpected} totalTimedIn={totalTimedIn} totalNotYet={totalNotYet} sectionsCount={sections.length + 6} />
        )}
        {tab === "sections" && <AdminSections sections={sections} />}
        {tab === "monitor" && <AdminMonitor event={event} sections={sections} />}
        {tab === "venue" && <AdminVenue event={event} onUpdateVenue={onUpdateVenue} />}
        {tab === "code" && <AdminEventCode event={event} onUpdateCode={onUpdateCode} />}
      </div>
    </div>
  );
}

function StatBlock({ label, value, accent }) {
  return (
    <div className="ccs-card p-4 flex flex-col gap-1">
      <div className="text-[11px] font-bold tracking-wide" style={{ color: "var(--ink-600)" }}>{label}</div>
      <div className="display" style={{ fontSize: 30, color: accent || "var(--ink-900)" }}>{value}</div>
    </div>
  );
}

function AdminOverview({ event, totalExpected, totalTimedIn, totalNotYet, sectionsCount }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-xs font-bold mb-2" style={{ color: "var(--ink-600)" }}>TODAY'S OVERVIEW — {event.date}</div>
        <div className="grid grid-cols-2 gap-3">
          <StatBlock label="TOTAL SECTIONS" value={sectionsCount} />
          <StatBlock label="TOTAL REPRESENTATIVES" value={sectionsCount} />
          <StatBlock label="TOTAL NONPLAYERS" value={totalExpected} />
          <StatBlock label="TIMED IN" value={totalTimedIn} accent="var(--green-600)" />
        </div>
        <div className="mt-3">
          <StatBlock label="NOT YET TIMED IN" value={totalNotYet} accent="var(--amber-600)" />
        </div>
      </div>

      <div>
        <div className="text-xs font-bold mb-2" style={{ color: "var(--ink-600)" }}>CURRENT EVENT</div>
        <div className="ccs-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="display text-lg">{event.sport}</div>
            <span className="ccs-pill-green text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green-600)" }} /> ACTIVE
            </span>
          </div>
          <EventInfoGrid event={event} />
          <div className="mt-3 pt-3 flex items-center justify-between border-t" style={{ borderColor: "var(--line)" }}>
            <div className="flex items-center gap-2 text-[12px]" style={{ color: "var(--ink-600)" }}>
              <KeyRound size={13} color="var(--maroon-700)" /> Event Code
            </div>
            <div className="font-extrabold text-sm" style={{ letterSpacing: "0.06em" }}>{event.code}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminSections({ sections }) {
  return (
    <div>
      <div className="text-xs font-bold mb-3" style={{ color: "var(--ink-600)" }}>SECTION ATTENDANCE</div>
      <div className="flex flex-col gap-2.5">
        {sections.map((s) => {
          const pct = Math.round((s.present / s.expected) * 100);
          return (
            <div key={s.id} className="ccs-card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-extrabold text-sm">{s.name}</div>
                  <div className="text-[12px]" style={{ color: "var(--ink-600)" }}>{s.rep}</div>
                </div>
                <div className="text-right">
                  <div className="display text-lg" style={{ color: "var(--green-600)" }}>{pct}%</div>
                  <div className="text-[11px]" style={{ color: "var(--ink-600)" }}>{s.present}/{s.expected}</div>
                </div>
              </div>
              <div className="ccs-progress-track h-1.5">
                <div className="ccs-progress-fill h-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminMonitor({ event, sections }) {
  return (
    <div>
      <div className="ccs-card p-4 mb-4">
        <div className="text-[11px] font-bold mb-2" style={{ color: "var(--ink-600)" }}>LIVE ATTENDANCE MONITOR — {event.date}</div>
        <div className="flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-1.5"><Trophy size={13} color="var(--maroon-700)" /> {event.sport}</div>
          <div className="flex items-center gap-1.5"><MapPin size={13} color="var(--maroon-700)" /> {event.venue}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {sections.map((s) => {
          const pct = Math.round((s.present / s.expected) * 100);
          return (
            <div key={s.id} className="ccs-card p-4 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm mb-1">{s.name}</div>
                <div className="text-[12px]" style={{ color: "var(--ink-600)" }}>{s.present} / {s.expected} Present</div>
              </div>
              <div className="ccs-pill-green text-[12px] font-bold px-2.5 py-1 rounded-full">{pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminVenue({ event, onUpdateVenue }) {
  const [editing, setEditing] = useState(false);
  const [newVenue, setNewVenue] = useState("");
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!newVenue.trim()) return;
    onUpdateVenue(newVenue.trim());
    setDone(true);
    setEditing(false);
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>MANAGE VENUE</div>
      <div className="ccs-card p-4">
        <div className="display text-lg mb-3">{event.sport}</div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2"><CalendarDays size={15} color="var(--maroon-700)" /> Event Day: <span className="font-bold">{event.date}</span></div>
          <div className="flex items-center gap-2"><MapPin size={15} color="var(--maroon-700)" /> Current Venue: <span className="font-bold">{event.venue}</span></div>
          <div className="flex items-center gap-2"><Clock size={15} color="var(--maroon-700)" /> Schedule: <span className="font-bold">{event.schedule}</span></div>
        </div>
      </div>

      {done && (
        <div className="ccs-card p-3 flex items-center gap-2" style={{ background: "var(--green-50)", borderColor: "var(--green-600)" }}>
          <CheckCircle2 size={16} color="var(--green-600)" />
          <span className="text-sm font-bold" style={{ color: "var(--green-600)" }}>VENUE UPDATED — visible to all representatives and students.</span>
        </div>
      )}

      {!editing ? (
        <button onClick={() => setEditing(true)} className="ccs-btn-primary py-3.5">CHANGE VENUE</button>
      ) : (
        <div className="ccs-card p-4 flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>NEW VENUE</label>
            <input className="ccs-input mt-1" placeholder="e.g. WMSU Covered Court" value={newVenue} onChange={(e) => setNewVenue(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>REASON FOR CHANGE</label>
            <input className="ccs-input mt-1" placeholder="e.g. Gym scheduling conflict" value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="ccs-btn-outline py-3 flex-1">CANCEL</button>
            <button onClick={submit} className="ccs-btn-primary py-3 flex-1">UPDATE VENUE</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminEventCode({ event, onUpdateCode }) {
  const [editing, setEditing] = useState(false);
  const [newCode, setNewCode] = useState(event.code);
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!newCode.trim()) return;
    onUpdateCode(newCode.trim().toUpperCase());
    setDone(true);
    setEditing(false);
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>EVENT CODE</div>

      <div className="ccs-card p-6 text-center">
        <div className="text-[11px] font-bold mb-2" style={{ color: "var(--ink-600)" }}>TODAY'S CODE — {event.date}</div>
        <div className="display" style={{ fontSize: 36, color: "var(--maroon-700)", letterSpacing: "0.08em" }}>{event.code}</div>
        <div className="text-[12px] mt-3" style={{ color: "var(--ink-600)" }}>
          Representatives must enter this code to log in and record attendance. Share it with section reps at the start of the event day.
        </div>
      </div>

      {done && (
        <div className="ccs-card p-3 flex items-center gap-2" style={{ background: "var(--green-50)", borderColor: "var(--green-600)" }}>
          <CheckCircle2 size={16} color="var(--green-600)" />
          <span className="text-sm font-bold" style={{ color: "var(--green-600)" }}>EVENT CODE UPDATED — reps will need the new code to log in.</span>
        </div>
      )}

      {!editing ? (
        <button onClick={() => { setNewCode(event.code); setEditing(true); }} className="ccs-btn-primary py-3.5">CHANGE EVENT CODE</button>
      ) : (
        <div className="ccs-card p-4 flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>NEW EVENT CODE</label>
            <input className="ccs-input mono mt-1" placeholder="e.g. PLR-0910" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="ccs-btn-outline py-3 flex-1">CANCEL</button>
            <button onClick={submit} className="ccs-btn-primary py-3 flex-1">UPDATE CODE</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// REPRESENTATIVE DASHBOARD
// ---------------------------------------------------------------------------

function RepApp({ event, section, attendance, setAttendance, venueChange, ackVenue, logout }) {
  const [screen, setScreen] = useState("home"); // home | timeIn | list

  const todays = attendance.filter((a) => a.date === event.date);
  const present = todays.filter((a) => a.timeIn).length;
  const expected = section.expected;
  const pct = Math.round((present / expected) * 100);

  return (
    <div className="min-h-full flex flex-col">
      <TopBar
        title={`WELCOME, ${section.rep.split(" ")[0].toUpperCase()}`}
        subtitle={`Section Representative — ${section.name}`}
        onBack={screen !== "home" ? () => setScreen("home") : undefined}
        right={screen === "home" && <button onClick={logout} className="text-white/80 hover:text-white" aria-label="Log out"><LogOut size={19} /></button>}
      />
      <VenueAlertBanner change={venueChange} onAck={ackVenue} />

      {screen === "home" && (
        <div className="flex-1 px-5 py-5 flex flex-col gap-5">
          <EventInfoGrid event={event} />

          <div className="flex gap-2.5">
            <div className="ccs-card p-3 flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--cream-100)" }}>
                <User size={17} color="var(--maroon-700)" />
              </div>
              <div>
                <div className="text-[10px] font-bold" style={{ color: "var(--ink-600)" }}>FACILITATOR</div>
                <div className="text-sm font-semibold">{section.rep}</div>
              </div>
            </div>
            <div className="ccs-card p-3 flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--cream-100)" }}>
                <KeyRound size={17} color="var(--maroon-700)" />
              </div>
              <div>
                <div className="text-[10px] font-bold" style={{ color: "var(--ink-600)" }}>EVENT CODE</div>
                <div className="text-sm font-semibold" style={{ letterSpacing: "0.04em" }}>{event.code}</div>
              </div>
            </div>
          </div>

          <div className="ccs-card p-4">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>SECTION ATTENDANCE — {section.name}</div>
              <span className="display text-lg" style={{ color: "var(--green-600)" }}>{pct}%</span>
            </div>
            <div className="ccs-progress-track h-2.5 my-2">
              <div className="ccs-progress-fill h-full" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-[12px]" style={{ color: "var(--ink-600)" }}>
              <span>{present} / {expected} TIMED IN</span>
              <span>{expected - present} remaining</span>
            </div>
          </div>

          <button onClick={() => setScreen("timeIn")} className="ccs-btn-primary py-6 text-lg flex items-center justify-center gap-2.5 mt-1">
            <CheckCircle2 size={22} /> TIME IN STUDENT
          </button>
          <button onClick={() => setScreen("list")} className="ccs-btn-outline py-3.5 flex items-center justify-center gap-2">
            <ClipboardList size={17} /> VIEW ATTENDANCE BY DATE
          </button>
        </div>
      )}

      {screen === "timeIn" && (
        <TimeInFlow event={event} attendance={attendance} setAttendance={setAttendance} onDone={() => setScreen("home")} />
      )}

      {screen === "list" && (
        <AttendanceList event={event} section={section} attendance={attendance} setAttendance={setAttendance} />
      )}
    </div>
  );
}

function TimeInFlow({ event, attendance, setAttendance, onDone }) {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState(null);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const search = () => {
    setError("");
    setFound(null);
    const student = DIRECTORY.find((d) => d.id === query.trim());
    if (!student) { setError("No registered student found with that ID."); return; }
    const already = attendance.find((a) => a.studentId === student.id && a.date === event.date);
    if (already && already.timeIn) { setError(`${student.name} is already timed in today (${already.timeIn}).`); return; }
    setFound(student);
  };

  const confirm = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setAttendance((prev) => {
      const exists = prev.find((a) => a.studentId === found.id && a.date === event.date);
      if (exists) return prev.map((a) => (a.studentId === found.id && a.date === event.date ? { ...a, timeIn: time } : a));
      return [...prev, { studentId: found.id, date: event.date, timeIn: time, timeOut: null }];
    });
    setConfirmed({ ...found, time });
  };

  if (confirmed) {
    return (
      <div className="flex-1 px-6 py-10 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "var(--green-50)" }}>
          <CheckCircle2 size={32} color="var(--green-600)" />
        </div>
        <div className="display text-xl" style={{ color: "var(--green-600)" }}>ATTENDANCE RECORDED</div>
        <div className="font-bold">{confirmed.name}</div>
        <div className="text-sm" style={{ color: "var(--ink-600)" }}>{event.date}</div>
        <div className="text-sm" style={{ color: "var(--ink-600)" }}>Time In: <span className="font-bold" style={{ color: "var(--ink-900)" }}>{confirmed.time}</span></div>
        <button onClick={onDone} className="ccs-btn-primary py-3.5 px-8 mt-3">DONE</button>
      </div>
    );
  }

  if (found) {
    return (
      <div className="flex-1 px-5 py-6 flex flex-col gap-4">
        <div className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>STUDENT FOUND</div>
        <div className="ccs-card p-4 flex flex-col gap-2.5">
          <div className="w-11 h-11 rounded-full flex items-center justify-center mb-1" style={{ background: "var(--cream-100)" }}>
            <User size={19} color="var(--maroon-700)" />
          </div>
          <Row label="Name" value={found.name} />
          <Row label="Student ID" value={found.id} />
          <Row label="Section" value={found.section} />
          <Row label="Assigned Sport" value={found.sport} />
          <Row label="Event Day" value={event.date} />
        </div>
        <div className="text-[13px]" style={{ color: "var(--ink-600)" }}>Confirm that this student is physically present.</div>
        <button onClick={confirm} className="ccs-btn-primary py-4 flex items-center justify-center gap-2">
          <CheckCircle2 size={18} /> CONFIRM TIME IN
        </button>
        <button onClick={() => { setFound(null); setQuery(""); }} className="ccs-btn-outline py-3">SEARCH AGAIN</button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-5 py-6 flex flex-col gap-4">
      <div className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>TIME IN STUDENT — {event.date}</div>
      <div>
        <label className="text-xs font-bold" style={{ color: "var(--ink-600)" }}>ENTER STUDENT ID</label>
        <input className="ccs-input mt-1" placeholder="e.g. 2026-12345" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
      </div>
      {error && (
        <div className="ccs-card p-3 flex items-center gap-2" style={{ background: "var(--red-50)", borderColor: "var(--red-600)" }}>
          <AlertTriangle size={15} color="var(--red-600)" />
          <span className="text-[13px]" style={{ color: "var(--red-600)" }}>{error}</span>
        </div>
      )}
      <button onClick={search} className="ccs-btn-primary py-3.5 flex items-center justify-center gap-2">
        <Search size={17} /> SEARCH STUDENT
      </button>
      <div className="text-[12px] mt-1" style={{ color: "var(--ink-600)" }}>
        Try: 2026-12345 · 2026-12346 · 2026-12347 · 2026-12349
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-t pt-2" style={{ borderColor: "var(--line)" }}>
      <span style={{ color: "var(--ink-600)" }}>{label}</span>
      <span className="font-bold text-right">{value}</span>
    </div>
  );
}

// Extracts the "Day N" number from a date label like "Day 2 · September 10, 2026"
// so date tabs can be sorted chronologically regardless of insertion order.
function dayNumber(dateLabel) {
  const match = /Day\s+(\d+)/i.exec(dateLabel || "");
  return match ? parseInt(match[1], 10) : 0;
}

function AttendanceList({ event, section, attendance, setAttendance }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [timeOutTarget, setTimeOutTarget] = useState(null);

  const sectionStudentIds = DIRECTORY.filter((d) => d.section === section.name).map((d) => d.id);

  // Every date this section has at least one record for, plus the current
  // event day, sorted chronologically — this drives the date tabs below.
  const availableDates = Array.from(
    new Set([
      event.date,
      ...attendance.filter((a) => sectionStudentIds.includes(a.studentId)).map((a) => a.date),
    ])
  ).sort((a, b) => dayNumber(a) - dayNumber(b));

  const [viewDate, setViewDate] = useState(event.date);
  const isToday = viewDate === event.date;

  const rows = DIRECTORY.filter((d) => d.section === section.name).map((d) => {
    const rec = attendance.find((a) => a.studentId === d.id && a.date === viewDate);
    const status = rec?.timeOut ? "out" : rec?.timeIn ? "present" : "pending";
    return { ...d, timeIn: rec?.timeIn || null, timeOut: rec?.timeOut || null, status };
  });

  const filtered = rows.filter((r) => {
    if (filter === "present" && r.status === "pending") return false;
    if (filter === "pending" && r.status !== "pending") return false;
    if (q && !r.name.toLowerCase().includes(q.toLowerCase()) && !r.id.includes(q)) return false;
    return true;
  });

  const confirmTimeOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setAttendance((prev) => prev.map((a) => (a.studentId === timeOutTarget.id && a.date === viewDate ? { ...a, timeOut: time } : a)));
    setTimeOutTarget(null);
  };

  return (
    <div className="flex-1 px-5 py-5 flex flex-col gap-3">
      <div className="text-[11px] font-bold" style={{ color: "var(--ink-600)" }}>ATTENDANCE BY DATE — {section.name}</div>

      {availableDates.length > 1 && (
        <div className="flex gap-5 border-b ccs-scroll overflow-x-auto" style={{ borderColor: "var(--line)" }}>
          {availableDates.map((d) => (
            <button
              key={d}
              onClick={() => setViewDate(d)}
              className={`ccs-tab pb-2.5 pt-1 ${viewDate === d ? "active" : ""}`}
            >
              {d.split(" · ")[0]}
            </button>
          ))}
        </div>
      )}
      <div className="text-[12px] -mt-1" style={{ color: "var(--ink-600)" }}>{viewDate}</div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--ink-600)" />
        <input className="ccs-input pl-9" placeholder="Search student" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="flex gap-2">
        {[["all", "All"], ["present", "Present"], ["pending", "Not Yet Timed In"]].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-bold ${filter === k ? "ccs-btn-primary" : "ccs-btn-outline"}`}>
            {label}
          </button>
        ))}
      </div>

      {!isToday && (
        <div className="ccs-card p-2.5 flex items-center gap-2" style={{ background: "var(--cream-100)", border: "none" }}>
          <Eye size={13} color="var(--ink-600)" />
          <span className="text-[11px]" style={{ color: "var(--ink-600)" }}>Viewing a past event day — read only.</span>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-1">
        {filtered.map((r) => (
          <div key={r.id} className="ccs-card p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <div className="font-bold text-sm">{r.name}</div>
                <div className="text-[12px]" style={{ color: "var(--ink-600)" }}>{r.id}</div>
              </div>
              <StatusPill status={r.status} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-[12px]" style={{ color: "var(--ink-600)" }}>
                {r.timeIn ? `In: ${r.timeIn}` : "—"}{r.timeOut ? ` · Out: ${r.timeOut}` : ""}
              </div>
              {r.status === "present" && isToday && (
                <button onClick={() => setTimeOutTarget(r)} className="ccs-btn-outline text-[12px] px-3 py-1.5">TIME OUT</button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-sm py-10" style={{ color: "var(--ink-600)" }}>No students match this filter.</div>
        )}
      </div>

      {timeOutTarget && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(34,26,22,0.45)" }}>
          <div className="ccs-card p-5 w-full max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="font-extrabold">Time Out Student?</div>
              <button onClick={() => setTimeOutTarget(null)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="text-sm mb-1">Student</div>
            <div className="font-bold mb-2">{timeOutTarget.name}</div>
            <div className="text-sm mb-1">Event Day</div>
            <div className="font-bold mb-2">{viewDate}</div>
            <div className="text-sm mb-1">Time In</div>
            <div className="font-bold mb-4">{timeOutTarget.timeIn}</div>
            <button onClick={confirmTimeOut} className="ccs-btn-primary w-full py-3">CONFIRM TIME OUT</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// STUDENT VIEW
// ---------------------------------------------------------------------------

function StudentApp({ event, section, student, attendance, venueChange, ackVenue, logout }) {
  const history = attendance
    .filter((a) => a.studentId === student.id)
    .sort((a, b) => a.date.localeCompare(b.date));
  const todayRec = history.find((a) => a.date === event.date);
  const status = todayRec?.timeOut ? "out" : todayRec?.timeIn ? "present" : "pending";

  return (
    <div className="min-h-full flex flex-col">
      <TopBar
        title="MY PALARO ASSIGNMENT"
        subtitle={student.name}
        right={<button onClick={logout} className="text-white/80 hover:text-white" aria-label="Log out"><LogOut size={19} /></button>}
      />
      <VenueAlertBanner change={venueChange} onAck={ackVenue} />
      <div className="flex-1 px-5 py-5 flex flex-col gap-5">
        <EventInfoGrid event={event} />

        <div className="ccs-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--cream-100)" }}>
            <Users size={17} color="var(--maroon-700)" />
          </div>
          <div>
            <div className="text-[10px] font-bold" style={{ color: "var(--ink-600)" }}>SECTION</div>
            <div className="text-sm font-semibold">{section.name} · Rep: {section.rep}</div>
          </div>
        </div>

        <div className="ccs-card p-5">
          <div className="text-xs font-bold mb-3" style={{ color: "var(--ink-600)" }}>MY ATTENDANCE — {event.date}</div>
          <div className="flex items-center gap-2 mb-4">
            <StatusPill status={status} />
          </div>
          {todayRec?.timeIn ? (
            <div className="flex flex-col gap-2">
              <Row label="Time In" value={todayRec.timeIn} />
              {todayRec.timeOut && <Row label="Time Out" value={todayRec.timeOut} />}
              <Row label="Representative" value={section.rep} />
            </div>
          ) : (
            <div className="text-sm" style={{ color: "var(--ink-600)" }}>
              Your representative, <span className="font-bold">{section.rep}</span>, will record your attendance once verified at the venue.
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="ccs-card p-5">
            <div className="text-xs font-bold mb-3" style={{ color: "var(--ink-600)" }}>ATTENDANCE HISTORY</div>
            <div className="flex flex-col gap-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between border-t pt-2.5" style={{ borderColor: "var(--line)" }}>
                  <div>
                    <div className="text-[13px] font-semibold">{h.date}</div>
                    <div className="text-[12px]" style={{ color: "var(--ink-600)" }}>
                      In: {h.timeIn || "—"}{h.timeOut ? ` · Out: ${h.timeOut}` : ""}
                    </div>
                  </div>
                  <StatusPill status={h.timeOut ? "out" : h.timeIn ? "present" : "pending"} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ccs-card p-4" style={{ background: "var(--cream-100)", border: "none" }}>
          <div className="text-[12px] leading-relaxed" style={{ color: "var(--ink-600)" }}>
            You don't need your phone or internet to time in. Your section representative confirms your attendance in person, each event day.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ROOT APP
// ---------------------------------------------------------------------------

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [event, setEvent] = useState(ARNIS);
  const [sections] = useState(INITIAL_SECTIONS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [venueChange, setVenueChange] = useState(null);
  const [venueAcked, setVenueAcked] = useState(true);
  const [loggedInStudentId, setLoggedInStudentId] = useState(null);

  const repSection = sections[0]; // BSCS 1A — used for the rep-view demo

  const updateVenue = (newVenue) => {
    setVenueChange({ sport: event.sport, oldVenue: event.venue, newVenue });
    setEvent((e) => ({ ...e, venue: newVenue }));
    setVenueAcked(false);
  };

  const updateEventCode = (newCode) => {
    setEvent((e) => ({ ...e, code: newCode }));
  };

  const ackVenue = () => {
    setVenueChange(null);
    setVenueAcked(true);
  };

  const handleStudentLogin = (id) => {
    setLoggedInStudentId(id);
    setScreen("studentDashboard");
  };

  const loggedInStudent = DIRECTORY.find((d) => d.id === loggedInStudentId);
  const studentSection = loggedInStudent ? sections.find((s) => s.name === loggedInStudent.section) : null;

  let content;
  if (screen === "landing") content = <Landing go={setScreen} />;
  else if (screen === "adminLogin") content = <LoginScreen role="admin" back={() => setScreen("landing")} onSuccess={() => setScreen("adminApp")} />;
  else if (screen === "repLogin") content = <LoginScreen role="rep" back={() => setScreen("landing")} onSuccess={() => setScreen("repApp")} eventCode={event.code} />;
  else if (screen === "studentLogin") content = <LoginScreen role="student" back={() => setScreen("landing")} onSuccess={handleStudentLogin} />;
  else if (screen === "adminApp") content = (
    <AdminApp event={event} sections={sections} onUpdateVenue={updateVenue} onUpdateCode={updateEventCode} logout={() => setScreen("landing")} />
  );
  else if (screen === "repApp") content = (
    <RepApp
      event={event}
      section={repSection}
      attendance={attendance}
      setAttendance={setAttendance}
      venueChange={venueAcked ? null : venueChange}
      ackVenue={ackVenue}
      logout={() => setScreen("landing")}
    />
  );
  else if (screen === "studentDashboard" && loggedInStudent) content = (
    <StudentApp
      event={event}
      section={studentSection}
      student={loggedInStudent}
      attendance={attendance}
      venueChange={venueAcked ? null : venueChange}
      ackVenue={ackVenue}
      logout={() => { setLoggedInStudentId(null); setScreen("landing"); }}
    />
  );

  return (
    <div className="ccs-root">
      <GlobalStyle />
      <div className="max-w-md mx-auto min-h-screen" style={{ background: "var(--cream-50)" }}>
        {content}
      </div>
    </div>
  );
}
