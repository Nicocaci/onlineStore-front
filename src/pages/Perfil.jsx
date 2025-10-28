import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import Admin from "./usuarios/admin/Admin.jsx";
import User from "./usuarios/User.jsx";

const Perfil = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user.id) {
            console.error("Debes iniciar sesion primero");
            navigate('/')
        }
    }, [user, loading, navigate])
    return (
        <div>
            <div>
                {user?.role === 'admin' ? <Admin/> : <User/>}
            </div>
        </div>
    )
}

export default Perfil;