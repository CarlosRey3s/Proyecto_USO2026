const API_URL = "http://localhost:4000/api";

export interface ReservacionData {
  tipo: string;
  laboratorio: number;
  fecha: string;
  desde: string;
  hasta: string;
  numPersonas: number;
  recurrencia: string;
  titulo: string;
  estacion?: number;
}

export const reservacionesService = {
  getReservaciones: async () => {
    try {
      const response = await fetch(`${API_URL}/actividades`);
      if (!response.ok) {
        throw new Error("Error al obtener las actividades");
      }
      const data = await response.json();
      if (data.success) {
        // Filtrar solo las de tipo reserva
        const reservas = data.data.filter((act: any) => act.tipo === 'reserva');
        return { success: true, data: reservas };
      }
      return { success: false, data: [] };
    } catch (error) {
      console.error("Error en reservacionesService.getReservaciones:", error);
      return { success: false, data: [] };
    }
  },

  crearReservacion: async (data: ReservacionData) => {
    try {
      const response = await fetch(`${API_URL}/actividades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Error al crear la reserva");
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error en reservacionesService.crearReservacion:", error);
      return { success: false, message: error.message || "Error de red o servidor" };
    }
  }
};
