import { Avatar } from "./Avatar";
import type { SampleCard } from "./data";
import { BadgeIcon, DotsIcon, PlusIcon } from "./icons";
import s from "./Card.module.css";

function Marquee({ stamp }: { stamp: string }) {
  const text = `Demo card · sample data · updated ${stamp}`;
  // Two identical halves so the -50% translate loops seamlessly.
  const half = Array.from({ length: 3 }, (_, i) => (
    <span key={i}>
      {text}
      <b className={s.bullet}>•</b>
    </span>
  ));
  return (
    <div className={s.strip} aria-label={text}>
      <div className={s.track} aria-hidden>
        {half}
        {half}
      </div>
    </div>
  );
}

export function Card({ card, stamp, onAction }: { card: SampleCard; stamp: string; onAction: () => void }) {
  const olive = card.theme === "olive";
  return (
    <article className={`${s.card} ${olive ? s.olive : s.sky}`}>
      <header className={s.head}>
        <h2 className={s.title}>{card.title}</h2>
        {olive && <BadgeIcon />}
      </header>

      <div className={s.body}>
        <div className={s.photo}>
          <Avatar />
        </div>
        <dl className={s.fields}>
          {card.fields.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Marquee stamp={stamp} />

      <footer className={s.foot}>
        <div>
          {card.status && <p className={s.status}>{card.status}</p>}
          <p className={s.name}>
            {card.name.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </p>
        </div>
        <button
          className={s.action}
          onClick={(e) => {
            e.stopPropagation(); // don't flip the card to its QR view
            onAction();
          }}
          aria-label="Card actions"
        >
          {olive ? <PlusIcon /> : <DotsIcon />}
        </button>
      </footer>
    </article>
  );
}
