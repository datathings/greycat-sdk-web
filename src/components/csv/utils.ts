import { io } from '@greycat/sdk';

export enum ColumnType {
  String,
  Enum,
  Bool,
  Float,
  Int,
  Date,
  Undefined
}

export function getColumnType(stats: io.CsvColumnStatistics): ColumnType {
  let type_count = 0;
  let type: ColumnType = ColumnType.Undefined;
  let count = 0;
  
  if (stats.int_count) {
    type_count++;
    type = ColumnType.Int;
    count += stats.int_count as number;
  }
  if (stats.float_count) {
    type_count++;
    type = ColumnType.Float;
    count += stats.float_count as number;
  }
  if (stats.string_count) {
    type_count++;
    type = ColumnType.String;
    count += stats.string_count as number;
  }
  if (stats.date_count) {
    type_count++;
    type = ColumnType.Date;
    count += stats.date_count as number;
  }
  if (stats.bool_count) {
    type_count++;
    type = ColumnType.Bool;
    count += stats.bool_count as number;
  }

  if (type_count == 0) {
    return ColumnType.Undefined;
  }

  if (type_count > 1) { // If we have multiple types, it's string
    type = ColumnType.String;
    return type;
  }

  if (isEnum(stats, count)) {
    type = ColumnType.Enum;
    return type;
  }
  
  return type;
}

// This function will be deprecated, once GreyCat CsvColumnStatistics will provide info if enum_limit is exceeded.
// This is a temporary solution.
function isEnum(stats: io.CsvColumnStatistics, count: number): boolean {
  let words_count = 0;
  for (const cnt of stats.word_list.values()) {
    words_count += cnt as number;
  }

  if (words_count < count) {
    return false;
  } else {
    return true;
  }
}