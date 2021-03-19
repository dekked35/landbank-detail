export const feasDetail = {
  spendings: {
    common: {
      greenArea: [
        { name: 'Road', price: '100', spending: '100' },
        { name: 'Food Path', price: '100', spending: '100' },
        { name: 'Drainge', price: '100', spending: '100' },
        { name: 'Manhole', price: '100', spending: '100' },
      ],
      electric: [
        { name: '1ชั้น', building: '200', pricePerHouse: '1000' },
        { name: '2ชั้น', building: '100', pricePerHouse: '2000' },
        { name: '3ชั้น', building: '50', pricePerHouse: '3000' },
      ],

      water: [
        { name: '1ชั้น', building: '200', pricePerHouse: '1000' },
        { name: '2ชั้น', building: '100', pricePerHouse: '2000' },
        { name: '3ชั้น', building: '50', pricePerHouse: '3000' },
      ],
      areaForFill: {
        rai: 1,
        ngan: 2,
        wa: 4,
      },
      landCost: {
        lc_price_per_rai: '100000',
        pricePerWa: '250',
      },
      landFill: {
        lengthForFillPerMeter: '1',
        area: '100',
        lengthInSystem: '100000',
        priceForFill: '100000',
      },
      roadAndGreen: {
        primaryRoad: {
          realSize: '10000',
          roadWidth: '12',
          aroundAllArea: '10000',
          pricePerMeter: '100',
        },
        secondaryRoad: {
          realSize: '10000',
          roadWidth: '6',
          aroundAllArea: '10000',
          pricePerMeter: '100',
        },
        catagory: [
          { name: 'foodPath', area: '100', pricePerUnit: '100' },
          { name: 'drainge', area: '100', pricePerUnit: '100' },
          { name: 'manHole', area: '100', pricePerUnit: '100' },
        ],
        realSizeGreen: '100',
        realAreaGreen: '80',
        pricePerMeterGreen: '10000',
        standardPriceGreen: '100',
        allPrice: 10000,
      },

      architecture: {
        priceHouse1: '20000',
        priceHouse2: '20000',
        priceHouse3: '20000',
        priceHouse4: '20000',
        priceHouse5: '20000',
      },

      landscape: {
        priceStructure: '20000',
      },

      housePermit: {
        allBuilding: '20',
        pricePerBuilding: '20000',
        allPrice: 400000,
      },

      subdivision: {
        allBuilding: '20',
        pricePerBuilding: '20000',
        allPrice: 400000,
      },
      selected: {
        gate: '',
        fence: '',
        common: {
          security: '',
          sale_office: '',
          clubhouse: '',
          fitness: '',
          swimming_pool: '',
        },
      },
    },
    operation: {
      expense: [
        { name: 'พนักงานขาย', amount: '20', price: '10000', showBox: false },
        {
          name: 'วิศวกรคุมโครงการ',
          amount: '20',
          price: '10000',
          showBox: false,
        },
        { name: 'Foreman', amount: '10', price: '10000', showBox: false },
        { name: 'รปภ.', amount: '10', price: '10000', showBox: false },
        { name: 'แม่บ้าน', amount: '30', price: '10000', showBox: false },
        { name: 'บัญชี', amount: '5', price: '10000', showBox: false },
      ],
      software: [{ name: 'Miscellaneous', price: '10000' }],
      marketing: [
        { name: 'marketing_expense', allSale: '100000', price: '30000' },
        { name: 'cmr_ce', allSale: '100000', price: '7000' },
      ],
      marketingPerMonth: '1000000',
      electricPrice: '10000',
      waterPrice: '10000',
      month: 12
    },
  },
};
