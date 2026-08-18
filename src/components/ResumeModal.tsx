import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COURSEWORK,
  EMAIL,
  EXPERIENCE,
  GITHUB_URL,
  LINKEDIN_URL,
  PHONE,
  PORTFOLIO_URL,
  PROJECTS,
  RESEARCH,
  SOFT_SKILLS,
  VOLUNTEER,
} from "../data/portfolio";
import { EASE } from "./motion";

// Replace this file in VS Code and push it to Git whenever the resume changes.
const RESUME_URL = "/resume.pdf";

function PdfResumeViewer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pages = pagesRef.current;
    if (!pages) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    const renderPdf = async () => {
      try {
        const [pdfjs, worker] = await Promise.all([
          import("pdfjs-dist"),
          import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
        ]);
        if (cancelled) return;

        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        const loadingTask = pdfjs.getDocument({ url: RESUME_URL });
        destroy = () => void loadingTask.destroy();
        const pdf = await loadingTask.promise;
        if (cancelled) return;
        pages.replaceChildren();

        const availableWidth = Math.max(280, Math.min(pages.clientWidth, 980));
        const deviceScale = Math.min(window.devicePixelRatio || 1, 2);

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = availableWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const renderViewport = page.getViewport({ scale: scale * deviceScale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) continue;

          canvas.width = Math.floor(renderViewport.width);
          canvas.height = Math.floor(renderViewport.height);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.className = "block w-full h-auto bg-white shadow-[0_18px_45px_rgba(2,3,10,0.42)]";
          pages.appendChild(canvas);

          await page.render({ canvas, canvasContext: context, viewport: renderViewport }).promise;
        }

        if (!cancelled) setLoading(false);
      } catch (reason) {
        if (cancelled) return;
        setLoading(false);
        setError(reason instanceof Error ? reason.message : "The resume could not be displayed.");
      }
    };

    void renderPdf();

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return (
    <div className="relative h-[calc(100vh-150px)] min-h-[680px] max-h-[1100px] overflow-y-auto bg-[#0a0f20] p-3 sm:p-5" data-lenis-prevent>
      {loading && !error && (
        <p className="absolute inset-0 z-10 flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-dust animate-pulse-soft">
          Rendering resume…
        </p>
      )}
      {error ? (
        <p className="flex min-h-full items-center justify-center px-6 text-center font-mono text-[11px] text-ember">
          The resume PDF could not be displayed. You can still download it from the toolbar.
        </p>
      ) : (
        <div ref={pagesRef} className="mx-auto max-w-[980px] space-y-5" aria-label="Resume pages" />
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-5 mb-2 pb-0.5 text-[12px] font-bold uppercase tracking-[0.28em] text-neutral-900 border-b-[1.5px] border-neutral-900">
      {children}
    </h3>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="pl-1 text-[12px] leading-snug text-neutral-800">{children}</li>;
}

export default function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hasStaticResume, setHasStaticResume] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    let cancelled = false;
    fetch(RESUME_URL, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        const contentType = response.headers.get("content-type") ?? "";
        if (!cancelled) {
          setHasStaticResume(response.ok && (contentType.includes("pdf") || contentType.includes("octet-stream")));
        }
      })
      .catch(() => {
        if (!cancelled) setHasStaticResume(false);
      });

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const shareResume = async () => {
    const resumeUrl = new URL(RESUME_URL, window.location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Kuna Manoj — Resume",
          text: "Kuna Manoj's resume",
          url: resumeUrl,
        });
        setShareStatus("Share sheet opened");
      } else {
        await navigator.clipboard.writeText(resumeUrl);
        setShareStatus("Resume link copied");
      }
      window.setTimeout(() => setShareStatus(""), 2400);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("Could not share the resume");
      window.setTimeout(() => setShareStatus(""), 2400);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-overlay fixed inset-0 z-[90] bg-void/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Résumé of Kuna Manoj"
        >
          <div className="resume-scroll h-full overflow-y-auto" data-lenis-prevent>
            <div className="min-h-full flex flex-col items-center px-4 py-8 print:p-0">
              {/* toolbar */}
              <div className={`print:hidden w-full flex items-center justify-between gap-4 px-5 py-4 rounded-t-md border border-line bg-hull/90 backdrop-blur-sm ${hasStaticResume ? "max-w-[1100px]" : "max-w-[820px]"}`}>
                <p className="font-display font-semibold text-lg tracking-tight text-star truncate">
                  My Resume
                </p>
                <div className="flex items-center gap-2.5 shrink-0">
                  {hasStaticResume ? (
                    <>
                      <button
                        onClick={shareResume}
                        className="inline-flex w-10 h-10 items-center justify-center rounded-md border border-nebula/50 bg-nebula/5 text-nebula hover:bg-nebula hover:text-[#0a0d1f] transition-colors"
                        aria-label="Share resume"
                        title="Share resume"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="18" cy="5" r="2.5" />
                          <circle cx="6" cy="12" r="2.5" />
                          <circle cx="18" cy="19" r="2.5" />
                          <path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" />
                        </svg>
                      </button>
                      <a
                        href={RESUME_URL}
                        download="KunaManojResume.pdf"
                        className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-md bg-solar text-[#0a0d1f] hover:bg-[#ffc76b] transition-colors shadow-[0_8px_28px_rgba(252,182,75,0.3)]"
                        aria-label="Download resume PDF"
                        title="Download resume PDF"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 3v12" />
                          <path d="m7 10 5 5 5-5" />
                          <path d="M4 21h16" />
                        </svg>
                      </a>
                    </>
                  ) : (
                    <button
                      onClick={() => window.print()}
                      className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-solar text-[#0a0d1f] font-mono text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#ffc76b] transition-colors shadow-[0_8px_28px_rgba(252,182,75,0.3)]"
                    >
                      Save as PDF
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    aria-label="Close résumé"
                    className="w-10 h-10 rounded-md border border-line bg-hull/80 text-dust hover:text-star hover:border-solar/60 transition-colors flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {shareStatus && (
                <p className="print:hidden w-full max-w-[1100px] -mt-1 mb-3 text-right font-mono text-[10px] text-nebula" role="status" aria-live="polite">
                  {shareStatus}
                </p>
              )}

              {/* the paper */}
              <motion.div
                id="resume-print"
                initial={{ opacity: 0, y: 34, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.985 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={`w-full rounded-md shadow-[0_40px_120px_rgba(2,3,10,0.85)] font-body ${
                  hasStaticResume
                    ? "max-w-[1100px] overflow-hidden border border-line bg-space p-0"
                    : "max-w-[820px] bg-white px-9 py-10 text-neutral-900 sm:px-12 sm:py-12"
                }`}
              >
                {hasStaticResume ? (
                  <PdfResumeViewer />
                ) : (
                  <>
                {/* heading */}
                <header className="text-center">
                  <h2 className="text-[26px] font-bold uppercase tracking-[0.35em]">Kuna Manoj</h2>
                  <p className="mt-2 text-[11px] text-neutral-700 leading-relaxed">
                    {PHONE} &nbsp;·&nbsp; {EMAIL} &nbsp;·&nbsp;{" "}
                    <a className="underline underline-offset-2" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>{" "}
                    ·{" "}
                    <a className="underline underline-offset-2" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>{" "}
                    ·{" "}
                    <a className="underline underline-offset-2" href={PORTFOLIO_URL} target="_blank" rel="noreferrer">Portfolio</a>
                  </p>
                </header>

                <SectionTitle>Education</SectionTitle>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[13px] font-bold">PDPM Indian Institute of Information Technology, Design and Manufacturing</p>
                  <p className="text-[11px] font-bold whitespace-nowrap">Nov 2022 — Jun 2026</p>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[12px] italic text-neutral-700">Bachelor of Technology in Computer Science and Engineering</p>
                  <p className="text-[11px] italic text-neutral-600 whitespace-nowrap">Jabalpur, M.P.</p>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-700">
                  <span className="font-bold">Coursework:</span> {COURSEWORK.join(", ")}
                </p>

                <SectionTitle>Work Experience</SectionTitle>
                {EXPERIENCE.map((e) => (
                  <div key={e.company} className="mb-2.5 last:mb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[13px] font-bold">{e.company}</p>
                      <p className="text-[11px] font-bold whitespace-nowrap">{e.period}</p>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[12px] italic text-neutral-700">{e.role}</p>
                      {e.link && (
                        <a className="text-[11px] italic underline underline-offset-2 whitespace-nowrap" href={e.link} target="_blank" rel="noreferrer">
                          fusion.iiitdmj.ac.in
                        </a>
                      )}
                    </div>
                    <ul className="mt-1 list-disc pl-5 space-y-0.5">
                      {e.bullets.map((b, i) => (
                        <Bullet key={i}>{b}</Bullet>
                      ))}
                    </ul>
                  </div>
                ))}

                <SectionTitle>Research Experience</SectionTitle>
                {RESEARCH.map((r) => (
                  <div key={r.title} className="mb-2.5 last:mb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[13px] font-bold">{r.title}</p>
                      <p className="text-[11px] font-bold whitespace-nowrap">{r.period}</p>
                    </div>
                    <p className="text-[11px] italic text-neutral-600">{r.badge}</p>
                    <ul className="mt-1 list-disc pl-5 space-y-0.5">
                      {r.bullets.map((b, i) => (
                        <Bullet key={i}>{b}</Bullet>
                      ))}
                    </ul>
                  </div>
                ))}

                <SectionTitle>Projects</SectionTitle>
                {PROJECTS.map((p) => (
                  <div key={p.id} className="mb-2.5 last:mb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[12.5px]">
                        <span className="font-bold">{p.name}</span>
                        <span className="italic text-neutral-700"> | {p.tech.join(", ")}</span>
                        {" — "}
                        <a className="underline underline-offset-2" href={p.url} target="_blank" rel="noreferrer">
                          Live
                        </a>
                      </p>
                      <p className="text-[11px] font-bold whitespace-nowrap">{p.year}</p>
                    </div>
                    <ul className="mt-1 list-disc pl-5 space-y-0.5">
                      {p.bullets.map((b, i) => (
                        <Bullet key={i}>{b}</Bullet>
                      ))}
                    </ul>
                  </div>
                ))}

                <SectionTitle>Technical Skills</SectionTitle>
                <p className="text-[12px] leading-relaxed text-neutral-800">
                  <span className="font-bold">Languages:</span> C, C++, Python, Java, JavaScript, TypeScript, SQL, Go, HTML, CSS
                  <br />
                  <span className="font-bold">Frameworks:</span> React.js, Next.js, Node.js, Express.js, Three.js, Django, Tailwind CSS, Zustand, Recharts
                  <br />
                  <span className="font-bold">Databases & Tools:</span> MySQL, PostgreSQL, MongoDB, Docker, Git, GitHub, VS Code, Postman, Anaconda, Android Studio
                  <br />
                  <span className="font-bold">Practices:</span> {SOFT_SKILLS.join(", ")}
                  <br />
                  <span className="font-bold">Coding Profiles:</span>{" "}
                  <a className="underline underline-offset-2" href="https://leetcode.com/u/Coder033/" target="_blank" rel="noreferrer">LeetCode</a>
                </p>

                <SectionTitle>Beyond Code</SectionTitle>
                <p className="text-[12px] leading-relaxed text-neutral-800">
                  <span className="font-bold">{VOLUNTEER.org}:</span> {VOLUNTEER.text}
                </p>

                <p className="mt-6 pt-3 border-t border-neutral-300 text-center font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                  References & full project walkthroughs available on request
                </p>
                  </>
                )}
              </motion.div>

              {!hasStaticResume && (
                <p className="print:hidden mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-dust">
                  Tip — “Save as PDF” uses your browser's print dialog, destination: <span className="text-solar">Save as PDF</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
