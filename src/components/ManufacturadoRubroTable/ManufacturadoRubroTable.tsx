import { useState, useEffect } from 'react';
import { DTOManufacturadoRubro, EstadoAB } from "../../types/DTOManufacturadoRubro";
import { RubroManufacturadoService } from "../../services/RubroManufacturadoService";
import { Button, Table  } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
//import { PlusCircle } from "react-bootstrap-icons";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import RubroManufacturadoModal from "../ManufacturadoRubroModal/ManufacturadoRubroModal";
import { useNavigate } from 'react-router-dom';

const RubroManufacturadoTable = () => {
  const [rubroManufacturados, setRubroManufacturados] = useState<DTOManufacturadoRubro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRubroManufacturados = async () => {
      try {
        const rubroManufacturados = await RubroManufacturadoService.getRubroManufacturados();
        setRubroManufacturados(rubroManufacturados);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRubroManufacturados();
  }, []);

  const initializeNewRubroManufacturado = (): DTOManufacturadoRubro => {
    return {
      idArticuloManufacturado: 0,
      denominacionArticuloManufacturado: "",
      denominacionRubroGeneral: "",
      rubroEstado: EstadoAB.ALTA, // O 'BAJA' según lo que necesites
    };
  };
  

  const [selectedRubroManufacturado, setSelectedRubroManufacturado] = useState<DTOManufacturadoRubro>(
    initializeNewRubroManufacturado()
  );

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  const handleClick = (newTitle: string, rubro: DTOManufacturadoRubro, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setSelectedRubroManufacturado(rubro);
    setShowModal(true);
  };

  const handleDeleteRubroManufacturado = async (RubroManufacturado: DTOManufacturadoRubro) => {
    try {
      await RubroManufacturadoService.deleteRubroManufacturado(RubroManufacturado.idArticuloManufacturado);
      const updatedRubroInsumos = rubroManufacturados.filter((r) => r.idArticuloManufacturado !== RubroManufacturado.idArticuloManufacturado);
      setRubroManufacturados(updatedRubroInsumos);
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };

  const handleUpdateRubroManufacturado = (updatedRubroManufacturado: DTOManufacturadoRubro) => {
    try {
      setRubroManufacturados((prevInsumoRubro) => {
        // Si el id es 0, significa que es un nuevo elemento
        if (updatedRubroManufacturado.idArticuloManufacturado === 0) {
          // Crea un nuevo array que contiene los elementos existentes y el nuevo elemento
          return [...prevInsumoRubro, updatedRubroManufacturado];
        } else {
          // Si el id no es 0, actualiza el elemento existente
          return prevInsumoRubro.map((r) =>
            r.idArticuloManufacturado === updatedRubroManufacturado.idArticuloManufacturado ? updatedRubroManufacturado : r
          );
        }
      });
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>

<div className="container">
      <div className="row">
        <div className="col-4">
          <Button onClick={() => navigate('/')} variant="warning">
        
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="me-2">
              <path d="M11.5998 21.6673C16.9385 21.6673 21.2664 17.3394 21.2664 12.0007C21.2664 6.6619 16.9385 2.33398 11.5998 2.33398C6.26102 2.33398 1.93311 6.6619 1.93311 12.0007C1.93311 17.3394 6.26102 21.6673 11.5998 21.6673Z" stroke="white" strokeWidth="1.45" />
              <path d="M15.4667 11.9996H7.7334M7.7334 11.9996L10.6334 9.09961M7.7334 11.9996L10.6334 14.8996" stroke="white" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver
          </Button>
        </div>
        <div className=" row col-5 d-flex justify-content-center align-items-center">
          <Button variant="warning">ARTICULOS MANUFACTURADOS</Button>
        </div>
      </div>
    </div>

    
    <div className="container">
      <div className="row">
        <div className="col-3">
          
          <Button variant="success" className="mt-3" onClick={() => handleClick("Nuevo Producto", initializeNewRubroManufacturado(), ModalType.CREATE)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 49 49" fill="none" className="me-2">
                    <path d="M44.9167 24.5002C44.9167 28.5382 43.7193 32.4855 41.4759 35.8431C39.2325 39.2006 36.0438 41.8174 32.3131 43.3627C28.5826 44.9081 24.4774 45.3123 20.517 44.5246C16.5565 43.7367 12.9186 41.7923 10.0633 38.937C7.20797 36.0815 5.26347 32.4437 4.47569 28.4833C3.68789 24.5228 4.09223 20.4176 5.6375 16.6871C7.1828 12.9564 9.79966 9.76774 13.1572 7.52432C16.5147 5.28091 20.462 4.0835 24.5001 4.0835" stroke="white" stroke-width="3.0625" stroke-linecap="round"/>
                    <path d="M30.625 24.5H24.5M24.5 24.5H18.375M24.5 24.5V18.375M24.5 24.5V30.625" stroke="white" stroke-width="3.0625" stroke-linecap="round"/>
                    <path d="M29.6041 4.72656C36.7785 6.57315 42.4268 12.2214 44.2735 19.3959" stroke="white" stroke-width="3.0625" stroke-linecap="round"/>
                  </svg>
                  Nuevo
          </Button>
        </div>
      </div>
    </div>

     
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container'>
         <div className='mt-3'>
        <Table hover>
          <thead>
            <tr>
              <th>Insumo Manufacturado</th>
              <th>Rubro</th>
              <th>Rubro Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {rubroManufacturados.map((rubroManufacturados) => (
              <tr key={rubroManufacturados.idArticuloManufacturado}>
                <td>{rubroManufacturados. denominacionArticuloManufacturado}</td>
                <td>{rubroManufacturados. denominacionRubroGeneral}</td>
                <td>{rubroManufacturados.rubroEstado}</td>
                <td>
                  <EditButton
                    onClick={() =>
                      handleClick("Editar Rubro Manufacturado", rubroManufacturados, ModalType.UPDATE)
                    }
                  />
                </td>
                <td>
                  <DeleteButton
                    onClick={() =>
                      handleClick("Borrar Rubro Manufacturado", rubroManufacturados, ModalType.DELETE)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
        </div>
      )}

      {showModal && (
        <RubroManufacturadoModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          rubroManufacturado={selectedRubroManufacturado}
          onDelete={handleDeleteRubroManufacturado}
          onSaveUpdate={handleUpdateRubroManufacturado}
          
        />
      )}
    </>
  );
};

export default RubroManufacturadoTable;
