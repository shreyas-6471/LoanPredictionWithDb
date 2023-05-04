let positive, negative;
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
  var ctx = document.getElementById('myPieChart').getContext('2d');
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {}
  });
});
