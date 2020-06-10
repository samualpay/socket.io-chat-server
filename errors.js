class RequiredParameterNotFound extends Error {
  constructor () {
    super('RequiredParameterNotFound')
    this.status = -20001
    this.msg = 'RequiredParameterNotFound'
    this.isCustom = true
  }
}
module.exports = {
  RequiredParameterNotFound: new RequiredParameterNotFound()
}
