/**
 * Pure dosing math for weight-based pediatric estimates (mg/kg × kg, capped).
 * No DOM — safe to edit in isolation.
 */

/**
 * @typedef {Object} DoseCalcSpec
 * @property {'mgkg_per_dose'} kind
 * @property {number[]} mgPerKg One value, or two for a ranged regimen (e.g. 15–20).
 * @property {number} [capMg] Maximum per dose in mg.
 * @property {number} [capG] Maximum per dose in grams (converted to mg in compute).
 * @property {string} [labelSuffix] Optional label for the result line (e.g. "TMP").
 */

/**
 * @param {string} jsonStr
 * @returns {DoseCalcSpec|null}
 */
export function parseDoseCalcAttr(jsonStr) {
  if (!jsonStr || typeof jsonStr !== 'string') return null;
  try {
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

/**
 * @param {DoseCalcSpec} spec
 * @returns {number|null}
 */
function normalizeCapMg(spec) {
  if (spec.capMg != null && spec.capMg !== '') {
    const n = Number(spec.capMg);
    return Number.isFinite(n) ? n : null;
  }
  if (spec.capG != null && spec.capG !== '') {
    const n = Number(spec.capG);
    return Number.isFinite(n) ? n * 1000 : null;
  }
  return null;
}

/**
 * @param {number} weightKg
 * @param {DoseCalcSpec} spec
 * @returns {{ empty: true } | { error: string } | { capMg: number, results: Array<{ mgPerKg: number, uncappedMg: number, cappedMg: number, wasCapped: boolean }>, labelSuffix: string }}
 */
export function computePerDose(weightKg, spec) {
  if (!spec || spec.kind !== 'mgkg_per_dose') {
    return { error: 'unsupported' };
  }
  const capMg = normalizeCapMg(spec);
  const mgPerKgArr = spec.mgPerKg;
  if (capMg == null || !Array.isArray(mgPerKgArr) || mgPerKgArr.length === 0) {
    return { error: 'invalid' };
  }
  const w = Number(weightKg);
  if (!Number.isFinite(w) || w <= 0) {
    return { empty: true };
  }
  const results = mgPerKgArr.map(function (mgk) {
    const rate = Number(mgk);
    if (!Number.isFinite(rate)) {
      return { mgPerKg: mgk, uncappedMg: NaN, cappedMg: NaN, wasCapped: false };
    }
    const uncapped = w * rate;
    const capped = Math.min(uncapped, capMg);
    return {
      mgPerKg: rate,
      uncappedMg: uncapped,
      cappedMg: capped,
      wasCapped: uncapped > capMg
    };
  });
  return {
    capMg,
    results,
    labelSuffix: typeof spec.labelSuffix === 'string' ? spec.labelSuffix : ''
  };
}

/**
 * @param {number} mg
 * @returns {string}
 */
export function formatMgForDisplay(mg) {
  if (!Number.isFinite(mg)) return '—';
  if (mg >= 1000) {
    const g = mg / 1000;
    const s = g >= 10 ? g.toFixed(0) : g.toFixed(1).replace(/\.0$/, '');
    return s + ' g (' + Math.round(mg) + ' mg)';
  }
  const rounded = Math.round(mg * 10) / 10;
  return (rounded % 1 === 0 ? String(Math.round(rounded)) : rounded.toFixed(1)) + ' mg';
}

