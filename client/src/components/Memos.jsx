import React, { useState, useEffect } from 'react';
// import '../App.css'; // Import your CSS file

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);

    useEffect(() => {
        const fetchMemos = async () => {
            try {
                const { contract } = state;
                if (!contract) return;

                const memos = await contract.getMemos();

                // Assuming memos is an array of objects with name, message, timestamp, and form properties
                setMemos(memos);
            } catch (error) {
                console.error("Error fetching memos:", error);
            }
        };

        fetchMemos();
    }, [state]);

    return (
        <div>
            {memos.map((memo, index) => (
                <div key={index} className="memo">
                    <p>Name: {memo.name}</p>
                    <p>Message: {memo.message}</p>
                    <p>Timestamp: {new Date(memo.timestamp * 1000).toLocaleString()}</p>
                    <p>From: {memo.form}</p>
                </div>
            ))}
        </div>
    );
}

export default Memos;
