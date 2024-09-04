import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

export default function useLogout() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const { updateCart } = useContext(ShoppingCartContext);
    const [error, setError] = useState(null);

    return async function logout() {
        try {
            const res = await fetch(`/api/logout`, {
                method: 'POST',
                credentials: 'include' // Ensure cookies are included in the request
            });
            const data = await res.json();
            if (data.success) {
                setUser(null);
                updateCart([]);
                navigate('/login');
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }
}