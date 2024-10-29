import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { Container } from "react-bootstrap";
import { isAuthenticated } from "../Login/Authenticated";
const GoalTracking = () => {
    isAuthenticated();
    return (
        <Container fluid>
            {/* <Sidebar /> */}
            <Main />
        </Container>
    );
};

export default GoalTracking;
