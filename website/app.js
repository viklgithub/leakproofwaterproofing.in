const form = document.querySelector('#leadForm');
const message = document.querySelector('#formMessage');
const storageKey = 'leakproof.website.leads';

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  const now = new Date().toISOString();
  const payload = {
    id: crypto.randomUUID(),
    customerName: data.name,
    phone: data.phone,
    category: data.projectType || 'Residential',
    leadDate: now.slice(0, 10),
    address: '',
    requirement: data.requirement,
    visitStatus: 'Not Scheduled',
    quotationStatus: 'Quote Required',
    followUpStage: 'New Enquiry',
    closureStatus: 'Open',
    lostReason: '',
    paymentStatus: 'Not Applicable',
    paymentReceived: '',
    notes: `Website enquiry via ${data.email || 'email not provided'}.`,
    source: 'website',
    createdAt: now,
    updatedAt: now
  };

  const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
  existing.unshift(payload);
  localStorage.setItem(storageKey, JSON.stringify(existing));

  message.textContent = 'Thanks! Your enquiry has been saved and will appear in the CRM dashboard.';
  message.classList.add('is-visible');
  form.reset();
});
