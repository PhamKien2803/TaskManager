import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Login/Authenticated";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
export default function UpdateProfile() {
    isAuthenticated();
    const navigate = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [job, setJob] = useState("");
    const [userExists, setUserExists] = useState(false); // State để kiểm tra xem user đã tồn tại hay chưa

    useEffect(() => {
        fetch(`http://localhost:9999/profile/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setUsername(result.name);
                setEmail(result.email);
                setPhone(result.phone);
                setAddress(result.address);
                setJob(result.job);
            })
            .catch((error) => console.log(error));

        fetch(`http://localhost:9999/profile`)
            .then((res) => res.json())
            .then((result) => {
                // Kiểm tra xem user đã tồn tại trong danh sách hay chưa
                const exists = result.some((p) => p.id === id);
                setUserExists(exists);
            })
            .catch((error) => console.log(error));
    }, [id]);

    function handleUpdate(e) {
        e.preventDefault();
        const updateProduct = {
            name: username,
            email: email,
            phone: phone,
            address: address,
            job: job,
        };

        let url;
        let method;

        if (userExists) {
            url = `http://localhost:9999/profile/${id}`;
            method = "PUT";
        } else {
            url = `http://localhost:9999/profile`;
            method = "POST";
        }

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateProduct),
        })
            .then((result) => {
                if (result.ok) {
                    navigate("/settings");
                } else {
                    return result.json().then((data) => {
                        throw new Error(
                            data.message || "Failed to update profile"
                        );
                    });
                }
            })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    }

    return (
        <Container>
            <Col>
                <h3 style={{ textAlign: "center" }}>Edit Profile</h3>
            </Col>
            <Col>
                <Button
                    style={{ backgroundColor: "skyblue", marginBottom: 10 }}
                >
                    <Link
                        to={"/settings"}
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        Back
                    </Link>
                </Button>
            </Col>
            <Col>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                        <Form.Label>User name (*)</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            rows={2}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            rows={2}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Job</Form.Label>
                        <Form.Control
                            type="text"
                            rows={2}
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit">Update</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Container>
    );
}
