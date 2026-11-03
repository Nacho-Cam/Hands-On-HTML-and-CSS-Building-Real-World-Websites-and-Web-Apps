# Ignacio Camarena Gomez - Portfolio

Bilingual static HTML/CSS/JavaScript CV for the UFV guided Git and GitHub Pages practice. No build step or package installation is needed.

## Put this project in the course repository

Keep the teacher’s repository structure. Copy the contents of this folder into `project_personal_CV/` in your fork; do not replace the repository root. The expected files are `index.html`, `styles.css`, `script.js`, `.nojekyll`, and `assets/`.

## Publish using the assignment workflow

1. Fork and clone the teacher’s repository as described in the assignment.
2. Create and switch to your personal branch, for example `branch_alumno_ic`.
3. Copy these project files into the repository’s `project_personal_CV/` folder.
4. From the repository root, check and commit the changes:

   ```bash
   git status
   git add project_personal_CV
   git status
   git commit -m "feat: personalize CV website"
   git push -u origin branch_alumno_ic
   ```

5. In the fork, open **Settings > Pages** and publish from `branch_alumno_ic` and `/(root)`.
6. The assignment’s site URL will follow this pattern:

   `https://YOUR_USERNAME.github.io/Hands-On-HTML-and-CSS-Building-Real-World-Websites-and-Web-Apps/project_personal_CV/`

Replace the example branch and account name with your own. Keep all relative asset paths unchanged. Google Fonts are optional; system fallbacks are included.

## Edit content

- Bilingual CV content lives in `index.html`.
- Colors, layout, responsive behavior, and positioning live in `styles.css`.
- Language switching, keyboard-operable experience selector, and motion live in `script.js`.
- Motion respects the visitor’s reduced-motion preference.

The UFV Sopra Steria finalist photograph links to its original news article in the caption.
