class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap('My Plugin', stats => {
        //     console.log('My Plugin: done');
        // })
        compiler.plugin('emit', (compilation, callback) => {
            const source = compilation.assets['main.js'].source();
        
            compilation.assets['main.js'].source = () => {
                const banner = [
                    '/**',
                    ' *  Banner Plugin done',
                    ' *  Build Date : 2020-04-12',
                    ' */'
                ].join('\n');
                return banner + "\n" + source;
            }    

            callback();
        })
    }
}

module.exports = MyWebpackPlugin;