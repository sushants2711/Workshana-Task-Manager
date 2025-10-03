import React from 'react'
import { useState } from 'react'
import { handleSuccess } from '../../ToastMessages/successMessage';
import { handleError } from '../../ToastMessages/errorMessage';
import { useEffect } from 'react';
import { taskCompleteApi } from '../../Api/ReportApi/taskCompleteApi';
import { Layout } from '../../Components/Layout/Layout';
import { Helmet } from "react-helmet";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const TaskComplete = () => {

    const [showData, setShowData] = useState([]);

    const fetchTaskComplete = async () => {
        try {
            const result = await taskCompleteApi();
            const { success, message, error, data } = result;

            if (success) {
                handleSuccess(message);
                setShowData(data);
            } else if (!success) {
                handleError(message);
                setShowData([]);
            } else {
                handleError(error);
                setShowData([]);
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    useEffect(() => {
        fetchTaskComplete();
    }, []);

    // console.log(showData);


    const labels = showData.map((curr) => curr._id);
    const counts = showData.map((curr) => curr.totalTaskComplete);

    const colors = [
        "#FF6B6B",
        "#4ECDC4",
        "#FFD93D",
        "#1A5F7A",
        "#FF8C00",
        "#6A1B9A",
        "#00C9A7",
        "#FF4E00",
        "#009FFD",
        "#C32BAD",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Total Task Complete",
                data: counts,
                backgroundColor: labels.map((_, i) => colors[i % colors.length]),
                borderColor: labels.map((_, i) => colors[i % colors.length]),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 15,
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                }
            },
        }
    }



    return (
        <>
            <Layout>
                <Helmet>
                    <title>Report | Task-Completed</title>
                    <meta
                        name="description"
                        content={`Get all the Task info that are Completed. Get the best Visual Representation.`}
                    />
                    <meta
                        name="keywords"
                        content={`Visual Representation, Report Pipeline, Bar-Chart-Graphs, All Task Performance `}
                    />
                </Helmet>

              <div className="container my-5" style={{ paddingTop: "40px"}}>
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-primary">Tasks Details Reports Analytics</h2>
                        <p className="text-muted">
                            Visual representation of all the Task across different groups.
                        </p>
                    </div>

                    {/* Chart */}
                    <div className="shadow p-3 rounded bg-white mx-auto my-5" style={{ maxWidth: "800px", height: "400px" }}>
                        <Pie data={data} options={options} />
                    </div>

                    {/* Summary Cards */}
                    <div className="row g-4 mt-5">
                        {showData.map((curr, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="card shadow-sm border-0 hover-shadow">
                                    <div className="card-body text-center">
                                        <h5 className="fw-semibold">{curr._id}</h5>
                                        <h2 className="fw-bold text-primary">{curr.totalTaskComplete}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}
