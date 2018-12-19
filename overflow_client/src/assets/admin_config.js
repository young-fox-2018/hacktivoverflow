var admin = require("firebase-admin");
var serviceAccount = require("../hacktiv-overflow-e0d30-firebase-adminsdk-ak0g0-c49cd1056c.json");

export function initAdmin() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://hacktiv-overflow-e0d30.firebaseio.com"
    });
};

