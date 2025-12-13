import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pg from 'pg';

dotenv.config();

console.log('DB config:', process.env.DB_HOST, process.env.DB_PORT);

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function initDb() {
  // Tables are already created manually; keep function for compatibility
  return;
}

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// simple JWT-like placeholder; replace with your real token logic if needed
import crypto from 'crypto';

function issueToken(email) {
  return crypto.createHash('sha256').update(email + process.env.JWT_SECRET).digest('hex');
}

async function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ detail: 'Missing token' });

  // In a real app you'd decode and verify; here we just accept any token that matches a user
  try {
    const { rows } = await pool.query('SELECT email FROM users');
    const emails = rows.map((r) => r.email);
    for (const email of emails) {
      if (issueToken(email) === token) {
        req.user = { email };
        return next();
      }
    }
    return res.status(401).json({ detail: 'Invalid token' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ detail: 'Auth error' });
  }
}

app.post('/auth/register', async (req, res) => {
  const { username, email, password, name, phone, address, business_name, gstin } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({ detail: 'All fields required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ detail: 'Password must be at least 6 characters' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (username, email, password_hash, name, phone, address, business_name, gstin)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [username, email, hash, name || null, phone || null, address || null, business_name || null, gstin || null]
    );
    return res.json({ message: 'User registered successfully', email });
  } catch (e) {
    if (e.code === '23505') {
      return res.status(400).json({ detail: 'User already exists' });
    }
    console.error(e);
    return res.status(500).json({ detail: 'Registration failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ detail: 'Email and password required' });
  }
  try {
    const { rows } = await pool.query('SELECT password_hash FROM users WHERE email = $1', [email]);
    if (!rows.length) {
      return res.status(404).json({ detail: 'Account not registered' });
    }
    const ok = await bcrypt.compare(password, rows[0].password_hash || '');
    if (!ok) {
      return res.status(401).json({ detail: 'Invalid credentials' });
    }
    const token = issueToken(email);
    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ detail: 'Login failed' });
  }
});

app.get('/me', verifyToken, (req, res) => {
  return res.json({ email: req.user.email });
});

app.post('/auth/refresh', verifyToken, (req, res) => {
  const token = issueToken(req.user.email);
  return res.json({ token });
});

app.get('/profile', verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT email, username, created_at, name, phone, address, business_name, gstin FROM users WHERE email = $1',
      [req.user.email]
    );
    if (!rows.length) {
      return res.json({ email: req.user.email });
    }
    return res.json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ detail: 'Failed to load profile' });
  }
});

app.get('/api/dashboardVisual', verifyToken, async (req, res) => {
  try {
    const query = `
      SELECT
        status,
        score,
        amount,
        vendor_name,
        created_at
      FROM invoices
      ORDER BY created_at DESC
      LIMIT 10
    `;

    const { rows } = await pool.query(query);

    res.json({
      rows,
      violations: []
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    res.status(500).json({
      rows: [],
      violations: []
    });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});