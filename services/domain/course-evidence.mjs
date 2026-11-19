const DAY_MS = 86_400_000;

export function evaluateCourseEvidence(course, evidence, onDate) {
  const today = civilDate(onDate);
  validateCourse(course);

  if (evidence === null) {
    return { status: 'missing', validUntil: null };
  }
  if (!evidence || typeof evidence.revoked !== 'boolean') {
    throw new TypeError('Evidence requires a revocation state.');
  }

  const completedAt = civilDate(evidence.completedOn);
  const validUntil = expirationDate(completedAt, course.validityDays);

  if (evidence.courseId !== course.id) {
    return { status: 'wrong-course', validUntil: null };
  }
  if (evidence.courseRevision !== course.revision) {
    return { status: 'wrong-revision', validUntil: null };
  }
  if (evidence.revoked) {
    return { status: 'revoked', validUntil };
  }
  if (today < completedAt) {
    return { status: 'pending', validUntil };
  }
  if (validUntil !== null && onDate > validUntil) {
    return { status: 'expired', validUntil };
  }
  return { status: 'current', validUntil };
}

function validateCourse(course) {
  if (
    !course ||
    typeof course.id !== 'string' ||
    course.id.trim() === '' ||
    !Number.isSafeInteger(course.revision) ||
    course.revision < 1
  ) {
    throw new TypeError('Course requires an identifier and a positive revision.');
  }
  if (
    course.validityDays !== null &&
    (!Number.isSafeInteger(course.validityDays) || course.validityDays <= 0)
  ) {
    throw new RangeError('Validity must be a positive number of civil days or null.');
  }
}

function civilDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new RangeError('Use a civil date in YYYY-MM-DD format.');
  }
  const timestamp = Date.parse(value + 'T00:00:00.000Z');
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
    throw new RangeError('The civil date does not exist.');
  }
  return timestamp;
}

function expirationDate(completedAt, validityDays) {
  if (validityDays === null) {
    return null;
  }
  const timestamp = completedAt + validityDays * DAY_MS;
  if (!Number.isFinite(timestamp) || Math.abs(timestamp) > 8.64e15) {
    throw new RangeError('The expiration date exceeds the supported calendar.');
  }
  const date = new Date(timestamp).toISOString().slice(0, 10);
  civilDate(date);
  return date;
}
