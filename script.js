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

      const tr = document.getElementById(id);
      const container = document.createElement('div');
      container.id = 'myChartContainer';
      container.style.display = 'flex';
      container.style.justifyContent = 'center';

      // Create a canvas element and add it to the container
      const canvas = document.createElement('canvas');
      canvas.id = 'myChart';

      container.appendChild(canvas);
      tr.insertAdjacentElement('afterend', container);

      // Use the container to render the chart
      const ctx = canvas.getContext('2d');

      // Extract the necessary data from the array of objects
      const creditScoreData = data2.map(obj => parseFloat(obj.creditranges));
      const homeownershipData = data2.map(obj => parseFloat(obj.home));
      const predictedLoanStatusData = data2.map(obj => parseInt(obj.predictedloanstatus));
      creditScoreData.push(data1.creditranges);
      homeownershipData.push(data1.home);
      predictedLoanStatusData.push(data1.predictedloanstatus);

      // Create a new Chart object
      const myChart = new Chart(ctx, {
          type: 'scatter',
          data: {
              datasets: [{
                  label: 'Predicted Loan Status',
                  data: creditScoreData.map((value, index) => ({x: value, y: homeownershipData[index]})),
                  backgroundColor: predictedLoanStatusData.map(value => value === 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)'),
                  borderColor: predictedLoanStatusData.map(value => value === 0 ? 'rgba(255,99,132,1)' : 'rgba(54, 162, 235, 1)'),
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  xAxes: [{
                      type: 'linear',
                      position: 'bottom',
                      scaleLabel: {
                          display: true,
                          labelString: 'Credit Score'
                      }
                  }],
                  yAxes: [{
                      type: 'linear',
                      scaleLabel: {
                          display: true,
                          labelString: 'Home Ownership'
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


