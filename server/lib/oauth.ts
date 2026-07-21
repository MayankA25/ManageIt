import { oauthClient } from "./oauthClient";

interface UserPayload{
    name: string | undefined;
    email: string | undefined;
    profilePic: string | undefined;
}

// export const getPayload2 = async (code: string): Promise<UserPayload> => {
//   const { tokens } = await oauthClient.getToken(code);

//   console.log("Tokens: ", tokens);

//   const idToken = tokens?.id_token;

// //   if (!idToken) {
// //     return { msg: "No Token Found", success: false };
// //   }

//     if(!idToken){
//         throw new Error("No Id Token Found");
//     }

//   const ticket = await oauthClient.verifyIdToken({
//     idToken: idToken,
//     audience: process.env.OAUTH_CLIENT_ID as string,
//   });

//   const payload = ticket.getPayload();

//   const userDetails = {
//     name: payload?.name,
//     email: payload?.email,
//     profilePic: payload?.picture
//   }

//   return userDetails;
// };



export const getPayload = async(code: string):Promise<UserPayload>=>{
  const { tokens } = await oauthClient.getToken(code);

  console.log("Tokens: ", tokens);

  const idToken = tokens?.id_token;

  if(!idToken){
    throw new Error("No ID Token Found");
  }

  const ticket = await oauthClient.verifyIdToken({
    idToken: idToken,
    audience: process.env.OAUTH_CLIENT_ID as string
  });

  const payload = ticket.getPayload();

  const userDetails: UserPayload = {
    name: payload?.name,
    email: payload?.email,
    profilePic: payload?.picture
  }

  return userDetails;
}