import React, { useEffect, useState } from 'react';
import { lastWeekClosedApi } from '../../Api/ReportApi/lastWeekClosedApi';
import { allTaskApi } from '../../Api/TaskApi/allTaskApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { handleError } from '../../ToastMessages/errorMessage';
import { Layout } from '../../Components/Layout/Layout';
import { Helmet } from 'react-helmet';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export const Last7Days = () => {

    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    const fetchCompletedTasks = async () => {
        const result = await lastWeekClosedApi();
        const { success, message, error, data } = result;

        if (success) {
            handleSuccess(message);
            setCompletedTasks(data.length);
        } else if (!success) {
            handleError(message);
            setCompletedTasks(0);
        } else {
            handleError(error);
            setCompletedTasks(0);
        }
    };

    const fetchAllTasks = async () => {
        const result = await allTaskApi();
        const { success, message, error, data } = result;

        if (success) {
            setTotalTasks(data.length);
        } else {
            handleError(error || message);
            setTotalTasks(0);
        }
    };

    useEffect(() => {
        fetchCompletedTasks();
        fetchAllTasks();
    }, []);

    const unCompleteTasks = totalTasks - completedTasks;

    const data = {
        labels: ['Task Summary'],
        datasets: [
            {
                label: 'Total Tasks',
                data: [totalTasks],
                backgroundColor: '#4ECDC4',
                borderColor: '#1A5F7A',
                borderWidth: 2
            },
            {
                label: 'Completed (Last 7 Days)',
                data: [completedTasks],
                backgroundColor: '#FF6B6B',
                borderColor: '#C32BAD',
                borderWidth: 2
            },
            {
                label: 'Pending Tasks',
                data: [unCompleteTasks],
                backgroundColor: '#51b878ff',
                borderColor: '#8b0878ff',
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 15,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: 'Task Completion Report (Last 7 Days)',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#1A5F7A'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Report | Last 7 Days</title>
            </Helmet>

            <div className="container my-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Reports Closed by Owners</h2>
                    <p className="text-muted">
                        Visual representation of leads across pipeline stages.
                    </p>
                </div>

                {/* Bar Chart */}
                <div className="shadow p-3 rounded bg-white mx-auto my-5" style={{ maxWidth: "400px", height: "600px" }}>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </Layout>
    );
};
