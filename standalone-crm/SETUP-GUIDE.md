# Owner Setup Guide — Exact Console Steps

This guide walks through every console step needed to connect the CRM, the
website lead form, and Firestore. Follow it in order.

---

## Step 1 — Create the Firebase project

1. Go to <https://console.firebase.google.com/>
2. Click **Add project**
3. Name it `leakproof2-crm` (project ID becomes `leakproof2-crm`)
4. Click **Create project**

---

## Step 2 — Enable Email/Password authentication

1. In the Firebase Console, open **Build → Authentication**
2. Click **Get started**
3. Go to **Sign-in method**
4. Find **Email/Password** and click the pencil icon
5. Toggle **Enable** to ON
6. Click **Save**

---

## Step 3 — Create the Firestore database

1. In the Firebase Console, open **Build → Firestore Database**
2. Click **Create database**
3. Choose a region (e.g., `asia-south1` for India)
4. Start in **Production mode**
5. Click **Create**

---

## Step 4 — Add a Web app to get the config

1. In the Firebase Console, open **Project settings** (gear icon)
2. Scroll to **Your apps**
3. Click the **Web** icon (`</>`)
4. Enter an app nickname (e.g., `crm-web`)
5. Click **Register app**
6. Copy the `firebaseConfig` object — you'll paste it into `firebase-config.js`
7. Click **Continue to console**

---

## Step 5 — Update `firebase-config.js`

Open `standalone-crm/firebase-config.js` and replace the placeholder values
with the real ones from Step 4. Then change:

```js
mode: "demo"
```

to:

```js
mode: "firebase"
```

---

## Step 6 — Deploy the CRM to Firebase Hosting

1. Install the Firebase CLI once (if not already):
   ```powershell
   npm install -g firebase-tools
   firebase login
   ```
2. From the `standalone-crm` directory:
   ```powershell
   firebase deploy
   ```
3. Firebase prints the live URL, e.g. `https://leakproof2-crm.web.app`
4. Copy this URL — you'll need it in Step 8

---

## Step 7 — Provision the owner account (manual)

Public owner signup is **disabled** — owner accounts are created by an admin in
the Firebase console, never from the client app.

1. In the Firebase Console, open **Build → Authentication → Users**
2. Click **Add user**
3. Enter the owner's email and a temporary password
4. Click **Add user** — note the **UID** of the new user
5. Open **Build → Firestore Database → `businesses`**
6. Click **Add document**:
   - Document ID: leave auto-generated (e.g., `aB3xY9zKpQ...`)
   - Field `name`: the business name (e.g., `Leakproof Waterproofing`)
   - Field `ownerId`: the UID from step 4
7. Click **Save**
8. Open **Build → Firestore Database → `users`**
9. Click **Add document** and set the **document ID to the owner's UID**:
   - `name`: owner display name
   - `email`: owner login email (lowercase)
   - `role`: `"owner"`
   - `businessId`: the business document ID from step 6
   - `active`: `true`
10. Click **Save**
11. Share the CRM URL and the temporary password with the owner

---

## Step 8 — Add the CRM domain to authorized domains

1. In the Firebase Console, open **Authentication → Settings**
2. Under **Authorized domains**, click **Add domain**
3. Add the CRM URL from Step 6 (e.g., `leakproof2-crm.web.app`)
4. Click **Save**

---

## Step 9 — Create a service account for the website

1. In the Firebase Console, open **Project settings → Service accounts**
2. Click **Generate new private key**
3. Confirm — a JSON file downloads (e.g., `leakproof2-crm-firebase-adminsdk-xxxxx.json`)
4. Keep this file safe — it grants admin access to your Firestore

---

## Step 10 — Find the business document ID

1. In the Firebase Console, open **Build → Firestore Database**
2. Open the **businesses** collection
3. You'll see one document (created in Step 7)
4. Copy the **document ID** (a long string like `aB3xY9zKpQ...`)

---

## Step 11 — Set secrets in Cloudflare

1. Go to <https://dash.cloudflare.com/>
2. Open **Workers & Pages → leakproofwaterproofing-in**
3. Open **Settings → Variables and Secrets**
4. Add two secrets:

   | Name | Value |
   |------|-------|
   | `FIREBASE_SERVICE_ACCOUNT` | The **entire JSON** from the service account file (Step 9) |
   | `FIREBASE_BUSINESS_ID` | The business document ID (Step 10) |

5. Click **Save**

---

## Step 12 — Redeploy the website

1. In the Cloudflare dashboard, open the **leakproofwaterproofing-in** Worker
2. Click **Deployments**
3. Click **Create deployment** and upload the latest build, OR redeploy from your
   CI/CD pipeline (e.g., `wrangler deploy`)

---

## Step 13 — Test the full flow

1. Open the website: `https://www.leakproof2.in`
2. Fill out the contact form and submit
3. Open the CRM: `https://leakproof2-crm.web.app`
4. Sign in as the owner
5. The new lead appears in the **All Leads** view with `source: "website"`

---

## Step 14 — Invite employees (optional)

1. In the CRM, open the **Team** page
2. Enter an employee email and role
3. Click **Generate invite** — a 6-character code appears (e.g., `A7K9P2`)
4. Share the code + CRM URL with the employee
5. The employee opens the CRM URL → **Create Account** → enters the code → joins as **staff**

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| CRM shows "Preview data" | `mode` is still `"demo"` in `firebase-config.js` — change to `"firebase"` and redeploy |
| Website form says "Submission failed" | Check `FIREBASE_SERVICE_ACCOUNT` and `FIREBASE_BUSINESS_ID` secrets in Cloudflare |
| Owner can't sign in | Confirm Email/Password is enabled (Step 2), the domain is authorized (Step 8), and the owner user + business docs were created in Step 7 |
| Employee can't join | Confirm the invite code is correct and the employee uses the same email that was invited |