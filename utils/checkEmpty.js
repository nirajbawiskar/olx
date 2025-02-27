const validator = require("validator")

exports.checkEmpty = (confiq) => {
    let isError = false
    const error = []
    for (const key in confiq) {
        if (validator.isEmpty(confiq[key] ? toString(confiq[key]) : "")) {
            isError: true
            error.push(`${key} is required`)

        }
    }
    return { isError, error }
}