const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("graphql-request");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Make sure you update the endpoint and the secret
// You can find both these values on the Graphiql tab in Hasura
const client = new request.GraphQLClient("https://safe-tiger-57.hasura.app/v1/graphql", {
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": "XdMLZrRM3EEKZycojjSLD65PwHhG49t3ESlQ1Ak9U57cMXVKTCb83HlqLBNI9E0i"
  }
});

admin.initializeApp(functions.config().firebase);

exports.registerUser = functions.https.onCall(async (data) => {
  const { email, password, ville, numClient, tel} = data;
  const query = `
    query($numclient: String_comparison_exp = {}, $centre: Int_comparison_exp = {}) {
      test_clients(where: {numclient: $numclient, centre: $centre}){
        centre
        numclient
      }
    }
  `;
  const mutation = `
    mutation($centre: Int, $email: String, $id: String, $tel: String) {
      insert_test_users(objects: {centre: $centre, email: $email, id: $id, tel: $tel}, on_conflict: {constraint: users_pkey}) {
        affected_rows
      }
    }
  `;

  try {
    const data = await client.request(query, {"centre": {"_eq": ville},
      "numclient": {"_eq": numClient}
    });

    if(data.test_clients.length === 0){
      throw new functions.https.HttpsError('not-found', "La combinaison de votre ville et votre numéro client n'est pas repertorié, veuillez réessayer avec des informations correctes ou vous rapprocher d'une agence")
    }
  } catch (e) {
    throw new functions.https.HttpsError('invalid-argument', e.message);
  }

  if(email === null){
    throw new functions.https.HttpsError("invalid-argument", "Votre email addresse est requise");
  } 

  if(password === null){
    throw new functions.https.HttpsError("invalid-argument", "Le mot de passe est requis");
  }

  try {
    // We create our user using the firebase admin sdk
    const userRecord = await admin.auth().createUser({uid: numClient, email, password });

    // We set our user role and the x-hasura-user-id claims
    // Remember, the x-hasura-user-id is what Hasura uses to check
    // if the user is allow to read/update a record
    const customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "anonymous",
        "x-hasura-allowed-roles": ["anonymous"],
        "x-hasura-user-id": userRecord.uid
      }
    };

    await admin.auth().setCustomUserClaims(userRecord.uid, customClaims);

    try {
      const user = await client.request(
        mutation, 
        {
          "centre": ville, 
          "email": email, 
          "id": numClient, 
          "tel": tel
        }
      );
      console.log(user)
    } catch (e) {
      throw new functions.https.HttpsError('invalid-argument', e.message);
    }

    return userRecord.toJSON();

  } catch (e) {
    let errorCode = "unknown";
    let msg = "Nous n'avons pas pu créer votre compte, veuillez réessayer s'il vous plait";
    if (e.code === "auth/email-already-exists") {
      // If a user that already has an account tries to sign up
      // we want to show them a proper error and instruct them to log in
      errorCode = "already-exists";
      msg = "L'addresse " + email + " est déjà associée à un utilisateur";
    }

    if (e.code === "uid-already-exists") {
      msg = "Un utilisateur c'est déjà connecté avec le numéro client saisi"
    }
    throw new functions.https.HttpsError(msg);
  }
});

// This is automatically triggered by Firebase
// whenever a new user is created
exports.processSignUp = functions.auth.user().onCreate(async user => {
  const { uid: id, email } = user;
  const mutation = `
    mutation($id: String!, $email: String) {
      insert_test_users(objects: [{
        id: $id,
        email: $email,
      }]) {
        affected_rows
      }
    }
  `;
  
  /*try {
    const data = await client.request(mutation, { id, email });

    return data;
  } catch (e) {
    throw new functions.https.HttpsError('invalid-argument', e.message);
  }*/
});

// This again is automatically triggered
// whenever an account is deleted on Firebase
exports.processDelete = functions.auth.user().onDelete(async (user) => {
  const mutation = `
    mutation($id: String!) {
      delete_test_users(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
  `;
  const id = user.uid;

  try {
    const data = await client.request(mutation, {
      id: id,
    })
    return data;
  } catch (e) {
    throw new functions.https.HttpsError('invalid-argument', e.message);
  }
});