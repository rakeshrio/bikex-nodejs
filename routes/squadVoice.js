const express = require('express');

const router = express.Router();


router.post('/', async (req, res) => {
    console.log(req.body)
    res.send({"msg":"We have recorded the response"}).status(200).end()
  })

  module.exports = router;