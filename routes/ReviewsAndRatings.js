const express = require('express')
const { getAllReviews, createNewReview, deleteReview, updateReview } = require('../Controllers/ReviewsAndRatings')
const RatingReviewsrouter = express.Router()
const verifyJWT = require('../middleware/verifyJWT')


RatingReviewsrouter.get('/:id', getAllReviews)
RatingReviewsrouter.post('/', verifyJWT ,createNewReview)
RatingReviewsrouter.delete('/:id', verifyJWT ,deleteReview)
RatingReviewsrouter.patch('/:id', verifyJWT , updateReview)

module.exports = RatingReviewsrouter