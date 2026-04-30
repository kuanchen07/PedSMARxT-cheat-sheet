# Dose calculator (PedSMARxT cheat sheet)

This folder holds the weight-based **mg/kg** helper that appears on `[data-dose-calc]` **np-pill** rows.

## Files

- **`compute.js`** — Pure functions: JSON spec → capped mg (no DOM). Extend new dose `kind`s here first.
- **`np-pill.js`** — Mounts weight input UI and calls `compute`; run `initDoseCalcPills()` after disease HTML is injected.
- **`dose-calc.css`** — Layout and print rules for the inline calculator.

Orchestration: [`index.html`](../index.html) loads [`initNpPills`](../index.html) (pill label toggles) then dynamically imports `./np-pill.js` and calls `initDoseCalcPills()`.

Validation: from repo root, **`npm run validate:dose-calc`** scans HTML partials and ensures each `data-dose-calc` attribute parses and satisfies `compute.js` (same checks CI uses).

## Spec shape (`data-dose-calc` on `.np-pill`)

Per-dose regimens:

```json
{"kind":"mgkg_per_dose","mgPerKg":[15],"capMg":500}
```

- **Range**: `"mgPerKg":[15,20]`
- **Cap in g**: `"capG":2` (or `capMg` in mg)

Optional `labelSuffix` for the result line (e.g. TMP, amoxicillin component).

Not modeled here: total **daily** mg/kg (different from per-dose), vancomycin titration, penicillin **units**.
