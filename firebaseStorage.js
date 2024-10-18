const admin = require("firebase-admin");
var serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const firebaseStorage = admin.storage();

module.exports = firebaseStorage;
