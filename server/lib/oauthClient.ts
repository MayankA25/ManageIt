import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\RecruitIt\\server\\.env" })

export const oauthClient = new OAuth2Client({
    client_id: process.env.OAUTH_CLIENT_ID as string,
    client_secret: process.env.OAUTH_CLIENT_SECRET as string,
    redirectUri: "http://localhost:5000/api/auth/callback"
})