import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeesManagement = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        student_id: '',
        amount: '',
        status: 'Pending',
        due_date: ''
    });
    const [fees, setFees] = useState([]);

    const fetchStudents = async () => {
        const res = await axios.get('http://localhost:3001/students');
        setStudents(res.data);
    };

    const fetchFees = async (studentId) => {
        const res = await axios.get(`http://localhost:3001/fees/${studentId}`);
        setFees(res.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'student_id') fetchFees(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:3001/fees', form);
        fetchFees(form.student_id);
        setForm({ student_id: '', amount: '', status: 'Pending', due_date: '' });
    };

    return (
        <div className="container">
            <h1>💸 Fee Management</h1>
            <form onSubmit={handleSubmit}>
                <select name="student_id" value={form.student_id} onChange={handleChange} required>
                    <option value="">Select Student</option>
                    {students.map(s => <option key={s.student_id} value={s.student_id}>{s.name}</option>)}
                </select>
                <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                </select>
                <input type="date" name="due_date" value={form.due_date} onChange={handleChange} required />
                <button type="submit">Save Fee</button>
            </form>

            {fees.length > 0 && (
                <>
                    <h2>Fee History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map(fee => (
                                <tr key={fee.fee_id}>
                                    <td>{fee.amount}</td>
                                    <td>{fee.status}</td>
                                    <td>{fee.due_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default FeesManagement;
