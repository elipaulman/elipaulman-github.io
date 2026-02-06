type SectionHeadingProps = {
  tag: string;
  title: string;
  description?: string;
};

export function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 space-y-4 text-center sm:text-left">
      <span className="code-tag">{tag}</span>
      <h2 className="heading-display text-3xl text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:mx-0">
          {description}
        </p>
      )}
    </div>
  );
}
