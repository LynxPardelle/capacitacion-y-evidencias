import assert from 'node:assert/strict';
import test from 'node:test';

import { evaluateCourseEvidence } from './course-evidence.mjs';

const course = { id: 'safety-intro', revision: 2, validityDays: 30 };
const evidence = {
  courseId: 'safety-intro',
  courseRevision: 2,
  completedOn: '2026-01-01',
  revoked: false,
};

test('requires evidence for the selected course revision', () => {
  assert.deepEqual(evaluateCourseEvidence(course, null, '2026-01-10'), {
    status: 'missing',
    validUntil: null,
  });
  assert.equal(
    evaluateCourseEvidence(course, { ...evidence, courseId: 'other' }, '2026-01-10').status,
    'wrong-course',
  );
  assert.equal(
    evaluateCourseEvidence(course, { ...evidence, courseRevision: 1 }, '2026-01-10').status,
    'wrong-revision',
  );
});

test('includes the expiration day and expires on the following civil day', () => {
  assert.deepEqual(evaluateCourseEvidence(course, evidence, '2026-01-31'), {
    status: 'current',
    validUntil: '2026-01-31',
  });
  assert.deepEqual(evaluateCourseEvidence(course, evidence, '2026-02-01'), {
    status: 'expired',
    validUntil: '2026-01-31',
  });
});

test('keeps a future completion pending and a revoked record invalid', () => {
  assert.equal(evaluateCourseEvidence(course, evidence, '2025-12-31').status, 'pending');
  assert.equal(
    evaluateCourseEvidence(course, { ...evidence, revoked: true }, '2026-01-10').status,
    'revoked',
  );
});

test('supports courses without expiration and leap-year boundaries', () => {
  assert.deepEqual(
    evaluateCourseEvidence({ ...course, validityDays: null }, evidence, '2036-01-01'),
    { status: 'current', validUntil: null },
  );
  assert.deepEqual(
    evaluateCourseEvidence(
      { ...course, validityDays: 1 },
      { ...evidence, completedOn: '2028-02-28' },
      '2028-02-29',
    ),
    { status: 'current', validUntil: '2028-02-29' },
  );
});

test('rejects impossible dates, timestamps and invalid course policies', () => {
  for (const onDate of ['2026-02-29', '2026-13-01', '2026-01-01T00:00:00Z']) {
    assert.throws(() => evaluateCourseEvidence(course, evidence, onDate), RangeError);
  }
  assert.throws(
    () => evaluateCourseEvidence(course, { ...evidence, completedOn: '2026-02-30' }, '2026-03-01'),
    RangeError,
  );
  for (const validityDays of [-1, 0, 1.5, undefined]) {
    assert.throws(
      () => evaluateCourseEvidence({ ...course, validityDays }, evidence, '2026-01-10'),
      RangeError,
    );
  }
});
