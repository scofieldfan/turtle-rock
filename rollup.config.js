import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import multiEntry from "rollup-plugin-multi-entry";

export default [
    {
        file: 'lib/turtle.js',
        format: 'cjs',
    },
    {
        file: 'lib/turtle.m.js',
        format: 'esm',
    }
].map(output => ({
    input: 'src/*.js',
    output,
    plugins: [
        babel({
            presets: ['@babel/preset-env'],
        }),
        postcss({ extract: !0 }), // 构建样式文件时需要这个插件
        multiEntry()
    ],
}));