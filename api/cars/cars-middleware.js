const Cars = require('./cars-model')

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id).then(car => {
    if (car) {
      req.verified = car
      next()
    } else {
      next({status: 404, message: `car with id ${id} is not found`})
    }
  })
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage, title, transmission } = req.body;
  function errorItem(item) {
    return res.status(400).json({message: `${item} is missing`})
  }
  if(!vin){
    errorItem("vin")
  } else if (!make) {
    errorItem("make")
  } else if (!model) {
    errorItem("model")
  } else if (!mileage) {
    errorItem("mileage")
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}