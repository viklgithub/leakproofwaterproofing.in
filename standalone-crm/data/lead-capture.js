const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 8766);

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const leadsFile = path.join(root, 'leads.json');

function getLeads() {
  return readJson(leadsFile);
}

function addLead(lead) {
  const leads = getLeads();
  const nextLead = {
    id: lead.id || `site-${Date.now()}`,
    customerName: lead.customerName || 'Unknown',
    phone: lead.phone || '',
    category: lead.category || 'Residential',
    leadDate: lead.leadDate || new Date().toISOString().slice(0, 10),
    address: lead.address || '',
    requirement: lead.requirement || '',
    visitStatus: 'Not Scheduled',
    visitDateTime: '',
    quotationStatus: 'Quote Required',
    quotationAmount: '',
    followUpStage: 'New Enquiry',
    nextFollowUpDate: '',
    closureStatus: 'Open',
    lostReason: '',
    paymentStatus: 'Not Applicable',
    paymentReceived: '',
    notes: lead.notes || 'Website enquiry',
    source: 'website',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'website',
    updatedBy: 'website'
  };
  leads.unshift(nextLead);
  writeJson(leadsFile, leads);
  return nextLead;
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/leads') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const lead = addLead(payload);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: true, lead }));
      } catch (error) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ ok: false, error: 'Invalid payload' }));
      }
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/leads') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(getLeads()));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'Not found' }));
}).listen(port, '127.0.0.1', () => {
  console.log(`Lead capture API: http://127.0.0.1:${port}`);
});
