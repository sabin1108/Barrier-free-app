require('dotenv').config({ path: '.env.local' });
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PUBLIC_PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_NEON_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
            [name, email, password]
        );
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '회원가입 실패' });
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );
        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
})

app.listen(port, () => {
    console.log(`서버 실행 중입니다`);
});