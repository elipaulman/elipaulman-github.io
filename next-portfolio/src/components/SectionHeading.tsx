type SectionHeadingProps = {
  tag: string;
  title: string;
  description?: string;
};

export function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 space-y-2 text-left">
      <div className="flex items-center gap-4">
        <span className="code-tag shrink-0">{tag}</span>
        <div className="section-divider" />
      </div>
      <h2 className="heading-display text-xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
