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

  if (type_count == 0) {
    return ColumnType.Undefined;
  }

  if (type_count > 1) { // If we have multiple types, it's string
    type = ColumnType.String;
    return type;
  }

  if (stats.word_list_overflow == false && stats.word_list.size) {
    type = ColumnType.Enum;
    return type;
  }
  
  return type;
}