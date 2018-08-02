import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/main.ts',
    output: {
        format: 'umd',
        name: 'vivid',
        file: 'dist/vivid.umd.js',
    },
    plugins: [
        typescript(),
    ],
};
