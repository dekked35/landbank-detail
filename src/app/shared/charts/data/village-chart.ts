export const chartsType = {
  area: {
    chart: {
      // width: 380,
      type: 'pie',
      fontFamily: 'Prompt',
    },
    legend: {
      position: 'bottom',
      fontSize: '18px',
      fontWeight: '800',
    },
    colors: ['#2060be', '#ffb02d', '#3abe6b', '#be2038'],
    labels: ['พื้นที่ขาย', 'ถนน', 'พื้นที่สีเขียว', 'พื่นที่ส่วนกลาง'],
    series: [1, 1, 1],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
  },
  houseType: {
    chart: {
      // width: 380,
      type: 'pie',
      fontFamily: 'Prompt',
    },
    legend: {
      show: false,
    },
    colors: ['#2060be', '#ffb02d', '#3abe6b'],
    labels: ['Type A', 'Type B', 'Type C'],
    series: [1, 1, 1],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
  }
};
