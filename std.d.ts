// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace core {
    class t3f extends gc.sdk.std_n.core.t3f {}

    class SamplingMode extends gc.sdk.GCEnum {
      static readonly _type = 'core::SamplingMode';
      static readonly $fields: SamplingMode[];
      key: SamplingMode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SamplingMode.Field, value?: unknown);
      static fixed: SamplingMode;
      static fixed_reg: SamplingMode;
      static adaptative: SamplingMode;
      static dense: SamplingMode;
    }
    namespace SamplingMode  {
      type Field = 'fixed'|'fixed_reg'|'adaptative'|'dense';
    }

    class nodeGeo$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeGeo$sample$args';
      refs: globalThis.Array<gc.core.nodeGeo>;
      from: gc.core.geo | null;
      to: gc.core.geo | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      constructor(refs: globalThis.Array<gc.core.nodeGeo>, from: gc.core.geo | null, to: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeGeo>, from?: gc.core.geo | null, to?: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode}): nodeGeo$sample$args;
    }

    class nodeTimeSingleton extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTimeSingleton';
      t: gc.core.time;
      v: any;
      constructor(t: gc.core.time, v: any);
      static createFrom(fields: {t: gc.core.time, v: any}): nodeTimeSingleton;
    }

    class str extends gc.sdk.std_n.core.str {}

    class int extends gc.sdk.std_n.core.int {}

    class nodeTime<T = any> extends gc.sdk.std_n.core.nodeTime<T> {
      static info(nodes: globalThis.Array<gc.core.nodeTime>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>;
      static sample(refs: globalThis.Array<gc.core.nodeTime>, from: gc.core.time | null, to: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class function_ extends gc.sdk.std_n.core.function_ {}

    class CalendarUnit extends gc.sdk.GCEnum {
      static readonly _type = 'core::CalendarUnit';
      static readonly $fields: CalendarUnit[];
      key: CalendarUnit.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: CalendarUnit.Field, value?: unknown);
      static year: CalendarUnit;
      static month: CalendarUnit;
      static day: CalendarUnit;
      static hour: CalendarUnit;
      static minute: CalendarUnit;
      static second: CalendarUnit;
      static microsecond: CalendarUnit;
    }
    namespace CalendarUnit  {
      type Field = 'year'|'month'|'day'|'hour'|'minute'|'second'|'microsecond';
    }

    class bool extends gc.sdk.std_n.core.bool {}

    class Date extends gc.sdk.GCObject {
      static readonly _type = 'core::Date';
      year: number | bigint;
      month: number | bigint;
      day: number | bigint;
      hour: number | bigint;
      minute: number | bigint;
      second: number | bigint;
      microsecond: number | bigint;
      constructor(year: number | bigint, month: number | bigint, day: number | bigint, hour: number | bigint, minute: number | bigint, second: number | bigint, microsecond: number | bigint);
      static createFrom(fields: {year: number | bigint, month: number | bigint, day: number | bigint, hour: number | bigint, minute: number | bigint, second: number | bigint, microsecond: number | bigint}): Date;
      static fromTime(time: gc.core.time, tz?: gc.core.TimeZone | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Date>;
    }

    class nodeIndex<K = any, V = any> extends gc.sdk.std_n.core.nodeIndex<K, V> {
      static info(nodes: globalThis.Array<gc.core.nodeIndex>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo>>;
      static sample(refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class NodeInfo<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::NodeInfo';
      size: number | bigint;
      from: T | null;
      to: T | null;
      constructor(size: number | bigint, from?: T | null, to?: T | null);
      static createFrom<T>(fields: {size: number | bigint, from?: T | null, to?: T | null}): NodeInfo;
    }

    class nodeIndex$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$sample$args';
      refs: globalThis.Array<gc.core.nodeIndex>;
      from: any | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      constructor(refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeIndex>, from?: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode}): nodeIndex$sample$args;
    }

    class Tuple<T = any, U = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::Tuple';
      x: T | null;
      y: U | null;
      constructor(x?: T | null, y?: U | null);
      static createFrom<T, U>(fields: {x?: T | null, y?: U | null}): Tuple;
    }

    class Buffer extends gc.sdk.std_n.core.Buffer {}

    class nodeTime$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTime$info$args';
      nodes: globalThis.Array<gc.core.nodeTime>;
      constructor(nodes: globalThis.Array<gc.core.nodeTime>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeTime>}): nodeTime$info$args;
    }

    class nodeGeo$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeGeo$info$args';
      nodes: globalThis.Array<gc.core.nodeGeo>;
      constructor(nodes: globalThis.Array<gc.core.nodeGeo>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeGeo>}): nodeGeo$info$args;
    }

    class t3 extends gc.sdk.std_n.core.t3 {}

    class GeoCircle extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoCircle';
      center: gc.core.geo;
      radius: number;
      constructor(center: gc.core.geo, radius: number);
      static createFrom(fields: {center: gc.core.geo, radius: number}): GeoCircle;
    }

    class Error extends gc.sdk.GCObject {
      static readonly _type = 'core::Error';
      message: string | null;
      stack: globalThis.Array<gc.core.ErrorFrame>;
      constructor(message: string | null, stack: globalThis.Array<gc.core.ErrorFrame>);
      static createFrom(fields: {message?: string | null, stack: globalThis.Array<gc.core.ErrorFrame>}): Error;
    }

    class Array<T = any> extends gc.sdk.std_n.core.Array<T> {}

    class nodeList$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeList$sample$args';
      refs: globalThis.Array<gc.core.nodeList>;
      from: number | bigint | null;
      to: number | bigint | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      maxDephasing: number | bigint | null;
      constructor(refs: globalThis.Array<gc.core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeList>, from?: number | bigint | null, to?: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null}): nodeList$sample$args;
    }

    class nodeList$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeList$info$args';
      nodes: globalThis.Array<gc.core.nodeList>;
      constructor(nodes: globalThis.Array<gc.core.nodeList>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeList>}): nodeList$info$args;
    }

    class GeoPoly extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoPoly';
      points: globalThis.Array<gc.core.geo>;
      constructor(points: globalThis.Array<gc.core.geo>);
      static createFrom(fields: {points: globalThis.Array<gc.core.geo>}): GeoPoly;
    }

    class t2f extends gc.sdk.std_n.core.t2f {}

    class TimeZone extends gc.sdk.GCEnum {
      static readonly _type = 'core::TimeZone';
      static readonly $fields: TimeZone[];
      key: TimeZone.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TimeZone.Field, value?: unknown);
      static Africa_Accra: TimeZone;
      static Africa_Bamako: TimeZone;
      static Africa_Banjul: TimeZone;
      static Africa_Conakry: TimeZone;
      static Africa_Dakar: TimeZone;
      static Africa_Freetown: TimeZone;
      static Africa_Lome: TimeZone;
      static Africa_Nouakchott: TimeZone;
      static Africa_Ouagadougou: TimeZone;
      static Africa_Timbuktu: TimeZone;
      static Atlantic_Reykjavik: TimeZone;
      static Atlantic_St_Helena: TimeZone;
      static Iceland: TimeZone;
      static Egypt: TimeZone;
      static Africa_Maseru: TimeZone;
      static Africa_Mbabane: TimeZone;
      static Africa_Bangui: TimeZone;
      static Africa_Brazzaville: TimeZone;
      static Africa_Douala: TimeZone;
      static Africa_Kinshasa: TimeZone;
      static Africa_Libreville: TimeZone;
      static Africa_Luanda: TimeZone;
      static Africa_Malabo: TimeZone;
      static Africa_Niamey: TimeZone;
      static Africa_Porto_Novo: TimeZone;
      static Africa_Blantyre: TimeZone;
      static Africa_Bujumbura: TimeZone;
      static Africa_Gaborone: TimeZone;
      static Africa_Harare: TimeZone;
      static Africa_Kigali: TimeZone;
      static Africa_Lubumbashi: TimeZone;
      static Africa_Lusaka: TimeZone;
      static Africa_Addis_Ababa: TimeZone;
      static Africa_Asmara: TimeZone;
      static Africa_Asmera: TimeZone;
      static Africa_Dar_es_Salaam: TimeZone;
      static Africa_Djibouti: TimeZone;
      static Africa_Kampala: TimeZone;
      static Africa_Mogadishu: TimeZone;
      static Indian_Antananarivo: TimeZone;
      static Indian_Comoro: TimeZone;
      static Indian_Mayotte: TimeZone;
      static Libya: TimeZone;
      static America_Atka: TimeZone;
      static US_Aleutian: TimeZone;
      static US_Alaska: TimeZone;
      static America_Buenos_Aires: TimeZone;
      static America_Argentina_ComodRivadavia: TimeZone;
      static America_Catamarca: TimeZone;
      static America_Cordoba: TimeZone;
      static America_Rosario: TimeZone;
      static America_Jujuy: TimeZone;
      static America_Mendoza: TimeZone;
      static US_Central: TimeZone;
      static America_Shiprock: TimeZone;
      static Navajo: TimeZone;
      static US_Mountain: TimeZone;
      static US_Michigan: TimeZone;
      static America_Yellowknife: TimeZone;
      static Canada_Mountain: TimeZone;
      static Canada_Atlantic: TimeZone;
      static Cuba: TimeZone;
      static America_Fort_Wayne: TimeZone;
      static America_Indianapolis: TimeZone;
      static US_East_Indiana: TimeZone;
      static America_Knox_IN: TimeZone;
      static US_Indiana_Starke: TimeZone;
      static America_Pangnirtung: TimeZone;
      static Jamaica: TimeZone;
      static America_Louisville: TimeZone;
      static US_Pacific: TimeZone;
      static Brazil_West: TimeZone;
      static Mexico_BajaSur: TimeZone;
      static Mexico_General: TimeZone;
      static US_Eastern: TimeZone;
      static Brazil_DeNoronha: TimeZone;
      static America_Godthab: TimeZone;
      static America_Atikokan: TimeZone;
      static America_Cayman: TimeZone;
      static America_Coral_Harbour: TimeZone;
      static America_Creston: TimeZone;
      static US_Arizona: TimeZone;
      static America_Anguilla: TimeZone;
      static America_Antigua: TimeZone;
      static America_Aruba: TimeZone;
      static America_Blanc_Sablon: TimeZone;
      static America_Curacao: TimeZone;
      static America_Dominica: TimeZone;
      static America_Grenada: TimeZone;
      static America_Guadeloupe: TimeZone;
      static America_Kralendijk: TimeZone;
      static America_Lower_Princes: TimeZone;
      static America_Marigot: TimeZone;
      static America_Montserrat: TimeZone;
      static America_Port_of_Spain: TimeZone;
      static America_St_Barthelemy: TimeZone;
      static America_St_Kitts: TimeZone;
      static America_St_Lucia: TimeZone;
      static America_St_Thomas: TimeZone;
      static America_St_Vincent: TimeZone;
      static America_Tortola: TimeZone;
      static America_Virgin: TimeZone;
      static Canada_Saskatchewan: TimeZone;
      static America_Porto_Acre: TimeZone;
      static Brazil_Acre: TimeZone;
      static Chile_Continental: TimeZone;
      static Brazil_East: TimeZone;
      static Canada_Newfoundland: TimeZone;
      static America_Ensenada: TimeZone;
      static America_Santa_Isabel: TimeZone;
      static Mexico_BajaNorte: TimeZone;
      static America_Montreal: TimeZone;
      static America_Nassau: TimeZone;
      static America_Nipigon: TimeZone;
      static America_Thunder_Bay: TimeZone;
      static Canada_Eastern: TimeZone;
      static Canada_Pacific: TimeZone;
      static Canada_Yukon: TimeZone;
      static America_Rainy_River: TimeZone;
      static Canada_Central: TimeZone;
      static Asia_Ashkhabad: TimeZone;
      static Asia_Phnom_Penh: TimeZone;
      static Asia_Vientiane: TimeZone;
      static Indian_Christmas: TimeZone;
      static Asia_Dacca: TimeZone;
      static Asia_Muscat: TimeZone;
      static Indian_Mahe: TimeZone;
      static Indian_Reunion: TimeZone;
      static Asia_Saigon: TimeZone;
      static Hongkong: TimeZone;
      static Asia_Tel_Aviv: TimeZone;
      static Israel: TimeZone;
      static Asia_Katmandu: TimeZone;
      static Asia_Calcutta: TimeZone;
      static Asia_Brunei: TimeZone;
      static Asia_Macao: TimeZone;
      static Asia_Ujung_Pandang: TimeZone;
      static Europe_Nicosia: TimeZone;
      static Asia_Bahrain: TimeZone;
      static Antarctica_Syowa: TimeZone;
      static Asia_Aden: TimeZone;
      static Asia_Kuwait: TimeZone;
      static ROK: TimeZone;
      static Asia_Chongqing: TimeZone;
      static Asia_Chungking: TimeZone;
      static Asia_Harbin: TimeZone;
      static PRC: TimeZone;
      static Asia_Kuala_Lumpur: TimeZone;
      static Singapore: TimeZone;
      static ROC: TimeZone;
      static Iran: TimeZone;
      static Asia_Thimbu: TimeZone;
      static Japan: TimeZone;
      static Asia_Ulan_Bator: TimeZone;
      static Asia_Kashgar: TimeZone;
      static Asia_Rangoon: TimeZone;
      static Indian_Cocos: TimeZone;
      static Atlantic_Faeroe: TimeZone;
      static Australia_South: TimeZone;
      static Australia_Queensland: TimeZone;
      static Australia_Yancowinna: TimeZone;
      static Australia_North: TimeZone;
      static Australia_Currie: TimeZone;
      static Australia_Tasmania: TimeZone;
      static Australia_LHI: TimeZone;
      static Australia_Victoria: TimeZone;
      static Australia_West: TimeZone;
      static Australia_ACT: TimeZone;
      static Australia_Canberra: TimeZone;
      static Australia_NSW: TimeZone;
      static GMT: TimeZone;
      static GMTx0: TimeZone;
      static GMT_0: TimeZone;
      static GMT0: TimeZone;
      static Greenwich: TimeZone;
      static UCT: TimeZone;
      static UTC: TimeZone;
      static Universal: TimeZone;
      static Zulu: TimeZone;
      static Europe_Ljubljana: TimeZone;
      static Europe_Podgorica: TimeZone;
      static Europe_Sarajevo: TimeZone;
      static Europe_Skopje: TimeZone;
      static Europe_Zagreb: TimeZone;
      static Arctic_Longyearbyen: TimeZone;
      static Atlantic_Jan_Mayen: TimeZone;
      static Europe_Copenhagen: TimeZone;
      static Europe_Oslo: TimeZone;
      static Europe_Stockholm: TimeZone;
      static Europe_Amsterdam: TimeZone;
      static Europe_Luxembourg: TimeZone;
      static Europe_Tiraspol: TimeZone;
      static Eire: TimeZone;
      static Europe_Mariehamn: TimeZone;
      static Asia_Istanbul: TimeZone;
      static Turkey: TimeZone;
      static Europe_Kiev: TimeZone;
      static Europe_Uzhgorod: TimeZone;
      static Europe_Zaporozhye: TimeZone;
      static Portugal: TimeZone;
      static Europe_Belfast: TimeZone;
      static Europe_Guernsey: TimeZone;
      static Europe_Isle_of_Man: TimeZone;
      static Europe_Jersey: TimeZone;
      static GB: TimeZone;
      static GB_Eire: TimeZone;
      static W_SU: TimeZone;
      static Europe_Monaco: TimeZone;
      static Europe_Bratislava: TimeZone;
      static Europe_San_Marino: TimeZone;
      static Europe_Vatican: TimeZone;
      static Poland: TimeZone;
      static Europe_Busingen: TimeZone;
      static Europe_Vaduz: TimeZone;
      static Indian_Kerguelen: TimeZone;
      static Antarctica_McMurdo: TimeZone;
      static Antarctica_South_Pole: TimeZone;
      static NZ: TimeZone;
      static NZ_CHAT: TimeZone;
      static Chile_EasterIsland: TimeZone;
      static Pacific_Pohnpei: TimeZone;
      static Pacific_Ponape: TimeZone;
      static Pacific_Saipan: TimeZone;
      static Pacific_Johnston: TimeZone;
      static US_Hawaii: TimeZone;
      static Pacific_Enderbury: TimeZone;
      static Kwajalein: TimeZone;
      static Pacific_Midway: TimeZone;
      static Pacific_Samoa: TimeZone;
      static US_Samoa: TimeZone;
      static Antarctica_DumontDUrville: TimeZone;
      static Pacific_Chuuk: TimeZone;
      static Pacific_Truk: TimeZone;
      static Pacific_Yap: TimeZone;
      static Pacific_Funafuti: TimeZone;
      static Pacific_Majuro: TimeZone;
      static Pacific_Wake: TimeZone;
      static Pacific_Wallis: TimeZone;
      static Africa_Abidjan: TimeZone;
      static Africa_Algiers: TimeZone;
      static Africa_Bissau: TimeZone;
      static Africa_Cairo: TimeZone;
      static Africa_Casablanca: TimeZone;
      static Africa_Ceuta: TimeZone;
      static Africa_El_Aaiun: TimeZone;
      static Africa_Johannesburg: TimeZone;
      static Africa_Juba: TimeZone;
      static Africa_Khartoum: TimeZone;
      static Africa_Lagos: TimeZone;
      static Africa_Maputo: TimeZone;
      static Africa_Monrovia: TimeZone;
      static Africa_Nairobi: TimeZone;
      static Africa_Ndjamena: TimeZone;
      static Africa_Sao_Tome: TimeZone;
      static Africa_Tripoli: TimeZone;
      static Africa_Tunis: TimeZone;
      static Africa_Windhoek: TimeZone;
      static America_Adak: TimeZone;
      static America_Anchorage: TimeZone;
      static America_Araguaina: TimeZone;
      static America_Argentina_Buenos_Aires: TimeZone;
      static America_Argentina_Catamarca: TimeZone;
      static America_Argentina_Cordoba: TimeZone;
      static America_Argentina_Jujuy: TimeZone;
      static America_Argentina_La_Rioja: TimeZone;
      static America_Argentina_Mendoza: TimeZone;
      static America_Argentina_Rio_Gallegos: TimeZone;
      static America_Argentina_Salta: TimeZone;
      static America_Argentina_San_Juan: TimeZone;
      static America_Argentina_San_Luis: TimeZone;
      static America_Argentina_Tucuman: TimeZone;
      static America_Argentina_Ushuaia: TimeZone;
      static America_Asuncion: TimeZone;
      static America_Bahia: TimeZone;
      static America_Bahia_Banderas: TimeZone;
      static America_Barbados: TimeZone;
      static America_Belem: TimeZone;
      static America_Belize: TimeZone;
      static America_Boa_Vista: TimeZone;
      static America_Bogota: TimeZone;
      static America_Boise: TimeZone;
      static America_Cambridge_Bay: TimeZone;
      static America_Campo_Grande: TimeZone;
      static America_Cancun: TimeZone;
      static America_Caracas: TimeZone;
      static America_Cayenne: TimeZone;
      static America_Chicago: TimeZone;
      static America_Chihuahua: TimeZone;
      static America_Ciudad_Juarez: TimeZone;
      static America_Costa_Rica: TimeZone;
      static America_Cuiaba: TimeZone;
      static America_Danmarkshavn: TimeZone;
      static America_Dawson: TimeZone;
      static America_Dawson_Creek: TimeZone;
      static America_Denver: TimeZone;
      static America_Detroit: TimeZone;
      static America_Edmonton: TimeZone;
      static America_Eirunepe: TimeZone;
      static America_El_Salvador: TimeZone;
      static America_Fort_Nelson: TimeZone;
      static America_Fortaleza: TimeZone;
      static America_Glace_Bay: TimeZone;
      static America_Goose_Bay: TimeZone;
      static America_Grand_Turk: TimeZone;
      static America_Guatemala: TimeZone;
      static America_Guayaquil: TimeZone;
      static America_Guyana: TimeZone;
      static America_Halifax: TimeZone;
      static America_Havana: TimeZone;
      static America_Hermosillo: TimeZone;
      static America_Indiana_Indianapolis: TimeZone;
      static America_Indiana_Knox: TimeZone;
      static America_Indiana_Marengo: TimeZone;
      static America_Indiana_Petersburg: TimeZone;
      static America_Indiana_Tell_City: TimeZone;
      static America_Indiana_Vevay: TimeZone;
      static America_Indiana_Vincennes: TimeZone;
      static America_Indiana_Winamac: TimeZone;
      static America_Inuvik: TimeZone;
      static America_Iqaluit: TimeZone;
      static America_Jamaica: TimeZone;
      static America_Juneau: TimeZone;
      static America_Kentucky_Louisville: TimeZone;
      static America_Kentucky_Monticello: TimeZone;
      static America_La_Paz: TimeZone;
      static America_Lima: TimeZone;
      static America_Los_Angeles: TimeZone;
      static America_Maceio: TimeZone;
      static America_Managua: TimeZone;
      static America_Manaus: TimeZone;
      static America_Martinique: TimeZone;
      static America_Matamoros: TimeZone;
      static America_Mazatlan: TimeZone;
      static America_Menominee: TimeZone;
      static America_Merida: TimeZone;
      static America_Metlakatla: TimeZone;
      static America_Mexico_City: TimeZone;
      static America_Miquelon: TimeZone;
      static America_Moncton: TimeZone;
      static America_Monterrey: TimeZone;
      static America_Montevideo: TimeZone;
      static America_New_York: TimeZone;
      static America_Nome: TimeZone;
      static America_Noronha: TimeZone;
      static America_North_Dakota_Beulah: TimeZone;
      static America_North_Dakota_Center: TimeZone;
      static America_North_Dakota_New_Salem: TimeZone;
      static America_Nuuk: TimeZone;
      static America_Ojinaga: TimeZone;
      static America_Panama: TimeZone;
      static America_Paramaribo: TimeZone;
      static America_Phoenix: TimeZone;
      static America_Port_au_Prince: TimeZone;
      static America_Porto_Velho: TimeZone;
      static America_Puerto_Rico: TimeZone;
      static America_Punta_Arenas: TimeZone;
      static America_Rankin_Inlet: TimeZone;
      static America_Recife: TimeZone;
      static America_Regina: TimeZone;
      static America_Resolute: TimeZone;
      static America_Rio_Branco: TimeZone;
      static America_Santarem: TimeZone;
      static America_Santiago: TimeZone;
      static America_Santo_Domingo: TimeZone;
      static America_Sao_Paulo: TimeZone;
      static America_Scoresbysund: TimeZone;
      static America_Sitka: TimeZone;
      static America_St_Johns: TimeZone;
      static America_Swift_Current: TimeZone;
      static America_Tegucigalpa: TimeZone;
      static America_Thule: TimeZone;
      static America_Tijuana: TimeZone;
      static America_Toronto: TimeZone;
      static America_Vancouver: TimeZone;
      static America_Whitehorse: TimeZone;
      static America_Winnipeg: TimeZone;
      static America_Yakutat: TimeZone;
      static Antarctica_Casey: TimeZone;
      static Antarctica_Davis: TimeZone;
      static Antarctica_Macquarie: TimeZone;
      static Antarctica_Mawson: TimeZone;
      static Antarctica_Palmer: TimeZone;
      static Antarctica_Rothera: TimeZone;
      static Antarctica_Troll: TimeZone;
      static Antarctica_Vostok: TimeZone;
      static Asia_Almaty: TimeZone;
      static Asia_Amman: TimeZone;
      static Asia_Anadyr: TimeZone;
      static Asia_Aqtau: TimeZone;
      static Asia_Aqtobe: TimeZone;
      static Asia_Ashgabat: TimeZone;
      static Asia_Atyrau: TimeZone;
      static Asia_Baghdad: TimeZone;
      static Asia_Baku: TimeZone;
      static Asia_Bangkok: TimeZone;
      static Asia_Barnaul: TimeZone;
      static Asia_Beirut: TimeZone;
      static Asia_Bishkek: TimeZone;
      static Asia_Chita: TimeZone;
      static Asia_Choibalsan: TimeZone;
      static Asia_Colombo: TimeZone;
      static Asia_Damascus: TimeZone;
      static Asia_Dhaka: TimeZone;
      static Asia_Dili: TimeZone;
      static Asia_Dubai: TimeZone;
      static Asia_Dushanbe: TimeZone;
      static Asia_Famagusta: TimeZone;
      static Asia_Gaza: TimeZone;
      static Asia_Hebron: TimeZone;
      static Asia_Ho_Chi_Minh: TimeZone;
      static Asia_Hong_Kong: TimeZone;
      static Asia_Hovd: TimeZone;
      static Asia_Irkutsk: TimeZone;
      static Asia_Jakarta: TimeZone;
      static Asia_Jayapura: TimeZone;
      static Asia_Jerusalem: TimeZone;
      static Asia_Kabul: TimeZone;
      static Asia_Kamchatka: TimeZone;
      static Asia_Karachi: TimeZone;
      static Asia_Kathmandu: TimeZone;
      static Asia_Khandyga: TimeZone;
      static Asia_Kolkata: TimeZone;
      static Asia_Krasnoyarsk: TimeZone;
      static Asia_Kuching: TimeZone;
      static Asia_Macau: TimeZone;
      static Asia_Magadan: TimeZone;
      static Asia_Makassar: TimeZone;
      static Asia_Manila: TimeZone;
      static Asia_Nicosia: TimeZone;
      static Asia_Novokuznetsk: TimeZone;
      static Asia_Novosibirsk: TimeZone;
      static Asia_Omsk: TimeZone;
      static Asia_Oral: TimeZone;
      static Asia_Pontianak: TimeZone;
      static Asia_Pyongyang: TimeZone;
      static Asia_Qatar: TimeZone;
      static Asia_Qostanay: TimeZone;
      static Asia_Qyzylorda: TimeZone;
      static Asia_Riyadh: TimeZone;
      static Asia_Sakhalin: TimeZone;
      static Asia_Samarkand: TimeZone;
      static Asia_Seoul: TimeZone;
      static Asia_Shanghai: TimeZone;
      static Asia_Singapore: TimeZone;
      static Asia_Srednekolymsk: TimeZone;
      static Asia_Taipei: TimeZone;
      static Asia_Tashkent: TimeZone;
      static Asia_Tbilisi: TimeZone;
      static Asia_Tehran: TimeZone;
      static Asia_Thimphu: TimeZone;
      static Asia_Tokyo: TimeZone;
      static Asia_Tomsk: TimeZone;
      static Asia_Ulaanbaatar: TimeZone;
      static Asia_Urumqi: TimeZone;
      static Asia_Ust_Nera: TimeZone;
      static Asia_Vladivostok: TimeZone;
      static Asia_Yakutsk: TimeZone;
      static Asia_Yangon: TimeZone;
      static Asia_Yekaterinburg: TimeZone;
      static Asia_Yerevan: TimeZone;
      static Atlantic_Azores: TimeZone;
      static Atlantic_Bermuda: TimeZone;
      static Atlantic_Canary: TimeZone;
      static Atlantic_Cape_Verde: TimeZone;
      static Atlantic_Faroe: TimeZone;
      static Atlantic_Madeira: TimeZone;
      static Atlantic_South_Georgia: TimeZone;
      static Atlantic_Stanley: TimeZone;
      static Australia_Adelaide: TimeZone;
      static Australia_Brisbane: TimeZone;
      static Australia_Broken_Hill: TimeZone;
      static Australia_Darwin: TimeZone;
      static Australia_Eucla: TimeZone;
      static Australia_Hobart: TimeZone;
      static Australia_Lindeman: TimeZone;
      static Australia_Lord_Howe: TimeZone;
      static Australia_Melbourne: TimeZone;
      static Australia_Perth: TimeZone;
      static Australia_Sydney: TimeZone;
      static CET: TimeZone;
      static CST6CDT: TimeZone;
      static EET: TimeZone;
      static EST: TimeZone;
      static EST5EDT: TimeZone;
      static Europe_Andorra: TimeZone;
      static Europe_Astrakhan: TimeZone;
      static Europe_Athens: TimeZone;
      static Europe_Belgrade: TimeZone;
      static Europe_Berlin: TimeZone;
      static Europe_Brussels: TimeZone;
      static Europe_Bucharest: TimeZone;
      static Europe_Budapest: TimeZone;
      static Europe_Chisinau: TimeZone;
      static Europe_Dublin: TimeZone;
      static Europe_Gibraltar: TimeZone;
      static Europe_Helsinki: TimeZone;
      static Europe_Istanbul: TimeZone;
      static Europe_Kaliningrad: TimeZone;
      static Europe_Kirov: TimeZone;
      static Europe_Kyiv: TimeZone;
      static Europe_Lisbon: TimeZone;
      static Europe_London: TimeZone;
      static Europe_Madrid: TimeZone;
      static Europe_Malta: TimeZone;
      static Europe_Minsk: TimeZone;
      static Europe_Moscow: TimeZone;
      static Europe_Paris: TimeZone;
      static Europe_Prague: TimeZone;
      static Europe_Riga: TimeZone;
      static Europe_Rome: TimeZone;
      static Europe_Samara: TimeZone;
      static Europe_Saratov: TimeZone;
      static Europe_Simferopol: TimeZone;
      static Europe_Sofia: TimeZone;
      static Europe_Tallinn: TimeZone;
      static Europe_Tirane: TimeZone;
      static Europe_Ulyanovsk: TimeZone;
      static Europe_Vienna: TimeZone;
      static Europe_Vilnius: TimeZone;
      static Europe_Volgograd: TimeZone;
      static Europe_Warsaw: TimeZone;
      static Europe_Zurich: TimeZone;
      static Factory: TimeZone;
      static HST: TimeZone;
      static Indian_Chagos: TimeZone;
      static Indian_Maldives: TimeZone;
      static Indian_Mauritius: TimeZone;
      static MET: TimeZone;
      static MST: TimeZone;
      static MST7MDT: TimeZone;
      static PST8PDT: TimeZone;
      static Pacific_Apia: TimeZone;
      static Pacific_Auckland: TimeZone;
      static Pacific_Bougainville: TimeZone;
      static Pacific_Chatham: TimeZone;
      static Pacific_Easter: TimeZone;
      static Pacific_Efate: TimeZone;
      static Pacific_Fakaofo: TimeZone;
      static Pacific_Fiji: TimeZone;
      static Pacific_Galapagos: TimeZone;
      static Pacific_Gambier: TimeZone;
      static Pacific_Guadalcanal: TimeZone;
      static Pacific_Guam: TimeZone;
      static Pacific_Honolulu: TimeZone;
      static Pacific_Kanton: TimeZone;
      static Pacific_Kiritimati: TimeZone;
      static Pacific_Kosrae: TimeZone;
      static Pacific_Kwajalein: TimeZone;
      static Pacific_Marquesas: TimeZone;
      static Pacific_Nauru: TimeZone;
      static Pacific_Niue: TimeZone;
      static Pacific_Norfolk: TimeZone;
      static Pacific_Noumea: TimeZone;
      static Pacific_Pago_Pago: TimeZone;
      static Pacific_Palau: TimeZone;
      static Pacific_Pitcairn: TimeZone;
      static Pacific_Port_Moresby: TimeZone;
      static Pacific_Rarotonga: TimeZone;
      static Pacific_Tahiti: TimeZone;
      static Pacific_Tarawa: TimeZone;
      static Pacific_Tongatapu: TimeZone;
      static WET: TimeZone;
    }
    namespace TimeZone  {
      type Field = 'Africa_Accra'|'Africa_Bamako'|'Africa_Banjul'|'Africa_Conakry'|'Africa_Dakar'|'Africa_Freetown'|'Africa_Lome'|'Africa_Nouakchott'|'Africa_Ouagadougou'|'Africa_Timbuktu'|'Atlantic_Reykjavik'|'Atlantic_St_Helena'|'Iceland'|'Egypt'|'Africa_Maseru'|'Africa_Mbabane'|'Africa_Bangui'|'Africa_Brazzaville'|'Africa_Douala'|'Africa_Kinshasa'|'Africa_Libreville'|'Africa_Luanda'|'Africa_Malabo'|'Africa_Niamey'|'Africa_Porto_Novo'|'Africa_Blantyre'|'Africa_Bujumbura'|'Africa_Gaborone'|'Africa_Harare'|'Africa_Kigali'|'Africa_Lubumbashi'|'Africa_Lusaka'|'Africa_Addis_Ababa'|'Africa_Asmara'|'Africa_Asmera'|'Africa_Dar_es_Salaam'|'Africa_Djibouti'|'Africa_Kampala'|'Africa_Mogadishu'|'Indian_Antananarivo'|'Indian_Comoro'|'Indian_Mayotte'|'Libya'|'America_Atka'|'US_Aleutian'|'US_Alaska'|'America_Buenos_Aires'|'America_Argentina_ComodRivadavia'|'America_Catamarca'|'America_Cordoba'|'America_Rosario'|'America_Jujuy'|'America_Mendoza'|'US_Central'|'America_Shiprock'|'Navajo'|'US_Mountain'|'US_Michigan'|'America_Yellowknife'|'Canada_Mountain'|'Canada_Atlantic'|'Cuba'|'America_Fort_Wayne'|'America_Indianapolis'|'US_East_Indiana'|'America_Knox_IN'|'US_Indiana_Starke'|'America_Pangnirtung'|'Jamaica'|'America_Louisville'|'US_Pacific'|'Brazil_West'|'Mexico_BajaSur'|'Mexico_General'|'US_Eastern'|'Brazil_DeNoronha'|'America_Godthab'|'America_Atikokan'|'America_Cayman'|'America_Coral_Harbour'|'America_Creston'|'US_Arizona'|'America_Anguilla'|'America_Antigua'|'America_Aruba'|'America_Blanc_Sablon'|'America_Curacao'|'America_Dominica'|'America_Grenada'|'America_Guadeloupe'|'America_Kralendijk'|'America_Lower_Princes'|'America_Marigot'|'America_Montserrat'|'America_Port_of_Spain'|'America_St_Barthelemy'|'America_St_Kitts'|'America_St_Lucia'|'America_St_Thomas'|'America_St_Vincent'|'America_Tortola'|'America_Virgin'|'Canada_Saskatchewan'|'America_Porto_Acre'|'Brazil_Acre'|'Chile_Continental'|'Brazil_East'|'Canada_Newfoundland'|'America_Ensenada'|'America_Santa_Isabel'|'Mexico_BajaNorte'|'America_Montreal'|'America_Nassau'|'America_Nipigon'|'America_Thunder_Bay'|'Canada_Eastern'|'Canada_Pacific'|'Canada_Yukon'|'America_Rainy_River'|'Canada_Central'|'Asia_Ashkhabad'|'Asia_Phnom_Penh'|'Asia_Vientiane'|'Indian_Christmas'|'Asia_Dacca'|'Asia_Muscat'|'Indian_Mahe'|'Indian_Reunion'|'Asia_Saigon'|'Hongkong'|'Asia_Tel_Aviv'|'Israel'|'Asia_Katmandu'|'Asia_Calcutta'|'Asia_Brunei'|'Asia_Macao'|'Asia_Ujung_Pandang'|'Europe_Nicosia'|'Asia_Bahrain'|'Antarctica_Syowa'|'Asia_Aden'|'Asia_Kuwait'|'ROK'|'Asia_Chongqing'|'Asia_Chungking'|'Asia_Harbin'|'PRC'|'Asia_Kuala_Lumpur'|'Singapore'|'ROC'|'Iran'|'Asia_Thimbu'|'Japan'|'Asia_Ulan_Bator'|'Asia_Kashgar'|'Asia_Rangoon'|'Indian_Cocos'|'Atlantic_Faeroe'|'Australia_South'|'Australia_Queensland'|'Australia_Yancowinna'|'Australia_North'|'Australia_Currie'|'Australia_Tasmania'|'Australia_LHI'|'Australia_Victoria'|'Australia_West'|'Australia_ACT'|'Australia_Canberra'|'Australia_NSW'|'GMT'|'GMTx0'|'GMT_0'|'GMT0'|'Greenwich'|'UCT'|'UTC'|'Universal'|'Zulu'|'Europe_Ljubljana'|'Europe_Podgorica'|'Europe_Sarajevo'|'Europe_Skopje'|'Europe_Zagreb'|'Arctic_Longyearbyen'|'Atlantic_Jan_Mayen'|'Europe_Copenhagen'|'Europe_Oslo'|'Europe_Stockholm'|'Europe_Amsterdam'|'Europe_Luxembourg'|'Europe_Tiraspol'|'Eire'|'Europe_Mariehamn'|'Asia_Istanbul'|'Turkey'|'Europe_Kiev'|'Europe_Uzhgorod'|'Europe_Zaporozhye'|'Portugal'|'Europe_Belfast'|'Europe_Guernsey'|'Europe_Isle_of_Man'|'Europe_Jersey'|'GB'|'GB_Eire'|'W_SU'|'Europe_Monaco'|'Europe_Bratislava'|'Europe_San_Marino'|'Europe_Vatican'|'Poland'|'Europe_Busingen'|'Europe_Vaduz'|'Indian_Kerguelen'|'Antarctica_McMurdo'|'Antarctica_South_Pole'|'NZ'|'NZ_CHAT'|'Chile_EasterIsland'|'Pacific_Pohnpei'|'Pacific_Ponape'|'Pacific_Saipan'|'Pacific_Johnston'|'US_Hawaii'|'Pacific_Enderbury'|'Kwajalein'|'Pacific_Midway'|'Pacific_Samoa'|'US_Samoa'|'Antarctica_DumontDUrville'|'Pacific_Chuuk'|'Pacific_Truk'|'Pacific_Yap'|'Pacific_Funafuti'|'Pacific_Majuro'|'Pacific_Wake'|'Pacific_Wallis'|'Africa_Abidjan'|'Africa_Algiers'|'Africa_Bissau'|'Africa_Cairo'|'Africa_Casablanca'|'Africa_Ceuta'|'Africa_El_Aaiun'|'Africa_Johannesburg'|'Africa_Juba'|'Africa_Khartoum'|'Africa_Lagos'|'Africa_Maputo'|'Africa_Monrovia'|'Africa_Nairobi'|'Africa_Ndjamena'|'Africa_Sao_Tome'|'Africa_Tripoli'|'Africa_Tunis'|'Africa_Windhoek'|'America_Adak'|'America_Anchorage'|'America_Araguaina'|'America_Argentina_Buenos_Aires'|'America_Argentina_Catamarca'|'America_Argentina_Cordoba'|'America_Argentina_Jujuy'|'America_Argentina_La_Rioja'|'America_Argentina_Mendoza'|'America_Argentina_Rio_Gallegos'|'America_Argentina_Salta'|'America_Argentina_San_Juan'|'America_Argentina_San_Luis'|'America_Argentina_Tucuman'|'America_Argentina_Ushuaia'|'America_Asuncion'|'America_Bahia'|'America_Bahia_Banderas'|'America_Barbados'|'America_Belem'|'America_Belize'|'America_Boa_Vista'|'America_Bogota'|'America_Boise'|'America_Cambridge_Bay'|'America_Campo_Grande'|'America_Cancun'|'America_Caracas'|'America_Cayenne'|'America_Chicago'|'America_Chihuahua'|'America_Ciudad_Juarez'|'America_Costa_Rica'|'America_Cuiaba'|'America_Danmarkshavn'|'America_Dawson'|'America_Dawson_Creek'|'America_Denver'|'America_Detroit'|'America_Edmonton'|'America_Eirunepe'|'America_El_Salvador'|'America_Fort_Nelson'|'America_Fortaleza'|'America_Glace_Bay'|'America_Goose_Bay'|'America_Grand_Turk'|'America_Guatemala'|'America_Guayaquil'|'America_Guyana'|'America_Halifax'|'America_Havana'|'America_Hermosillo'|'America_Indiana_Indianapolis'|'America_Indiana_Knox'|'America_Indiana_Marengo'|'America_Indiana_Petersburg'|'America_Indiana_Tell_City'|'America_Indiana_Vevay'|'America_Indiana_Vincennes'|'America_Indiana_Winamac'|'America_Inuvik'|'America_Iqaluit'|'America_Jamaica'|'America_Juneau'|'America_Kentucky_Louisville'|'America_Kentucky_Monticello'|'America_La_Paz'|'America_Lima'|'America_Los_Angeles'|'America_Maceio'|'America_Managua'|'America_Manaus'|'America_Martinique'|'America_Matamoros'|'America_Mazatlan'|'America_Menominee'|'America_Merida'|'America_Metlakatla'|'America_Mexico_City'|'America_Miquelon'|'America_Moncton'|'America_Monterrey'|'America_Montevideo'|'America_New_York'|'America_Nome'|'America_Noronha'|'America_North_Dakota_Beulah'|'America_North_Dakota_Center'|'America_North_Dakota_New_Salem'|'America_Nuuk'|'America_Ojinaga'|'America_Panama'|'America_Paramaribo'|'America_Phoenix'|'America_Port_au_Prince'|'America_Porto_Velho'|'America_Puerto_Rico'|'America_Punta_Arenas'|'America_Rankin_Inlet'|'America_Recife'|'America_Regina'|'America_Resolute'|'America_Rio_Branco'|'America_Santarem'|'America_Santiago'|'America_Santo_Domingo'|'America_Sao_Paulo'|'America_Scoresbysund'|'America_Sitka'|'America_St_Johns'|'America_Swift_Current'|'America_Tegucigalpa'|'America_Thule'|'America_Tijuana'|'America_Toronto'|'America_Vancouver'|'America_Whitehorse'|'America_Winnipeg'|'America_Yakutat'|'Antarctica_Casey'|'Antarctica_Davis'|'Antarctica_Macquarie'|'Antarctica_Mawson'|'Antarctica_Palmer'|'Antarctica_Rothera'|'Antarctica_Troll'|'Antarctica_Vostok'|'Asia_Almaty'|'Asia_Amman'|'Asia_Anadyr'|'Asia_Aqtau'|'Asia_Aqtobe'|'Asia_Ashgabat'|'Asia_Atyrau'|'Asia_Baghdad'|'Asia_Baku'|'Asia_Bangkok'|'Asia_Barnaul'|'Asia_Beirut'|'Asia_Bishkek'|'Asia_Chita'|'Asia_Choibalsan'|'Asia_Colombo'|'Asia_Damascus'|'Asia_Dhaka'|'Asia_Dili'|'Asia_Dubai'|'Asia_Dushanbe'|'Asia_Famagusta'|'Asia_Gaza'|'Asia_Hebron'|'Asia_Ho_Chi_Minh'|'Asia_Hong_Kong'|'Asia_Hovd'|'Asia_Irkutsk'|'Asia_Jakarta'|'Asia_Jayapura'|'Asia_Jerusalem'|'Asia_Kabul'|'Asia_Kamchatka'|'Asia_Karachi'|'Asia_Kathmandu'|'Asia_Khandyga'|'Asia_Kolkata'|'Asia_Krasnoyarsk'|'Asia_Kuching'|'Asia_Macau'|'Asia_Magadan'|'Asia_Makassar'|'Asia_Manila'|'Asia_Nicosia'|'Asia_Novokuznetsk'|'Asia_Novosibirsk'|'Asia_Omsk'|'Asia_Oral'|'Asia_Pontianak'|'Asia_Pyongyang'|'Asia_Qatar'|'Asia_Qostanay'|'Asia_Qyzylorda'|'Asia_Riyadh'|'Asia_Sakhalin'|'Asia_Samarkand'|'Asia_Seoul'|'Asia_Shanghai'|'Asia_Singapore'|'Asia_Srednekolymsk'|'Asia_Taipei'|'Asia_Tashkent'|'Asia_Tbilisi'|'Asia_Tehran'|'Asia_Thimphu'|'Asia_Tokyo'|'Asia_Tomsk'|'Asia_Ulaanbaatar'|'Asia_Urumqi'|'Asia_Ust_Nera'|'Asia_Vladivostok'|'Asia_Yakutsk'|'Asia_Yangon'|'Asia_Yekaterinburg'|'Asia_Yerevan'|'Atlantic_Azores'|'Atlantic_Bermuda'|'Atlantic_Canary'|'Atlantic_Cape_Verde'|'Atlantic_Faroe'|'Atlantic_Madeira'|'Atlantic_South_Georgia'|'Atlantic_Stanley'|'Australia_Adelaide'|'Australia_Brisbane'|'Australia_Broken_Hill'|'Australia_Darwin'|'Australia_Eucla'|'Australia_Hobart'|'Australia_Lindeman'|'Australia_Lord_Howe'|'Australia_Melbourne'|'Australia_Perth'|'Australia_Sydney'|'CET'|'CST6CDT'|'EET'|'EST'|'EST5EDT'|'Europe_Andorra'|'Europe_Astrakhan'|'Europe_Athens'|'Europe_Belgrade'|'Europe_Berlin'|'Europe_Brussels'|'Europe_Bucharest'|'Europe_Budapest'|'Europe_Chisinau'|'Europe_Dublin'|'Europe_Gibraltar'|'Europe_Helsinki'|'Europe_Istanbul'|'Europe_Kaliningrad'|'Europe_Kirov'|'Europe_Kyiv'|'Europe_Lisbon'|'Europe_London'|'Europe_Madrid'|'Europe_Malta'|'Europe_Minsk'|'Europe_Moscow'|'Europe_Paris'|'Europe_Prague'|'Europe_Riga'|'Europe_Rome'|'Europe_Samara'|'Europe_Saratov'|'Europe_Simferopol'|'Europe_Sofia'|'Europe_Tallinn'|'Europe_Tirane'|'Europe_Ulyanovsk'|'Europe_Vienna'|'Europe_Vilnius'|'Europe_Volgograd'|'Europe_Warsaw'|'Europe_Zurich'|'Factory'|'HST'|'Indian_Chagos'|'Indian_Maldives'|'Indian_Mauritius'|'MET'|'MST'|'MST7MDT'|'PST8PDT'|'Pacific_Apia'|'Pacific_Auckland'|'Pacific_Bougainville'|'Pacific_Chatham'|'Pacific_Easter'|'Pacific_Efate'|'Pacific_Fakaofo'|'Pacific_Fiji'|'Pacific_Galapagos'|'Pacific_Gambier'|'Pacific_Guadalcanal'|'Pacific_Guam'|'Pacific_Honolulu'|'Pacific_Kanton'|'Pacific_Kiritimati'|'Pacific_Kosrae'|'Pacific_Kwajalein'|'Pacific_Marquesas'|'Pacific_Nauru'|'Pacific_Niue'|'Pacific_Norfolk'|'Pacific_Noumea'|'Pacific_Pago_Pago'|'Pacific_Palau'|'Pacific_Pitcairn'|'Pacific_Port_Moresby'|'Pacific_Rarotonga'|'Pacific_Tahiti'|'Pacific_Tarawa'|'Pacific_Tongatapu'|'WET';
    }

    class SortOrder extends gc.sdk.GCEnum {
      static readonly _type = 'core::SortOrder';
      static readonly $fields: SortOrder[];
      key: SortOrder.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SortOrder.Field, value?: unknown);
      static asc: SortOrder;
      static desc: SortOrder;
    }
    namespace SortOrder  {
      type Field = 'asc'|'desc';
    }

    class ErrorFrame extends gc.sdk.GCObject {
      static readonly _type = 'core::ErrorFrame';
      module: string | null;
      function: string;
      line: number | bigint;
      column: number | bigint;
      constructor(module: string | null, function_: string, line: number | bigint, column: number | bigint);
      static createFrom(fields: {module?: string | null, function_: string, line: number | bigint, column: number | bigint}): ErrorFrame;
    }

    class String extends gc.sdk.std_n.core.String {}

    class t4 extends gc.sdk.std_n.core.t4 {}

    class field extends gc.sdk.std_n.core.field {}

    class Map<K = any, V = any> extends gc.sdk.std_n.core.Map<K, V> {}

    class nodeGeo<T = any> extends gc.sdk.std_n.core.nodeGeo<T> {
      static info(nodes: globalThis.Array<gc.core.nodeGeo>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>;
      static sample(refs: globalThis.Array<gc.core.nodeGeo>, from: gc.core.geo | null, to: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class FloatPrecision extends gc.sdk.GCEnum {
      static readonly _type = 'core::FloatPrecision';
      static readonly $fields: FloatPrecision[];
      key: FloatPrecision.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: FloatPrecision.Field, value?: unknown);
      static p1: FloatPrecision;
      static p10: FloatPrecision;
      static p100: FloatPrecision;
      static p1000: FloatPrecision;
      static p10000: FloatPrecision;
      static p100000: FloatPrecision;
      static p1000000: FloatPrecision;
      static p10000000: FloatPrecision;
      static p100000000: FloatPrecision;
      static p1000000000: FloatPrecision;
      static p10000000000: FloatPrecision;
    }
    namespace FloatPrecision  {
      type Field = 'p1'|'p10'|'p100'|'p1000'|'p10000'|'p100000'|'p1000000'|'p10000000'|'p100000000'|'p1000000000'|'p10000000000';
    }

    class nodeIndex$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$info$args';
      nodes: globalThis.Array<gc.core.nodeIndex>;
      constructor(nodes: globalThis.Array<gc.core.nodeIndex>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeIndex>}): nodeIndex$info$args;
    }

    class DurationUnit extends gc.sdk.GCEnum {
      static readonly _type = 'core::DurationUnit';
      static readonly $fields: DurationUnit[];
      key: DurationUnit.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: DurationUnit.Field, value?: unknown);
      static microseconds: DurationUnit;
      static milliseconds: DurationUnit;
      static seconds: DurationUnit;
      static minutes: DurationUnit;
      static hours: DurationUnit;
      static days: DurationUnit;
    }
    namespace DurationUnit  {
      type Field = 'microseconds'|'milliseconds'|'seconds'|'minutes'|'hours'|'days';
    }

    class ErrorCode extends gc.sdk.GCEnum {
      static readonly _type = 'core::ErrorCode';
      static readonly $fields: ErrorCode[];
      key: ErrorCode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: ErrorCode.Field, value?: unknown);
      static none: ErrorCode;
      static interrupted: ErrorCode;
      static await: ErrorCode;
      static timeout: ErrorCode;
      static forbidden: ErrorCode;
      static runtime_error: ErrorCode;
    }
    namespace ErrorCode  {
      type Field = 'none'|'interrupted'|'await'|'timeout'|'forbidden'|'runtime_error';
    }

    class duration extends gc.sdk.std_n.core.duration {}

    class t2 extends gc.sdk.std_n.core.t2 {}

    class node<T = any> extends gc.sdk.std_n.core.node<T> {
      static resolve_all(n: globalThis.Array<gc.core.node | null>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
    }

    class t4f extends gc.sdk.std_n.core.t4f {}

    class TableColumnMapping extends gc.sdk.GCObject {
      static readonly _type = 'core::TableColumnMapping';
      column: number | bigint;
      extractors: globalThis.Array<any>;
      constructor(column: number | bigint, extractors: globalThis.Array<any>);
      static createFrom(fields: {column: number | bigint, extractors: globalThis.Array<any>}): TableColumnMapping;
    }

    class Date$fromTime$args extends gc.sdk.GCObject {
      static readonly _type = 'core::Date$fromTime$args';
      time: gc.core.time;
      tz: gc.core.TimeZone | null;
      constructor(time: gc.core.time, tz?: gc.core.TimeZone | null);
      static createFrom(fields: {time: gc.core.time, tz?: gc.core.TimeZone | null}): Date$fromTime$args;
    }

    class time extends gc.sdk.std_n.core.time {}

    class Tensor extends gc.sdk.std_n.core.Tensor {}

    class float extends gc.sdk.std_n.core.float {}

    class TensorType extends gc.sdk.GCEnum {
      static readonly _type = 'core::TensorType';
      static readonly $fields: TensorType[];
      key: TensorType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TensorType.Field, value?: unknown);
      static i32: TensorType;
      static i64: TensorType;
      static f32: TensorType;
      static f64: TensorType;
      static c64: TensorType;
      static c128: TensorType;
    }
    namespace TensorType  {
      type Field = 'i32'|'i64'|'f32'|'f64'|'c64'|'c128';
    }

    class nodeList<T = any> extends gc.sdk.std_n.core.nodeList<T> {
      static info(nodes: globalThis.Array<gc.core.nodeList>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>;
      static sample(refs: globalThis.Array<gc.core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class Table$applyMappings$args extends gc.sdk.GCObject {
      static readonly _type = 'core::Table$applyMappings$args';
      table: gc.core.Table;
      mappings: globalThis.Array<gc.core.TableColumnMapping>;
      constructor(table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>);
      static createFrom(fields: {table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>}): Table$applyMappings$args;
    }

    class GeoBox extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoBox';
      sw: gc.core.geo;
      ne: gc.core.geo;
      constructor(sw: gc.core.geo, ne: gc.core.geo);
      static createFrom(fields: {sw: gc.core.geo, ne: gc.core.geo}): GeoBox;
    }

    class type extends gc.sdk.std_n.core.type {}

    class MathConstants extends gc.sdk.GCObject {
      static readonly _type = 'core::MathConstants';
      static e: number;
      static log_2e: number;
      static log_10e: number;
      static ln2: number;
      static ln10: number;
      static pi: number;
      static pi_2: number;
      static pi_4: number;
      static m1_pi: number;
      static m2_pi: number;
      static m2_sqrt_pi: number;
      static sqrt2: number;
      static sqrt1_2: number;
    }

    class nodeTimeCursor<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTimeCursor';
      n: gc.core.nodeTime<T>;
      req_time: gc.core.time | null;
      constructor(n: gc.core.nodeTime<T>, req_time?: gc.core.time | null);
      static createFrom<T>(fields: {n: gc.core.nodeTime<T>, req_time?: gc.core.time | null}): nodeTimeCursor;
    }

    class null_ extends gc.sdk.std_n.core.null_ {}

    class char extends gc.sdk.std_n.core.char {}

    class Table<T = any> extends gc.sdk.std_n.core.Table<T> {
      static applyMappings(table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class node$resolve_all$args extends gc.sdk.GCObject {
      static readonly _type = 'core::node$resolve_all$args';
      n: globalThis.Array<gc.core.node | null>;
      constructor(n: globalThis.Array<gc.core.node | null>);
      static createFrom(fields: {n: globalThis.Array<gc.core.node | null>}): node$resolve_all$args;
    }

    class nodeTime$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTime$sample$args';
      refs: globalThis.Array<gc.core.nodeTime>;
      from: gc.core.time | null;
      to: gc.core.time | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      maxDephasing: gc.core.duration | null;
      tz: gc.core.TimeZone | null;
      constructor(refs: globalThis.Array<gc.core.nodeTime>, from: gc.core.time | null, to: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeTime>, from?: gc.core.time | null, to?: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null}): nodeTime$sample$args;
    }

    class geo extends gc.sdk.std_n.core.geo {}

  }

  namespace runtime {
    class UserGroupPolicy extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserGroupPolicy';
      group_id: number | bigint;
      type: gc.runtime.UserGroupPolicyType;
      constructor(group_id: number | bigint, type: gc.runtime.UserGroupPolicyType);
      static createFrom(fields: {group_id: number | bigint, type: gc.runtime.UserGroupPolicyType}): UserGroupPolicy;
    }

    class User extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User';
      id: number | bigint;
      name: string;
      activated: boolean;
      full_name: string | null;
      email: string | null;
      role: string | null;
      permissions_flags: number | bigint | null;
      groups: globalThis.Array<gc.runtime.UserGroupPolicy> | null;
      groups_flags: number | bigint | null;
      external: boolean;
      constructor(id: number | bigint, name: string, activated: boolean, full_name: string | null, email: string | null, role: string | null, permissions_flags: number | bigint | null, groups: globalThis.Array<gc.runtime.UserGroupPolicy> | null, groups_flags: number | bigint | null, external: boolean);
      static createFrom(fields: {id: number | bigint, name: string, activated: boolean, full_name?: string | null, email?: string | null, role?: string | null, permissions_flags?: number | bigint | null, groups?: globalThis.Array<gc.runtime.UserGroupPolicy> | null, groups_flags?: number | bigint | null, external: boolean}): User;
      static getToken(id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
      static setPassword(name: string, pass: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<boolean>;
      static permissions($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
      static me($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.User>;
      static current($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<number | bigint>;
      static renew(use_cookie: boolean, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
      static logout($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static tokenLogin(token: string, use_cookie: boolean, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
      static login(credentials: string, use_cookie: boolean, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    }

    class Task$history$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$history$args';
      offset: number | bigint;
      max: number | bigint;
      constructor(offset: number | bigint, max: number | bigint);
      static createFrom(fields: {offset: number | bigint, max: number | bigint}): Task$history$args;
    }

    class StoreStat extends gc.sdk.GCObject {
      static readonly _type = 'runtime::StoreStat';
      capacity_bytes: number | bigint;
      allocated_bytes: number | bigint;
      allocated_ratio: number;
      remained_bytes: number | bigint;
      remained_ratio: number;
      used_bytes: number | bigint;
      used_ratio: number;
      available_bytes: number | bigint;
      available_ratio: number;
      constructor(capacity_bytes: number | bigint, allocated_bytes: number | bigint, allocated_ratio: number, remained_bytes: number | bigint, remained_ratio: number, used_bytes: number | bigint, used_ratio: number, available_bytes: number | bigint, available_ratio: number);
      static createFrom(fields: {capacity_bytes: number | bigint, allocated_bytes: number | bigint, allocated_ratio: number, remained_bytes: number | bigint, remained_ratio: number, used_bytes: number | bigint, used_ratio: number, available_bytes: number | bigint, available_ratio: number}): StoreStat;
    }

    class User$logout$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$logout$args';
    }

    class UserRole$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserRole$set$args';
      value: gc.runtime.UserRole;
      constructor(value: gc.runtime.UserRole);
      static createFrom(fields: {value: gc.runtime.UserRole}): UserRole$set$args;
    }

    class UserRole$remove$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserRole$remove$args';
      name: string;
      constructor(name: string);
      static createFrom(fields: {name: string}): UserRole$remove$args;
    }

    class Debug$add$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$add$args';
      bps: globalThis.Array<gc.runtime.DebugBreakpoint>;
      constructor(bps: globalThis.Array<gc.runtime.DebugBreakpoint>);
      static createFrom(fields: {bps: globalThis.Array<gc.runtime.DebugBreakpoint>}): Debug$add$args;
    }

    class RuntimeInfo extends gc.sdk.GCObject {
      static readonly _type = 'runtime::RuntimeInfo';
      version: string;
      program_version: string | null;
      arch: string;
      timezone: gc.core.TimeZone;
      license: gc.runtime.License;
      io_threads: number | bigint;
      bg_threads: number | bigint;
      fg_threads: number | bigint;
      mem_total: number | bigint;
      mem_worker: number | bigint;
      nb_ctx: number | bigint;
      store_stats: gc.runtime.StoreStat | null;
      constructor(version: string, program_version: string | null, arch: string, timezone: gc.core.TimeZone, license: gc.runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, nb_ctx: number | bigint, store_stats?: gc.runtime.StoreStat | null);
      static createFrom(fields: {version: string, program_version?: string | null, arch: string, timezone: gc.core.TimeZone, license: gc.runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, nb_ctx: number | bigint, store_stats?: gc.runtime.StoreStat | null}): RuntimeInfo;
    }

    class CallPerf extends gc.sdk.GCObject {
      static readonly _type = 'runtime::CallPerf';
      duration: gc.core.duration;
      bytes_write_disk: number | bigint;
      bytes_write_disk_raw: number | bigint;
      bytes_read_disk: number | bigint;
      bytes_read_disk_raw: number | bigint;
      bytes_read_cache: number | bigint;
      constructor(duration: gc.core.duration, bytes_write_disk: number | bigint, bytes_write_disk_raw: number | bigint, bytes_read_disk: number | bigint, bytes_read_disk_raw: number | bigint, bytes_read_cache: number | bigint);
      static createFrom(fields: {duration: gc.core.duration, bytes_write_disk: number | bigint, bytes_write_disk_raw: number | bigint, bytes_read_disk: number | bigint, bytes_read_disk_raw: number | bigint, bytes_read_cache: number | bigint}): CallPerf;
    }

    class SecurityEntity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityEntity';
      id: number | bigint;
      name: string;
      activated: boolean;
      static set(entity: gc.runtime.SecurityEntity, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<number | bigint | null>;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.SecurityEntity>>;
    }

    class PeriodicTask$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicTask$all$args';
    }

    class User$getToken$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$getToken$args';
      id: number | bigint;
      constructor(id: number | bigint);
      static createFrom(fields: {id: number | bigint}): User$getToken$args;
    }

    class User$login$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$login$args';
      credentials: string;
      use_cookie: boolean;
      constructor(credentials: string, use_cookie: boolean);
      static createFrom(fields: {credentials: string, use_cookie: boolean}): User$login$args;
    }

    class User$renew$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$renew$args';
      use_cookie: boolean;
      constructor(use_cookie: boolean);
      static createFrom(fields: {use_cookie: boolean}): User$renew$args;
    }

    class Debug extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug';
      static info(worker: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.DebugInfo>;
      static resume(worker: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static pause(worker: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static workers($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
      static remove(bps: globalThis.Array<gc.runtime.DebugBreakpoint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static add(bps: globalThis.Array<gc.runtime.DebugBreakpoint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    }

    class LogLevel extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::LogLevel';
      static readonly $fields: LogLevel[];
      key: LogLevel.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: LogLevel.Field, value?: unknown);
      static error: LogLevel;
      static warn: LogLevel;
      static info: LogLevel;
      static perf: LogLevel;
      static trace: LogLevel;
    }
    namespace LogLevel  {
      type Field = 'error'|'warn'|'info'|'perf'|'trace';
    }

    class Task extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task';
      user_id: number | bigint;
      task_id: number | bigint;
      mod: string | null;
      type: string | null;
      fun: string | null;
      creation: gc.core.time;
      start: gc.core.time | null;
      duration: gc.core.duration | null;
      status: gc.runtime.TaskStatus;
      progress: number | null;
      constructor(user_id: number | bigint, task_id: number | bigint, mod: string | null, type: string | null, fun: string | null, creation: gc.core.time, start: gc.core.time | null, duration: gc.core.duration | null, status: gc.runtime.TaskStatus, progress?: number | null);
      static createFrom(fields: {user_id: number | bigint, task_id: number | bigint, mod?: string | null, type?: string | null, fun?: string | null, creation: gc.core.time, start?: gc.core.time | null, duration?: gc.core.duration | null, status: gc.runtime.TaskStatus, progress?: number | null}): Task;
      static is_running(task_id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<boolean>;
      static cancel(task_id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<boolean>;
      static history(offset: number | bigint, max: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Task>>;
      static running($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Task>>;
    }

    class DebugVariable extends gc.sdk.GCObject {
      static readonly _type = 'runtime::DebugVariable';
      name: string | null;
      value: any | null;
      constructor(name?: string | null, value?: any | null);
      static createFrom(fields: {name?: string | null, value?: any | null}): DebugVariable;
    }

    class Runtime$abi$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$abi$args';
    }

    class LicenseType extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::LicenseType';
      static readonly $fields: LicenseType[];
      key: LicenseType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: LicenseType.Field, value?: unknown);
      static community: LicenseType;
      static enterprise: LicenseType;
      static testing: LicenseType;
    }
    namespace LicenseType  {
      type Field = 'community'|'enterprise'|'testing';
    }

    class SecurityEntity$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityEntity$set$args';
      entity: gc.runtime.SecurityEntity;
      constructor(entity: gc.runtime.SecurityEntity);
      static createFrom(fields: {entity: gc.runtime.SecurityEntity}): SecurityEntity$set$args;
    }

    class Debug$remove$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$remove$args';
      bps: globalThis.Array<gc.runtime.DebugBreakpoint>;
      constructor(bps: globalThis.Array<gc.runtime.DebugBreakpoint>);
      static createFrom(fields: {bps: globalThis.Array<gc.runtime.DebugBreakpoint>}): Debug$remove$args;
    }

    class License extends gc.sdk.GCObject {
      static readonly _type = 'runtime::License';
      name: string | null;
      start: gc.core.time;
      end: gc.core.time;
      company: string | null;
      max_memory: number | bigint;
      extra_1: number | bigint | null;
      extra_2: number | bigint | null;
      type: gc.runtime.LicenseType | null;
      constructor(name: string | null, start: gc.core.time, end: gc.core.time, company: string | null, max_memory: number | bigint, extra_1?: number | bigint | null, extra_2?: number | bigint | null, type?: gc.runtime.LicenseType | null);
      static createFrom(fields: {name?: string | null, start: gc.core.time, end: gc.core.time, company?: string | null, max_memory: number | bigint, extra_1?: number | bigint | null, extra_2?: number | bigint | null, type?: gc.runtime.LicenseType | null}): License;
    }

    class DebugInfo extends gc.sdk.GCObject {
      static readonly _type = 'runtime::DebugInfo';
      scopes: globalThis.Array<gc.runtime.DebugFrame>;
      root: any;
      constructor(scopes: globalThis.Array<gc.runtime.DebugFrame>, root: any);
      static createFrom(fields: {scopes: globalThis.Array<gc.runtime.DebugFrame>, root: any}): DebugInfo;
    }

    class User$setPassword$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$setPassword$args';
      name: string;
      pass: string;
      constructor(name: string, pass: string);
      static createFrom(fields: {name: string, pass: string}): User$setPassword$args;
    }

    class Debug$resume$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$resume$args';
      worker: number | bigint;
      constructor(worker: number | bigint);
      static createFrom(fields: {worker: number | bigint}): Debug$resume$args;
    }

    class Job<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Job';
      function: gc.core.function_;
      arguments: globalThis.Array<any | null> | null;
      constructor(function_: gc.core.function_, arguments_?: globalThis.Array<any | null> | null);
      static createFrom<T>(fields: {function_: gc.core.function_, arguments_?: globalThis.Array<any | null> | null}): Job;
    }

    class User$me$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$me$args';
    }

    class DebugFrame extends gc.sdk.GCObject {
      static readonly _type = 'runtime::DebugFrame';
      module: string | null;
      function: gc.core.function_ | null;
      line: number | bigint;
      column: number | bigint;
      scope: globalThis.Array<gc.runtime.DebugVariable>;
      constructor(module: string | null, function_: gc.core.function_ | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<gc.runtime.DebugVariable>);
      static createFrom(fields: {module?: string | null, function_?: gc.core.function_ | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<gc.runtime.DebugVariable>}): DebugFrame;
    }

    class Task$cancel$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$cancel$args';
      task_id: number | bigint;
      constructor(task_id: number | bigint);
      static createFrom(fields: {task_id: number | bigint}): Task$cancel$args;
    }

    class Runtime$root$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$root$args';
    }

    class Runtime$info$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$info$args';
    }

    class Debug$pause$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$pause$args';
      worker: number | bigint;
      constructor(worker: number | bigint);
      static createFrom(fields: {worker: number | bigint}): Debug$pause$args;
    }

    class Runtime extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime';
      static root($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<any>;
      static abi($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static info($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.RuntimeInfo>;
    }

    class SecurityFields$get$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityFields$get$args';
    }

    class SecurityEntity$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityEntity$all$args';
    }

    class Task$is_running$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$is_running$args';
      task_id: number | bigint;
      constructor(task_id: number | bigint);
      static createFrom(fields: {task_id: number | bigint}): Task$is_running$args;
    }

    class OpenIDConnect extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenIDConnect';
      url: string;
      clientId: string;
      constructor(url: string, clientId: string);
      static createFrom(fields: {url: string, clientId: string}): OpenIDConnect;
      static config($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.OpenIDConnect | null>;
    }

    class Log extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Log';
      level: gc.runtime.LogLevel;
      time: gc.core.time;
      user_id: number | bigint | null;
      id: number | bigint | null;
      id2: number | bigint | null;
      src: string | null;
      tag: string | null;
      data: any | null;
      constructor(level: gc.runtime.LogLevel, time: gc.core.time, user_id?: number | bigint | null, id?: number | bigint | null, id2?: number | bigint | null, src?: string | null, tag?: string | null, data?: any | null);
      static createFrom(fields: {level: gc.runtime.LogLevel, time: gc.core.time, user_id?: number | bigint | null, id?: number | bigint | null, id2?: number | bigint | null, src?: string | null, tag?: string | null, data?: any | null}): Log;
    }

    class UserRole$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserRole$all$args';
    }

    class System extends gc.sdk.GCObject {
      static readonly _type = 'runtime::System';
    }

    class Debug$info$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$info$args';
      worker: number | bigint;
      constructor(worker: number | bigint);
      static createFrom(fields: {worker: number | bigint}): Debug$info$args;
    }

    class PeriodicTask extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicTask';
      function: gc.core.function_ | null;
      user_id: number | bigint;
      arguments: globalThis.Array<any | null> | null;
      start: gc.core.time;
      every: gc.core.duration;
      constructor(function_: gc.core.function_ | null, user_id: number | bigint, arguments_: globalThis.Array<any | null> | null, start: gc.core.time, every: gc.core.duration);
      static createFrom(fields: {function_?: gc.core.function_ | null, user_id: number | bigint, arguments_?: globalThis.Array<any | null> | null, start: gc.core.time, every: gc.core.duration}): PeriodicTask;
      static set(tasks: globalThis.Array<gc.runtime.PeriodicTask>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.PeriodicTask>>;
    }

    class UserRole extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserRole';
      name: string;
      permissions: globalThis.Array<string>;
      constructor(name: string, permissions: globalThis.Array<string>);
      static createFrom(fields: {name: string, permissions: globalThis.Array<string>}): UserRole;
      static set(value: gc.runtime.UserRole, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static remove(name: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.UserRole>>;
    }

    class Task$running$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$running$args';
    }

    class DebugBreakpoint extends gc.sdk.GCObject {
      static readonly _type = 'runtime::DebugBreakpoint';
      module: string;
      line: number | bigint;
      column: number | bigint;
      constructor(module: string, line: number | bigint, column: number | bigint);
      static createFrom(fields: {module: string, line: number | bigint, column: number | bigint}): DebugBreakpoint;
    }

    class OpenIDConnect$config$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenIDConnect$config$args';
    }

    class User$tokenLogin$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$tokenLogin$args';
      token: string;
      use_cookie: boolean;
      constructor(token: string, use_cookie: boolean);
      static createFrom(fields: {token: string, use_cookie: boolean}): User$tokenLogin$args;
    }

    class User$permissions$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$permissions$args';
    }

    class SecurityPolicy extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityPolicy';
      entities: globalThis.Array<gc.runtime.SecurityEntity> | null;
      credentials: globalThis.Map<string, gc.runtime.UserCredential> | null;
      roles: globalThis.Map<string, gc.runtime.UserRole> | null;
      fields: gc.runtime.SecurityFields | null;
      keys: globalThis.Map<string, string> | null;
      keys_last_refresh: gc.core.time | null;
      constructor(entities?: globalThis.Array<gc.runtime.SecurityEntity> | null, credentials?: globalThis.Map<string, gc.runtime.UserCredential> | null, roles?: globalThis.Map<string, gc.runtime.UserRole> | null, fields?: gc.runtime.SecurityFields | null, keys?: globalThis.Map<string, string> | null, keys_last_refresh?: gc.core.time | null);
      static createFrom(fields: {entities?: globalThis.Array<gc.runtime.SecurityEntity> | null, credentials?: globalThis.Map<string, gc.runtime.UserCredential> | null, roles?: globalThis.Map<string, gc.runtime.UserRole> | null, fields?: gc.runtime.SecurityFields | null, keys?: globalThis.Map<string, string> | null, keys_last_refresh?: gc.core.time | null}): SecurityPolicy;
      static permissions($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
    }

    class Debug$workers$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$workers$args';
    }

    class TaskStatus extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::TaskStatus';
      static readonly $fields: TaskStatus[];
      key: TaskStatus.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TaskStatus.Field, value?: unknown);
      static empty: TaskStatus;
      static waiting: TaskStatus;
      static running: TaskStatus;
      static await: TaskStatus;
      static cancelled: TaskStatus;
      static error: TaskStatus;
      static ended: TaskStatus;
      static ended_with_errors: TaskStatus;
    }
    namespace TaskStatus  {
      type Field = 'empty'|'waiting'|'running'|'await'|'cancelled'|'error'|'ended'|'ended_with_errors';
    }

    class UserGroupPolicyType extends gc.sdk.GCEnum {
      static readonly _type = 'runtime::UserGroupPolicyType';
      static readonly $fields: UserGroupPolicyType[];
      key: UserGroupPolicyType.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: UserGroupPolicyType.Field, value?: unknown);
      static read: UserGroupPolicyType;
      static write: UserGroupPolicyType;
      static execute: UserGroupPolicyType;
    }
    namespace UserGroupPolicyType  {
      type Field = 'read'|'write'|'execute';
    }

    class SecurityPolicy$permissions$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityPolicy$permissions$args';
    }

    class UserGroup extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserGroup';
      id: number | bigint;
      name: string;
      activated: boolean;
      constructor(id: number | bigint, name: string, activated: boolean);
      static createFrom(fields: {id: number | bigint, name: string, activated: boolean}): UserGroup;
    }

    class User$current$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$current$args';
    }

    class PeriodicTask$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicTask$set$args';
      tasks: globalThis.Array<gc.runtime.PeriodicTask>;
      constructor(tasks: globalThis.Array<gc.runtime.PeriodicTask>);
      static createFrom(fields: {tasks: globalThis.Array<gc.runtime.PeriodicTask>}): PeriodicTask$set$args;
    }

    class SecurityFields$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityFields$set$args';
      f: gc.runtime.SecurityFields;
      constructor(f: gc.runtime.SecurityFields);
      static createFrom(fields: {f: gc.runtime.SecurityFields}): SecurityFields$set$args;
    }

    class SecurityFields extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityFields';
      email: string | null;
      name: string | null;
      first_name: string | null;
      last_name: string | null;
      roles: globalThis.Map<string, string> | null;
      groups: globalThis.Map<string, string> | null;
      constructor(email?: string | null, name?: string | null, first_name?: string | null, last_name?: string | null, roles?: globalThis.Map<string, string> | null, groups?: globalThis.Map<string, string> | null);
      static createFrom(fields: {email?: string | null, name?: string | null, first_name?: string | null, last_name?: string | null, roles?: globalThis.Map<string, string> | null, groups?: globalThis.Map<string, string> | null}): SecurityFields;
      static get($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.SecurityFields | null>;
      static set(f: gc.runtime.SecurityFields, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
    }

    class UserCredential extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserCredential';
      offset: number | bigint;
      pass: string | null;
      constructor(offset: number | bigint, pass?: string | null);
      static createFrom(fields: {offset: number | bigint, pass?: string | null}): UserCredential;
    }

  }

  namespace io {
    class CsvColumnInteger extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnInteger';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}): CsvColumnInteger;
    }

    class CsvAnalysis$analyze$args extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvAnalysis$analyze$args';
      file_path: string;
      config: gc.io.CsvAnalysisConfig | null;
      constructor(file_path: string, config?: gc.io.CsvAnalysisConfig | null);
      static createFrom(fields: {file_path: string, config?: gc.io.CsvAnalysisConfig | null}): CsvAnalysis$analyze$args;
    }

    class CsvWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvWriter';
      path: string;
      append: boolean | null;
      format: gc.io.CsvFormat | null;
      constructor(path: string, append?: boolean | null, format?: gc.io.CsvFormat | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null, format?: gc.io.CsvFormat | null}): CsvWriter;
    }

    class CsvColumn extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumn';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
    }

    class CsvFormat extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat';
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      columns_size: number | bigint | null;
      columns: globalThis.Array<gc.io.CsvColumn> | null;
      constructor(header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, columns_size?: number | bigint | null, columns?: globalThis.Array<gc.io.CsvColumn> | null);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, columns_size?: number | bigint | null, columns?: globalThis.Array<gc.io.CsvColumn> | null}): CsvFormat;
      static infer(analysis: gc.io.CsvStatistics, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.io.CsvFormat>;
      static sample(path: string, format?: gc.io.CsvFormat | null, offset?: number | bigint | null, max?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
      static validate(path: string, format: gc.io.CsvFormat, max_rows?: number | bigint | null, max_invalid?: number | bigint | null, invalid_path?: string | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.io.CsvValidateResult>;
      static generate(format: gc.io.CsvFormat, ident_col?: number | bigint | null, time_col?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    }

    class GcbReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::GcbReader';
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): GcbReader;
    }

    class CsvColumnTime extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnTime';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      unit: gc.core.DurationUnit | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, unit?: gc.core.DurationUnit | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, unit?: gc.core.DurationUnit | null}): CsvColumnTime;
    }

    class CsvValidateResult extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvValidateResult';
      line_count: number | bigint;
      fail_count: number | bigint;
      invalid_count: globalThis.Array<number | bigint>;
      constructor(line_count: number | bigint, fail_count: number | bigint, invalid_count: globalThis.Array<number | bigint>);
      static createFrom(fields: {line_count: number | bigint, fail_count: number | bigint, invalid_count: globalThis.Array<number | bigint>}): CsvValidateResult;
    }

    class CsvFormat$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat$sample$args';
      path: string;
      format: gc.io.CsvFormat | null;
      offset: number | bigint | null;
      max: number | bigint | null;
      constructor(path: string, format?: gc.io.CsvFormat | null, offset?: number | bigint | null, max?: number | bigint | null);
      static createFrom(fields: {path: string, format?: gc.io.CsvFormat | null, offset?: number | bigint | null, max?: number | bigint | null}): CsvFormat$sample$args;
    }

    class GcbWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::GcbWriter';
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): GcbWriter;
    }

    class CsvFormat$generate$args extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat$generate$args';
      format: gc.io.CsvFormat;
      ident_col: number | bigint | null;
      time_col: number | bigint | null;
      constructor(format: gc.io.CsvFormat, ident_col?: number | bigint | null, time_col?: number | bigint | null);
      static createFrom(fields: {format: gc.io.CsvFormat, ident_col?: number | bigint | null, time_col?: number | bigint | null}): CsvFormat$generate$args;
    }

    class CsvFormat$infer$args extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat$infer$args';
      analysis: gc.io.CsvStatistics;
      constructor(analysis: gc.io.CsvStatistics);
      static createFrom(fields: {analysis: gc.io.CsvStatistics}): CsvFormat$infer$args;
    }

    class CsvColumnBoolean extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnBoolean';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}): CsvColumnBoolean;
    }

    class CsvColumnDuration extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnDuration';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      unit: gc.core.DurationUnit | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, unit?: gc.core.DurationUnit | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, unit?: gc.core.DurationUnit | null}): CsvColumnDuration;
    }

    class CsvColumnString extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnString';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      trim: boolean | null;
      try_number: boolean | null;
      try_json: boolean | null;
      values: globalThis.Array<string> | null;
      encoder: gc.io.TextEncoder | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, trim?: boolean | null, try_number?: boolean | null, try_json?: boolean | null, values?: globalThis.Array<string> | null, encoder?: gc.io.TextEncoder | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, trim?: boolean | null, try_number?: boolean | null, try_json?: boolean | null, values?: globalThis.Array<string> | null, encoder?: gc.io.TextEncoder | null}): CsvColumnString;
    }

    class File extends gc.sdk.GCObject {
      static readonly _type = 'io::File';
      path: string;
      size: number | bigint | null;
      last_modification: gc.core.time | null;
      constructor(path: string, size?: number | bigint | null, last_modification?: gc.core.time | null);
      static createFrom(fields: {path: string, size?: number | bigint | null, last_modification?: gc.core.time | null}): File;
    }

    class JsonReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::JsonReader';
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): JsonReader;
    }

    class Smtp extends gc.sdk.GCObject {
      static readonly _type = 'io::Smtp';
      host: string;
      port: number | bigint;
      mode: gc.io.SmtpMode | null;
      authenticate: gc.io.SmtpAuth | null;
      user: string | null;
      pass: string | null;
      constructor(host: string, port: number | bigint, mode?: gc.io.SmtpMode | null, authenticate?: gc.io.SmtpAuth | null, user?: string | null, pass?: string | null);
      static createFrom(fields: {host: string, port: number | bigint, mode?: gc.io.SmtpMode | null, authenticate?: gc.io.SmtpAuth | null, user?: string | null, pass?: string | null}): Smtp;
    }

    class HttpHeader extends gc.sdk.GCObject {
      static readonly _type = 'io::HttpHeader';
      name: string;
      value: string;
      constructor(name: string, value: string);
      static createFrom(fields: {name: string, value: string}): HttpHeader;
    }

    class SmtpMode extends gc.sdk.GCEnum {
      static readonly _type = 'io::SmtpMode';
      static readonly $fields: SmtpMode[];
      key: SmtpMode.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SmtpMode.Field, value?: unknown);
      static plain: SmtpMode;
      static ssl_tls: SmtpMode;
      static starttls: SmtpMode;
    }
    namespace SmtpMode  {
      type Field = 'plain'|'ssl_tls'|'starttls';
    }

    class CsvAnalysisConfig extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvAnalysisConfig';
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      row_limit: number | bigint | null;
      enumerable_limit: number | bigint | null;
      date_check_limit: number | bigint | null;
      date_formats: globalThis.Array<string> | null;
      static enumerable_limit_default: bigint;
      static date_check_limit_default: bigint;
      constructor(header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, row_limit?: number | bigint | null, enumerable_limit?: number | bigint | null, date_check_limit?: number | bigint | null, date_formats?: globalThis.Array<string> | null);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, row_limit?: number | bigint | null, enumerable_limit?: number | bigint | null, date_check_limit?: number | bigint | null, date_formats?: globalThis.Array<string> | null}): CsvAnalysisConfig;
    }

    class CsvSharding extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvSharding';
      id: number | bigint;
      column: number | bigint;
      modulo: number | bigint;
      constructor(id: number | bigint, column: number | bigint, modulo: number | bigint);
      static createFrom(fields: {id: number | bigint, column: number | bigint, modulo: number | bigint}): CsvSharding;
    }

    class JsonWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::JsonWriter';
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): JsonWriter;
    }

    class Email extends gc.sdk.GCObject {
      static readonly _type = 'io::Email';
      from: string;
      subject: string;
      body: string;
      body_is_html: boolean;
      to: globalThis.Array<string>;
      cc: globalThis.Array<string> | null;
      bcc: globalThis.Array<string> | null;
      constructor(from: string, subject: string, body: string, body_is_html: boolean, to: globalThis.Array<string>, cc?: globalThis.Array<string> | null, bcc?: globalThis.Array<string> | null);
      static createFrom(fields: {from: string, subject: string, body: string, body_is_html: boolean, to: globalThis.Array<string>, cc?: globalThis.Array<string> | null, bcc?: globalThis.Array<string> | null}): Email;
    }

    class CsvColumnStatistics extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnStatistics';
      name: string | null;
      example: any | null;
      null_count: number | bigint;
      bool_count: number | bigint;
      int_count: number | bigint;
      float_count: number | bigint;
      string_count: number | bigint;
      date_count: number | bigint;
      date_format_count: globalThis.Map<string, number | bigint>;
      enumerable_count: globalThis.Map<any, number | bigint>;
      profile: gc.util.Gaussian;
      constructor(name: string | null, example: any | null, null_count: number | bigint, bool_count: number | bigint, int_count: number | bigint, float_count: number | bigint, string_count: number | bigint, date_count: number | bigint, date_format_count: globalThis.Map<string, number | bigint>, enumerable_count: globalThis.Map<any, number | bigint>, profile: gc.util.Gaussian);
      static createFrom(fields: {name?: string | null, example?: any | null, null_count: number | bigint, bool_count: number | bigint, int_count: number | bigint, float_count: number | bigint, string_count: number | bigint, date_count: number | bigint, date_format_count: globalThis.Map<string, number | bigint>, enumerable_count: globalThis.Map<any, number | bigint>, profile: gc.util.Gaussian}): CsvColumnStatistics;
    }

    class Reader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Reader';
      path: string;
      pos: number | bigint | null;
    }

    class Json<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Json';
    }

    class CsvColumnFloat extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnFloat';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}): CsvColumnFloat;
    }

    class TextReader extends gc.sdk.GCObject {
      static readonly _type = 'io::TextReader';
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom(fields: {path: string, pos?: number | bigint | null}): TextReader;
    }

    class CsvReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvReader';
      path: string;
      pos: number | bigint | null;
      format: gc.io.CsvFormat | null;
      sharding: gc.io.CsvSharding | null;
      constructor(path: string, pos?: number | bigint | null, format?: gc.io.CsvFormat | null, sharding?: gc.io.CsvSharding | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null, format?: gc.io.CsvFormat | null, sharding?: gc.io.CsvSharding | null}): CsvReader;
    }

    class SmtpAuth extends gc.sdk.GCEnum {
      static readonly _type = 'io::SmtpAuth';
      static readonly $fields: SmtpAuth[];
      key: SmtpAuth.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: SmtpAuth.Field, value?: unknown);
      static none: SmtpAuth;
      static plain: SmtpAuth;
      static login: SmtpAuth;
    }
    namespace SmtpAuth  {
      type Field = 'none'|'plain'|'login';
    }

    class Url extends gc.sdk.GCObject {
      static readonly _type = 'io::Url';
      protocol: string | null;
      host: string | null;
      port: number | bigint | null;
      path: string | null;
      params: globalThis.Map<string, string> | null;
      hash: string | null;
      constructor(protocol?: string | null, host?: string | null, port?: number | bigint | null, path?: string | null, params?: globalThis.Map<string, string> | null, hash?: string | null);
      static createFrom(fields: {protocol?: string | null, host?: string | null, port?: number | bigint | null, path?: string | null, params?: globalThis.Map<string, string> | null, hash?: string | null}): Url;
    }

    class Http extends gc.sdk.GCObject {
      static readonly _type = 'io::Http';
    }

    class TextWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::TextWriter';
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): TextWriter;
    }

    class TextEncoder extends gc.sdk.GCEnum {
      static readonly _type = 'io::TextEncoder';
      static readonly $fields: TextEncoder[];
      key: TextEncoder.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TextEncoder.Field, value?: unknown);
      static plain: TextEncoder;
      static base64: TextEncoder;
      static base64url: TextEncoder;
      static hexadecimal: TextEncoder;
    }
    namespace TextEncoder  {
      type Field = 'plain'|'base64'|'base64url'|'hexadecimal';
    }

    class CsvColumnDate extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnDate';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      format: string | null;
      tz: gc.core.TimeZone | null;
      as_time: boolean | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, format?: string | null, tz?: gc.core.TimeZone | null, as_time?: boolean | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null, format?: string | null, tz?: gc.core.TimeZone | null, as_time?: boolean | null}): CsvColumnDate;
    }

    class CsvStatistics extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvStatistics';
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      columns: globalThis.Array<gc.io.CsvColumnStatistics>;
      line_count: number | bigint;
      fail_count: number | bigint;
      file_count: number | bigint;
      constructor(header_lines: number | bigint | null, separator: string | null, string_delimiter: string | null, decimal_separator: string | null, thousands_separator: string | null, columns: globalThis.Array<gc.io.CsvColumnStatistics>, line_count: number | bigint, fail_count: number | bigint, file_count: number | bigint);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, columns: globalThis.Array<gc.io.CsvColumnStatistics>, line_count: number | bigint, fail_count: number | bigint, file_count: number | bigint}): CsvStatistics;
    }

    class CsvColumnIgnored extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvColumnIgnored';
      name: string | null;
      mandatory: boolean | null;
      offset: number | bigint | null;
      constructor(name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null);
      static createFrom(fields: {name?: string | null, mandatory?: boolean | null, offset?: number | bigint | null}): CsvColumnIgnored;
    }

    class Writer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Writer';
      path: string;
      append: boolean | null;
    }

    class FileWalker extends gc.sdk.GCObject {
      static readonly _type = 'io::FileWalker';
      path: string;
      constructor(path: string);
      static createFrom(fields: {path: string}): FileWalker;
    }

    class CsvFormat$validate$args extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat$validate$args';
      path: string;
      format: gc.io.CsvFormat;
      max_rows: number | bigint | null;
      max_invalid: number | bigint | null;
      invalid_path: string | null;
      constructor(path: string, format: gc.io.CsvFormat, max_rows?: number | bigint | null, max_invalid?: number | bigint | null, invalid_path?: string | null);
      static createFrom(fields: {path: string, format: gc.io.CsvFormat, max_rows?: number | bigint | null, max_invalid?: number | bigint | null, invalid_path?: string | null}): CsvFormat$validate$args;
    }

    class CsvAnalysis extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvAnalysis';
      config: gc.io.CsvAnalysisConfig | null;
      statistics: gc.io.CsvStatistics | null;
      constructor(config?: gc.io.CsvAnalysisConfig | null, statistics?: gc.io.CsvStatistics | null);
      static createFrom(fields: {config?: gc.io.CsvAnalysisConfig | null, statistics?: gc.io.CsvStatistics | null}): CsvAnalysis;
      static analyze(file_path: string, config?: gc.io.CsvAnalysisConfig | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.io.CsvStatistics>;
    }

  }

  namespace util {
    class TimeWindow<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::TimeWindow';
      values: gc.core.Table<gc.core.Tuple<gc.core.time, T>> | null;
      span: gc.core.duration;
      sum: number | null;
      sumsq: number | null;
      field: gc.core.field | null;
      constructor(values: gc.core.Table<gc.core.Tuple<gc.core.time, T>> | null, span: gc.core.duration, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null);
      static createFrom<T>(fields: {values?: gc.core.Table<gc.core.Tuple<gc.core.time, T>> | null, span: gc.core.duration, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null}): TimeWindow;
    }

    class Assert extends gc.sdk.GCObject {
      static readonly _type = 'util::Assert';
    }

    class Gaussian extends gc.sdk.GCObject {
      static readonly _type = 'util::Gaussian';
      sum: number | null;
      sumsq: number | null;
      count: number | bigint | null;
      min: number | null;
      max: number | null;
      constructor(sum?: number | null, sumsq?: number | null, count?: number | bigint | null, min?: number | null, max?: number | null);
      static createFrom(fields: {sum?: number | null, sumsq?: number | null, count?: number | bigint | null, min?: number | null, max?: number | null}): Gaussian;
    }

    class SlidingWindow<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::SlidingWindow';
      values: globalThis.Array<T> | null;
      span: number | bigint;
      sum: number | null;
      sumsq: number | null;
      field: gc.core.field | null;
      constructor(values: globalThis.Array<T> | null, span: number | bigint, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null, span: number | bigint, sum?: number | null, sumsq?: number | null, field?: gc.core.field | null}): SlidingWindow;
    }

    class Plot extends gc.sdk.GCObject {
      static readonly _type = 'util::Plot';
    }

    class MultiQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::MultiQuantizer';
      quantizers: globalThis.Array<gc.util.Quantizer<T>>;
      constructor(quantizers: globalThis.Array<gc.util.Quantizer<T>>);
      static createFrom<T>(fields: {quantizers: globalThis.Array<gc.util.Quantizer<T>>}): MultiQuantizer;
    }

    class GaussianProfile<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::GaussianProfile';
      quantizer: gc.util.Quantizer<T>;
      precision: gc.core.FloatPrecision;
      bins: gc.core.Table<gc.util.GaussianProfileSlot | null> | null;
      value_min: number | null;
      nb_rejected: number | bigint | null;
      constructor(quantizer: gc.util.Quantizer<T>, precision: gc.core.FloatPrecision, bins?: gc.core.Table<gc.util.GaussianProfileSlot | null> | null, value_min?: number | null, nb_rejected?: number | bigint | null);
      static createFrom<T>(fields: {quantizer: gc.util.Quantizer<T>, precision: gc.core.FloatPrecision, bins?: gc.core.Table<gc.util.GaussianProfileSlot | null> | null, value_min?: number | null, nb_rejected?: number | bigint | null}): GaussianProfile;
    }

    class Histogram<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Histogram';
      quantizer: gc.util.Quantizer<T>;
      bins: globalThis.Array<number | bigint | null> | null;
      nb_rejected: number | bigint | null;
      nb_accepted: number | bigint | null;
      constructor(quantizer: gc.util.Quantizer<T>, bins?: globalThis.Array<number | bigint | null> | null, nb_rejected?: number | bigint | null, nb_accepted?: number | bigint | null);
      static createFrom<T>(fields: {quantizer: gc.util.Quantizer<T>, bins?: globalThis.Array<number | bigint | null> | null, nb_rejected?: number | bigint | null, nb_accepted?: number | bigint | null}): Histogram;
    }

    class Stack<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Stack';
      values: globalThis.Array<T> | null;
      constructor(values?: globalThis.Array<T> | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null}): Stack;
    }

    class CustomQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::CustomQuantizer';
      min: T | null;
      max: T | null;
      step_starts: globalThis.Array<T>;
      open: boolean | null;
      constructor(min: T | null, max: T | null, step_starts: globalThis.Array<T>, open?: boolean | null);
      static createFrom<T>(fields: {min?: T | null, max?: T | null, step_starts: globalThis.Array<T>, open?: boolean | null}): CustomQuantizer;
    }

    class GaussianProfileSlot extends gc.sdk.GCObject {
      static readonly _type = 'util::GaussianProfileSlot';
      sum: number | bigint;
      sumsq: number | bigint;
      count: number | bigint;
      constructor(sum: number | bigint, sumsq: number | bigint, count: number | bigint);
      static createFrom(fields: {sum: number | bigint, sumsq: number | bigint, count: number | bigint}): GaussianProfileSlot;
    }

    class Quantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Quantizer';
    }

    class QuantizerSlotBound<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::QuantizerSlotBound';
      min: T | null;
      max: T | null;
      center: T | null;
      constructor(min?: T | null, max?: T | null, center?: T | null);
      static createFrom<T>(fields: {min?: T | null, max?: T | null, center?: T | null}): QuantizerSlotBound;
    }

    class Random extends gc.sdk.GCObject {
      static readonly _type = 'util::Random';
      seed: number | bigint | null;
      v: number | null;
      constructor(seed?: number | bigint | null, v?: number | null);
      static createFrom(fields: {seed?: number | bigint | null, v?: number | null}): Random;
    }

    class HistogramStats extends gc.sdk.GCObject {
      static readonly _type = 'util::HistogramStats';
      min: number;
      max: number;
      whisker_low: number;
      whisker_high: number;
      percentile1: number;
      percentile5: number;
      percentile25: number;
      percentile50: number;
      percentile75: number;
      percentile95: number;
      percentile99: number;
      count_outliers_low: number | bigint;
      count_outliers_high: number | bigint;
      percentage_outliers_low: number;
      percentage_outliers_high: number;
      sum: number;
      avg: number;
      std: number;
      size: number | bigint;
      constructor(min: number, max: number, whisker_low: number, whisker_high: number, percentile1: number, percentile5: number, percentile25: number, percentile50: number, percentile75: number, percentile95: number, percentile99: number, count_outliers_low: number | bigint, count_outliers_high: number | bigint, percentage_outliers_low: number, percentage_outliers_high: number, sum: number, avg: number, std: number, size: number | bigint);
      static createFrom(fields: {min: number, max: number, whisker_low: number, whisker_high: number, percentile1: number, percentile5: number, percentile25: number, percentile50: number, percentile75: number, percentile95: number, percentile99: number, count_outliers_low: number | bigint, count_outliers_high: number | bigint, percentage_outliers_low: number, percentage_outliers_high: number, sum: number, avg: number, std: number, size: number | bigint}): HistogramStats;
    }

    class LinearQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::LinearQuantizer';
      min: T | null;
      max: T | null;
      bins: number | bigint;
      open: boolean | null;
      constructor(min: T | null, max: T | null, bins: number | bigint, open?: boolean | null);
      static createFrom<T>(fields: {min?: T | null, max?: T | null, bins: number | bigint, open?: boolean | null}): LinearQuantizer;
    }

    class Queue<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Queue';
      values: globalThis.Array<T> | null;
      capacity: number | bigint | null;
      constructor(values?: globalThis.Array<T> | null, capacity?: number | bigint | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null, capacity?: number | bigint | null}): Queue;
    }

    class ProgressTracker extends gc.sdk.GCObject {
      static readonly _type = 'util::ProgressTracker';
      start: gc.core.time;
      total: number | bigint | null;
      counter: number | bigint | null;
      duration: gc.core.duration | null;
      progress: number | null;
      speed: number | null;
      remaining: gc.core.duration | null;
      constructor(start: gc.core.time, total?: number | bigint | null, counter?: number | bigint | null, duration?: gc.core.duration | null, progress?: number | null, speed?: number | null, remaining?: gc.core.duration | null);
      static createFrom(fields: {start: gc.core.time, total?: number | bigint | null, counter?: number | bigint | null, duration?: gc.core.duration | null, progress?: number | null, speed?: number | null, remaining?: gc.core.duration | null}): ProgressTracker;
    }

    class Crypto extends gc.sdk.GCObject {
      static readonly _type = 'util::Crypto';
    }

    class LogQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::LogQuantizer';
      min: T | null;
      max: T | null;
      bins: number | bigint;
      open: boolean | null;
      constructor(min: T | null, max: T | null, bins: number | bigint, open?: boolean | null);
      static createFrom<T>(fields: {min?: T | null, max?: T | null, bins: number | bigint, open?: boolean | null}): LogQuantizer;
    }

  }

  namespace sdk {
    interface GreyCat {
        call(method: 'core::nodeTime::info', args: [globalThis.Array<gc.core.nodeTime>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>;
        spawn(method: 'core::nodeTime::info', args: [globalThis.Array<gc.core.nodeTime>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeTime::info', args: [globalThis.Array<gc.core.nodeTime>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>;
        call(method: 'core::nodeTime::sample', args: [globalThis.Array<gc.core.nodeTime>, gc.core.time | null, gc.core.time | null, number | bigint, gc.core.SamplingMode, gc.core.duration | null, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeTime::sample', args: [globalThis.Array<gc.core.nodeTime>, gc.core.time | null, gc.core.time | null, number | bigint, gc.core.SamplingMode, gc.core.duration | null, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeTime::sample', args: [globalThis.Array<gc.core.nodeTime>, gc.core.time | null, gc.core.time | null, number | bigint, gc.core.SamplingMode, gc.core.duration | null, gc.core.TimeZone | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::Date::fromTime', args: [gc.core.time, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.core.Date>;
        spawn(method: 'core::Date::fromTime', args: [gc.core.time, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::Date::fromTime', args: [gc.core.time, gc.core.TimeZone | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Date>;
        call(method: 'core::nodeIndex::info', args: [globalThis.Array<gc.core.nodeIndex>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo>>;
        spawn(method: 'core::nodeIndex::info', args: [globalThis.Array<gc.core.nodeIndex>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeIndex::info', args: [globalThis.Array<gc.core.nodeIndex>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo>>;
        call(method: 'core::nodeIndex::sample', args: [globalThis.Array<gc.core.nodeIndex>, any | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeIndex::sample', args: [globalThis.Array<gc.core.nodeIndex>, any | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeIndex::sample', args: [globalThis.Array<gc.core.nodeIndex>, any | null, number | bigint, gc.core.SamplingMode], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::nodeGeo::info', args: [globalThis.Array<gc.core.nodeGeo>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>;
        spawn(method: 'core::nodeGeo::info', args: [globalThis.Array<gc.core.nodeGeo>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeGeo::info', args: [globalThis.Array<gc.core.nodeGeo>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>;
        call(method: 'core::nodeGeo::sample', args: [globalThis.Array<gc.core.nodeGeo>, gc.core.geo | null, gc.core.geo | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeGeo::sample', args: [globalThis.Array<gc.core.nodeGeo>, gc.core.geo | null, gc.core.geo | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeGeo::sample', args: [globalThis.Array<gc.core.nodeGeo>, gc.core.geo | null, gc.core.geo | null, number | bigint, gc.core.SamplingMode], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::node::resolve_all', args: [globalThis.Array<gc.core.node | null>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
        spawn(method: 'core::node::resolve_all', args: [globalThis.Array<gc.core.node | null>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::node::resolve_all', args: [globalThis.Array<gc.core.node | null>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
        call(method: 'core::nodeList::info', args: [globalThis.Array<gc.core.nodeList>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>;
        spawn(method: 'core::nodeList::info', args: [globalThis.Array<gc.core.nodeList>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeList::info', args: [globalThis.Array<gc.core.nodeList>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>;
        call(method: 'core::nodeList::sample', args: [globalThis.Array<gc.core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, gc.core.SamplingMode, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeList::sample', args: [globalThis.Array<gc.core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, gc.core.SamplingMode, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeList::sample', args: [globalThis.Array<gc.core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, gc.core.SamplingMode, number | bigint | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::Table::applyMappings', args: [gc.core.Table, globalThis.Array<gc.core.TableColumnMapping>], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::Table::applyMappings', args: [gc.core.Table, globalThis.Array<gc.core.TableColumnMapping>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::Table::applyMappings', args: [gc.core.Table, globalThis.Array<gc.core.TableColumnMapping>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'runtime::User::getToken', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'runtime::User::getToken', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::getToken', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'runtime::User::setPassword', args: [string, string], signal?: globalThis.AbortSignal): Promise<boolean>;
        spawn(method: 'runtime::User::setPassword', args: [string, string], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::setPassword', args: [string, string], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<boolean>;
        call(method: 'runtime::User::permissions', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
        spawn(method: 'runtime::User::permissions', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::permissions', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
        call(method: 'runtime::User::me', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.User>;
        spawn(method: 'runtime::User::me', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::me', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.User>;
        call(method: 'runtime::User::current', args?: undefined, signal?: globalThis.AbortSignal): Promise<number | bigint>;
        spawn(method: 'runtime::User::current', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::current', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<number | bigint>;
        call(method: 'runtime::User::renew', args: [boolean], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'runtime::User::renew', args: [boolean], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::renew', args: [boolean], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'runtime::User::logout', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::User::logout', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::logout', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::User::tokenLogin', args: [string, boolean], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'runtime::User::tokenLogin', args: [string, boolean], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::tokenLogin', args: [string, boolean], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'runtime::User::login', args: [string, boolean], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'runtime::User::login', args: [string, boolean], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::User::login', args: [string, boolean], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'runtime::SecurityEntity::set', args: [gc.runtime.SecurityEntity], signal?: globalThis.AbortSignal): Promise<number | bigint | null>;
        spawn(method: 'runtime::SecurityEntity::set', args: [gc.runtime.SecurityEntity], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityEntity::set', args: [gc.runtime.SecurityEntity], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<number | bigint | null>;
        call(method: 'runtime::SecurityEntity::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.SecurityEntity>>;
        spawn(method: 'runtime::SecurityEntity::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityEntity::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.SecurityEntity>>;
        call(method: 'runtime::Debug::info', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.DebugInfo>;
        spawn(method: 'runtime::Debug::info', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::info', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.DebugInfo>;
        call(method: 'runtime::Debug::resume', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::Debug::resume', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::resume', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Debug::pause', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::Debug::pause', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::pause', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Debug::workers', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        spawn(method: 'runtime::Debug::workers', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::workers', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        call(method: 'runtime::Debug::remove', args: [globalThis.Array<gc.runtime.DebugBreakpoint>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::Debug::remove', args: [globalThis.Array<gc.runtime.DebugBreakpoint>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::remove', args: [globalThis.Array<gc.runtime.DebugBreakpoint>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Debug::add', args: [globalThis.Array<gc.runtime.DebugBreakpoint>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::Debug::add', args: [globalThis.Array<gc.runtime.DebugBreakpoint>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::add', args: [globalThis.Array<gc.runtime.DebugBreakpoint>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Task::is_running', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<boolean>;
        spawn(method: 'runtime::Task::is_running', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Task::is_running', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<boolean>;
        call(method: 'runtime::Task::cancel', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<boolean>;
        spawn(method: 'runtime::Task::cancel', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Task::cancel', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<boolean>;
        call(method: 'runtime::Task::history', args: [number | bigint, number | bigint], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Task>>;
        spawn(method: 'runtime::Task::history', args: [number | bigint, number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Task::history', args: [number | bigint, number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Task>>;
        call(method: 'runtime::Task::running', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Task>>;
        spawn(method: 'runtime::Task::running', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Task::running', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Task>>;
        call(method: 'runtime::Runtime::root', args?: undefined, signal?: globalThis.AbortSignal): Promise<any>;
        spawn(method: 'runtime::Runtime::root', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Runtime::root', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<any>;
        call(method: 'runtime::Runtime::abi', args?: undefined, signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::Runtime::abi', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Runtime::abi', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Runtime::info', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.RuntimeInfo>;
        spawn(method: 'runtime::Runtime::info', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Runtime::info', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.RuntimeInfo>;
        call(method: 'runtime::OpenIDConnect::config', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.OpenIDConnect | null>;
        spawn(method: 'runtime::OpenIDConnect::config', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::OpenIDConnect::config', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.OpenIDConnect | null>;
        call(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<gc.runtime.PeriodicTask>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<gc.runtime.PeriodicTask>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<gc.runtime.PeriodicTask>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::PeriodicTask::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.PeriodicTask>>;
        spawn(method: 'runtime::PeriodicTask::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::PeriodicTask::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.PeriodicTask>>;
        call(method: 'runtime::UserRole::set', args: [gc.runtime.UserRole], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::UserRole::set', args: [gc.runtime.UserRole], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::UserRole::set', args: [gc.runtime.UserRole], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::UserRole::remove', args: [string], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::UserRole::remove', args: [string], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::UserRole::remove', args: [string], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::UserRole::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.UserRole>>;
        spawn(method: 'runtime::UserRole::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::UserRole::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.UserRole>>;
        call(method: 'runtime::SecurityPolicy::permissions', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
        spawn(method: 'runtime::SecurityPolicy::permissions', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityPolicy::permissions', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
        call(method: 'runtime::SecurityFields::get', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.SecurityFields | null>;
        spawn(method: 'runtime::SecurityFields::get', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityFields::get', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.SecurityFields | null>;
        call(method: 'runtime::SecurityFields::set', args: [gc.runtime.SecurityFields], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::SecurityFields::set', args: [gc.runtime.SecurityFields], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityFields::set', args: [gc.runtime.SecurityFields], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'io::CsvFormat::infer', args: [gc.io.CsvStatistics], signal?: globalThis.AbortSignal): Promise<gc.io.CsvFormat>;
        spawn(method: 'io::CsvFormat::infer', args: [gc.io.CsvStatistics], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::CsvFormat::infer', args: [gc.io.CsvStatistics], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.io.CsvFormat>;
        call(method: 'io::CsvFormat::sample', args: [string, gc.io.CsvFormat | null, number | bigint | null, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'io::CsvFormat::sample', args: [string, gc.io.CsvFormat | null, number | bigint | null, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::CsvFormat::sample', args: [string, gc.io.CsvFormat | null, number | bigint | null, number | bigint | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'io::CsvFormat::validate', args: [string, gc.io.CsvFormat, number | bigint | null, number | bigint | null, string | null], signal?: globalThis.AbortSignal): Promise<gc.io.CsvValidateResult>;
        spawn(method: 'io::CsvFormat::validate', args: [string, gc.io.CsvFormat, number | bigint | null, number | bigint | null, string | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::CsvFormat::validate', args: [string, gc.io.CsvFormat, number | bigint | null, number | bigint | null, string | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.io.CsvValidateResult>;
        call(method: 'io::CsvFormat::generate', args: [gc.io.CsvFormat, number | bigint | null, number | bigint | null], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'io::CsvFormat::generate', args: [gc.io.CsvFormat, number | bigint | null, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::CsvFormat::generate', args: [gc.io.CsvFormat, number | bigint | null, number | bigint | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
        call(method: 'io::CsvAnalysis::analyze', args: [string, gc.io.CsvAnalysisConfig | null], signal?: globalThis.AbortSignal): Promise<gc.io.CsvStatistics>;
        spawn(method: 'io::CsvAnalysis::analyze', args: [string, gc.io.CsvAnalysisConfig | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::CsvAnalysis::analyze', args: [string, gc.io.CsvAnalysisConfig | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.io.CsvStatistics>;
    }
  }

}
declare namespace gc {
  namespace runtime {
    interface Task {
      /**
       * Downloads a task file.
       *
       * The given `filepath` will be concatenated with the task path eg. `/files/${task.user_id}/tasks/${task.task_id}/${filepath}`
       *
       * Returns a `T[]` because ".gcb" files can contain multiple values.
       *
       * Note that, by default, the `T` is always unknown. It is just given for convenience if you know for sure
       * what is inside the requested file. But it gives no verifications on the content of the data.
       */
      getFile<T = unknown>(
        filepath: `${string}.gcb`,
        g?: gc.sdk.GreyCat,
        signal?: AbortSignal,
      ): Promise<T[]>;
      /**
       * Downloads a task file.
       *
       * The given `filepath` will be concatenated with the task path eg. `/files/${task.user_id}/tasks/${task.task_id}/${filepath}`
       *
       * Returns either a `T` or a `T[]` based on the extension of the file. All files will return `T` except ".gcb" files which
       * can contain more than one value, therefore `T[]`.
       *
       * Note that, by default, the `T` is always unknown. It is just given for convenience if you know for sure
       * what is inside the requested file. But it gives no verifications on the content of the data.
       */
      getFile<T = unknown>(
        filepath: string,
        g?: gc.sdk.GreyCat,
        signal?: AbortSignal,
      ): Promise<T | T[]>;

      /**
       * Returns the result of the task.
       *
       * *This is equivalent to `task.getFile('result.gcb')`*
       */
      result<T = unknown>(g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<T>;

      /**
       * Awaits for the completion of the task.
       *
       * *NB: "completion" does not mean success*
       *
       * @param pollEvery will check the status of the task once every `pollEvery` milliseconds
       * @param g
       * @param signal
       */
      await<T = unknown>(
        pollEvery?: number,
        g?: gc.sdk.GreyCat,
        signal?: AbortSignal,
      ): Promise<T>;

      /**
       * Whether or not this task is live or completed.
       * @param g
       * @param signal
       */
      is_running(g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<boolean>;
    }
  }

  namespace io {
    interface File {
      children?: File[];

      /**
       * Lists the current children of this file.
       *
       * If this file is not a directory, returns `undefined`.
       */
      list(g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<File[] | undefined>;

      /**
       * Resolves this file's children recursively to a maximum depth of `maxDepth` (defaults to `5`)
       */
      resolve(maxDepth?: number, g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<void>;
    }
  }

  namespace core {
    interface Date {
      /**
       * ISO8601-ish representation of this date
       */
      toString(): string;
    }
  }
}
