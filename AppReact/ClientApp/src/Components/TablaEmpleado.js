import { Button, Table } from "reactstrap"

const TablaEmpleado = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarEmpleado }) => {

    const enviarDatos = (empleado) => {
        setEditar(empleado)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Id Empleado</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="6">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idEmployee}>
                                <td>{item.idEmployee}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2"
                                        onClick={() => enviarDatos(item)}>
                                        Editar
                                    </Button>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => eliminarEmpleado(item.idEmployee)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))     
                    )
                }
            </tbody>
        </Table>

    )

}

export default TablaEmpleado;