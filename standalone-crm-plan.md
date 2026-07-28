# Standalone CRM Plan

## Objective
Create a single-client standalone CRM based on the current lead-tracker app, then build a website for lead capture and connect both.

## Phase 1 - Scope Definition
- Confirm the client's exact business workflow.
- Identify the required lead fields.
- Decide which features are mandatory for v1.
- Decide what should be hidden or removed from the current multi-business design.

## Phase 2 - Simplify the Current App
- Keep the existing app as the base foundation.(curent multiclient project path:C:\Users\vikra\Documents\NinjaTrader 8\bin\Custom\lead-tracker)
- Remove or hide multi-business complexity.
- Focus the app on one business/workspace only.
- Simplify the UI for one client.

## Phase 3 - Customize the CRM
- Define lead stages for this client.
- Customize the form fields.
- Add follow-up, notes, and closure workflow.
- Keep the UI clean and business-specific.
- Make the app feel like a dedicated tool for one client rather than a generic multi-business platform.

## Phase 4 - User Access Flow
- Keep one admin login for the business owner.
- Allow the admin to create up to 5-10 staff accounts by email.
- Staff should not need public sign-up.
- Keep the flow simple and controlled.
- Define roles: Admin and Staff.

## Phase 5 - Website Lead Capture
- Create a public website for the client.
- Add a contact or enquiry form.
- Submit form data to the CRM backend.
- Create leads automatically inside the CRM.

## Phase 6 - Integration
- Connect website form to the CRM database.
- Ensure leads appear in the CRM dashboard.
- Add validation and basic success/error messages.

## Phase 7 - Deployment
- Deploy CRM app.
- Deploy website.
- Configure domain and hosting.
- Test full end-to-end flow.

## Suggested Delivery Order
1. Single-client CRM setup
2. Customized lead workflow
3. Website form creation
4. CRM + website integration
5. Deployment and testing

## Recommended Tech Stack
- CRM: Existing Firebase-based app
- Database: Firestore
- Authentication: Firebase Auth
- Website hosting: Cloudflare Pages or Firebase Hosting
- Form submission: Firebase Function or Cloudflare Worker
