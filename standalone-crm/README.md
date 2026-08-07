# LeadWorks CRM — Leakproof Waterproofing

A multi-business lead CRM for waterproofing and leakproofing teams. It includes
company accounts, owner/staff roles, invitation codes, a shared lead database,
follow-ups, closure outcomes, payment tracking, CSV import/export, and Firebase
Hosting configuration.

## The Working Flow

```
CUSTOMER on website (www.leakproof2.in)
   │  fills contact form
   ▼
/api/submit-lead (Cloudflare Worker)
   │  writes directly to Firestore (service account)
   ▼
Firestore: businesses/{businessId}/leads/{leadId}   ← single source of truth
   ▲
   │  reads same collection
CRM APP (Firebase Hosting → https://leakproof2-crm.web.app)
   │
   ├── OWNER (admin account — provisioned manually by admin)
   │     • Sees all leads (from website + manual)
   │     • Creates/updates/deletes leads
   │     • Invites employees (generates 6-char code)
   │     • Imports/exports CSV
   │
   └── EMPLOYEE (staff account — joins via invitation code)
         • Sees all leads in the same business
         • Creates/updates leads
         • Cannot delete, import, or invite
```

### How the owner accesses it
1. Admin creates the owner account manually (see "Provision an Owner Account" below)
2. Owner opens `https://leakproof2-crm.web.app` and clicks **Sign In** with email/password
3. Website leads appear automatically in the CRM because both read/write the same Firestore database

### How employees access it
1. Owner goes to **Team** page → enters employee email → gets a 6-character code (e.g., `A7K9P2`)
2. Owner shares the code + CRM URL with the employee
3. Employee opens the CRM URL → **Create Account** → enters the invitation code → joins the same business as **staff**

### How website leads flow in
1. Customer fills the form on `www.leakproof2.in`
2. The Cloudflare Worker writes the lead directly to Firestore under the owner's business
3. Owner opens CRM → lead is already there with `source: "website"`

## Preview the MVP Locally

Run the dependency-free local preview:

```powershell
node serve-local.js
```

Open <http://127.0.0.1:8765> and select **Open Preview Workspace**. Preview mode
uses browser storage and sample data, so it can be tested before Firebase is
configured.

## Connect Firebase

1. Create a project at <https://console.firebase.google.com/> (project ID: `leakproof2-crm`).
2. Open **Build > Authentication > Sign-in method** and enable **Email/Password**.
3. Open **Build > Firestore Database**, create a database, and choose the region closest to the customers.
4. In **Project settings > Your apps**, add a Web app.
5. Copy the Firebase configuration into `firebase-config.js` (replace the placeholder values).
6. Change `mode: "demo"` to `mode: "firebase"` in `firebase-config.js`.
7. Add the deployed domain under **Authentication > Settings > Authorized domains** (e.g., `leakproof2-crm.web.app`).

The Firebase web configuration is intentionally public. Never put a service
account key, Admin SDK private key, or other server secret in this project.

## Deploy Rules and Hosting

Install the Firebase CLI once:

```powershell
npm install -g firebase-tools
firebase login
```

From this directory:

```powershell
firebase deploy
```

This publishes Firestore security rules and the website. Firebase prints the
live HTTPS URL after deployment.

## Connect the Website Lead Form

The website (`www.leakproof2.in`) writes leads directly to Firestore via a
Cloudflare Worker. To configure it:

1. **Create a service account** in Firebase Console → Project settings → Service accounts → Generate new private key.
2. **Set the secret** in Cloudflare (Workers → leakproofwaterproofing-in → Settings → Variables and Secrets):
   - `FIREBASE_SERVICE_ACCOUNT` = the full JSON from the service account key
   - `FIREBASE_BUSINESS_ID` = the business document ID from Firestore (created when the owner account is provisioned)
3. Redeploy the website.

## Provision an Owner Account (manual)

Public owner signup is **disabled** — businesses and owner accounts are created by
an admin in the Firebase console, never from the client app. To provision a new
owner:

1. Open Firebase Console → your project → **Authentication → Users** → **Add user**.
   Enter the owner's email and a temporary password, then click **Add user**.
2. Open **Firestore Database → `businesses`** → **Add document**:
   - Document ID: auto-generated (e.g., `abc123...`)
   - Field `name`: the business name (e.g., `Reliable Waterproofing`)
   - Field `ownerId`: the UID of the newly created Auth user
3. Open **Firestore Database → `users`** → **Add document** with the **user's UID as the document ID**:
   - `name`: owner display name
   - `email`: owner login email (lowercase)
   - `role`: `"owner"`
   - `businessId`: the business document ID from step 2
   - `active`: `true`
4. Share the CRM URL and the password with the owner. They sign in and change
   their password in Firebase **Authentication → Users** if desired.

## Account Flow

- Admin provisions the owner account manually (business + user docs) in the Firebase console.
- The owner opens **Team**, enters an employee email, and generates an invite.
- The employee creates an account with the same email and the six-character invitation code.
- Security rules scope every lead to that employee's business.
- Staff can create and update leads. Only owners can delete leads, import CSV data, invite team members, and view the team page.

## Data Model

```text
businesses/{businessId}
businesses/{businessId}/leads/{leadId}
users/{userId}
invitations/{inviteCode}
```

Every lead carries its `businessId`, creator, updater, and timestamps. The
security boundary is enforced by `firestore.rules`, not by the browser UI.

## Free-Tier Notes

The Firebase Spark plan is suitable for a small pilot. It does not include
managed Firestore backups. Continue exporting CSV backups, and move to a paid
plan before the product becomes operationally critical.