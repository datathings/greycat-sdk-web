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

export function getPercentage(stats: io.CsvColumnStatistics, type: ColumnType) {
  const sum = (stats.int_count as number) + (stats.float_count as number) + (stats.bool_count as number) + (stats.date_count as number) + (stats.string_count as number) + (stats.null_count as number);

  if (!sum) {
    return 0;
  }

  let count = 0;
  switch(type) {
    case ColumnType.Null:
      count = (stats.null_count as number);
      break;
    case ColumnType.Int:
      count = (stats.int_count as number);
      break;
    case ColumnType.Float:
      count = (stats.float_count as number);
      break;
    case ColumnType.Bool:
      count = (stats.bool_count as number);
      break;
    case ColumnType.Date:
      count = (stats.date_count as number);
      break;
    case ColumnType.String:
      count = (stats.string_count as number);
      break;
    default:
      return 0;
  }

  return Number(((count / sum) * 100).toFixed(3));
}

export function getColumnType(stats: io.CsvColumnStatistics): ColumnType {
  const typesPresent: ColumnType[] = [];

  if (stats.int_count > 0) {
    typesPresent.push(ColumnType.Int);
  }
  if (stats.float_count > 0) {
    typesPresent.push(ColumnType.Float);
  }
  if (stats.string_count > 0) {
    typesPresent.push(ColumnType.String);
  }
  if (stats.date_count > 0) {
    typesPresent.push(ColumnType.Date);
  }
  if (stats.bool_count > 0) {
    typesPresent.push(ColumnType.Bool);
  }

  const isEnum = isValidEnum(stats) && typesPresent.length === 1;

  if (isEnum) {
    return ColumnType.Enum;
  }
  if (typesPresent.length === 0) {
    return ColumnType.Undefined;
  }
  if (typesPresent.length > 2 || (stats.null_count && typesPresent.length > 1)) {
    return ColumnType.Undefined;
  }

  return typesPresent[0];
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