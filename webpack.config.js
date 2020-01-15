module.exports = {
    entry: ['@babel/polyfill', './src/main.js'],
    output: {
        path: __dirname + './public',
        filename: 'bundle.js'
    },
    devServer: {
        // caminho para onde ele deve abrir um servbidor da nossa aplicação, que geralmente é no index.html
        contentBase: __dirname + '/public'
    },
    module: {
        // como o webpack deve se comportar quando o usuário quiser importar novos arquivos js
        // vamos falar, baseado na extensão do arquivo, qual loader ele vai usar
        rules: [
            {
                // falando para buscar arquivos com extensão js
                test: /\.js$/,
                // exluir a pasta node_modules da busca
                exclude: /node_modules/,
                use: {
                    // necessário instalar pelo npm
                    loader: 'babel-loader',
                }
            }
        ]
    }
}