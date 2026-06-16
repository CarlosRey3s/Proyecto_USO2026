// URL base del backend, ajusta si es necesario
const API_URL = 'http://localhost:4000/api/notificaciones';

// Obtener todas las notificaciones del usuario logueado
export const obtenerNotificaciones = async (token: string) => {
    try {
        const cleanToken = token.replace(/^"|"$/g, '');
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${cleanToken}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("Respuesta del servidor:", errorData);
            throw new Error(errorData?.message || errorData?.error || 'Error al obtener notificaciones');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en obtenerNotificaciones:', error);
        throw error;
    }
};

// Marcar una notificación específica como leída
export const marcarNotificacionComoLeida = async (id: number, token: string) => {
    try {
        const cleanToken = token.replace(/^"|"$/g, '');
        const response = await fetch(`${API_URL}/${id}/leer`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${cleanToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al marcar notificación como leída');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en marcarNotificacionComoLeida:', error);
        throw error;
    }
};
