"use client";

import { useId, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VISIBLE = 3;

/**
 * A role's bullets: the first few always show; any extras sit behind a quiet toggle so the
 * timeline stays scannable. Roles with VISIBLE bullets or fewer render exactly as a plain list.
 */
export function RoleBullets({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const head = items.slice(0, VISIBLE);
  const rest = items.slice(VISIBLE);

  const toggle = () => {
    setOpen((v) => !v);
    // The timeline spine is scroll-linked, so re-measure once the height has settled.
    window.setTimeout(() => ScrollTrigger.refresh(), 750);
  };

  return (
    <>
      <ul className="entry-body">
        {head.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {rest.length > 0 && (
        <>
          <div id={id} className="more" data-open={open} inert={!open}>
            <div>
              <ul className="entry-body more-list">
                {rest.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="more-btn"
            aria-expanded={open}
            aria-controls={id}
            onClick={toggle}
          >
            {open ? "Show less" : `Show ${rest.length} more`}
          </button>
        </>
      )}
    </>
  );
}
