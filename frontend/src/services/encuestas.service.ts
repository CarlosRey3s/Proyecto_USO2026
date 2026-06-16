const API_URL = 'http://localhost:4000/api/encuestas';

const getHeaders = (token: string) => {
    const cleanToken = token.replace(/^"|"$/g, '');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`
    };
};

export const obtenerEncuestas = async (token: string) => {
    const res = await fetch(API_URL, { headers: getHeaders(token) });
    if (!res.ok) throw new Error('Error al obtener encuestas');
    return await res.json();
};

export const crearEncuesta = async (data: any, token: string) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear encuesta');
    return await res.json();
};

export const obtenerEncuestaPorId = async (id: number, token: string) => {
    const res = await fetch(`${API_URL}/${id}`, { headers: getHeaders(token) });
    if (!res.ok) throw new Error('Error al obtener encuesta');
    return await res.json();
};

export const enviarRespuesta = async (id: number, respuestas: any, token: string) => {
    const res = await fetch(`${API_URL}/${id}/respuestas`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({ respuestas })
    });
    if (!res.ok) throw new Error('Error al enviar respuestas');
    return await res.json();
};

export const obtenerResultados = async (id: number, token: string) => {
    const res = await fetch(`${API_URL}/${id}/resultados`, { headers: getHeaders(token) });
    if (!res.ok) throw new Error('Error al obtener resultados');
    return await res.json();
};

export const eliminarEncuesta = async (id: number, token: string) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(token)
    });
    if (!res.ok) throw new Error('Error al eliminar encuesta');
    return await res.json();
};
