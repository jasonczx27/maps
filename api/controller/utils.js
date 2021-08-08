

function isvalidNumber(n) {
    return n && !isNaN(n) && parseInt(n) > 0
}

module.exports = {
    isvalidNumber
}