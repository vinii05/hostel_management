const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ubasshinysha3*', // change if needed
    database: 'hostelmanagement'
});

// ✅ Test DB Connection
db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// ✅ ROUTES

// ---------------- Students ----------------
app.post('/students', (req, res) => {
    const { name, email, phone, gender, course } = req.body;
    db.query(
        'INSERT INTO students (name, email, phone, gender, course) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, gender, course],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Student added!', student_id: result.insertId });
        }
    );
});

app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// ---------------- Rooms ----------------
app.get('/rooms', (req, res) => {
    db.query('SELECT * FROM rooms', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.post('/rooms', (req, res) => {
    const { room_number, capacity } = req.body;
    db.query(
        'INSERT INTO rooms (room_number, capacity) VALUES (?, ?)',
        [room_number, capacity],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Room added!', room_id: result.insertId });
        }
    );
});

app.delete('/rooms/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM rooms WHERE room_id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Room deleted!' });
    });
});

// ---------------- Room Allocation ----------------
app.post('/allocate-room', (req, res) => {
    const { student_id, room_id, allocation_date } = req.body;
    db.query(
        'INSERT INTO allocations (student_id, room_id, allocation_date) VALUES (?, ?, ?)',
        [student_id, room_id, allocation_date],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Room allocated!', allocation_id: result.insertId });
        }
    );
});

// ---------------- Fees ----------------
app.post('/fees', (req, res) => {
    const { student_id, amount, status, due_date } = req.body;
    db.query(
        'INSERT INTO fees (student_id, amount, status, due_date) VALUES (?, ?, ?, ?)',
        [student_id, amount, status, due_date],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Fee recorded!', fee_id: result.insertId });
        }
    );
});

app.get('/fees/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    db.query('SELECT * FROM fees WHERE student_id = ?', [studentId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// ✅ Start Server
app.listen(3001, () => {
    console.log('🚀 Server running on http://localhost:3001');
});
