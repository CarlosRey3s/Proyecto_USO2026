import { type LaboratorioResponse } from "../types/laboratorio.types";

const API_URL = "http://localhost:4000/api";

/**
 * Servicio para gestionar las peticiones relacionadas con los laboratorios.
 */
export const laboratoriosService = {
  /**
   * Obtiene la lista de todos los laboratorios activos desde el backend.
   * @returns {Promise<LaboratorioResponse>} Respuesta del servidor con los laboratorios.
   */
  getLaboratorios: async (): Promise<LaboratorioResponse> => {
    try {
      const response = await fetch(`${API_URL}/laboratorios`);
      if (!response.ok) {
        throw new Error("Error al obtener los laboratorios");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en laboratoriosService.getLaboratorios:", error);
      return { success: false, data: [] };
    }
  },

  /**
   * Obtiene la lista de todos los laboratorios desde el backend.
   * @returns {Promise<LaboratorioResponse>} Respuesta del servidor con los laboratorios.
   */
  getAllLaboratorios: async (): Promise<LaboratorioResponse> => {
    try {
      const response = await fetch(`${API_URL}/laboratorios/todos`);
      if (!response.ok) {
        throw new Error("Error al obtener todos los laboratorios");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en laboratoriosService.getAllLaboratorios:", error);
      return { success: false, data: [] };
    }
  },

  /**
   * Crea un nuevo laboratorio.
   * @param data Datos del laboratorio a crear.
   * @returns {Promise<any>} Respuesta del servidor.
   */
  createLaboratorio: async (data: { nombre: string; descripcion: string; estado: string }): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/laboratorios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al crear el laboratorio");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en laboratoriosService.createLaboratorio:", error);
      return { success: false, message: "Error de red o servidor" };
    }
  },

  /**
   * Actualiza un laboratorio existente.
   * @param id ID del laboratorio a actualizar.
   * @param data Nuevos datos del laboratorio.
   * @returns {Promise<any>} Respuesta del servidor.
   */
  updateLaboratorio: async (id: number, data: { nombre: string; descripcion: string; estado: string }): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/laboratorios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el laboratorio");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en laboratoriosService.updateLaboratorio:", error);
      return { success: false, message: "Error de red o servidor" };
    }
  },

  /**
   * Elimina un laboratorio.
   * @param id ID del laboratorio a eliminar.
   * @returns {Promise<any>} Respuesta del servidor.
   */
  deleteLaboratorio: async (id: number): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/laboratorios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el laboratorio");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en laboratoriosService.deleteLaboratorio:", error);
      return { success: false, message: "Error de red o servidor" };
    }
  },
};
