const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Hardcoded credentials (Bad practice, triggers SonarQube warning)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'testdb'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(express.json());

// SQL Injection vulnerability (Unsafe user input handling)
app.get('/user', (req, res) => {
    const userId = req.query.id; // Directly using user input
    const query = `SELECT * FROM users WHERE id = '${userId}'`; // Vulnerable to SQL Injection
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Insecure HTTP request (Triggers SonarQube warning)
const http = require('http');
http.get('http://example.com', (resp) => {
    let data = '';
    resp.on('data', chunk => data += chunk);
    resp.on('end', () => console.log(data));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
