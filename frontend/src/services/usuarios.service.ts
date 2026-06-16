const API_URL = "http://localhost:4000/api";

export const usuariosService = {
  getUsuarios: async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en usuariosService.getUsuarios:", error);
      return { success: false, data: [] };
    }
  },

  crearUsuario: async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Error al crear el usuario");
      }
      return await response.json();
    } catch (error: any) {
      console.error("Error en usuariosService.crearUsuario:", error);
      return { success: false, message: error.message || "Error de red o servidor" };
    }
  }
};
