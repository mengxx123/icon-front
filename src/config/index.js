let apiDomain
if (process.env.NODE_ENV === 'production') {
    apiDomain = 'https://api.font.yunser.com'
} else {
    apiDomain = 'http://localhost:1027'
}

module.exports = {
    apiDomain
}
