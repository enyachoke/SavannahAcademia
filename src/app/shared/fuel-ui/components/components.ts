import {DATE_PICKER_PROVIDERS} from './DatePicker/DatePickerProviders';
import {MODAL_PROVIDERS} from './Modal/Modal';
import {PAGINATION_PROVIDERS} from './Pagination/Pagination';
import {INFINITE_SCROLLER_PROVIDERS} from './InfiniteScroller/InfiniteScroller';
import {TAB_PROVIDERS} from './Tab/Tab';
import {TABLESORTABLE_PROVIDERS} from './TableSortable/TableSortable';
import {TIMEPICKER_PROVIDERS} from './TimePicker/TimePicker';

export var FUELUI_COMPONENT_PROVIDERS = [
  DATE_PICKER_PROVIDERS,
  MODAL_PROVIDERS,
  PAGINATION_PROVIDERS,
  INFINITE_SCROLLER_PROVIDERS,
  TABLESORTABLE_PROVIDERS,
  TAB_PROVIDERS,
  TIMEPICKER_PROVIDERS
];

export * from './DatePicker/DatePickerProviders';
export * from './Modal/Modal';
export * from './Pagination/Pagination';
export * from './InfiniteScroller/InfiniteScroller';
export * from './Tab/Tab';
export * from './Tab/TabSet';
export * from './TableSortable/TableSortable';
export * from './TableSortable/TableSortableColumn';
export * from './TableSortable/TableSortableSorting';
export * from './TimePicker/TimePicker';
