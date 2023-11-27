import { io } from '@greycat/sdk';

export enum ColumnType {
  String,
  Enum,
  Bool,
  Float,
  Int,
  Date,
  Null,
  Undefined
}

export function getColumnType(stats: io.CsvColumnStatistics): ColumnType {
  let type_count = 0;
  let type: ColumnType = ColumnType.Undefined;

  if (stats.int_count) {
    type_count++;
    type = ColumnType.Int;
  }
  if (stats.float_count) {
    type_count++;
    type = ColumnType.Float;
  }
  if (stats.string_count) {
    type_count++;
    type = ColumnType.String;
  }
  if (stats.date_count) {
    type_count++;
    type = ColumnType.Date;
  }
  if (stats.bool_count) {
    type_count++;
    type = ColumnType.Bool;
  }
  if (stats.null_count) {
    type_count++;
  }

  if (isValidEnum(stats) && ((type_count == 1) || (type_count == 2 && stats.null_count && stats.string_count))) {
    type = ColumnType.Enum;
    return type;
  }

  if (type_count == 0) {
    return ColumnType.Undefined;
  }

  // If we have multiple types, it's string
  if ((!stats.null_count && type_count > 1) || (stats.null_count && type_count > 2)) {
    type = ColumnType.String;
    return type;
  }
  
  return type;
}

// This is a temporary solution.
// This function should be deprecated, once GreyCat CsvColumnStatistics will provide info if enum_limit has been exceeded.
function isValidEnum(stats: io.CsvColumnStatistics): boolean {
  let words_count = 0;
  for (const cnt of stats.word_list.values()) {
    words_count += cnt as number;
  }

  if (words_count > 0 && words_count == stats.string_count) {
    return true;
  } else {
    return false;
  }
}