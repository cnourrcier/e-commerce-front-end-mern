import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../button';
import './styles.css';

export default function Admin() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateUserData, setUpdateUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    async function fetchUsers() {
        try {
            const res = await fetch(`/api/admin/users`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleEditUser(user) {
        setSelectedUser(user);
        setUpdateUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        });
    }

    async function handleUpdateUser(e) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateUserData),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setSelectedUser(null);
                fetchUsers();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDeleteUser(userId) {
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                fetchUsers();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='admin-container'>
            <h1>Admin Dashboard</h1>
            <Button onClick={() => navigate('/profile')} buttonText={'Profile'} />
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.firstName} {user.lastName} - {user.email} ({user.role})
                        <Button onClick={() => handleEditUser(user)} buttonText={'Edit'} />
                        <Button onClick={() => handleDeleteUser(user._id)} buttonText={'Delete'} />
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <form onSubmit={handleUpdateUser}>
                    <h2>Edit User</h2>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id='firstName'
                        name='firstName'
                        value={updateUserData.firstName}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, firstName: e.target.value })}
                    />
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id='lastName'
                        name='lastName'
                        value={updateUserData.lastName}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, lastName: e.target.value })}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id='email'
                        name='email'
                        value={updateUserData.email}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })}
                    />
                    <label htmlFor="role">Role:</label>
                    <select
                        id='role'
                        name='role'
                        value={updateUserData.role}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, role: e.target.value })}
                    >
                        <option value='customer'>Customer</option>
                        <option value='manager'>Manager</option>
                        <option value='admin'>Admin</option>
                    </select>
                    <button type='submit'>Update</button>
                    <button type='button' onClick={() => setSelectedUser(null)}>Cancel</button>
                </form>
            )}
        </div>
    )
}