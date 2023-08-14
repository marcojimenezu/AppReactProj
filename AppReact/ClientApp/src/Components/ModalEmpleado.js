import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, ModalFooter } from "reactstrap"

const modeloEmpleado = {
    idEmployee: 0,
    name: "",
    email: "",
    address: "",
    phone: ""
}

const ModalEmpleado = ({ mostrarModal, setMostrarModal, guardarEmpleado, editar, setEditar, editarEmpleado}) => {

    const [empleado, setEmpleado] = useState(modeloEmpleado);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setEmpleado(
            {
                ...empleado,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (empleado.idEmployee == 0) {
            guardarEmpleado(empleado)
        }
        else {
            editarEmpleado(empleado)
        }
        setEmpleado(modeloEmpleado)
    }

    useEffect(() => {
        if (editar != null) {
            setEmpleado(editar)
        }
        else {
            setEmpleado(modeloEmpleado)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {empleado.idEmployee == 0 ? "Nuevo Empleado" : "Editar Empleado" }
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="name" onChange={(e) => actualizarDato(e)} value={empleado.name}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input name="email" onChange={(e) => actualizarDato(e)} value={empleado.email}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Dirección</Label>
                        <Input name="address" onChange={(e) => actualizarDato(e)} value={empleado.address}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Teléfono</Label>
                        <Input name="phone" onChange={(e) => actualizarDato(e)} value={empleado.phone}></Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEmpleado;