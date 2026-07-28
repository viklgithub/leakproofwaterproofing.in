# LeadWorks MVP

A multi-business lead CRM for waterproofing and leakproofing teams. It includes
company accounts, owner/staff roles, invitation codes, a shared lead database,
follow-ups, closure outcomes, payment tracking, CSV import/export, and Firebase
Hosting configuration.

## Preview the MVP

Run the dependency-free local preview:

```powershell
node serve-local.js
```

Open <http://127.0.0.1:8765> and select **Open Preview Workspace**. Preview mode
uses browser storage and sample data, so it can be tested before Firebase is
configured.

## Connect Firebase

1. Create a project at <https://console.firebase.google.com/>.
2. Open **Build > Authentication > Sign-in method** and enable
   **Email/Password**.
3. Open **Build > Firestore Database**, create a database, and choose the region
   closest to the customers.
4. In **Project settings > Your apps**, add a Web app.
5. Copy the Firebase configuration into `firebase-config.js`.
6. Change `mode: "demo"` to `mode: "firebase"`.
7. Add the deployed domain under **Authentication > Settings > Authorized
   domains**.

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
Copy-Item .firebaserc.example .firebaserc
```

Replace `your-firebase-project-id` in `.firebaserc`, then deploy:

```powershell
firebase deploy
```

This publishes Firestore security rules and the website. Firebase prints the
live HTTPS URL after deployment.

## Account Flow

- The first owner creates a company from the sign-up screen.
- The owner opens **Team**, enters an employee email, and generates an invite.
- The employee creates an account with the same email and the six-character
  invitation code.
- Security rules scope every lead to that employee's business.
- Staff can create and update leads. Only owners can delete leads, import CSV
  data, invite team members, and view the team page.

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
