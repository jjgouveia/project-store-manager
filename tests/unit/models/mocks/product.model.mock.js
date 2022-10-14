const productsFromDB = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  },
];

const deleteProductsFromDB = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
];

const productsList = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const newProduct = {
  "name": "Rompe-Tormentas"
};

const productToUpdate = { id: 1, name: "F.R.I.D.A.Y." };

const invalidProductIdEdit = { id: 999999, name: "Tapa-Olho do Nick Fury" };

const invalidProductNameEdit = { id: 1, name: "Joke" };

const queryExpected = [
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  },
]

module.exports = {
  productsFromDB,
  productsList,
  newProduct,
  deleteProductsFromDB,
  productToUpdate,
  invalidProductIdEdit,
  invalidProductNameEdit,
  queryExpected
}