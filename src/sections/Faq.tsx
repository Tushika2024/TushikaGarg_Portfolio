import { faqs } from '../data/content';

interface Props {
  readonly openIndex: number | null;
  readonly onToggle: (index: number | null) => void;
}

/** Single-open accordion. Answers may contain inline markup from content.ts. */
export function Faq({ openIndex, onToggle }: Props) {
  return (
    <section id="faq" aria-labelledby="faq-head">
      <h2 className="sechead mt" id="faq-head">FAQ</h2>

      <div className="faqwrap">
        <div className="faqintro">
          <p className="faqlead">Questions<br />I get asked.</p>
          <p>
            The things recruiters and engineers actually ask me, answered plainly.
            If yours isn&rsquo;t here, email me- I&rsquo;d rather answer directly than have you guess.
          </p>
        </div>

        <div className="faqlist">
          {faqs.map(([q, a], i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faqitem${isOpen ? ' open' : ''}`} key={q}>
                <h3>
                  <button className="faqq" aria-expanded={isOpen} aria-controls={`faq-a-${i}`}
                          onClick={() => onToggle(isOpen ? null : i)}>
                    <span className="faqtext">{q}</span>
                    <span className="faqsign" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                {isOpen && (
                  <div className="faqa" id={`faq-a-${i}`}
                       dangerouslySetInnerHTML={{ __html: a }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
