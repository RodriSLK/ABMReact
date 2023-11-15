export enum EstadoAB {
        ALTA = 'ALTA',
        BAJA = 'BAJA',
      
      
}
export interface DTOManufacturadoRubro{

        idArticuloManufacturado: number;
        denominacionArticuloManufacturado: string;
        denominacionRubroGeneral: string;
        rubroEstado: EstadoAB;
      }

