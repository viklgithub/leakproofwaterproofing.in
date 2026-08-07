(function () {
  "use strict";

  const DEMO_LEADS_KEY = "leadworks.demo.leads.v2";
  const DEMO_MEMBERS_KEY = "leadworks.demo.members.v1";
  const WEBSITE_LEADS_KEY = "leakproof.website.leads";

  class DemoService {
    constructor() {
      this.mode = "demo";
      this.session = null;
      this.authListener = null;
    }

    start(listener) {
      this.authListener = listener;
      listener(null);
    }

    async signInDemo() {
      const user = {
        uid: "demo-owner",
        email: "owner@demo.local",
        displayName: "Demo Owner"
      };
      const profile = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: "owner",
        businessId: "demo-business",
        active: true
      };
      const business = {
        id: "demo-business",
        name: "Reliable Waterproofing"
      };
      this.session = { user, profile, business };
      this.ensureDemoData();
      this.authListener(this.session);
      return this.session;
    }

    async signIn() {
      return this.signInDemo();
    }

    async signUpWithInvite({ name, email }) {
      await this.signInDemo();
      this.session.user.email = email;
      this.session.user.displayName = name;
      this.session.profile.email = email;
      this.session.profile.name = name;
      this.session.profile.role = "staff";
      this.authListener(this.session);
      return this.session;
    }

    async resetPassword() {
      return true;
    }

    async signOut() {
      this.session = null;
      this.authListener(null);
    }

    async getLeads() {
      const demoLeads = JSON.parse(localStorage.getItem(DEMO_LEADS_KEY) || "[]");
      const websiteLeads = JSON.parse(localStorage.getItem(WEBSITE_LEADS_KEY) || "[]");
      const remoteLeads = await this.fetchRemoteLeads();
      const merged = [...demoLeads, ...websiteLeads, ...remoteLeads]
        .filter((lead, index, items) => items.findIndex((item) => item.id === lead.id) === index)
        .sort((a, b) => (b.updatedAt || b.createdAt || "").localeCompare(a.updatedAt || a.createdAt || ""));
      return merged.map((lead) => ({ ...lead, source: lead.source || "manual" }));
    }

    async fetchRemoteLeads() {
      try {
        const response = await fetch("http://127.0.0.1:8766/api/leads", { cache: "no-store" });
        if (!response.ok) return [];
        const payload = await response.json();
        return Array.isArray(payload) ? payload : [];
      } catch {
        return [];
      }
    }

    async saveLead(lead) {
      const leads = await this.getLeads();
      const index = leads.findIndex((item) => item.id === lead.id);
      if (index >= 0) leads[index] = lead;
      else leads.unshift(lead);
      localStorage.setItem(DEMO_LEADS_KEY, JSON.stringify(leads));
      return lead;
    }

    async deleteLead(id) {
      const leads = (await this.getLeads()).filter((lead) => lead.id !== id);
      localStorage.setItem(DEMO_LEADS_KEY, JSON.stringify(leads));
    }

    async importLeads(imported) {
      const leads = await this.getLeads();
      localStorage.setItem(DEMO_LEADS_KEY, JSON.stringify([...imported, ...leads]));
    }

    async getMembers() {
      return JSON.parse(localStorage.getItem(DEMO_MEMBERS_KEY) || "[]");
    }

    async createInvite(email, role) {
      const code = makeInviteCode();
      const members = await this.getMembers();
      members.push({
        uid: `pending-${code}`,
        name: "Invitation pending",
        email,
        role,
        active: false
      });
      localStorage.setItem(DEMO_MEMBERS_KEY, JSON.stringify(members));
      return code;
    }

    ensureDemoData() {
      if (!localStorage.getItem(DEMO_LEADS_KEY)) {
        const now = new Date().toISOString();
        localStorage.setItem(DEMO_LEADS_KEY, JSON.stringify([
          {
            id: crypto.randomUUID(),
            customerName: "Aarav Heights Society",
            phone: "+91 98765 43210",
            category: "Project",
            leadDate: isoToday(),
            address: "Baner, Pune",
            requirement: "Terrace waterproofing and leakage inspection",
            visitStatus: "Site Inspection Scheduled",
            visitDateTime: "",
            quotationStatus: "Quotation Under Preparation",
            quotationAmount: "85000",
            followUpStage: "Follow-Up 1",
            nextFollowUpDate: isoToday(),
            closureStatus: "Open",
            lostReason: "",
            paymentStatus: "Not Applicable",
            paymentReceived: "",
            notes: "Secretary requested item-wise estimate.",
            createdAt: now,
            updatedAt: now,
            createdBy: "demo-owner",
            updatedBy: "demo-owner"
          },
          {
            id: crypto.randomUUID(),
            customerName: "Neha Enterprises",
            phone: "+91 91234 56789",
            category: "Thermography",
            leadDate: isoToday(),
            address: "Kothrud, Pune",
            requirement: "Thermal inspection before repair work",
            visitStatus: "Visit Completed",
            visitDateTime: "",
            quotationStatus: "Quote Sent",
            quotationAmount: "12000",
            followUpStage: "Follow-Up 2",
            nextFollowUpDate: isoToday(),
            closureStatus: "Open",
            lostReason: "",
            paymentStatus: "Not Applicable",
            paymentReceived: "",
            notes: "Client comparing inspection package options.",
            createdAt: now,
            updatedAt: now,
            createdBy: "demo-owner",
            updatedBy: "demo-owner"
          }
        ]));
      }

      if (!localStorage.getItem(DEMO_MEMBERS_KEY)) {
        localStorage.setItem(DEMO_MEMBERS_KEY, JSON.stringify([
          {
            uid: "demo-owner",
            name: "Demo Owner",
            email: "owner@demo.local",
            role: "owner",
            active: true
          },
          {
            uid: "demo-staff",
            name: "Priya Sales",
            email: "priya@demo.local",
            role: "staff",
            active: true
          }
        ]));
      }
    }
  }

  class FirebaseService {
    constructor(config) {
      this.mode = "firebase";
      this.config = config;
      this.authListener = null;
      this.session = null;
      this.provisioning = false;
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
    }

    start(listener) {
      this.authListener = listener;
      this.auth.onAuthStateChanged(async (user) => {
        if (this.provisioning) return;
        if (!user) {
          this.session = null;
          listener(null);
          return;
        }

        try {
          const session = await this.buildSession(user);
          if (!session) {
            await this.auth.signOut();
            throw new Error("This account is not connected to a business.");
          }
          this.session = session;
          listener(session);
        } catch (error) {
          console.error(error);
          listener(null, error);
        }
      });
    }

    async buildSession(user) {
      const profileDoc = await this.db.collection("users").doc(user.uid).get();
      if (!profileDoc.exists || profileDoc.data().active === false) return null;
      const profile = { uid: profileDoc.id, ...profileDoc.data() };
      const businessDoc = await this.db.collection("businesses").doc(profile.businessId).get();
      if (!businessDoc.exists) return null;
      return {
        user,
        profile,
        business: { id: businessDoc.id, ...businessDoc.data() }
      };
    }

    async signIn(email, password) {
      const credential = await this.auth.signInWithEmailAndPassword(email, password);
      return this.buildSession(credential.user);
    }

    async signUpWithInvite({ name, email, password, invitationCode }) {
      this.provisioning = true;
      let credential;
      try {
        credential = await this.auth.createUserWithEmailAndPassword(email, password);
        await credential.user.updateProfile({ displayName: name });
        const code = invitationCode.trim().toUpperCase();
        const inviteRef = this.db.collection("invitations").doc(code);
        const inviteDoc = await inviteRef.get();
        if (!inviteDoc.exists || inviteDoc.data().active !== true) {
          throw new Error("Invitation code is invalid or already used.");
        }
        const invite = inviteDoc.data();
        if (invite.email.toLowerCase() !== email.toLowerCase()) {
          throw new Error("Use the same email address that was invited.");
        }

        const userRef = this.db.collection("users").doc(credential.user.uid);
        const batch = this.db.batch();
        batch.set(userRef, {
          name,
          email: email.toLowerCase(),
          role: invite.role,
          businessId: invite.businessId,
          active: true,
          invitationCode: code,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        batch.update(inviteRef, {
          active: false,
          claimedBy: credential.user.uid,
          claimedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        await batch.commit();
        this.session = await this.buildSession(credential.user);
        this.authListener(this.session);
        return this.session;
      } catch (error) {
        if (credential?.user) await credential.user.delete().catch(() => {});
        throw error;
      } finally {
        this.provisioning = false;
      }
    }

    async resetPassword(email) {
      return this.auth.sendPasswordResetEmail(email);
    }

    async signOut() {
      await this.auth.signOut();
    }

    leadsCollection() {
      return this.db
        .collection("businesses")
        .doc(this.session.business.id)
        .collection("leads");
    }

    async getLeads() {
      const snapshot = await this.leadsCollection().orderBy("updatedAt", "desc").get();
      return snapshot.docs.map((doc) => normalizeFirestoreDoc(doc));
    }

    async saveLead(lead) {
      const ref = this.leadsCollection().doc(lead.id);
      const payload = {
        ...lead,
        businessId: this.session.business.id,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: this.session.user.uid
      };
      if (!lead.createdAt) {
        payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        payload.createdBy = this.session.user.uid;
      }
      await ref.set(payload, { merge: true });
      return lead;
    }

    async deleteLead(id) {
      return this.leadsCollection().doc(id).delete();
    }

    async importLeads(leads) {
      const chunks = [];
      for (let i = 0; i < leads.length; i += 400) chunks.push(leads.slice(i, i + 400));
      for (const chunk of chunks) {
        const batch = this.db.batch();
        chunk.forEach((lead) => {
          const ref = this.leadsCollection().doc(lead.id);
          batch.set(ref, {
            ...lead,
            businessId: this.session.business.id,
            createdBy: this.session.user.uid,
            updatedBy: this.session.user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
        await batch.commit();
      }
    }

    async getMembers() {
      const snapshot = await this.db
        .collection("users")
        .where("businessId", "==", this.session.business.id)
        .get();
      return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    }

    async createInvite(email, role) {
      const code = makeInviteCode();
      await this.db.collection("invitations").doc(code).set({
        code,
        email: email.trim().toLowerCase(),
        role,
        businessId: this.session.business.id,
        active: true,
        createdBy: this.session.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return code;
    }
  }

  function normalizeFirestoreDoc(doc) {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: toIso(data.createdAt),
      updatedAt: toIso(data.updatedAt)
    };
  }

  function toIso(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.toDate ? value.toDate().toISOString() : "";
  }

  function makeInviteCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const values = crypto.getRandomValues(new Uint8Array(6));
    return Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
  }

  function isoToday() {
    return new Date().toISOString().slice(0, 10);
  }

  function createService() {
    const config = window.LEADWORKS_CONFIG || {};
    const firebaseConfig = config.firebase || {};
    const configured = config.mode === "firebase"
      && firebaseConfig.apiKey
      && firebaseConfig.projectId
      && window.firebase;
    return configured ? new FirebaseService(firebaseConfig) : new DemoService();
  }

  window.LeadWorksService = { create: createService };
}());
