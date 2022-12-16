import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { babel } from "@rollup/plugin-babel";
import { terser } from "@wwa/rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";
import cleanup from "rollup-plugin-cleanup";
const packageJson = require("./package.json");

const limitBytes = 1e6;
const onAnalysis = ({ bundleSize }) => {
	console.info(bundleSize);
	if (bundleSize < limitBytes) return;
	console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
	return process.exit(1);
};

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
		],
		external: ["react", "react-dom", "classnames"],
		plugins: [
			resolve(),
			babel({
				exclude: "node_modules/**",
				presets: ["@babel/preset-react"],
			}),
			analyze({ onAnalysis, skipFormatted: true }),
			commonjs({ transformMixedEsModules: true }),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss(),
			terser(),
			cleanup(),
		],
	},
	{
		input: "dist/cjs/dist/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "es" }],
		plugins: [dts.default()],
		external: [/\.css$/],
	},
];
