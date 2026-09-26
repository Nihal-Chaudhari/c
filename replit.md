# Where’s My Class?

A premium class-finder app for GEC Palanpur students that turns an enrollment number into a live class status, next lecture, and weekly timetable.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- `pnpm --filter @workspace/wheres-my-class run typecheck` — typecheck the web app
- `PORT=25708 BASE_PATH=/ pnpm --filter @workspace/wheres-my-class run build` — build the web app outside its managed workflow

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/wheres-my-class/src/App.tsx` — app shell, lookup flow, dashboard, timetable and reminders
- `artifacts/wheres-my-class/src/data/classData.ts` — institution, branch, student and timetable source data plus time engine
- `artifacts/wheres-my-class/src/index.css` — visual system, responsive layout and motion
- `artifacts/wheres-my-class` — deployable React/Vite web artifact

## Architecture decisions

- The initial data is frontend-local and typed so the app works immediately without a backend; the entity hierarchy is separated from UI components for later API/database replacement.
- Only source-visible Computer Engineering Semester 1 enrollment and timetable information is included; unavailable room/professor values are shown as “Not in source” rather than guessed.
- Enrollment lookup auto-detects branch, semester and CP division; the user only chooses a day when browsing the weekly timetable.
- Local storage remembers only the last enrollment number for convenience; browser reminder permission is requested only when the student asks to set a reminder.

## Product

- Splash transition and premium landing/search experience
- Enrollment lookup with friendly invalid and loading states
- Automatic branch, semester and CP1/CP2/CP3 detection
- Current/no-class status driven by local date and time
- Next lecture details and reminder controls
- Responsive weekly timetable with today and live highlighting
- Remembered student shortcut and change-student flow

## User preferences

_No persistent user preferences recorded._

## Gotchas

- The Vite config intentionally requires `PORT` and `BASE_PATH`; the managed workflow supplies them automatically.
- The source screenshots do not reliably provide professor or room values, so those fields remain explicitly unavailable until corrected with authoritative data.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
