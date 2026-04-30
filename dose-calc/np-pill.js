/**
 * Binds weight input UI to `.np-pill[data-dose-calc]`; uses `./compute.js` for math only.
 */

import { parseDoseCalcAttr, computePerDose, formatMgForDisplay } from './compute.js';

var CALC_CLASS = 'np-pill-dose-calc';

function buildResultMarkup(out) {
  if (out.empty || out.error || !out.results || !out.results.length) {
    return '';
  }
  var suffix = out.labelSuffix ? ' — ' + out.labelSuffix : '';
  var isRange = out.results.length > 1;
  var parts = [];

  out.results.forEach(function (row, i) {
    var capStr = formatMgForDisplay(row.cappedMg);
    var label =
      isRange && i === 0
        ? 'Range (low): '
        : isRange && i === 1
          ? 'Range (high): '
          : '';
    var line =
      '<div class="' +
      CALC_CLASS +
      '-line">' +
      label +
      '<strong>' +
      capStr +
      '</strong> per dose' +
      suffix;
    if (row.wasCapped) {
      line +=
        ' <span class="' +
        CALC_CLASS +
        '-capped">(capped; weight-based ≈ ' +
        formatMgForDisplay(row.uncappedMg) +
        ')</span>';
    }
    line += '</div>';
    parts.push(line);
  });

  return parts.join('');
}

function updateOutput(outEl, weightVal, spec) {
  var w = parseFloat(String(weightVal).replace(',', '.'));
  var out = computePerDose(w, spec);

  if (out.empty) {
    outEl.innerHTML = '';
    outEl.hidden = true;
    return;
  }
  if (out.error) {
    outEl.innerHTML = '';
    outEl.hidden = true;
    return;
  }

  var html = buildResultMarkup(out);
  if (!html) {
    outEl.innerHTML = '';
    outEl.hidden = true;
    return;
  }
  outEl.innerHTML = html;
  outEl.hidden = false;
}

/**
 * Attach calculator UI inside each qualifying np-pill's dose clip (once).
 */
export function initDoseCalcPills() {
  document.querySelectorAll('.np-pill[data-dose-calc]').forEach(function (pill) {
    if (pill.dataset.doseCalcInit) return;

    var raw = pill.getAttribute('data-dose-calc');
    var spec = parseDoseCalcAttr(raw);
    if (!spec || spec.kind !== 'mgkg_per_dose') return;

    pill.dataset.doseCalcInit = '1';
    pill.classList.add('has-dose-calc');

    var doseClip = pill.querySelector('.np-pill-dose-clip');
    if (!doseClip) return;

    var wrap = document.createElement('div');
    wrap.className = CALC_CLASS;
    wrap.setAttribute('aria-label', 'Weight-based dose estimate');
    wrap.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    wrap.addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });
    wrap.addEventListener('keydown', function (e) {
      e.stopPropagation();
    });

    var lb = document.createElement('label');
    lb.className = CALC_CLASS + '-label';
    lb.appendChild(document.createTextNode('Weight (kg) '));

    var input = document.createElement('input');
    input.type = 'number';
    input.className = CALC_CLASS + '-input';
    input.min = '0';
    input.step = 'any';
    input.inputMode = 'decimal';
    input.setAttribute('aria-label', 'Child weight in kilograms');
    input.autocomplete = 'off';

    lb.appendChild(input);

    var out = document.createElement('div');
    out.className = CALC_CLASS + '-out';
    out.setAttribute('aria-live', 'polite');
    out.hidden = true;

    wrap.appendChild(lb);
    wrap.appendChild(out);
    doseClip.appendChild(wrap);

    function refresh() {
      updateOutput(out, input.value, spec);
    }

    input.addEventListener('input', refresh);
    input.addEventListener('change', refresh);
  });
}
