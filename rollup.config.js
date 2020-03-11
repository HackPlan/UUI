import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		output: [{
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      globals: {
        'lodash': 'Lodash',
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      globals: {
        'lodash': 'Lodash',
        'react': 'React',
        'react-dom': 'ReactDOM'
      },
    }],
    external: ['lodash', 'react', 'react-dom'],
		plugins: [
			resolve(),
      commonjs(),
      typescript({
        exclude: ['stories/**/*.tsx']
      }),
      postcss({
        sourceMap: true,
        extract: true,
      }),
		]
	},
];