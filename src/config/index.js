let apiDomain
if (process.env.NODE_ENV === 'production') {
    apiDomain = 'http://apifont.yunser.com'
} else {
    apiDomain = 'http://apifont.yunser.com'
    // apiDomain = 'http://localhost:1027'
}

module.exports = {
    apiDomain
}
