// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// for testing purposes
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 
// On sign up.
// Auto set each new sign up to be a user
exports.userCreationListener = functions.auth.user().onCreate(user => {
    const customClaims = {
      user: true
    };
    // Set custom user claims on this newly created user.
    return admin.auth().setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        // Update real-time database to notify client to force refresh.
        const metadataRef = admin.database().ref("metadata/" + user.uid);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        return metadataRef.set({refreshTime: new Date().getTime()});
      })
      .catch(error => {
        console.log(error);
      });
  
});

// Function to add a manager
// Check first if a 'super_admin' is requesting this
// super_admin is only role to be able to change other roles
exports.addManager = functions.https.onCall((data, context) => {
    if (context.auth.token.super_admin !== true) { // 1
        return {
            error: `Request not authorized. User must be a super admin to fulfill request.`
        };
    }; // 2
    const email = data.email; // 3
    return grantManagerRole(email).then(() => {
        return {
            result: `Request fulfilled! ${email} is now aanager.`
        };
    }); // 4
});


// update user's permission to manager when called by .addManager method
async function grantManagerRole(email) {
    const user = await admin.auth().getUserByEmail(email); // 1
    if (user.customClaims && user.customClaims.manager === true) {
        return;
    } // 2
    return admin.auth().setCustomUserClaims(user.uid, {
        manager: true
    }); // 3
}

// Set one specific user (using email address) to be the super admin
admin.auth().getUserByEmail('superadmin@email.ie').then((user) => {
  // Confirm user is verified.
  if (user.emailVerified) {
    // Add custom claims for additional privileges.
    // This will be picked up by the user on token refresh or next sign in on new device.
    return admin.auth().setCustomUserClaims(user.uid, {
      super_admin: true
    });
  }
})
  .catch((error) => {
    console.log(error);
  });
