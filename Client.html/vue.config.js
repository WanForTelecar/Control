module.exports = {
    publicPath: './',
    outputDir: '../www',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: true,
    filenameHashing: true,
    devServer: {
        https: false,
        port: 4562
        // proxy: {
        //     '/api': {
        //         // 此处的写法，目的是为了 把上面  /api 替换成 http://127.0.0.1:3000/
        //         // 如果使用的是自己封装的请求函数 那么你应该这样写 baseURL: '',
        //         // 注意这里的 api 是必须的，因为是有代理的缘故
        //         target: 'https://caner.top',
        //             // 允许跨域
        //         changeOrigin: true
        //     }
        // }
    }
}