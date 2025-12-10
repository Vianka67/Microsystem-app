import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="App">
            <div className="login-container">
                <div className="login-card">
                    <h1>🚀 MicroSystem</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Iniciar Sesión</h2>

                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="📧 Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="🔒 Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" disabled={isLoading}>
                            {isLoading ? '🔄 Iniciando sesión...' : '✅ Iniciar Sesión'}
                        </button>

                        <div className="demo-credentials">
                            <p><strong>Credenciales de prueba:</strong></p>
                            <p>admin@microsystem.com / admin123</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
