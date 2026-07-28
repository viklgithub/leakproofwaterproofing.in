# Leakproof Waterproofing CRM Starter

This workspace now contains:

- A standalone CRM app in the `standalone-crm` folder.
- A public lead-capture website in the `website` folder.

## Run locally

1. Open the CRM app with a local static server.
2. Open the website page for enquiry capture.

### CRM preview

From the repo root:

```powershell
cd standalone-crm
node serve-local.js
```

Then open http://127.0.0.1:8765

### Website preview

From the repo root:

```powershell
cd website
python -m http.server 8787
```

Then open http://127.0.0.1:8787

## Next steps

1. Connect the website form to the CRM backend.
2. Add admin/staff login flow.
3. Replace demo storage with Firebase-backed persistence.
