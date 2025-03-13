import { RequiredOptions } from 'prettier';
import { ParserPlugin } from '@babel/parser';

export interface PrettierOptions extends RequiredOptions {
    importOrder: string[];
    importOrderSeparation: boolean;
    experimentalBabelParserPluginsList: ParserPlugin[];
    importRoot: string;
    excludeThirdModules?: string;
}

export type ThirdPartyModulesRegExp = Record<
    'full' | 'left' | 'other',
    RegExp | null
>;
