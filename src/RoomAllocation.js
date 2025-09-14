import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomAllocation = () => {
    const [students, setStudents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({
        student_id: '',
        room_id: '',
        allocation_date: ''
    });

    const fetchData = async () => {
        const [sRes, rRes] = await Promise.all([
            axios.get('http://localhost:3001/students'),
            axios.get('http://localhost:3001/rooms')
        ]);
        setStudents(sRes.data);
        setRooms(rRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3001/allocate-room', form);
        alert("Room Allocated!");
        setForm({ student_id: '', room_id: '', allocation_date: '' });
    };

    return (
        <div className="container">
            <h1>🔐 Allocate Room</h1>
            <form onSubmit={handleSubmit}>
                <select name="student_id" value={form.student_id} onChange={handleChange} required>
                    <option value="">Select Student</option>
                    {students.map(s => <option key={s.student_id} value={s.student_id}>{s.name}</option>)}
                </select>
                <select name="room_id" value={form.room_id} onChange={handleChange} required>
                    <option value="">Select Room</option>
                    {rooms.map(r => <option key={r.room_id} value={r.room_id}>{r.room_number}</option>)}
                </select>
                <input type="date" name="allocation_date" value={form.allocation_date} onChange={handleChange} required />
                <button type="submit">Allocate</button>
            </form>
        </div>
    );
};

export default RoomAllocation;
