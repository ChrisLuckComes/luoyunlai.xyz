export const CODE = `\`\`\`js
export function add(a,b){
    return a+b;
}
export const memorizedAdd = window.memorize(add);
\`\`\``;

export const CODE_1 = `\`\`\`js
import { memorize } from "./util";

export function add(a,b){
    return a+b;
}

export const memorizedAdd = memorize(add);
\`\`\``;

export const CODE_2 = `\`\`\`js
export default {
    add(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    }
};

export class Number {
    constructor(num) {
      this.num = num;
    }
    add(num) {
      return this.num + num;
    }
    subtract(num) {
      return this.num - num;
    }
}
\`\`\``;

export const USED = `\`\`\`js
HarmonyExportSpecifierDependency.Template = class HarmonyExportSpecifierDependencyTemplate extends (
	NullDependency.Template
) {
	/**
	 * @param {Dependency} dependency the dependency for which the template should be applied
	 * @param {ReplaceSource} source the current replace source which can be modified
	 * @param {DependencyTemplateContext} templateContext the context object
	 * @returns {void}
	 */
	apply(
		dependency,
		source,
		{ module, moduleGraph, initFragments, runtime, concatenationScope }
	) {
		const dep = /** @type {HarmonyExportSpecifierDependency} */ (dependency);
		if (concatenationScope) {
			concatenationScope.registerExport(dep.name, dep.id);
			return;
		}
		const used = moduleGraph
			.getExportsInfo(module)
			.getUsedName(dep.name, runtime);
		if (!used) {
			const set = new Set();
			set.add(dep.name || "namespace");
			initFragments.push(
				new HarmonyExportInitFragment(module.exportsArgument, undefined, set)
			);
			return;
		}

		const map = new Map();
		map.set(used, \`/* binding */ \${dep.id}\`);
		initFragments.push(
			new HarmonyExportInitFragment(module.exportsArgument, map, undefined)
		);
	}
};

module.exports = HarmonyExportSpecifierDependency;
\`\`\``;

export const NEXTTICK = `\`\`\`js
// vue2.x
import Vue from "vue";

Vue.$nextTick(()=>{...});

// vue3.x
import { nextTick } from "Vue";

nextTick(()=>{...})
\`\`\``;
