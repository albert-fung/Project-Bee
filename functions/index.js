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


const splitMeasurements = measurements => {
  const individualLists = {
    air_quality: [],
    bees: [],
    frequency: [],
    date: [],
    humidity: [],
    mass: [],
    temperature: []
  };
  measurements.forEach(measurement =>
    Object.entries(measurement)
      .forEach(([key, value]) =>
        individualLists[key].push(value)));
  return individualLists;
};

// Todo: Write proper abnormality scanners for appropriate fields
const findAbnormalities = measurements => {
  const abnormalities = [];
  const {air_quality: airQuality, bees, frequency, humidity, mass, temperature} = splitMeasurements(measurements);
  if (mass.some((massValue, index) => massValue * 2 < mass[index - 1])) {
    abnormalities.push(`Mass has significantly decreased!`);
  }
  return abnormalities;
};

const notifyUser = async (abnormalities, auth) => {
  // Todo: Notify user on weirdness
  // Todo: Keep track of when user was last notified (as to not spam them)
  //const token = auth.uid.get.token()
  const message = {
    token,
    notification: {
      title,
      body
    },
    webpush: {
      fcm_options: {
        link: ""
      }
    }
  };
  return admin.messaging().send(message);


};

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
        const abnormalities = findAbnormalities(measurements);
        if (abnormalities.length > 0) {
          notifyUser(abnormalities, context.auth);
        }
        change.after.recentMeasurements = recentMeasurements;
      }

      addToMeasurementArchives(measurements);
      change.after.buffer = measurements;
    }
  });