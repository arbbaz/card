/* Portrait for a card. Shows the uploaded photo when one is set (a data URL
   from the /admin route), otherwise a neutral placeholder silhouette. */
export function Avatar({ photo }: { photo?: string }) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- data URL from localStorage, not a remote asset
      <img
        src={photo}
        alt="Card portrait"
        width="100%"
        height="100%"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <svg viewBox="0 0 140 186" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" aria-label="Placeholder avatar" role="img">
      <rect width="140" height="186" fill="#f4f4f1" />
      <circle cx="70" cy="74" r="34" fill="#c9c9c2" />
      <path d="M8 186c4-38 30-58 62-58s58 20 62 58z" fill="#c9c9c2" />
    </svg>
  );
}
