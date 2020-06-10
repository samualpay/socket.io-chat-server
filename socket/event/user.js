module.exports = [
  {
    event: 'login',
    runners: [
      (req) => {
        console.log(req)
      }
    ]
  }
]
