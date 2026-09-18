const AISANCE_MANCHE = 4;
const FLARE_MINIMUM_OURLET = 40;
const LARGEUR_SURPLUS_COUTURE = 1.5;

function borner(valeur, min, max) {
  return Math.min(max, Math.max(min, valeur));
}

export const MESURES_PAR_DEFAUT = {
  poitrine: 96,
  hanches: 100,
  cou: 38,
  brasCirc: 30,
  poignet: 17,
  longueurBras: 58,
  longueurTunique: 105,
  aisance: 8,
};

export function calculerPatron(mesures) {
  const {
    poitrine,
    hanches,
    cou,
    brasCirc,
    poignet,
    longueurBras,
    longueurTunique,
    aisance,
  } = mesures;

  const largeurPanneauCorps = (poitrine + aisance) / 4;
  const hauteurCorps = longueurTunique;
  const largeurEncolure = Math.round(cou / 3);
  const profondeurEncolureDos = 6;
  const profondeurFenteDevant = 20;

  const largeurMancheEpaule = brasCirc / 2 + AISANCE_MANCHE;
  const largeurManchePoignet = poignet / 2 + 3;
  const longueurManche = longueurBras;

  const coteGoussetAisselle = borner(Math.round(brasCirc / 3), 8, 16);

  const surplusHanches = Math.max(0, hanches + aisance - (poitrine + aisance));
  const flareTotal = Math.max(surplusHanches, FLARE_MINIMUM_OURLET);
  const largeurBaseGoussetCote = flareTotal / 2;
  const hauteurGoussetCote = Math.min(hauteurCorps * 0.4, 50);

  const metrageTissu =
    Math.ceil(
      ((hauteurCorps * 2 + longueurManche * 2 + hauteurGoussetCote * 2) / 100 +
        0.3) * 10
    ) / 10;

  return {
    largeurPanneauCorps,
    hauteurCorps,
    largeurEncolure,
    profondeurEncolureDos,
    profondeurFenteDevant,
    largeurMancheEpaule,
    largeurManchePoignet,
    longueurManche,
    coteGoussetAisselle,
    largeurBaseGoussetCote,
    hauteurGoussetCote,
    margeCouture: LARGEUR_SURPLUS_COUTURE,
    metrageTissu,
  };
}
