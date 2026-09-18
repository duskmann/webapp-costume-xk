# Tenue médiévale : Normand XIe siècle

Outil de calcul de patron pour costume médiéval (Compagnie Excalibur) — mesures
corporelles → dimensions de coupe → pièces de patron tracées à l'échelle →
instructions d'assemblage.

## Développement local

```bash
npm install
npm run dev
```

## Déploiement sur GitHub Pages

1. **Créer le repo sur GitHub** (public), puis pousser ce projet :

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<votre-user>/<nom-du-repo>.git
   git push -u origin main
   ```

2. **Mettre à jour `vite.config.js`** : remplacez `<REPO_NAME>` par le nom
   exact de votre repo GitHub (ex. `base: '/tenue-medievale-normande/'`).
   Si le repo s'appelle `<votre-user>.github.io` (site utilisateur, pas un
   repo de projet), utilisez `base: '/'` à la place.

3. **Activer GitHub Pages** : sur GitHub, allez dans
   `Settings > Pages > Build and deployment > Source`, et choisissez
   **GitHub Actions**.

4. Le workflow dans `.github/workflows/deploy.yml` construit et déploie le
   site automatiquement à chaque `push` sur `main`. Après le premier push,
   le site sera visible à `https://<votre-user>.github.io/<nom-du-repo>/`.

## Structure

```
src/App.jsx        composant principal (formulaire, calculs, tracé SVG)
src/main.jsx        point d'entrée React
vite.config.js       config Vite (penser à mettre à jour `base`)
.github/workflows/   déploiement automatique vers GitHub Pages
```

## Continuer le développement

Ce projet a été commencé dans une conversation avec Claude (claude.ai) et
peut être repris avec Claude Code : ouvrez ce dossier et lancez `claude`
dans un terminal pour continuer à itérer sur le calculateur, ajouter les
pièces manquantes (Braies, Chausses), ou affiner le rendu des patrons.
