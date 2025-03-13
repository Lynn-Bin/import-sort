import path from 'path';
import { ThirdPartyModulesRegExp } from '../types';

/**
 * Get third party modules from `package.json`.
 * dependencies and devDependencies include third party modules
 */
export const getThirdPartyModulesRegExp = (
    importRoot: string,
): ThirdPartyModulesRegExp => {
    let pkg = { dependencies: {}, devDependencies: {} };
    try {
        pkg = require(path.resolve(importRoot, 'package.json'));
    } catch (e) {
        // do nothing
    }

    const dependencies = Object.assign(
        {},
        pkg.dependencies,
        pkg.devDependencies,
    );

    const needFullMatch = new Set();
    const onlyLeftMatch = new Set();
    Object.keys(dependencies).forEach((item) => {
        if (!/^@[^\/]+(\/[^\/]+)+$/.test(item)) {
            needFullMatch.add(item);
        } else {
            onlyLeftMatch.add(item.split('/')[0] + '\\/');
        }
    });
    const needFullMatchList = Array.from(needFullMatch);
    const onlyLeftMatchList = Array.from(onlyLeftMatch);

    const regExps: ThirdPartyModulesRegExp = {
        full: null,
        left: null,
        other: new RegExp('^[^.\\/]'),
    };
    if (needFullMatchList.length > 0) {
        regExps.full = new RegExp(`^(${needFullMatchList.join('|')})$`);
    }
    if (onlyLeftMatchList.length > 0) {
        regExps.left = new RegExp(`^(${onlyLeftMatchList.join('|')})`);
    }

    return regExps;
};
