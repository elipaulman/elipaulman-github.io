type SectionHeadingProps = {
  title: string;
  lede?: string;
};

export function SectionHeading({ title, lede }: SectionHeadingProps) {
  return (
    <div className="block-head">
      <h2 className="block-title">{title}</h2>
      {lede && <p className="block-lede">{lede}</p>}
    </div>
  );
}
