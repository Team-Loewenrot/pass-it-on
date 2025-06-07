"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/test")
            .then(res => res.json())
            .then(data => {
                setMessage(data.test);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Test Message</h1>
            <p>{message}</p>
        </div>
    );
}