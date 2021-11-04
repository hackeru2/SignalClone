var fun = async function() {
  let execute = __dirname + '/ccode/program hiii amir'
  //gcc -Wall -o program main.c && ./program hiii amir
  var result = ''
  let _err = ''
  var exec = require('child_process').exec
  var child = await exec(execute, function(err, data, stderr) {
    // console.log(data, stderr);
    _err = err
  })

  child.stdout.on('data', function(data) {
    result += data
  })
  child.on('close', function() {
    console.log('done')
    console.log(result)
    console.log({ result, execute, _err })
  })
}

fun()
