# FirebaseCloudClaimsCloudFunction

Project based on Firebase Custom Claims

The index.js script has been deployed to firebase cloud. 
This file contains a function to initialise a special user to be a "super admin"
Every other new authenticated user is set to a "user"

The "super_admin" can then upgrade the role of each "user" to "manager" (or some other custom role you have made up)


Android studio java activity included in project to show how the deployed function can be called.
If you get a FirebaseFunctions.getInstance() null pointer error update your google play services in you build.gradle (app level)

