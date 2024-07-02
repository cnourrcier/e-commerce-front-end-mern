import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../button';
import './styles.css';

export default function Admin() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Access the authenticated user context
    const [users, setUsers] = useState([]); // State to store all users
    const [selectedUser, setSelectedUser] = useState(null); // State to store the currently selected user for editing
    const [loading, setLoading] = useState(false); // State to handle loading indicator
    const [error, setError] = useState(null); // State to handle error messages
    const [updateUserData, setUpdateUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    }); // State to store user data for updating

    // Function to fetch all users from the backend
    async function fetchUsers() {
        try {
            const res = await fetch(`/api/admin/users`, {
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                setUsers(data.users); // Update the users state with fetched data
            } else {
                setError(data.message); // Set error message if fetch fails
            }
        } catch (err) {
            setError(err.message); // Set error message on catch
        } finally {
            setLoading(false); // Stop loading indicator
        }
    }

    // Function to handle editing a user
    function handleEditUser(user) {
        setSelectedUser(user); // Set the selected user for editing
        setUpdateUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }); // Set the user data in the state for form inputs
    }

    // Function to handle updating user data
    async function handleUpdateUser(e) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateUserData), // Send updated user data in the request body
                credentials: 'include' // // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                setSelectedUser(null); // Reset selected user after update
                fetchUsers(); // Refresh the users list
            } else {
                setError(data.message); // Set error message if update fails
            }
        } catch (err) {
            setError(err.message); // Set error message on catch
        }
    }

    // Function to handle deleting a user
    async function handleDeleteUser(userId) {
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include' // // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                fetchUsers(); // Refresh the users list after deletion
            } else {
                setError(data.message); // Set error message if delete fails
            }
        } catch (err) {
            setError(err.message); // Set error message on catch
        }
    }

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>; // Show loading message
    if (error) return <div>{error}</div>; // Show error message

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
                <form>
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
                    <Button onClick={handleUpdateUser} buttonText={'Update'} />
                    <Button onClick={() => setSelectedUser(null)} buttonText={'Cancel'} />
                </form>
            )}
        </div>
    )
}