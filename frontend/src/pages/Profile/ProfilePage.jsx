import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="profile-content">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">A</div>
                    <div className="profile-info">
                        <h2>Admin</h2>
                        <p>Administrador Principal</p>
                    </div>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <label>ID Usuario:</label>
                        <span>1</span>
                    </div>
                    <div className="detail-item">
                        <label>Email:</label>
                        <span>{user?.email}</span>
                    </div>
                    <div className="detail-item">
                        <label>Servicio:</label>
                        <span>users-service (Django)</span>
                    </div>
                    <div className="detail-item">
                        <label>Estado:</label>
                        <span className="status-active">✓ Activo</span>
                    </div>
                </div>

                <div className="architecture-info">
                    <h3>📌 Arquitectura del Sistema</h3>
                    <ul>
                        <li>📄 <strong>Microservicio Usuarios:</strong> Django REST Framework</li>
                        <li>📄 <strong>Microservicio Productos:</strong> NestJS</li>
                        <li>📄 <strong>Base de Datos:</strong> SQlite</li>
                        <li>📅 <strong>Despliegue:</strong> Render / Railway</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
