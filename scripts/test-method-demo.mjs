import assert from 'node:assert/strict';
import {
  METHOD_DEMO_TOKENS,
  canAttendToken,
  getAttentionPairStats,
  getAttentionReason,
  getAttentionSummary,
} from '../components/methodDemoLogic.js';

const token = (label, patient) =>
  METHOD_DEMO_TOKENS.find((item) => item.label === label && item.patient === patient);

const aOutcome = token('Outcome', 'A');
const aHistory = token('History', 'A');
const aBp = token('BP 162/92', 'A');
const bTroponin = token('Troponin', 'B');
const bOutcome = token('Outcome', 'B');

assert.equal(canAttendToken(aOutcome, aHistory, 'standard', 2), true);
assert.equal(canAttendToken(aOutcome, bTroponin, 'standard', 2), true);

assert.equal(canAttendToken(aOutcome, aHistory, 'patient', 2), true);
assert.equal(canAttendToken(aOutcome, bTroponin, 'patient', 2), false);

assert.equal(canAttendToken(aOutcome, aHistory, 'window', 4), true);
assert.equal(canAttendToken(aOutcome, aHistory, 'window', 1), true);
assert.equal(canAttendToken(aOutcome, aBp, 'window', 1), false);
assert.equal(canAttendToken(aOutcome, bTroponin, 'window', 4), false);

assert.equal(METHOD_DEMO_TOKENS.length, 12);
assert.equal(getAttentionPairStats('standard', 2).active, 78);
assert.equal(getAttentionPairStats('standard', 2).crossPatient, 36);
assert.equal(getAttentionPairStats('patient', 2).active, 42);
assert.equal(getAttentionPairStats('window', 1).active, 30);
assert.equal(getAttentionPairStats('window', 2).active, 36);
assert.equal(getAttentionPairStats('window', 5).active, getAttentionPairStats('patient', 5).active);

assert.equal(getAttentionReason(aOutcome, aHistory, 'window', 1).active, true);
assert.match(getAttentionReason(aOutcome, aHistory, 'window', 1).reason, /static context/);
assert.equal(getAttentionReason(aOutcome, aBp, 'window', 1).active, false);
assert.match(getAttentionReason(aOutcome, aBp, 'window', 1).reason, /outside the 1-step window/);
assert.equal(getAttentionReason(aOutcome, bOutcome, 'patient', 2).active, false);
assert.match(getAttentionReason(aOutcome, bOutcome, 'patient', 2).reason, /different patients/);

assert.match(getAttentionSummary('standard'), /earlier tokens/);
assert.match(getAttentionSummary('patient'), /same patient/);
assert.match(getAttentionSummary('window', 2), /last 2 same-patient/);

console.log('method demo logic tests passed');
