# FirebaseCloudClaimsCloudFunction

Project based on Firebase Custom Claims

The index.js script has been deployed to firebase cloud. 
This file contains a function to initialise a special user to be a "super admin"
Every other new authenticated user is set to a "user"

The "super_admin" can then upgrade the role of each "user" to "manager" (or some other custom role you have made up)


Android studio java activity included in project to show how the deployed function can be called.
If you get a FirebaseFunctions.getInstance() null pointer error update your google play services in you build.gradle (app level)



Resources used:
https://codeexa.com/how-to-connect-android-with-firebase-cloud-functions/amp/
https://stackoverflow.com/questions/42872743/calling-a-cloud-function-from-android-through-firebase
https://github.com/firebase/quickstart-android/blob/375c1ae5ec9000ee71b93cee409086e27d774bdb/functions/app/src/main/java/com/google/samples/quickstart/functions/java/MainActivity.java#L123-L142

Cloud function for updateing a user to a "manager":
https://medium.com/google-developers/controlling-data-access-using-firebase-auth-custom-claims-88b3c2c9352a
