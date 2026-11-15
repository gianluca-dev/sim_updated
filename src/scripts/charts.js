import Chart from 'chart.js/auto';

let mainChart = null;

export const initMainChart = (simState, currentYear) => {
    const ctx = document.getElementById('main-chart-canvas');

    if (!mainChart) {
        mainChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb'],
                datasets: [
                    {
                        label: 'Lebenszufriedenheit',
                        data: [],
                        borderColor: '#36a2eb',
                        backgroundColor: 'rgba(54, 162, 235, 0.15)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Lebenszufriedenheit'
                        }
                    },
                    x: {
                        display: true,
                        text: `Monate ${currentYear}`
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        title: () => `Deutschland ${currentYear}`,
                        label: (item) => `Lebenszufriedenheit ${item.raw.toLocaleString('de-DE')}`
                    }
                }
            }
        });
    }

    mainChart.data.datasets[0].data = simState.lifeSatisfactionScores[currentYear];
    mainChart.update();
};