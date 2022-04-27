const PROXY_CONFIG = [{
    context: ['/api'],
    target: 'https://colmeia-facial-recognition.herokuapp.com',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' },
    changOrigin: true
}];

module.exports = PROXY_CONFIG;