//const { data } = require("@tensorflow/tfjs");

let positive, negative;
console.log(id);
Promise.all([
  fetch('/getCountOfLoanStatusNegative')
    .then(response => response.json())
    .then(data => {
      negative = data;
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    }),
  fetch('/getCountOfLoanStatusPositive')
    .then(response => response.json())
    .then(data => {
      positive = data;
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    })
]).then(() => {
  let total = positive + negative;
  console.log(total)
  let data1 = (positive / total) * 100;
  let data2 = (negative / total) * 100;
  console.log(data1)
  console.log(data2)

  var data = {
    labels: ['Loan Paid', 'Charged Off'],
    datasets: [{
      data: [data1, data2],
      backgroundColor: ['#6495ED', 'red']
    }]
  };
  var ctx = document.getElementById('myPieChart').getContext('2d');    //const myChart = new Chart(ctx, {
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {}
  });
});
async function fetchandPlotHomeOwnershiploanstatusCountPlot(){
  const loanpaidofffirstrange=await fetch('/getcountwithhomeloanstatus?status=0&ownership=0');
  const loanpaidfirstslab=await loanpaidofffirstrange.json();
  console.log(loanpaidfirstslab);
  const loanpaidoffsecondrange=await fetch('/getcountwithhomeloanstatus?status=0&ownership=1');
  const loanpaidoffsecondslab=await loanpaidoffsecondrange.json();
  console.log(loanpaidoffsecondslab);
  const loanpaidoffthirdrange=await fetch('/getcountwithhomeloanstatus?status=0&ownership=2');
  const loanpaidoffthirdslab=await loanpaidoffthirdrange.json();
  console.log(loanpaidoffthirdslab);
  const loanchargedofffirstrange=await fetch('/getcountwithhomeloanstatus?status=1&ownership=0');
  const loanchargedofffirstslab=await loanchargedofffirstrange.json();
  console.log(loanchargedofffirstslab);
  const loanchargedoffsecondrange=await fetch('/getcountwithhomeloanstatus?status=1&ownership=1');
  const loanchargedoffsecondslab=await loanchargedoffsecondrange.json();
  console.log(loanchargedoffsecondslab);
  const loanchargedoffthirdrange=await fetch('/getcountwithhomeloanstatus?status=1&ownership=2');
  const loanchargedoffthirdslab=await loanchargedoffthirdrange.json();
  console.log(loanchargedoffthirdslab);
  // Prepare the data for the chart
  const data = {
    labels: ['Loan Paid Off & Ownership(Home Mortgage)', 'Loan Paid Off & Ownership(Rent)', 'Loan Paid Off & Ownership(Own Home)', 'Loan Charged Off & Ownership(Home Mortgage)', 'Loan Charged Off & Ownership(Rent)', 'Loan Charged Off & Ownership(Own Home)'],
    datasets: [{
      label: 'Count',
      data: [loanpaidfirstslab, loanpaidoffsecondslab, loanpaidoffthirdslab, loanchargedofffirstslab, loanchargedoffsecondslab, loanchargedoffthirdslab],
      backgroundColor: [
        'rgba(0, 128, 255, 0.8)',
        'rgba(0, 128, 255, 0.6)',
        'rgba(0, 128, 255, 0.4)',
        'rgba(255, 0, 0, 0.8)',
        'rgba(255, 0, 0, 0.6)',
        'rgba(255, 0, 0, 0.4)'
      ],
      borderColor: 'black',
      borderWidth: 2,
      hoverBackgroundColor: [
        'rgba(0, 128, 255, 1)',
        'rgba(0, 128, 255, 0.8)',
        'rgba(0, 128, 255, 0.6)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 0.8)',
        'rgba(255, 0, 0, 0.6)'
      ],
      hoverBorderColor: 'white',
      barPercentage: 0.6
    }]
  };
  
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Loan Status by Home Ownership',
        font: {
          size: 24,
          family: 'Arial'
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 16,
              family: 'Arial'
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 16,
              family: 'Arial'
            }
          },
          title: {
            display: true,
            text: 'Count',
            font: {
              size: 20,
              family: 'Arial'
            }
          }
        }
      },
      animation: {
        duration: 1000
      }
    }
  };
  
  // Create the chart
  const myChart = new Chart(document.getElementById('countplotonhomeownership'), config);
  

  // Create the chart
  //const chart = new Chart(document.getElementById('countplotcreditscore'), config);

}
async function fetchAndPlotCreditScoreCountPlot(){
  const loanpaidofffirstrange=await fetch('/getcountwithcredandstatus?status=0&credrange=0');
  const loanpaidfirstslab=await loanpaidofffirstrange.json();
  console.log(loanpaidfirstslab);
  const loanpaidoffsecondrange=await fetch('/getcountwithcredandstatus?status=0&credrange=1');
  const loanpaidoffsecondslab=await loanpaidoffsecondrange.json();
  console.log(loanpaidoffsecondslab);
  const loanpaidoffthirdrange=await fetch('/getcountwithcredandstatus?status=0&credrange=2');
  const loanpaidoffthirdslab=await loanpaidoffthirdrange.json();
  console.log(loanpaidoffthirdslab);
  const loanchargedofffirstrange=await fetch('/getcountwithcredandstatus?status=1&credrange=0');
  const loanchargedofffirstslab=await loanchargedofffirstrange.json();
  console.log(loanchargedofffirstslab);
  const loanchargedoffsecondrange=await fetch('/getcountwithcredandstatus?status=1&credrange=1');
  const loanchargedoffsecondslab=await loanchargedoffsecondrange.json();
  console.log(loanchargedoffsecondslab);
  const loanchargedoffthirdrange=await fetch('/getcountwithcredandstatus?status=1&credrange=2');
  const loanchargedoffthirdslab=await loanchargedoffthirdrange.json();
  console.log(loanchargedoffthirdslab);
  // Prepare the data for the chart
  const data = {
    labels: ['Loan Paid Off & Credit Range(580-670)', 'Loan Paid Off & Credit Range(670-740)', 'Loan Paid Off & Credit Range(740-800)', 'Loan Charged Off & Credit Range(580-670)', 'Loan Charged Off & Credit Range(670-740)', 'Loan Charged Off & Credit Range(740-800)'],
    datasets: [{
      label: 'Count',
      data: [loanpaidfirstslab, loanpaidoffsecondslab, loanpaidoffthirdslab, loanchargedofffirstslab, loanchargedoffsecondslab, loanchargedoffthirdslab],
      backgroundColor: [
        'rgba(0, 128, 255, 0.8)',
        'rgba(0, 128, 255, 0.6)',
        'rgba(0, 128, 255, 0.4)',
        'rgba(255, 0, 0, 0.8)',
        'rgba(255, 0, 0, 0.6)',
        'rgba(255, 0, 0, 0.4)'
      ],
      borderColor: 'black',
      borderWidth: 2,
      hoverBackgroundColor: [
        'rgba(0, 128, 255, 1)',
        'rgba(0, 128, 255, 0.8)',
        'rgba(0, 128, 255, 0.6)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 0, 0, 0.8)',
        'rgba(255, 0, 0, 0.6)'
      ],
      hoverBorderColor: 'white',
      barPercentage: 0.6
    }]
  };
  
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Loan Status by Credit Range',
        font: {
          size: 24,
          family: 'Arial'
        }
      },
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 16,
              family: 'Arial'
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 16,
              family: 'Arial'
            }
          },
          title: {
            display: true,
            text: 'Count',
            font: {
              size: 20,
              family: 'Arial'
            }
          }
        }
      },
      animation: {
        duration: 1000
      }
    }
  };
  
  // Create the chart
  const myChart = new Chart(document.getElementById('countplotcreditscore'), config);
  

  // Create the chart
  //const chart = new Chart(document.getElementById('countplotcreditscore'), config);

}
fetchAndPlotCreditScoreCountPlot()
fetchandPlotHomeOwnershiploanstatusCountPlot();
async function fetchDataandplot() {
  if (id !== '') {
    try {
      const response1 = await fetch('/getonerecordwithid?id=' + id);
      const data1 = await response1.json();
      positive = data1;
      console.log(data1);

      const response2 = await fetch('/getloanstatuspositive');
      const data2 = await response2.json();
      positive = data2;
      console.log(data2);

      const tr = document.getElementById('search-form');
      const container = document.createElement('div');
      container.id = 'myChartContainer';
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.backgroundColor="white";

      // Create a canvas element and add it to the container
      const canvas = document.createElement('canvas');
      canvas.id = 'myChart';

      container.appendChild(canvas);
      tr.insertAdjacentElement('afterend', container);

      // Use the container to render the chart
      const ctx = canvas.getContext('2d');

      // Extract the necessary data from the array of objects
      const creditScoreData = data2.map(obj => parseFloat(obj.creditranges));
      const monthlydebtData = data2.map(obj => parseFloat(obj.debt));
      const predictedLoanStatusData = data2.map(obj => parseInt(obj.predictedloanstatus));
      creditScoreData.push(data1.creditranges);
      monthlydebtData.push(data1.debt);
      predictedLoanStatusData.push(data1.predictedloanstatus);
      console.log(typeof creditScoreData[0]);
      console.log(typeof monthlydebtData[0])
      // Create a new Chart object
      const myChart = new Chart(ctx, {
          type: 'scatter',
          data: {
              datasets: [{
                  label: 'Predicted Loan Status',
                  data: creditScoreData.map((value, index) => ({x: value, y: monthlydebtData[index]})),
                  backgroundColor: predictedLoanStatusData.map(value => value === 0 ? 'rgba(255, 99, 132, 20)' : 'rgba(54, 162, 235, 0.2)'),
                  borderColor: predictedLoanStatusData.map(value => value === 0 ? 'rgba(255,99,132,10)' : 'rgba(54, 162, 235, 1)'),
                  borderWidth: 3.5
              }]
          },
          options: {
              scales: {
                  x: [{
                      type: 'linear',
                     // position: 'bottom',
                      scaleLabel: {
                          display:true,
                          labelString: 'Credit Score'
                      }
                  }],
                  y: [{
                      type: 'linear',
                      scaleLabel: {
                          display: true,
                          labelString: 'Monthly Debt'
                      }
                  }]
              }
          }
      });

    } catch (error) {
      console.error(error);
    }
  }
}


if(id!='') {
  fetchDataandplot();
}


