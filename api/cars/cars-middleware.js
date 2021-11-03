const Cars = require('./cars-model')
const vinValidator = require('vin-validator');


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
  const { vin, make, model, mileage,
    title, transmission } = req.body;
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
  const { vin } = req.body
  const validated = vinValidator.validate(vin)
  if (validated) {
    next()
  } else {
    res.status(400).json({message: `vin ${vin} is invalid`})
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  Cars.checkVin(vin)
    .then(car => {
      if (car) {
      res.status(400).json({message: `vin ${vin} already exists`})
      } else {
        next()
    }
    })
  .catch(next)
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}