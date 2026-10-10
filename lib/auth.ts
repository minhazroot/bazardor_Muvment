import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import { Pool } from 'pg';

// Production must use a persistent PostgreSQL database (Neon, Supabase, etc.).
// Without DATABASE_URL, development uses a local SQLite file instead.
const database = process.env.DATABASE_URL
 ? new Pool({ connectionString: process.env.DATABASE_URL, max: 5 })
 : new Database('./bazardor.sqlite');
const socialProviders = {
 ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
  google: {clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET}
 } : {}),
 ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
  github: {clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET}
 } : {})
};
export const auth = betterAuth({
 database,
 emailAndPassword: {enabled: true, minPasswordLength: 8},
 socialProviders,
 // No email-verification requirement: matches examiner requirements.
 trustedOrigins: [process.env.BETTER_AUTH_URL || 'http://localhost:3000'],
});
