type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-strong)] md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm text-[var(--muted)] md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
