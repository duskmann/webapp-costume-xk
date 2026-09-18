import { useMemo, useState } from "react";
import { MESURES_PAR_DEFAUT, calculerPatron } from "./patronCalculs.js";
import {
  PanneauCorps,
  PieceManche,
  PieceGoussetAisselle,
  PieceGoussetCote,
} from "./PatronPieces.jsx";

const CHAMPS = [
  { cle: "poitrine", label: "Tour de poitrine", unite: "cm" },
  { cle: "hanches", label: "Tour de hanches", unite: "cm" },
  { cle: "cou", label: "Tour de cou", unite: "cm" },
  { cle: "brasCirc", label: "Tour de bras (biceps)", unite: "cm" },
  { cle: "poignet", label: "Tour de poignet", unite: "cm" },
  { cle: "longueurBras", label: "Longueur de bras (épaule → poignet)", unite: "cm" },
  { cle: "longueurTunique", label: "Longueur de tunique (épaule → ourlet)", unite: "cm" },
  { cle: "aisance", label: "Aisance souhaitée", unite: "cm" },
];

export default function App() {
  const [mesures, setMesures] = useState(MESURES_PAR_DEFAUT);

  const dimensions = useMemo(() => calculerPatron(mesures), [mesures]);

  function handleChange(cle, valeur) {
    const nombre = Number(valeur);
    setMesures((precedent) => ({
      ...precedent,
      [cle]: Number.isFinite(nombre) && valeur !== "" ? nombre : 0,
    }));
  }

  return (
    <div className="page">
      <header>
        <h1>Tenue médiévale : Normand XIe siècle</h1>
        <p className="sous-titre">
          Compagnie Excalibur — calculateur de patron pour la tunique
          (Tunique). Renseignez vos mesures corporelles pour obtenir les
          dimensions de coupe, les pièces de patron tracées à l'échelle et
          les instructions d'assemblage.
        </p>
      </header>

      <main>
        <section className="mesures" aria-labelledby="titre-mesures">
          <h2 id="titre-mesures">Mesures corporelles</h2>
          <div className="grille-champs">
            {CHAMPS.map(({ cle, label, unite }) => (
              <label key={cle} className="champ">
                <span>{label}</span>
                <div className="champ-saisie">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={mesures[cle]}
                    onChange={(e) => handleChange(cle, e.target.value)}
                  />
                  <span className="unite">{unite}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="resultats" aria-labelledby="titre-dimensions">
          <h2 id="titre-dimensions">Dimensions de coupe calculées</h2>
          <table>
            <tbody>
              <tr>
                <th>Largeur d'un panneau de corps (devant/dos)</th>
                <td>{dimensions.largeurPanneauCorps.toFixed(1)} cm</td>
              </tr>
              <tr>
                <th>Hauteur du corps</th>
                <td>{dimensions.hauteurCorps.toFixed(1)} cm</td>
              </tr>
              <tr>
                <th>Largeur d'encolure</th>
                <td>{dimensions.largeurEncolure} cm</td>
              </tr>
              <tr>
                <th>Manche : largeur épaule / poignet</th>
                <td>
                  {dimensions.largeurMancheEpaule.toFixed(1)} cm /{" "}
                  {dimensions.largeurManchePoignet.toFixed(1)} cm
                </td>
              </tr>
              <tr>
                <th>Gousset d'aisselle (côté)</th>
                <td>{dimensions.coteGoussetAisselle} cm</td>
              </tr>
              <tr>
                <th>Gousset de côté (base / hauteur)</th>
                <td>
                  {dimensions.largeurBaseGoussetCote.toFixed(1)} cm /{" "}
                  {dimensions.hauteurGoussetCote.toFixed(1)} cm
                </td>
              </tr>
              <tr>
                <th>Marge de couture à ajouter</th>
                <td>{dimensions.margeCouture} cm sur chaque bord</td>
              </tr>
              <tr>
                <th>Métrage de tissu estimé</th>
                <td>≈ {dimensions.metrageTissu} m (laize 150 cm)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="patron" aria-labelledby="titre-patron">
          <h2 id="titre-patron">Pièces de patron (à l'échelle)</h2>
          <p className="avertissement">
            Les pièces ci-dessous n'incluent pas les marges de couture —
            ajoutez {dimensions.margeCouture} cm sur chaque bord avant
            découpe.
          </p>
          <div className="pieces">
            <PanneauCorps dimensions={dimensions} avecFente titre="Panneau devant (x1, sur pliure)" />
            <PanneauCorps dimensions={dimensions} avecFente={false} titre="Panneau dos (x1, sur pliure)" />
            <PieceManche dimensions={dimensions} />
            <PieceGoussetAisselle dimensions={dimensions} />
            <PieceGoussetCote dimensions={dimensions} />
          </div>
        </section>

        <section className="assemblage" aria-labelledby="titre-assemblage">
          <h2 id="titre-assemblage">Instructions d'assemblage</h2>
          <ol>
            <li>
              Épingler et coudre les coutures d'épaule du devant et du dos,
              endroit contre endroit.
            </li>
            <li>
              Coudre les manches à plat sur les panneaux du corps (montage à
              plat, typique du XIe siècle), avant de fermer les côtés.
            </li>
            <li>
              Insérer et coudre les goussets d'aisselle à l'angle formé par
              la manche et le corps, pour l'amplitude de mouvement.
            </li>
            <li>
              Fermer les coutures de côté du corps et le dessous des manches,
              en laissant une ouverture au niveau des hanches pour
              l'insertion des goussets de côté.
            </li>
            <li>
              Insérer les goussets de côté dans les ouvertures pour donner
              de l'ampleur à l'ourlet.
            </li>
            <li>
              Fendre le devant de l'encolure sur la profondeur indiquée pour
              permettre le passage de la tête, puis finir les bords
              (ourlet simple ou passepoil).
            </li>
            <li>Ourler le bas de la tunique et les poignets.</li>
          </ol>
          <p className="a-venir">
            À venir : Braies et Chausses (voir README).
          </p>
        </section>
      </main>
    </div>
  );
}
