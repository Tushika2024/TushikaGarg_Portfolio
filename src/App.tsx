import { useCallback, useRef, useState } from 'react';
import { Background, TopBar, DetailModal, ResumeModal } from './components/Chrome';
import Preloader from './components/Preloader';
import { LeftScreen, RightScreen, CenterScreen } from './screens/Screens';
import OtherProjects from './sections/OtherProjects';
import Certifications from './sections/Certifications';
import Faq from './sections/Faq';
import Contact from './sections/Contact';
import { STAGES, kanhaCase, profile } from './data/content';
import { useScrollProgress, useReducedMotion, useFrame, seg, ease } from './hooks/useScrollStage';
import { useTheme } from './hooks/useTheme';
import type { Openable } from './types';

export default function App() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const { progress, stage } = useScrollProgress(trackRef, STAGES, !reduced);
  const { theme, toggle } = useTheme();

  const [open, setOpen] = useState<Openable | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  /* Drive the rig every frame, imperatively — no re-render per frame. */
  useFrame(
    useCallback((p: number) => {
      const unfold = ease(seg(p, 0.08, 0.22));
      const turn = ease(seg(p, 0.08, 0.20));
      const out = ease(seg(p, 0.94, 1));

      if (rigRef.current) {
        rigRef.current.style.transform =
          `translateZ(${-130 * turn - 240 * out}px) rotateX(${6 * turn + 11 * out}deg) rotateY(${-12 * turn}deg)`;
      }
      if (leftRef.current) {
        leftRef.current.style.transform = `translateX(${36 * (1 - unfold)}px) rotateY(${41 * unfold}deg)`;
        leftRef.current.style.opacity = unfold.toFixed(2);
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateX(${-36 * (1 - unfold)}px) rotateY(${-41 * unfold}deg)`;
        rightRef.current.style.opacity = unfold.toFixed(2);
      }
    }, []),
    progress,
    !reduced
  );



  const files = STAGES[stage]?.files ?? STAGES[0]!.files;

  return (
    <>
      <Preloader />
      <a className="skip" href="#other-projects">Skip to content</a>
      <Background />
      <TopBar theme={theme} onToggleTheme={toggle} onOpenResume={() => setResumeOpen(true)} />

      <main>
        <div className="track" ref={trackRef}>
          <div className="stage">
            <div className="rig" ref={rigRef}>
              <LeftScreen ref={leftRef} stage={stage} reduced={reduced} file={files[0]} />
              <RightScreen ref={rightRef} stage={stage} reduced={reduced} file={files[2]}
                           progress={progress} onOpen={setOpen} />
              <CenterScreen stage={stage} reduced={reduced} file={files[1]}
                            progress={progress} onOpen={setOpen} kanha={kanhaCase} />
            </div>
          </div>
        </div>

        <div className="below">
          <div className="wrap">
            <OtherProjects onOpen={setOpen} />
            <Certifications />
            <Faq openIndex={faqOpen} onToggle={setFaqOpen} />
          </div>
        </div>

        <Contact />
      </main>

      <DetailModal item={open} onClose={() => setOpen(null)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} resumeUrl={profile.resume} />
    </>
  );
}
