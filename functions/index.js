import {firestore} from "../src/Firebase";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const bufferChanged = (oldBuffer, newBuffer )=> {
  if (!oldBuffer && !newBuffer) {
    return false;
  }
  if (Array.isArray(oldBuffer) !== Array.isArray(newBuffer)) {
    return true;
  }
  // At this point we can assume they are both arrays
  if (oldBuffer.length !== newBuffer.length) {
    return false;
  }
  return oldBuffer.some((measurement, index) =>
    measurement.date !== newBuffer[index].date);
};

const addToMeasurementArchives = measurements => {
  // Todo: Implement this
  console.warn("Unimplemented function `addToMeasurementArchives`");
};

const dateComparator = (a, b) => a.date - b.date;

const NUM_RECENT_MEASUREMENTS = 15;

const getMostRecentMeasurements = (measurements, archive) =>
  [...measurements, ...archive]
    .sort(dateComparator)
    .slice(measurements.length + archive.length - NUM_RECENT_MEASUREMENTS);




exports.addMeasurements = functions.firestore
  .document("/measurements/{clusterId}/hives/{hiveId}/buffer")
  .onUpdate(async (change, context) => {
    const buffer = change.after.buffer;
    if (buffer && buffer.length > 0 &&
    bufferChanged(change.before.buffer, buffer)) {
      const measurements = buffer.sort(dateComparator);
      const {hiveId, clusterId} = context.params;

      const archives = await admin.firestore.collection("measurements")
        .doc(hiveId)
        .collection("hives")
        .doc(clusterId)
        .collection("archive")
        .orderBy("date")
        .limit(NUM_RECENT_MEASUREMENTS);

      // If at least one measurement is one of the 15 most recent
      if (measurements[measurements.length - 1].date > archives[0].date) {
        const recentMeasurements = getMostRecentMeasurements(measurements, archives);
        // Todo: Scan measurements for weirdness
        // Todo: Notify user on weirdness
        // Todo: Keep track of when user was last notified (as to not spam them)
        change.after.recentMeasurements = recentMeasurements;
      }

      addToMeasurementArchives(measurements);
      change.after.buffer = measurements;
    }
  });