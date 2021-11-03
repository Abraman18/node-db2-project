// const { json } = require('express')
const router = require('express').Router()
const Cars = require('./cars-model')

router.get('/', async (req, res, next) => {
	await Cars.getAll(req.query)
		.then(cars => {
		res.status(200).json(cars)
		})
	.catch(next)
})

module.exports = router;
