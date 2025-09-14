import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomsManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({ room_number: '', capacity: '' });

    const fetchRooms = async () => {
        const res = await axios.get('http://localhost:3001/rooms');
        setRooms(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/rooms', form);
        setForm({ room_number: '', capacity: '' });
        fetchRooms();
    };

    const deleteRoom = async (id) => {
        await axios.delete(`http://localhost:3001/rooms/${id}`);
        fetchRooms();
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="container">
            <h1>🏠 Room Management</h1>
            <form onSubmit={handleSubmit}>
                <input name="room_number" placeholder="Room #" value={form.room_number} onChange={handleChange} required />
                <input name="capacity" type="number" placeholder="Capacity" value={form.capacity} onChange={handleChange} required />
                <button type="submit">Add Room</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Room #</th>
                        <th>Capacity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.room_id}>
                            <td>{room.room_number}</td>
                            <td>{room.capacity}</td>
                            <td>
                                <button onClick={() => deleteRoom(room.room_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomsManagement;
