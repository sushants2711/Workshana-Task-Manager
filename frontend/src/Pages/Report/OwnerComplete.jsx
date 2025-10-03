import React, { useEffect, useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { Helmet } from 'react-helmet'
import { adminCompletedApi } from '../../Api/ReportApi/adminCompletedApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { handleError } from '../../ToastMessages/errorMessage';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);



export const OwnerComplete = () => {

    const [showData, setShowData] = useState([]);

    const fetchData = async () => {
        const result = await adminCompletedApi();
        const {success, message, error, data} = result;

        if(success) {
            handleSuccess(message);
            setShowData(data);
        }else if(!success) {
            handleError(message);
        }else {
            handleError(error);
        };
    };

    useEffect(() => {
        fetchData();
    }, []);


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

    const labels = showData.map((curr) => curr.email);
    const counts = showData.map((curr) => curr.totalCompletedTasks);

    console.log(showData);

    const data = {
        labels,
        datasets: [
            {
                label: "Completed By Owners",
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
    <Layout>
        <Helmet>
            <title>Report | Owner-Complete</title>
            <meta />
            <meta />
        </Helmet>

         <div className="container my-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Reports Closed by Owners</h2>
                    <p className="text-muted">
                        Visual representation of leads across pipeline stages.
                    </p>
                </div>

                {/* Bar Chart */}
                <div className="shadow p-3 rounded bg-white mx-auto my-5" style={{ maxWidth: "800px", height: "400px" }}>
                    <Bar data={data} options={options} />
                </div>

                {/* Pipeline cards below chart */}
                <div className="row g-4 mt-5">
                    {showData.map((curr, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <div className="card shadow-sm border-0 hover-shadow">
                                <div className="card-body text-center">
                                    <h5 className="fw-semibold">{curr.email}</h5>
                                    <h2 className="fw-bold text-primary">{curr.totalCompletedTasks}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </Layout>
  )
}
