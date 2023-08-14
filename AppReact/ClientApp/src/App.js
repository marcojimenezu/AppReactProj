import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"
import TablaEmpleado from './Components/TablaEmpleado'
import { useEffect, useState } from "react"
import ModalEmpleado from "./Components/ModalEmpleado"

const App = () => {

    const [employees, setEmployee] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    const mostrarEmpleados = async () => {
        const response = await fetch("/api/employee/GetEmployees")

        if (response.ok) {
            const data = await response.json();
            console.log("Super")
            setEmployee(data)
        }
        else {
            console.log("Error")
        }
    }

    useEffect(() => {
        mostrarEmpleados()
    }, [])


    const guardarEmpleado = async (empleado) => {
        const response = await fetch("api/employee/Save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(empleado)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarEmpleados();
        }
        else { console.log("Error") }
    }

    const editarEmpleado = async (empleado) => {
        const response = await fetch("api/employee/Edit", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(empleado)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarEmpleados();
        }
    }

    const eliminarEmpleado = async (id) => {

        var respuesta = window.confirm("Desea eliminar el registro del empleado?")

        if (!respuesta) {
            return
        }

        const response = await fetch("api/employee/Delete/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
            mostrarEmpleados();
        }
    }

    return (
        <Container>
            <Row className = "mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Empleados</h5>
                        </CardHeader>
                        <CardBody>
                            <Button
                                size="sm"
                                color="success"
                                onClick={() => setMostrarModal(!mostrarModal)} >
                                Nuevo Empleado</Button>
                            <hr></hr>
                            <TablaEmpleado data={employees}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarEmpleado={eliminarEmpleado}
                                />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalEmpleado
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarEmpleado={guardarEmpleado}
                editar={editar}
                setEditar={setEditar}
                editarEmpleado={editarEmpleado}
            />
        </Container>
    )
}

export default App;