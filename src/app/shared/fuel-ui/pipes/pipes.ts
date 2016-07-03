import {FORMAT_PROVIDERS} from './Format/Format';
import {MAPTOITERABLE_PROVIDERS} from './MapToIterable/MapToIterable';
import {ORDERBY_PROVIDERS} from './OrderBy/OrderBy';
import {RANGE_PROVIDERS} from './Range/Range';

export var FUELUI_PIPE_PROVIDERS = [
  FORMAT_PROVIDERS,
  MAPTOITERABLE_PROVIDERS,
  ORDERBY_PROVIDERS,
  RANGE_PROVIDERS
];
export * from './Format/Format';
export * from './MapToIterable/MapToIterable';
export * from './OrderBy/OrderBy';
export * from './Range/Range';
