import React from "react";
import { Container, Row } from "react-bootstrap";
import "./taskManagment.css";
import Main from "./Main";
import { isAuthenticated } from "../Login/Authenticated";
const TaskManagment = () => {
    isAuthenticated();
    return (
        <Container fluid>
            <Row>
                <Main />
            </Row>
        </Container>
    );
};

export default TaskManagment;
