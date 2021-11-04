/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var exec = require('child_process').exec
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
/**********************
 * Example get method *
 **********************/
app.get('/pets', async function(req, res) {
  // Add your code here
  // res.json({ success: 'pets get call succeed!', url: req.url })

  let reqQuery = JSON.stringify(req.query)

  var result = ''
  let _err = ''

  var fun = function() {
    let execute = __dirname + '/ccode/compiled hiii amir'
    //gcc -Wall -o program main.c && ./program hiii amir
    var child = exec(execute, function(err, data, stderr) {
      // console.log(data, stderr);
      _err = err
    })

    child.stdout.on('data', function(data) {
      result += data
    })
    child.on('close', function() {
      console.log('done yes!!!!! 3456664')
      console.log(result)
      res.json({
        result,
        execute,
        _err,
        fileExists: fs.existsSync(__dirname + '/ccode/compiled.js')
      })
    })
  }

  await fun()
})

app.get('/pets/*', function(req, res) {
  const pets = ['pet1', 'pet2', 'pet3', 'pet4', 'pet5']
  // Add your code here
  res.json({
    success: 'pets get call succeed!',
    url: req.url,
    pets,

    params: req.params
  })
})

/****************************
 * Example post method *
 ****************************/

app.post('/pets', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
})

app.post('/pets/*', function(req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
})

/****************************
 * Example put method *
 ****************************/

app.put('/pets', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
})

app.put('/pets/*', function(req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
})

/****************************
 * Example delete method *
 ****************************/

app.delete('/pets', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url })
})

app.delete('/pets/*', function(req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url })
})

app.listen(3000, function() {
  console.log('App started')
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
