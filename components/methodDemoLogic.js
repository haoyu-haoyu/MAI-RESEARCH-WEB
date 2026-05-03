export const METHOD_ATTENTION_MODES = [
  {
    id: 'standard',
    label: 'Standard causal',
    shortLabel: 'Causal',
  },
  {
    id: 'patient',
    label: 'Patient-aware',
    shortLabel: 'Patient',
  },
  {
    id: 'window',
    label: 'Sliding window',
    shortLabel: 'Window',
  },
];

export const METHOD_DEMO_TOKENS = [
  { id: 'a-history', patient: 'A', step: 0, time: 'Static', label: 'History', type: 'context', staticContext: true },
  { id: 'b-history', patient: 'B', step: 0, time: 'Static', label: 'History', type: 'context', staticContext: true },
  { id: 'a-bp', patient: 'A', step: 1, time: 'T1', label: 'BP 162/92', type: 'measurement' },
  { id: 'b-troponin', patient: 'B', step: 1, time: 'T1', label: 'Troponin', type: 'measurement' },
  { id: 'a-beta', patient: 'A', step: 2, time: 'T2', label: 'Beta-blockers', type: 'treatment' },
  { id: 'b-medication', patient: 'B', step: 2, time: 'T2', label: 'Medication', type: 'treatment' },
  { id: 'a-lactate', patient: 'A', step: 3, time: 'T3', label: 'Lactate', type: 'measurement' },
  { id: 'b-oxygen', patient: 'B', step: 3, time: 'T3', label: 'Oxygen', type: 'measurement' },
  { id: 'a-tachy', patient: 'A', step: 4, time: 'T4', label: 'Tachycardia', type: 'measurement' },
  { id: 'b-observe', patient: 'B', step: 4, time: 'T4', label: 'Observation', type: 'context' },
  { id: 'a-outcome', patient: 'A', step: 5, time: 'T5', label: 'Outcome', type: 'outcome' },
  { id: 'b-outcome', patient: 'B', step: 5, time: 'T5', label: 'Outcome', type: 'outcome' },
].map((token, index) => ({ ...token, order: index }));

export const METHOD_DEMO_PATIENTS = [...new Set(METHOD_DEMO_TOKENS.map((token) => token.patient))];

export function canAttendToken(queryToken, keyToken, mode, windowSize = 2) {
  if (!queryToken || !keyToken) {
    return false;
  }

  if (mode === 'standard') {
    if (keyToken.order > queryToken.order) {
      return false;
    }

    return true;
  }

  if (queryToken.patient !== keyToken.patient) {
    return false;
  }

  if (keyToken.staticContext) {
    return true;
  }

  if (keyToken.order > queryToken.order) {
    return false;
  }

  if (mode === 'window') {
    return queryToken.step - keyToken.step <= windowSize;
  }

  return true;
}

export function getAttentionPairStats(mode, windowSize = 2) {
  return METHOD_DEMO_TOKENS.reduce(
    (stats, queryToken) => {
      METHOD_DEMO_TOKENS.forEach((keyToken) => {
        if (!canAttendToken(queryToken, keyToken, mode, windowSize)) {
          return;
        }

        stats.active += 1;

        if (queryToken.patient !== keyToken.patient) {
          stats.crossPatient += 1;
        }

        if (keyToken.staticContext) {
          stats.staticContext += 1;
        }
      });

      return stats;
    },
    { active: 0, crossPatient: 0, staticContext: 0, total: METHOD_DEMO_TOKENS.length ** 2 }
  );
}

export function getAttentionReason(queryToken, keyToken, mode, windowSize = 2) {
  const active = canAttendToken(queryToken, keyToken, mode, windowSize);

  if (!queryToken || !keyToken) {
    return { active: false, reason: 'No query-key pair is selected.' };
  }

  if (mode === 'standard') {
    if (keyToken.order > queryToken.order) {
      return {
        active,
        reason: 'Blocked because standard causal attention cannot look ahead to future batch tokens.',
      };
    }

    return {
      active,
      reason:
        queryToken.patient === keyToken.patient
          ? 'Active because this key is an earlier token in standard causal order.'
          : 'Active because standard causal attention follows batch order and does not isolate patients.',
    };
  }

  if (queryToken.patient !== keyToken.patient) {
    return {
      active,
      reason: 'Blocked because METHOD patient-aware attention keeps different patients isolated.',
    };
  }

  if (keyToken.staticContext) {
    return {
      active,
      reason: 'Active because same-patient static context remains globally visible.',
    };
  }

  if (keyToken.order > queryToken.order) {
    return {
      active,
      reason: 'Blocked because causal attention cannot look ahead within the patient timeline.',
    };
  }

  if (mode === 'window' && queryToken.step - keyToken.step > windowSize) {
    return {
      active,
      reason: `Blocked because this key is outside the ${windowSize}-step window.`,
    };
  }

  return {
    active,
    reason:
      mode === 'window'
        ? `Active because it is the same patient and within the ${windowSize}-step window.`
        : 'Active because it is an earlier token from the same patient.',
  };
}

export function getAttentionSummary(mode, windowSize = 2) {
  if (mode === 'standard') {
    return 'Tokens attend to earlier tokens in the batch, including context from other patients in this toy example.';
  }

  if (mode === 'patient') {
    return 'Attention is restricted to the same patient, preserving patient boundaries during batch processing.';
  }

  return `Attention is restricted to the last ${windowSize} same-patient step${windowSize === 1 ? '' : 's'}, while static context remains visible to that patient.`;
}
