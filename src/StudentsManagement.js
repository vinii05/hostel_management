import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentsManagement = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        course: ''
    });

    const fetchStudents = async () => {
        const res = await axios.get('http://localhost:3001/students');
        setStudents(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/students', form);
        setForm({ name: '', email: '', phone: '', gender: '', course: '' });
        fetchStudents();
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="container">
            <h1>🎓 Student Management</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                <select name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
                <button type="submit">Add Student</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.student_id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.gender}</td>
                            <td>{student.course}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsManagement;
