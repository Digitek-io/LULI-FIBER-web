export interface LegalSection {
  number: number;
  title: string;
  // Each block is either a paragraph (string) or a bullet list (string[])
  content: (string | string[])[];
}

export function LegalDocument({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map(({ number, title, content }) => (
        <section key={number} id={`section-${number}`}>
          <h2 className="text-lg font-semibold text-fiber">
            <span className="tabular-nums text-signal">{number}.</span> {title}
          </h2>
          <div className="mt-3 space-y-3">
            {content.map((block, i) =>
              Array.isArray(block) ? (
                <ul key={i} className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {block.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  {block}
                </p>
              )
            )}
          </div>
        </section>
      ))}
    </div>
  );
}