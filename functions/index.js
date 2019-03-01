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

const findAbsoluteAbnormalities = measurement => {
  const abnormalities = [];
  if (measurement.temperature < 32) {
    abnormalities.push(`Internal temperature quite low [${measurement.temperature}]`);
  }
  if (measurement.temperature > 36) {
    abnormalities.push(`Internal temperature quite high [${measurement.temperature}]`);
  }
  if (measurement.air_quality < 2) {
    abnormalities.push(`Air quality is quite bad [${measurement.air_quality}]`);
  }
  if (measurement.humidity < 40){
    abnormalities.push(`Internal humidity is quite low [${measurement.air_quality}]`);
  }
  if (measurement.humidity > 80){
    abnormalities.push(`Internal humidity is quite high [${measurement.air_quality}]`);
  }
  if (measurement.frequency > 300 && measurement.frequency < 500){
    abnormalities.push(`Potential Spotting of the Queen Bee [${measurement.frequency}]`);
  }
  if (measurement.frequency > 2000 && measurement.frequency < 3600){
    abnormalities.push(`Colony feels a threat is nearby! [${measurement.frequency}]`);
  }
  return abnormalities;
};
const findRelativeAbnormalities = (prevMeasurement, measurement) => {
  const abnormalities = [];
  if (measurement.mass > prevMeasurement.mass * 1.5) {
    abnormalities.push(`Sudden increase in mass detected. From [${prevMeasurement.mass}] to [${measurement.mass}]`);
  }
  if (measurement.mass < prevMeasurement.mass / 1.5) {
    abnormalities.push(`Sudden decrease in mass detected. From [${prevMeasurement.mass}] to [${measurement.mass}]`);
  }
  if (measurement.temperature > prevMeasurement * 1.5){
    abnormalities.push(`Sudden increase in temperature detected. From [${prevMeasurement.temperature}] to [${measurement.temperature}] `);
  }
  if (measurement.temperature < prevMeasurement / 1.5){
    abnormalities.push(`Sudden decrease in temperature detected. From [${prevMeasurement.temperature}] to [${measurement.temperature}] `);
  }
  if (measurement.bees < prevMeasurement * 1.5) {
    abnormalities.push(`Sudden decrease in number of bees. From [${prevMeasurement.bees}] to [${measurement.bees}] `);
  }
  return abnormalities;
};

const findAbnormalities = measurements => {
  if (measurements.length < 1) {
    return [];
  } else if (measurements.length === 1) {
    const measurement = measurements[measurements.length - 1];
    return findAbsoluteAbnormalities(measurement);
  } else {
    const measurement = measurements[measurements.length - 1];
    const prevMeasurement = measurements[measurements.length - 2];
    return [
      ...findAbsoluteAbnormalities(measurement),
      ...findRelativeAbnormalities(prevMeasurement, measurement)
    ];
  }
};

const notifyAllUsers = async (title, body) => {
  // Todo: Keep track of when user was last notified (as to not spam them)
  // Todo: Send only to owners of hive
  const tokenSnaps = await admin.firestore()
    .collection("tokens")
    .get();
  const messagePromises = [];
  tokenSnaps.forEach(snap => {
    const {token} = snap.data();
    console.log("Sending notification to token:", token);
    const message = {
      token,
      notification: {
         // Todo: Include hive name in title
        title, body
      },
      webpush: {
        fcm_options: {
          link: "https://beehive-project-ccf6a.firebaseapp.com"
        }
      }
    };
    messagePromises.push(admin.messaging().send(message));
  });
  return Promise.all(messagePromises);
};



exports.addMeasurements = functions.firestore
  .document("/measurements/{clusterId}/hives/{hiveId}")
  .onUpdate(async (change, context) => {
    const buffer = change.after.buffer;
    if (buffer && buffer.length > 0 &&
    bufferChanged(change.before.buffer, buffer)) {
      console.debug("Buffer has been updated");
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
          await notifyAllUsers("Warning, abnormalities detected in one of your hives!", abnormalities.join("\n"));

        }
        change.after.recentMeasurements = recentMeasurements;
      }

      addToMeasurementArchives(measurements);
      change.after.buffer = measurements;
    }
  });
// Todo: Remove this function once notification debugging has been completed
exports.alertAllUsers = functions.https.onRequest(async(req, res) => {
  const {title, body} = req.body;
  await notifyAllUsers(title, body);
  res.send({message: "Sent"});
});

const saveMeasurement = async (clusterId, hiveId, {date, ...rest}) => admin.firestore()
  .collection("measurements")
  .doc(clusterId)
  .collection("hives")
  .doc(hiveId)
  .collection("measurements")
  .add({date: new Date(date), ...rest});

exports.addMeasurementsToBuffer = functions.https.onRequest(async(req, res) => {
  const {clusterId, hiveId, measurements} = req.body;

  await Promise.all(measurements.map(m => saveMeasurement(clusterId, hiveId, m)));
  const abnormalities = findAbnormalities(measurements);
  if (abnormalities.length) {
    await notifyAllUsers("One of your hives may be in trouble!", abnormalities.join("\n"));
  }
  return res.send({message: "Buffer updated"})
});