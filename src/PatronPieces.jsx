const SCALE = 3;

function GrilleFond({ id }) {
  return (
    <defs>
      <pattern
        id={id}
        width={SCALE}
        height={SCALE}
        patternUnits="userSpaceOnUse"
      >
        <rect width={SCALE} height={SCALE} fill="#fbf4e3" />
        <path
          d={`M0 0 H${SCALE} M0 0 V${SCALE}`}
          stroke="#e4d9c3"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
  );
}

function Cote({ label, x1, y1, x2, y2 }) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <text
      x={midX}
      y={midY}
      transform={`rotate(${angle}, ${midX}, ${midY})`}
      className="cote-label"
      dy="-4"
      textAnchor="middle"
    >
      {label}
    </text>
  );
}

function Piece({ titre, note, largeurCm, hauteurCm, children }) {
  const largeurPx = largeurCm * SCALE;
  const hauteurPx = hauteurCm * SCALE;
  const id = titre
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return (
    <figure className="piece">
      <figcaption>{titre}</figcaption>
      <svg
        viewBox={`-20 -20 ${largeurPx + 40} ${hauteurPx + 40}`}
        width={largeurPx + 40}
        height={hauteurPx + 40}
      >
        <GrilleFond id={id} />
        <rect
          x="-20"
          y="-20"
          width={largeurPx + 40}
          height={hauteurPx + 40}
          fill={`url(#${id})`}
        />
        <g stroke="#5b3a29" strokeWidth="1.6" fill="#fbf4e3">
          {children}
        </g>
      </svg>
      {note && <p className="piece-note">{note}</p>}
    </figure>
  );
}

export function PanneauCorps({ dimensions, avecFente, titre }) {
  const { largeurPanneauCorps: l, hauteurCorps: h, largeurEncolure: le, profondeurEncolureDos: pe, profondeurFenteDevant: pf } = dimensions;
  const s = SCALE;
  const centreX = (l / 2) * s;
  const encolureGauche = centreX - (le / 2) * s;
  const encolureDroite = centreX + (le / 2) * s;
  const profondeur = pe * s;

  const contour = [
    `M0 ${profondeur}`,
    `Q0 0 ${encolureGauche} 0`,
    avecFente
      ? `L${encolureGauche} 0 L${centreX} ${pf * s} L${encolureDroite} 0`
      : `Q${centreX} ${profondeur * 1.6} ${encolureDroite} 0`,
    `Q${l * s} 0 ${l * s} ${profondeur}`,
    `L${l * s} ${h * s}`,
    `L0 ${h * s}`,
    "Z",
  ].join(" ");

  return (
    <Piece
      titre={titre}
      largeurCm={l}
      hauteurCm={h}
      note={`Découper 1 pièce sur la pliure du tissu (largeur totale coupée = ${(l * 2).toFixed(1)} cm) — marges de couture non incluses.`}
    >
      <path d={contour} />
      <Cote label={`${l.toFixed(1)} cm`} x1={0} y1={h * s} x2={l * s} y2={h * s} />
      <Cote label={`${h.toFixed(1)} cm`} x1={0} y1={0} x2={0} y2={h * s} />
      <Cote label={`encolure ${le} cm`} x1={encolureGauche} y1={0} x2={encolureDroite} y2={0} />
      {avecFente && <Cote label={`fente ${pf} cm`} x1={centreX} y1={0} x2={centreX} y2={pf * s} />}
    </Piece>
  );
}

export function PieceManche({ dimensions }) {
  const { largeurMancheEpaule: he, largeurManchePoignet: hp, longueurManche: h } = dimensions;
  const s = SCALE;
  const decalage = ((he - hp) / 2) * s;
  const points = [
    [0, 0],
    [he * s, 0],
    [decalage + hp * s, h * s],
    [decalage, h * s],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <Piece
      titre="Manche (x2)"
      largeurCm={he}
      hauteurCm={h}
      note="Couper 2 pièces symétriques. Coudre à plat sur le panneau du corps avant de fermer le dessous de bras."
    >
      <polygon points={points} />
      <Cote label={`${he.toFixed(1)} cm`} x1={0} y1={0} x2={he * s} y2={0} />
      <Cote label={`${hp.toFixed(1)} cm`} x1={decalage} y1={h * s} x2={decalage + hp * s} y2={h * s} />
      <Cote label={`${h.toFixed(1)} cm`} x1={0} y1={0} x2={decalage} y2={h * s} />
    </Piece>
  );
}

export function PieceGoussetAisselle({ dimensions }) {
  const { coteGoussetAisselle: c } = dimensions;
  const s = SCALE;
  const d = c * Math.SQRT2 * s;
  const points = [
    [d / 2, 0],
    [d, d / 2],
    [d / 2, d],
    [0, d / 2],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <Piece
      titre="Gousset d'aisselle (x2)"
      largeurCm={c * Math.SQRT2}
      hauteurCm={c * Math.SQRT2}
      note="Carré coupé en diagonale (losange). Insérer à l'angle manche/corps pour l'amplitude de mouvement."
    >
      <polygon points={points} />
      <Cote label={`côté ${c} cm`} x1={d / 2} y1={0} x2={d} y2={d / 2} />
    </Piece>
  );
}

export function PieceGoussetCote({ dimensions }) {
  const { largeurBaseGoussetCote: base, hauteurGoussetCote: h } = dimensions;
  const s = SCALE;
  const points = [
    [(base / 2) * s, 0],
    [0, h * s],
    [base * s, h * s],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <Piece
      titre="Gousset de côté (x2)"
      largeurCm={base}
      hauteurCm={h}
      note="Triangle inséré dans la couture de côté, pointe vers le haut, pour donner de l'ampleur à l'ourlet."
    >
      <polygon points={points} />
      <Cote label={`${base.toFixed(1)} cm`} x1={0} y1={h * s} x2={base * s} y2={h * s} />
      <Cote label={`${h.toFixed(1)} cm`} x1={0} y1={h * s} x2={(base / 2) * s} y2={0} />
    </Piece>
  );
}
