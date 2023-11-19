import { DTOManufacturadoRubro } from '../types/DTOManufacturadoRubro';

const BASE_URL = 'http://localhost:8080/api/v1/articulomanufacturados';

export const RubroManufacturadoService = {
  
  getRubroManufacturados: async (): Promise<DTOManufacturadoRubro[]> => {
    const response = await fetch(`${BASE_URL}/manufacturadosConRubrosYEstados`);
    const data= await response.json();
    return data;
  },

  createRubroManufacturado: async (articuloRubro: DTOManufacturadoRubro): Promise<DTOManufacturadoRubro> => {
    const response = await fetch(`${BASE_URL}/manufacturadosConRubrosYEstados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articuloRubro),
    });
    const data= await response.json();
    return data;
  },

  updateRubroManufacturado: async ( idArticuloManufacturado: number, articuloRubro: DTOManufacturadoRubro): Promise<DTOManufacturadoRubro> => {
    const response = await fetch(`${BASE_URL}/manufacturadosConRubrosYEstados/${idArticuloManufacturado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articuloRubro),
    });
    const data = await response.json();
    return data;
  },

  deleteRubroManufacturado: async (idArticuloManufacturado: number): Promise<void> => {
    await fetch(`${BASE_URL}/manufacturadosConRubrosYEstados/${idArticuloManufacturado}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        
      }
    })
    .then(response => {
      if (response.ok) {
        console.log('El rubro se eliminó correctamente');
      } else {
        console.error('No se pudo eliminar el rubro');
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud DELETE', error);
      });
  }
}