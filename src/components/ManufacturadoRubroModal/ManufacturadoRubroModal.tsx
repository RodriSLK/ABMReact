import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { DTOManufacturadoRubro } from '../../types/DTOManufacturadoRubro';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

type rubroManufacturadoModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  rubroManufacturado:  DTOManufacturadoRubro ;
  onDelete: (rubroManufacturado:  DTOManufacturadoRubro ) => void;
  onSaveUpdate: (rubroManufacturado:  DTOManufacturadoRubro) => void;
};

const rubroManufacturadoModal: React.FC<rubroManufacturadoModalProps> = ({
  show,
  onHide,
  title,
  modalType,
  rubroManufacturado,
  onDelete,
  onSaveUpdate,
}: rubroManufacturadoModalProps) => {
  const handleSaveUpdate = async (rubro:  DTOManufacturadoRubro ) => {
    try {
      const isNew = rubro.idArticuloManufacturado=== 0;
      await onSaveUpdate(rubro);
      toast.success(isNew ? 'Rubro de Insumo Creado' : 'Rubro de Insumo Actualizado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }
  };

  const handleDelete = async () => {
    try {
      const isNew = rubroManufacturado.idArticuloManufacturado === 0;
      await onDelete(rubroManufacturado);
      toast.success(isNew ? 'Rubro de Insumo creado' : 'Rubro de Insumo eliminado', {
        position: 'top-center',
      });
      onHide();
    } catch (error) {
      console.error('Ha ocurrido un Error');
    }
  };

  const validationSchema = Yup.object().shape({
    id: Yup.number().integer().min(0),
    insumoDenominacion: Yup.string().required('La denominación de insumo es requerida'),
    rubroDenominacion: Yup.string().required('La denominación de rubro es requerida'),
    rubroPadreDenominacion: Yup.string().required('La denominación del rubro padre es requerida'),
    rubroEstado: Yup.string().required('El estado del rubro es requerido'),
  });

  const formik = useFormik({
    initialValues: rubroManufacturado,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj:  DTOManufacturadoRubro) => handleSaveUpdate(obj),
  });

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Está seguro que desea eliminar el Rubro de Insumo?
              <br /> <strong>{rubroManufacturado. denominacionArticuloManufacturado}</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formdenominacionArticuloManufacturado">
                <Form.Label>Denominación de Manufacturado</Form.Label>
                <Form.Control
                  name="denominacionArticuloManufacturado"
                  type="text"
                  value={formik.values. denominacionArticuloManufacturado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors. denominacionArticuloManufacturado && formik.touched. denominacionArticuloManufacturado)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors. denominacionArticuloManufacturado}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group controlId="formdenominacionRubroGeneral">
                <Form.Label>Denominación de Rubro</Form.Label>
                <Form.Control
                  name="denominacionRubroGeneral"
                  type="text"
                  value={formik.values. denominacionRubroGeneral}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors. denominacionRubroGeneral && formik.touched. denominacionRubroGeneral)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors. denominacionRubroGeneral}
                </Form.Control.Feedback>
              </Form.Group>

             
              <Form.Group controlId="formRubroEstado">
                <Form.Label>Estado del Rubro</Form.Label>
                <Form.Control
                  name="rubroEstado"
                  type="text"
                  value={formik.values.rubroEstado}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.rubroEstado && formik.touched.rubroEstado)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.rubroEstado}
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer className="mt-4">
                <Button variant="secondary" onClick={onHide}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                  Guardar
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default rubroManufacturadoModal;
