import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import multiEntry from "rollup-plugin-multi-entry";

export default [
    {
        file: "lib/turtle.js",
        format: "cjs"
    },
    {
        file: "lib/turtle.m.js",
        format: "esm"
    }
].map(output => ({
    input: "src/*.js",
    output,
    plugins: [
        babel({
            runtimeHelpers: true,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        targets: {
                            browsers: [
                                "> 1%",
                                "last 2 versions",
                                "not ie <= 8"
                            ],
                            node: "current"
                        }
                    }
                ]
            ],
            plugins: [
                [
                    "@babel/plugin-transform-runtime",
                    {
                        regenerator: true
                    }
                ]
            ]
        }),
        postcss({ extract: !0 }), // 构建样式文件时需要这个插件
        multiEntry()
    ]
}));
