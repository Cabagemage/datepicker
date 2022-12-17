import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { babel } from "@rollup/plugin-babel";
import { terser } from "@wwa/rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";
import cleanup from "rollup-plugin-cleanup";

const limitBytes = 1e6;
const onAnalysis = ({ bundleSize }) => {
	console.info(bundleSize);
	if (bundleSize < limitBytes) return;
	console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
	return process.exit(1);
};

export default {
	input: "src/index.ts",
	output: [
		{
			dir: "dist",
			format: "cjs",
			sourcemap: true,
			preserveModules: false,
		},
	],
	external: ["react", "react-dom", "classnames"],
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		babel({
			exclude: "node_modules/**",
		}),
		analyze({ onAnalysis, skipFormatted: true }),
		commonjs({ transformMixedEsModules: true }),
		typescript({ tsconfig: "./tsconfig.json" }),
		postcss({
			extract: "datePicker.css",
		}),
		terser(),
		cleanup(),
	],
};
