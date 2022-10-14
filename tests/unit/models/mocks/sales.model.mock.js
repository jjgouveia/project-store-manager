const salesFromDB = [
  {
    "id": 1,
    "date": "2022-10-13 16:15:00"
  },
  {
    "id": 2,
    "date": "2022-10-13 16:15:00"
  }
];

const expetedResponse = [
  {
    "id": 1,
    "date": "2022-10-13 16:15:00"
  },
  {
    "id": 2,
    "date": "2022-10-13 16:15:00"
  }
];

const allSalesById = [
  {
    date: "2017-10-29T08:29:00.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-01-23T12:00:00.000Z",
    productId: 2,
    quantity: 2,
  },
];

const ResponseAllSalesById = [
  {
    date: "2017-10-29T08:29:00.000Z",
    productId: 1,
    quantity: 2,
  }
];

const insertSalesModelMock = "2015-05-25 16:15:00";

module.exports = {
  expetedResponse,
  insertSalesModelMock,
  salesFromDB,
  allSalesById,
  ResponseAllSalesById,
}
 