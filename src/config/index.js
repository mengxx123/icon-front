let apiDomain
if (process.env.NODE_ENV === 'production') {
    apiDomain = 'https://apifont.yunser.com'
} else {
    apiDomain = 'https://apifont.yunser.com'
    // apiDomain = 'http://localhost:1027'
}

module.exports = {
    apiDomain
}
