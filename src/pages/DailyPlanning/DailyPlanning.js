import React from "react";
import { Container } from "react-bootstrap";
import "./daily.css"; // import file CSS của bạn
import SideBar from "./SideBar";
import Main from "./Main";
import { isAuthenticated } from "../Login/Authenticated";
const DailyPlanning = () => {
    isAuthenticated();
    return (
        <Container className="App" fluid style={{ display: "flex" }}>
            {/* <div style={{ flex: "0 0 15%", maxWidth: "15%" }}>
                <SideBar />
            </div> */}
            <div
                style={{
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    borderLeft: "1px solid #ccc",
                }}
            >
                <Main />
            </div>
        </Container>
    );
};

export default DailyPlanning;
