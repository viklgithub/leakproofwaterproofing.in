"use strict";

const OPTIONS = {
  categories: ["Residential", "Commercial", "Roof / Terrace", "Basement / Leakage", "Bathroom / Interior"],
  visitStatuses: ["Not Scheduled", "Site Inspection Scheduled", "Inspection Completed", "Follow-Up Needed", "Cancelled / Rescheduled"],
  quotationStatuses: [
    "Quote Required",
    "Quote Under Preparation",
    "Quote Sent",
    "Revision Requested",
    "Quote Approved",
    "Quote Rejected"
  ],
  followUpStages: ["New Enquiry", "Follow-Up 1", "Follow-Up 2", "Follow-Up 3", "Follow-Up 4", "Follow-Up 5"],
  closureStatuses: ["Open", "Work Completed", "Closed / Lost"],
  lostReasons: ["Price too high", "Competitor took it", "No response", "Requirement postponed", "Invalid lead", "Other"],
  paymentStatuses: ["Pending", "Partially Paid", "Paid", "Overdue", "Not Applicable"]
};

const service = window.LeadWorksService.create();
let session = null;
let leads = [];
let members = [];
let activeView = "dashboard";
let toastTimer = null;

const el = {
  loadingScreen: document.querySelector("#loadingScreen"),
  authShell: document.querySelector("#authShell"),
  appShell: document.querySelector("#appShell"),
  previewBanner: document.querySelector("#previewBanner"),
  previewLoginBtn: document.querySelector("#previewLoginBtn"),
  signInPanel: document.querySelector("#signInPanel"),
  signUpPanel: document.querySelector("#signUpPanel"),
  signInForm: document.querySelector("#signInForm"),
  signUpForm: document.querySelector("#signUpForm"),
  signInEmail: document.querySelector("#signInEmail"),
  signInPassword: document.querySelector("#signInPassword"),
  signUpName: document.querySelector("#signUpName"),
  signUpEmail: document.querySelector("#signUpEmail"),
  signUpPassword: document.querySelector("#signUpPassword"),
  invitationCode: document.querySelector("#invitationCode"),
  businessName: document.querySelector("#businessName"),
  businessNameWrap: document.querySelector("#businessNameWrap"),
  showSignUpBtn: document.querySelector("#showSignUpBtn"),
  showSignInBtn: document.querySelector("#showSignInBtn"),
  forgotPasswordBtn: document.querySelector("#forgotPasswordBtn"),
  signOutBtn: document.querySelector("#signOutBtn"),
  sidebarBusinessName: document.querySelector("#sidebarBusinessName"),
  businessEyebrow: document.querySelector("#businessEyebrow"),
  accountName: document.querySelector("#accountName"),
  accountRole: document.querySelector("#accountRole"),
  ownerOnly: document.querySelectorAll(".owner-only"),
  pageTitle: document.querySelector("#pageTitle"),
  navItems: document.querySelectorAll(".nav-item"),
  views: {
    dashboard: document.querySelector("#dashboardView"),
    leads: document.querySelector("#leadsView"),
    form: document.querySelector("#formView"),
    team: document.querySelector("#teamView")
  },
  quickAddBtn: document.querySelector("#quickAddBtn"),
  exportCsvBtn: document.querySelector("#exportCsvBtn"),
  importCsvInput: document.querySelector("#importCsvInput"),
  searchInput: document.querySelector("#searchInput"),
  categoryFilter: document.querySelector("#categoryFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  leadTableBody: document.querySelector("#leadTableBody"),
  pipelineList: document.querySelector("#pipelineList"),
  attentionList: document.querySelector("#attentionList"),
  form: document.querySelector("#leadForm"),
  saveLeadBtn: document.querySelector("#saveLeadBtn"),
  resetFormBtn: document.querySelector("#resetFormBtn"),
  lostReasonWrap: document.querySelector("#lostReasonWrap"),
  paymentStatusWrap: document.querySelector("#paymentStatusWrap"),
  paymentAmountWrap: document.querySelector("#paymentAmountWrap"),
  syncStatus: document.querySelector("#syncStatus"),
  inviteForm: document.querySelector("#inviteForm"),
  inviteEmail: document.querySelector("#inviteEmail"),
  inviteRole: document.querySelector("#inviteRole"),
  inviteResult: document.querySelector("#inviteResult"),
  inviteCodeResult: document.querySelector("#inviteCodeResult"),
  copyInviteBtn: document.querySelector("#copyInviteBtn"),
  memberList: document.querySelector("#memberList"),
  memberCount: document.querySelector("#memberCount"),
  toast: document.querySelector("#toast"),
  metrics: {
    total: document.querySelector("#metricTotal"),
    visitPending: document.querySelector("#metricVisitPending"),
    quoteSubmitted: document.querySelector("#metricQuoteSubmitted"),
    completed: document.querySelector("#metricCompleted")
  },
  fields: {
    leadId: document.querySelector("#leadId"),
    customerName: document.querySelector("#customerName"),
    phone: document.querySelector("#phone"),
    category: document.querySelector("#category"),
    leadDate: document.querySelector("#leadDate"),
    address: document.querySelector("#address"),
    requirement: document.querySelector("#requirement"),
    visitStatus: document.querySelector("#visitStatus"),
    visitDateTime: document.querySelector("#visitDateTime"),
    quotationStatus: document.querySelector("#quotationStatus"),
    quotationAmount: document.querySelector("#quotationAmount"),
    followUpStage: document.querySelector("#followUpStage"),
    nextFollowUpDate: document.querySelector("#nextFollowUpDate"),
    closureStatus: document.querySelector("#closureStatus"),
    lostReason: document.querySelector("#lostReason"),
    paymentStatus: document.querySelector("#paymentStatus"),
    paymentReceived: document.querySelector("#paymentReceived"),
    notes: document.querySelector("#notes")
  }
};

initialize();

function initialize() {
  fillSelect(el.fields.category, OPTIONS.categories);
  fillSelect(el.categoryFilter, OPTIONS.categories, true);
  fillSelect(el.fields.visitStatus, OPTIONS.visitStatuses);
  fillSelect(el.fields.quotationStatus, OPTIONS.quotationStatuses);
  fillSelect(el.fields.followUpStage, OPTIONS.followUpStages);
  fillSelect(el.fields.closureStatus, OPTIONS.closureStatuses);
  fillSelect(el.fields.lostReason, OPTIONS.lostReasons);
  fillSelect(el.fields.paymentStatus, OPTIONS.paymentStatuses);
  resetForm();
  bindEvents();

  const isDemo = service.mode === "demo";
  el.previewBanner.classList.toggle("hidden", !isDemo);
  el.previewLoginBtn.classList.toggle("hidden", !isDemo);
  if (isDemo) {
    el.signInEmail.value = "owner@demo.local";
    el.signInPassword.value = "demo1234";
  }
  service.start(handleAuthState);
}

function bindEvents() {
  el.showSignUpBtn.addEventListener("click", () => showAuthPanel("signup"));
  el.showSignInBtn.addEventListener("click", () => showAuthPanel("signin"));
  el.previewLoginBtn.addEventListener("click", () => runAction(el.previewLoginBtn, () => service.signInDemo()));
  el.signInForm.addEventListener("submit", signIn);
  el.signUpForm.addEventListener("submit", signUp);
  el.forgotPasswordBtn.addEventListener("click", resetPassword);
  el.signOutBtn.addEventListener("click", () => service.signOut());
  el.invitationCode.addEventListener("input", updateSignUpMode);

  el.navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
  el.quickAddBtn.addEventListener("click", () => {
    resetForm();
    setView("form");
  });
  el.searchInput.addEventListener("input", renderLeads);
  el.categoryFilter.addEventListener("change", renderLeads);
  el.statusFilter.addEventListener("change", renderLeads);
  el.fields.closureStatus.addEventListener("change", updateConditionalFields);
  el.form.addEventListener("submit", saveLead);
  el.resetFormBtn.addEventListener("click", resetForm);
  el.exportCsvBtn.addEventListener("click", exportCsv);
  el.importCsvInput.addEventListener("change", importCsv);
  el.inviteForm.addEventListener("submit", createInvitation);
  el.copyInviteBtn.addEventListener("click", copyInviteCode);
}

async function handleAuthState(nextSession, error) {
  el.loadingScreen.classList.add("hidden");
  if (error) showToast(readableError(error), true);

  if (!nextSession) {
    session = null;
    leads = [];
    members = [];
    el.appShell.classList.add("hidden");
    el.authShell.classList.remove("hidden");
    showAuthPanel("signin");
    return;
  }

  session = nextSession;
  el.authShell.classList.add("hidden");
  el.appShell.classList.remove("hidden");
  configureWorkspace();
  await refreshWorkspace();
}

async function signIn(event) {
  event.preventDefault();
  const email = el.signInEmail.value.trim();
  const password = el.signInPassword.value;
  await runAction(event.submitter, async () => {
    if (service.mode === "demo") {
      await service.signInDemo();
      return;
    }
    await service.signIn(email, password);
  });
}

async function signUp(event) {
  event.preventDefault();
  const invitationCode = el.invitationCode.value.trim();
  const payload = {
    name: el.signUpName.value.trim(),
    email: el.signUpEmail.value.trim(),
    password: el.signUpPassword.value,
    invitationCode,
    businessName: el.businessName.value.trim()
  };

  if (!invitationCode && !payload.businessName) {
    showToast("Enter the business name to create an owner account.", true);
    return;
  }

  await runAction(event.submitter, async () => {
    if (invitationCode) await service.signUpWithInvite(payload);
    else await service.signUpOwner(payload);
  });
}

async function resetPassword() {
  const email = el.signInEmail.value.trim();
  if (!email) {
    showToast("Enter your email address first.", true);
    el.signInEmail.focus();
    return;
  }
  await runAction(el.forgotPasswordBtn, async () => {
    await service.resetPassword(email);
    showToast(service.mode === "demo" ? "Password reset is available after Firebase setup." : "Password reset email sent.");
  });
}

function showAuthPanel(panel) {
  el.signInPanel.classList.toggle("hidden", panel !== "signin");
  el.signUpPanel.classList.toggle("hidden", panel !== "signup");
}

function updateSignUpMode() {
  const joining = Boolean(el.invitationCode.value.trim());
  el.businessNameWrap.classList.toggle("hidden", joining);
  el.businessName.required = !joining;
}

function configureWorkspace() {
  const isOwner = session.profile.role === "owner";
  el.sidebarBusinessName.textContent = session.business.name;
  el.businessEyebrow.textContent = `${session.business.name} workspace`;
  el.accountName.textContent = session.profile.name || session.user.displayName || "Team member";
  el.accountRole.textContent = session.profile.role;
  el.ownerOnly.forEach((node) => node.classList.toggle("hidden", !isOwner));
  if (!isOwner && activeView === "team") setView("dashboard");
}

async function refreshWorkspace() {
  setSyncStatus("Syncing...");
  try {
    leads = await service.getLeads();
    members = session.profile.role === "owner" ? await service.getMembers() : [];
    render();
    setSyncStatus(service.mode === "demo" ? "Preview data" : "Up to date");
  } catch (error) {
    setSyncStatus("Sync failed");
    showToast(readableError(error), true);
  }
}

function fillSelect(select, values, preserveExisting = false) {
  if (!preserveExisting) select.innerHTML = "";
  values.forEach((item) => select.add(new Option(item, item)));
}

function setView(view) {
  if (view === "team" && session?.profile.role !== "owner") return;
  activeView = view;
  Object.entries(el.views).forEach(([name, node]) => node.classList.toggle("is-visible", name === view));
  el.navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === view));
  const titles = { dashboard: "Dashboard", leads: "All Leads", form: "Lead Details", team: "Team" };
  el.pageTitle.textContent = titles[view];
}

async function saveLead(event) {
  event.preventDefault();
  const now = new Date().toISOString();
  const id = el.fields.leadId.value || crypto.randomUUID();
  const existing = leads.find((lead) => lead.id === id);
  const data = {
    id,
    customerName: fieldValue("customerName"),
    phone: fieldValue("phone"),
    category: fieldValue("category"),
    leadDate: fieldValue("leadDate"),
    address: fieldValue("address"),
    requirement: fieldValue("requirement"),
    visitStatus: fieldValue("visitStatus"),
    visitDateTime: fieldValue("visitDateTime"),
    quotationStatus: fieldValue("quotationStatus"),
    quotationAmount: fieldValue("quotationAmount"),
    followUpStage: fieldValue("followUpStage"),
    nextFollowUpDate: fieldValue("nextFollowUpDate"),
    closureStatus: fieldValue("closureStatus"),
    lostReason: fieldValue("closureStatus") === "Closed / Lost" ? fieldValue("lostReason") : "",
    paymentStatus: fieldValue("closureStatus") === "Work Completed" ? fieldValue("paymentStatus") : "Not Applicable",
    paymentReceived: fieldValue("closureStatus") === "Work Completed" ? fieldValue("paymentReceived") : "",
    notes: fieldValue("notes"),
    source: existing?.source || "manual",
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    createdBy: existing?.createdBy || session.user.uid,
    updatedBy: session.user.uid
  };

  await runAction(el.saveLeadBtn, async () => {
    setSyncStatus("Saving...");
    await service.saveLead(data);
    leads = existing ? leads.map((lead) => (lead.id === id ? data : lead)) : [data, ...leads];
    resetForm();
    setView("leads");
    render();
    setSyncStatus(service.mode === "demo" ? "Preview data" : "Up to date");
    showToast(existing ? "Lead updated." : "Lead added.");
  });
}

function fieldValue(field) {
  return el.fields[field].value.trim();
}

function editLead(id) {
  const lead = leads.find((item) => item.id === id);
  if (!lead) return;
  Object.keys(el.fields).forEach((key) => {
    if (key in lead) el.fields[key].value = lead[key] || "";
  });
  updateConditionalFields();
  setView("form");
}

async function deleteLead(id) {
  if (session.profile.role !== "owner") return;
  const lead = leads.find((item) => item.id === id);
  if (!lead || !confirm(`Delete lead for ${lead.customerName}?`)) return;
  try {
    setSyncStatus("Deleting...");
    await service.deleteLead(id);
    leads = leads.filter((item) => item.id !== id);
    render();
    setSyncStatus(service.mode === "demo" ? "Preview data" : "Up to date");
    showToast("Lead deleted.");
  } catch (error) {
    showToast(readableError(error), true);
  }
}

window.editLead = editLead;
window.deleteLead = deleteLead;

function resetForm() {
  el.form.reset();
  el.fields.leadId.value = "";
  el.fields.leadDate.value = today();
  el.fields.visitStatus.value = "Not Scheduled";
  el.fields.quotationStatus.value = "Quote Required";
  el.fields.followUpStage.value = "New Enquiry";
  el.fields.closureStatus.value = "Open";
  el.fields.paymentStatus.value = "Not Applicable";
  updateConditionalFields();
}

function updateConditionalFields() {
  const status = el.fields.closureStatus.value;
  el.lostReasonWrap.classList.toggle("hidden", status !== "Closed / Lost");
  el.paymentStatusWrap.classList.toggle("hidden", status !== "Work Completed");
  el.paymentAmountWrap.classList.toggle("hidden", status !== "Work Completed");
}

function render() {
  renderDashboard();
  renderLeads();
  renderMembers();
  updateConditionalFields();
}

function renderDashboard() {
  el.metrics.total.textContent = leads.length;
  el.metrics.visitPending.textContent = leads.filter((lead) =>
    lead.visitStatus === "Not Scheduled" || lead.visitStatus === "Site Inspection Scheduled"
  ).length;
  el.metrics.quoteSubmitted.textContent = leads.filter((lead) => ["Quote Sent", "Quote Approved", "Revision Requested"].includes(lead.quotationStatus)).length;
  el.metrics.completed.textContent = leads.filter((lead) => lead.closureStatus === "Work Completed").length;

  el.pipelineList.innerHTML = OPTIONS.categories.map((category) => {
    const count = leads.filter((lead) => lead.category === category).length;
    return `
      <div class="pipeline-row">
        <div><strong>${escapeHtml(category)}</strong><span>${count} active or historical lead${count === 1 ? "" : "s"}</span></div>
        <span class="badge">${count}</span>
      </div>
    `;
  }).join("");

  const attention = leads
    .filter((lead) => lead.closureStatus === "Open")
    .sort((a, b) => (a.nextFollowUpDate || "9999").localeCompare(b.nextFollowUpDate || "9999"))
    .slice(0, 6);

  el.attentionList.innerHTML = attention.length
    ? attention.map((lead) => `
      <div class="attention-row">
        <div><strong>${escapeHtml(lead.customerName)}</strong><span>${escapeHtml(lead.followUpStage)} · ${escapeHtml(lead.nextFollowUpDate || "No date set")}</span></div>
        <span class="badge ${isOverdue(lead.nextFollowUpDate) ? "danger" : "warn"}">${isOverdue(lead.nextFollowUpDate) ? "Overdue" : "Follow"}</span>
      </div>
    `).join("")
    : `<div class="empty-state">No open leads need follow-up right now.</div>`;
}

function renderLeads() {
  const search = el.searchInput.value.trim().toLowerCase();
  const category = el.categoryFilter.value;
  const status = el.statusFilter.value;
  const filtered = leads.filter((lead) => {
    const searchable = [
      lead.customerName, lead.phone, lead.category, lead.address, lead.requirement, lead.notes
    ].join(" ").toLowerCase();
    return (!search || searchable.includes(search))
      && (!category || lead.category === category)
      && (!status || lead.closureStatus === status);
  });

  if (!filtered.length) {
    el.leadTableBody.innerHTML = document.querySelector("#emptyStateTemplate").innerHTML;
    return;
  }

  const canDelete = session?.profile.role === "owner";
  el.leadTableBody.innerHTML = filtered.map((lead) => `
    <tr>
      <td>
        <span class="lead-title">${escapeHtml(lead.customerName)}</span>
        <span class="lead-subtext">${escapeHtml(lead.phone)} · ${escapeHtml(lead.address || "No address")}</span>
      </td>
      <td><span class="badge">${escapeHtml(lead.category)}</span></td>
      <td>${escapeHtml(lead.visitStatus)}<span class="lead-subtext">${formatDateTime(lead.visitDateTime)}</span></td>
      <td>${escapeHtml(lead.quotationStatus)}<span class="lead-subtext">${formatMoney(lead.quotationAmount)}</span></td>
      <td>${escapeHtml(lead.followUpStage)}<span class="lead-subtext">${escapeHtml(lead.nextFollowUpDate || "No date")}</span></td>
      <td>${closureBadge(lead)}</td>
      <td>${paymentBadge(lead)}</td>
      <td>
        <div class="table-actions">
          <button class="icon-action" type="button" title="Edit lead" onclick="editLead('${lead.id}')">Edit</button>
          ${canDelete ? `<button class="icon-action delete" type="button" title="Delete lead" onclick="deleteLead('${lead.id}')">Del</button>` : ""}
        </div>
      </td>
    </tr>
  `).join("");
}

function renderMembers() {
  if (session?.profile.role !== "owner") return;
  el.memberCount.textContent = members.length;
  el.memberList.innerHTML = members.length
    ? members.map((member) => `
      <div class="member-row">
        <div>
          <strong>${escapeHtml(member.name || "Team member")}</strong>
          <span>${escapeHtml(member.email || "")}</span>
        </div>
        <span class="badge ${member.active === false ? "warn" : ""}">${member.active === false ? "Invited" : escapeHtml(member.role)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">No team members yet.</div>`;
}

async function createInvitation(event) {
  event.preventDefault();
  await runAction(event.submitter, async () => {
    const email = el.inviteEmail.value.trim();
    const code = await service.createInvite(email, el.inviteRole.value);
    el.inviteCodeResult.textContent = code;
    el.inviteResult.classList.remove("hidden");
    members = await service.getMembers();
    renderMembers();
    el.inviteForm.reset();
    showToast(`Invitation created for ${email}.`);
  });
}

async function copyInviteCode() {
  const code = el.inviteCodeResult.textContent;
  try {
    await navigator.clipboard.writeText(code);
    showToast("Invitation code copied.");
  } catch {
    showToast(`Invitation code: ${code}`);
  }
}

function closureBadge(lead) {
  if (lead.closureStatus === "Work Completed") return `<span class="badge success">Work Completed</span>`;
  if (lead.closureStatus === "Closed / Lost") {
    return `<span class="badge danger">Lost</span><span class="lead-subtext">${escapeHtml(lead.lostReason || "No reason")}</span>`;
  }
  return `<span class="badge warn">Open</span>`;
}

function paymentBadge(lead) {
  if (lead.closureStatus !== "Work Completed") return `<span class="lead-subtext">Not applicable</span>`;
  const className = lead.paymentStatus === "Paid" ? "success" : lead.paymentStatus === "Overdue" ? "danger" : "warn";
  return `<span class="badge ${className}">${escapeHtml(lead.paymentStatus)}</span><span class="lead-subtext">${formatMoney(lead.paymentReceived)}</span>`;
}

function exportCsv() {
  const headers = [
    "Customer Name", "Phone", "Category", "Lead Date", "Address", "Requirement", "Visit Status",
    "Visit Date Time", "Quotation Status", "Quotation Amount", "Follow-Up Stage", "Next Follow-Up Date",
    "Closure Status", "Lost Reason", "Payment Status", "Payment Received", "Notes"
  ];
  const rows = leads.map((lead) => [
    lead.customerName, lead.phone, lead.category, lead.leadDate, lead.address, lead.requirement, lead.visitStatus,
    lead.visitDateTime, lead.quotationStatus, lead.quotationAmount, lead.followUpStage, lead.nextFollowUpDate,
    lead.closureStatus, lead.lostReason, lead.paymentStatus, lead.paymentReceived, lead.notes
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `leadworks-${today()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function importCsv(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const rows = parseCsv(String(reader.result));
      const imported = rows.slice(1)
        .filter((row) => row.some(Boolean))
        .map((row) => csvRowToLead(row));
      setSyncStatus("Importing...");
      await service.importLeads(imported);
      leads = [...imported, ...leads];
      render();
      setView("leads");
      setSyncStatus(service.mode === "demo" ? "Preview data" : "Up to date");
      showToast(`${imported.length} leads imported.`);
    } catch (error) {
      showToast(readableError(error), true);
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function csvRowToLead(row) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    customerName: row[0] || "",
    phone: row[1] || "",
    category: row[2] || "Retail",
    leadDate: row[3] || today(),
    address: row[4] || "",
    requirement: row[5] || "",
    visitStatus: row[6] || "Not Scheduled",
    visitDateTime: row[7] || "",
    quotationStatus: row[8] || "Quotation Required",
    quotationAmount: row[9] || "",
    followUpStage: row[10] || "New Enquiry",
    nextFollowUpDate: row[11] || "",
    closureStatus: row[12] || "Open",
    lostReason: row[13] || "",
    paymentStatus: row[14] || "Not Applicable",
    paymentReceived: row[15] || "",
    notes: row[16] || "",
    createdAt: now,
    updatedAt: now,
    createdBy: session.user.uid,
    updatedBy: session.user.uid
  };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

async function runAction(button, action) {
  const original = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = "Please wait...";
  }
  try {
    return await action();
  } catch (error) {
    showToast(readableError(error), true);
    return null;
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = original;
    }
  }
}

function readableError(error) {
  const messages = {
    "auth/email-already-in-use": "An account already exists for this email.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/weak-password": "Password must contain at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "permission-denied": "You do not have permission to perform this action."
  };
  return messages[error?.code] || error?.message || "Something went wrong. Please try again.";
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  el.toast.textContent = message;
  el.toast.classList.toggle("error", isError);
  el.toast.classList.remove("hidden");
  toastTimer = setTimeout(() => el.toast.classList.add("hidden"), 4200);
}

function setSyncStatus(text) {
  el.syncStatus.textContent = text;
}

function csvCell(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function isOverdue(dateValue) {
  return Boolean(dateValue && dateValue < today());
}

function formatDateTime(value) {
  return value ? escapeHtml(value.replace("T", " ")) : "";
}

function formatMoney(value) {
  return value ? `Rs. ${Number(value).toLocaleString("en-IN")}` : "";
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
