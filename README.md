# Calisthenics Tracker

A phone-first circuit tracker for the LW Calisthenics starter program. Pull, push and leg
workouts, rep targets computed from your own benchmark test, rest timers, progression swaps and
a dated history log. Runs entirely in the browser, no account, no backend.

## Put it online

1. Create a new **public** repo on GitHub. Name it whatever you like — the app uses relative
   paths, so the repo name doesn't need to be hardcoded anywhere.
2. Push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Calisthenics tracker"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
   First run takes a minute or two; the URL appears under the Actions tab and on the Pages
   settings screen, as `https://<your-username>.github.io/<your-repo>/`.

You never need to run a build yourself — GitHub does it.

## Put it on your phone

Open the Pages URL on your phone, then add it to your home screen:

- **iOS Safari** — Share → Add to Home Screen
- **Android Chrome** — ⋮ menu → Add to Home screen / Install app

It launches full screen with no browser chrome, and the service worker caches everything, so it
opens and works with no signal. Only the web fonts need the network; without them it falls back
to system fonts.

## Your data

Everything lives in `localStorage` on that one device and browser. Nothing is uploaded anywhere.

That means: clearing site data, switching phones, or using a different browser loses your log.
**History → Export backup** writes a JSON file; **Import backup** restores it. Worth doing every
few weeks.

## Working on it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

All the app code is in `src/App.jsx`. The program data sits at the top of that file:

- `EX` — every exercise: form cues, progression ladder, benchmark default
- `WORKOUTS` — the circuit sets, each item carrying an offset from your benchmark
- `PATHWAYS` — the skill ladders shown in the Progress sheet

Rep targets are never stored as fixed numbers. Each set item holds an offset (`off: -2`), applied
to your benchmark for that exercise, which is how the program says to build it. Change a
benchmark and every set rebuilds.

## What's in the app

**Setup** — enter your benchmark test results. Rest times between exercises and between sets.
Deload toggle, which halves every target.

**Main screen** — one tab per workout. Each exercise shows its target, a stepper to log what you
actually did, and a tick that starts the rest timer automatically, using the longer rest when a
circuit set finishes. Tap an exercise name for form cues, the progression ladder, and a per-set
target override.

**Progress** — the four progression rules from the program, each wired to something you can act
on: a button that adds a rep to every benchmark, a list of exercises you've taken to 15 reps and
should now make harder, a counter of weeks since your last deload, and the skill pathways the
basics feed into.

**History** — sessions by date, newest first, per workout. Expand any one for the per-exercise
numbers. The main screen also shows each exercise against your last session of that workout.

## Credit

The program itself — exercises, rep schemes, form cues and progression pathways — is from the LW
Calisthenics starter program. This is just a tracker built around it. Don't redistribute the
program content; keep this repo for your own use, or strip the data files if you make it public.
