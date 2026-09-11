import { Avatar } from "./Avatar";
import type { SampleCard } from "./data";
import { useT } from "./LocaleContext";
import { BadgeIcon, DotsIcon, PlusIcon, SignatureMark } from "./icons";
import s from "./Card.module.css";

function Marquee({ stamp, marquee }: { stamp: string; marquee: (stamp: string) => string }) {
  const text = marquee(stamp);
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

export function Card({
  card,
  stamp,
  marquee,
  onAction,
}: {
  card: SampleCard;
  stamp: string;
  marquee: (stamp: string) => string;
  onAction: () => void;
}) {
  const t = useT();
  const olive = card.theme === "olive";
  return (
    <article className={`${s.card} ${olive ? s.olive : s.sky}`}>
      <header className={s.head}>
        <h2 className={s.title}>{card.title}</h2>
        {olive && <BadgeIcon />}
      </header>

      <div className={s.body}>
        <div className={s.photo}>
          <Avatar photo={card.photo} />
        </div>
        <div className={s.info}>
          <dl className={s.fields}>
            {card.fields.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          {!olive && <SignatureMark className={s.signature} />}
        </div>
      </div>

      <Marquee stamp={stamp} marquee={marquee} />

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
          aria-label={t.wallet.actions}
        >
          {olive ? <PlusIcon /> : <DotsIcon />}
        </button>
      </footer>
    </article>
  );
}
