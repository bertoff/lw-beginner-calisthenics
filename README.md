# Calisthenics Tracker

A simple, phone-first workout tracker for the LW Calisthenics starter program. It turns your
benchmark results into practical pull, push, and leg sessions, then helps you record the work and
progress over time.

The app runs in the browser with no account and no backend. It is designed to be opened before a
workout and used with one hand between sets.

## What it does

### Set up your starting point

Enter a benchmark for each exercise and choose your rest periods. The app calculates working
targets from those benchmarks, so the program adapts to your current level instead of assuming a
fixed number of reps. A deload option halves targets when you need an easier week.

### Follow each workout

Choose a pull, push, or legs workout and work through the circuit. Each exercise shows its target,
an input for the reps you completed, and a completion button. Completing a set starts the rest
timer automatically, with longer rest when a circuit set is finished.

Tap an exercise to see form cues, its progression ladder, and an optional target override for the
current set.

### Track progress

The Progress view turns the program's progression rules into useful actions:

- Add a rep to every benchmark when the current level is ready to increase.
- See exercises that have reached 15 reps and may be ready for a harder variation.
- Track how many weeks have passed since your last deload.
- Explore the skill pathways supported by the basic exercises.

### Review your training history

History shows completed sessions by date and workout. Expand a session to see every exercise and
the reps recorded. The workout view also compares each exercise with your most recent session.

## Privacy and backups

Your settings and history are stored in `localStorage` on the device and browser you use. Nothing
is uploaded to a server and no account is required.

Clearing browser data, changing browsers, or moving to another device will remove the local log.
Use **History > Export backup** to save a JSON backup, and **History > Import backup** to restore
one.

## Install as an app

The project is a progressive web app. Open the deployed site on your phone and add it to your home
screen:

- iOS Safari: Share > Add to Home Screen
- Android Chrome: menu > Add to Home screen or Install app

The service worker caches the app so it remains usable without a signal after it has been opened.

## Run locally

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run build    # create a production build in dist/
npm run preview  # serve the production build locally
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`. Set the
repository's Pages source to **GitHub Actions**, then every push to `main` will build and deploy
the app.

## Project data

The app is implemented in `src/App.jsx`. Its main data structures are:

- `EX`: exercise cues, progression ladders, and benchmark defaults
- `WORKOUTS`: circuit definitions and benchmark offsets for each set
- `PATHWAYS`: skill progressions shown in the Progress view

Targets are calculated from the saved benchmark and each set's offset. Updating a benchmark
rebuilds the relevant workout targets automatically.

## Credit

The exercises, rep schemes, form cues, and progression pathways come from the LW Calisthenics
starter program. This project is a browser tracker built around that program.
