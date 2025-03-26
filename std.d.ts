// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
declare namespace gc {
  namespace core {
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
      static from_time(time: gc.core.time, tz?: gc.core.TimeZone | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Date>;
    }

    class Buffer extends gc.sdk.std_n.core.Buffer {}

    class nodeIndex$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$sample$args';
      refs: globalThis.Array<gc.core.nodeIndex>;
      from: any | null;
      maxRows: number | bigint;
      mode: gc.core.SamplingMode;
      constructor(refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode);
      static createFrom(fields: {refs: globalThis.Array<gc.core.nodeIndex>, from?: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode}): nodeIndex$sample$args;
    }

    class nodeTimeCursor<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTimeCursor';
      n: gc.core.nodeTime<T>;
      req_time: gc.core.time | null;
      constructor(n: gc.core.nodeTime<T>, req_time?: gc.core.time | null);
      static createFrom<T>(fields: {n: gc.core.nodeTime<T>, req_time?: gc.core.time | null}): nodeTimeCursor;
    }

    class TimeZone extends gc.sdk.GCEnum {
      static readonly _type = 'core::TimeZone';
      static readonly $fields: TimeZone[];
      key: TimeZone.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: TimeZone.Field, value?: unknown);
      static UTC: TimeZone;
      static "Africa/Abidjan": TimeZone;
      static "Africa/Accra": TimeZone;
      static "Africa/Addis_Ababa": TimeZone;
      static "Africa/Algiers": TimeZone;
      static "Africa/Asmara": TimeZone;
      static "Africa/Asmera": TimeZone;
      static "Africa/Bamako": TimeZone;
      static "Africa/Bangui": TimeZone;
      static "Africa/Banjul": TimeZone;
      static "Africa/Bissau": TimeZone;
      static "Africa/Blantyre": TimeZone;
      static "Africa/Brazzaville": TimeZone;
      static "Africa/Bujumbura": TimeZone;
      static "Africa/Cairo": TimeZone;
      static "Africa/Casablanca": TimeZone;
      static "Africa/Ceuta": TimeZone;
      static "Africa/Conakry": TimeZone;
      static "Africa/Dakar": TimeZone;
      static "Africa/Dar_es_Salaam": TimeZone;
      static "Africa/Djibouti": TimeZone;
      static "Africa/Douala": TimeZone;
      static "Africa/El_Aaiun": TimeZone;
      static "Africa/Freetown": TimeZone;
      static "Africa/Gaborone": TimeZone;
      static "Africa/Harare": TimeZone;
      static "Africa/Johannesburg": TimeZone;
      static "Africa/Juba": TimeZone;
      static "Africa/Kampala": TimeZone;
      static "Africa/Khartoum": TimeZone;
      static "Africa/Kigali": TimeZone;
      static "Africa/Kinshasa": TimeZone;
      static "Africa/Lagos": TimeZone;
      static "Africa/Libreville": TimeZone;
      static "Africa/Lome": TimeZone;
      static "Africa/Luanda": TimeZone;
      static "Africa/Lubumbashi": TimeZone;
      static "Africa/Lusaka": TimeZone;
      static "Africa/Malabo": TimeZone;
      static "Africa/Maputo": TimeZone;
      static "Africa/Maseru": TimeZone;
      static "Africa/Mbabane": TimeZone;
      static "Africa/Mogadishu": TimeZone;
      static "Africa/Monrovia": TimeZone;
      static "Africa/Nairobi": TimeZone;
      static "Africa/Ndjamena": TimeZone;
      static "Africa/Niamey": TimeZone;
      static "Africa/Nouakchott": TimeZone;
      static "Africa/Ouagadougou": TimeZone;
      static "Africa/Porto-Novo": TimeZone;
      static "Africa/Sao_Tome": TimeZone;
      static "Africa/Timbuktu": TimeZone;
      static "Africa/Tripoli": TimeZone;
      static "Africa/Tunis": TimeZone;
      static "Africa/Windhoek": TimeZone;
      static "America/Adak": TimeZone;
      static "America/Anchorage": TimeZone;
      static "America/Anguilla": TimeZone;
      static "America/Antigua": TimeZone;
      static "America/Araguaina": TimeZone;
      static "America/Argentina/Buenos_Aires": TimeZone;
      static "America/Argentina/Catamarca": TimeZone;
      static "America/Argentina/ComodRivadavia": TimeZone;
      static "America/Argentina/Cordoba": TimeZone;
      static "America/Argentina/Jujuy": TimeZone;
      static "America/Argentina/La_Rioja": TimeZone;
      static "America/Argentina/Mendoza": TimeZone;
      static "America/Argentina/Rio_Gallegos": TimeZone;
      static "America/Argentina/Salta": TimeZone;
      static "America/Argentina/San_Juan": TimeZone;
      static "America/Argentina/San_Luis": TimeZone;
      static "America/Argentina/Tucuman": TimeZone;
      static "America/Argentina/Ushuaia": TimeZone;
      static "America/Aruba": TimeZone;
      static "America/Asuncion": TimeZone;
      static "America/Atikokan": TimeZone;
      static "America/Atka": TimeZone;
      static "America/Bahia": TimeZone;
      static "America/Bahia_Banderas": TimeZone;
      static "America/Barbados": TimeZone;
      static "America/Belem": TimeZone;
      static "America/Belize": TimeZone;
      static "America/Blanc-Sablon": TimeZone;
      static "America/Boa_Vista": TimeZone;
      static "America/Bogota": TimeZone;
      static "America/Boise": TimeZone;
      static "America/Buenos_Aires": TimeZone;
      static "America/Cambridge_Bay": TimeZone;
      static "America/Campo_Grande": TimeZone;
      static "America/Cancun": TimeZone;
      static "America/Caracas": TimeZone;
      static "America/Catamarca": TimeZone;
      static "America/Cayenne": TimeZone;
      static "America/Cayman": TimeZone;
      static "America/Chicago": TimeZone;
      static "America/Chihuahua": TimeZone;
      static "America/Ciudad_Juarez": TimeZone;
      static "America/Coral_Harbour": TimeZone;
      static "America/Cordoba": TimeZone;
      static "America/Costa_Rica": TimeZone;
      static "America/Coyhaique": TimeZone;
      static "America/Creston": TimeZone;
      static "America/Cuiaba": TimeZone;
      static "America/Curacao": TimeZone;
      static "America/Danmarkshavn": TimeZone;
      static "America/Dawson": TimeZone;
      static "America/Dawson_Creek": TimeZone;
      static "America/Denver": TimeZone;
      static "America/Detroit": TimeZone;
      static "America/Dominica": TimeZone;
      static "America/Edmonton": TimeZone;
      static "America/Eirunepe": TimeZone;
      static "America/El_Salvador": TimeZone;
      static "America/Ensenada": TimeZone;
      static "America/Fort_Nelson": TimeZone;
      static "America/Fort_Wayne": TimeZone;
      static "America/Fortaleza": TimeZone;
      static "America/Glace_Bay": TimeZone;
      static "America/Godthab": TimeZone;
      static "America/Goose_Bay": TimeZone;
      static "America/Grand_Turk": TimeZone;
      static "America/Grenada": TimeZone;
      static "America/Guadeloupe": TimeZone;
      static "America/Guatemala": TimeZone;
      static "America/Guayaquil": TimeZone;
      static "America/Guyana": TimeZone;
      static "America/Halifax": TimeZone;
      static "America/Havana": TimeZone;
      static "America/Hermosillo": TimeZone;
      static "America/Indiana/Indianapolis": TimeZone;
      static "America/Indiana/Knox": TimeZone;
      static "America/Indiana/Marengo": TimeZone;
      static "America/Indiana/Petersburg": TimeZone;
      static "America/Indiana/Tell_City": TimeZone;
      static "America/Indiana/Vevay": TimeZone;
      static "America/Indiana/Vincennes": TimeZone;
      static "America/Indiana/Winamac": TimeZone;
      static "America/Indianapolis": TimeZone;
      static "America/Inuvik": TimeZone;
      static "America/Iqaluit": TimeZone;
      static "America/Jamaica": TimeZone;
      static "America/Jujuy": TimeZone;
      static "America/Juneau": TimeZone;
      static "America/Kentucky/Louisville": TimeZone;
      static "America/Kentucky/Monticello": TimeZone;
      static "America/Knox_IN": TimeZone;
      static "America/Kralendijk": TimeZone;
      static "America/La_Paz": TimeZone;
      static "America/Lima": TimeZone;
      static "America/Los_Angeles": TimeZone;
      static "America/Louisville": TimeZone;
      static "America/Lower_Princes": TimeZone;
      static "America/Maceio": TimeZone;
      static "America/Managua": TimeZone;
      static "America/Manaus": TimeZone;
      static "America/Marigot": TimeZone;
      static "America/Martinique": TimeZone;
      static "America/Matamoros": TimeZone;
      static "America/Mazatlan": TimeZone;
      static "America/Mendoza": TimeZone;
      static "America/Menominee": TimeZone;
      static "America/Merida": TimeZone;
      static "America/Metlakatla": TimeZone;
      static "America/Mexico_City": TimeZone;
      static "America/Miquelon": TimeZone;
      static "America/Moncton": TimeZone;
      static "America/Monterrey": TimeZone;
      static "America/Montevideo": TimeZone;
      static "America/Montreal": TimeZone;
      static "America/Montserrat": TimeZone;
      static "America/Nassau": TimeZone;
      static "America/New_York": TimeZone;
      static "America/Nipigon": TimeZone;
      static "America/Nome": TimeZone;
      static "America/Noronha": TimeZone;
      static "America/North_Dakota/Beulah": TimeZone;
      static "America/North_Dakota/Center": TimeZone;
      static "America/North_Dakota/New_Salem": TimeZone;
      static "America/Nuuk": TimeZone;
      static "America/Ojinaga": TimeZone;
      static "America/Panama": TimeZone;
      static "America/Pangnirtung": TimeZone;
      static "America/Paramaribo": TimeZone;
      static "America/Phoenix": TimeZone;
      static "America/Port-au-Prince": TimeZone;
      static "America/Port_of_Spain": TimeZone;
      static "America/Porto_Acre": TimeZone;
      static "America/Porto_Velho": TimeZone;
      static "America/Puerto_Rico": TimeZone;
      static "America/Punta_Arenas": TimeZone;
      static "America/Rainy_River": TimeZone;
      static "America/Rankin_Inlet": TimeZone;
      static "America/Recife": TimeZone;
      static "America/Regina": TimeZone;
      static "America/Resolute": TimeZone;
      static "America/Rio_Branco": TimeZone;
      static "America/Rosario": TimeZone;
      static "America/Santa_Isabel": TimeZone;
      static "America/Santarem": TimeZone;
      static "America/Santiago": TimeZone;
      static "America/Santo_Domingo": TimeZone;
      static "America/Sao_Paulo": TimeZone;
      static "America/Scoresbysund": TimeZone;
      static "America/Shiprock": TimeZone;
      static "America/Sitka": TimeZone;
      static "America/St_Barthelemy": TimeZone;
      static "America/St_Johns": TimeZone;
      static "America/St_Kitts": TimeZone;
      static "America/St_Lucia": TimeZone;
      static "America/St_Thomas": TimeZone;
      static "America/St_Vincent": TimeZone;
      static "America/Swift_Current": TimeZone;
      static "America/Tegucigalpa": TimeZone;
      static "America/Thule": TimeZone;
      static "America/Thunder_Bay": TimeZone;
      static "America/Tijuana": TimeZone;
      static "America/Toronto": TimeZone;
      static "America/Tortola": TimeZone;
      static "America/Vancouver": TimeZone;
      static "America/Virgin": TimeZone;
      static "America/Whitehorse": TimeZone;
      static "America/Winnipeg": TimeZone;
      static "America/Yakutat": TimeZone;
      static "America/Yellowknife": TimeZone;
      static "Antarctica/Casey": TimeZone;
      static "Antarctica/Davis": TimeZone;
      static "Antarctica/DumontDUrville": TimeZone;
      static "Antarctica/Macquarie": TimeZone;
      static "Antarctica/Mawson": TimeZone;
      static "Antarctica/McMurdo": TimeZone;
      static "Antarctica/Palmer": TimeZone;
      static "Antarctica/Rothera": TimeZone;
      static "Antarctica/South_Pole": TimeZone;
      static "Antarctica/Syowa": TimeZone;
      static "Antarctica/Troll": TimeZone;
      static "Antarctica/Vostok": TimeZone;
      static "Arctic/Longyearbyen": TimeZone;
      static "Asia/Aden": TimeZone;
      static "Asia/Almaty": TimeZone;
      static "Asia/Amman": TimeZone;
      static "Asia/Anadyr": TimeZone;
      static "Asia/Aqtau": TimeZone;
      static "Asia/Aqtobe": TimeZone;
      static "Asia/Ashgabat": TimeZone;
      static "Asia/Ashkhabad": TimeZone;
      static "Asia/Atyrau": TimeZone;
      static "Asia/Baghdad": TimeZone;
      static "Asia/Bahrain": TimeZone;
      static "Asia/Baku": TimeZone;
      static "Asia/Bangkok": TimeZone;
      static "Asia/Barnaul": TimeZone;
      static "Asia/Beirut": TimeZone;
      static "Asia/Bishkek": TimeZone;
      static "Asia/Brunei": TimeZone;
      static "Asia/Calcutta": TimeZone;
      static "Asia/Chita": TimeZone;
      static "Asia/Choibalsan": TimeZone;
      static "Asia/Chongqing": TimeZone;
      static "Asia/Chungking": TimeZone;
      static "Asia/Colombo": TimeZone;
      static "Asia/Dacca": TimeZone;
      static "Asia/Damascus": TimeZone;
      static "Asia/Dhaka": TimeZone;
      static "Asia/Dili": TimeZone;
      static "Asia/Dubai": TimeZone;
      static "Asia/Dushanbe": TimeZone;
      static "Asia/Famagusta": TimeZone;
      static "Asia/Gaza": TimeZone;
      static "Asia/Harbin": TimeZone;
      static "Asia/Hebron": TimeZone;
      static "Asia/Ho_Chi_Minh": TimeZone;
      static "Asia/Hong_Kong": TimeZone;
      static "Asia/Hovd": TimeZone;
      static "Asia/Irkutsk": TimeZone;
      static "Asia/Istanbul": TimeZone;
      static "Asia/Jakarta": TimeZone;
      static "Asia/Jayapura": TimeZone;
      static "Asia/Jerusalem": TimeZone;
      static "Asia/Kabul": TimeZone;
      static "Asia/Kamchatka": TimeZone;
      static "Asia/Karachi": TimeZone;
      static "Asia/Kashgar": TimeZone;
      static "Asia/Kathmandu": TimeZone;
      static "Asia/Katmandu": TimeZone;
      static "Asia/Khandyga": TimeZone;
      static "Asia/Kolkata": TimeZone;
      static "Asia/Krasnoyarsk": TimeZone;
      static "Asia/Kuala_Lumpur": TimeZone;
      static "Asia/Kuching": TimeZone;
      static "Asia/Kuwait": TimeZone;
      static "Asia/Macao": TimeZone;
      static "Asia/Macau": TimeZone;
      static "Asia/Magadan": TimeZone;
      static "Asia/Makassar": TimeZone;
      static "Asia/Manila": TimeZone;
      static "Asia/Muscat": TimeZone;
      static "Asia/Nicosia": TimeZone;
      static "Asia/Novokuznetsk": TimeZone;
      static "Asia/Novosibirsk": TimeZone;
      static "Asia/Omsk": TimeZone;
      static "Asia/Oral": TimeZone;
      static "Asia/Phnom_Penh": TimeZone;
      static "Asia/Pontianak": TimeZone;
      static "Asia/Pyongyang": TimeZone;
      static "Asia/Qatar": TimeZone;
      static "Asia/Qostanay": TimeZone;
      static "Asia/Qyzylorda": TimeZone;
      static "Asia/Rangoon": TimeZone;
      static "Asia/Riyadh": TimeZone;
      static "Asia/Saigon": TimeZone;
      static "Asia/Sakhalin": TimeZone;
      static "Asia/Samarkand": TimeZone;
      static "Asia/Seoul": TimeZone;
      static "Asia/Shanghai": TimeZone;
      static "Asia/Singapore": TimeZone;
      static "Asia/Srednekolymsk": TimeZone;
      static "Asia/Taipei": TimeZone;
      static "Asia/Tashkent": TimeZone;
      static "Asia/Tbilisi": TimeZone;
      static "Asia/Tehran": TimeZone;
      static "Asia/Tel_Aviv": TimeZone;
      static "Asia/Thimbu": TimeZone;
      static "Asia/Thimphu": TimeZone;
      static "Asia/Tokyo": TimeZone;
      static "Asia/Tomsk": TimeZone;
      static "Asia/Ujung_Pandang": TimeZone;
      static "Asia/Ulaanbaatar": TimeZone;
      static "Asia/Ulan_Bator": TimeZone;
      static "Asia/Urumqi": TimeZone;
      static "Asia/Ust-Nera": TimeZone;
      static "Asia/Vientiane": TimeZone;
      static "Asia/Vladivostok": TimeZone;
      static "Asia/Yakutsk": TimeZone;
      static "Asia/Yangon": TimeZone;
      static "Asia/Yekaterinburg": TimeZone;
      static "Asia/Yerevan": TimeZone;
      static "Atlantic/Azores": TimeZone;
      static "Atlantic/Bermuda": TimeZone;
      static "Atlantic/Canary": TimeZone;
      static "Atlantic/Cape_Verde": TimeZone;
      static "Atlantic/Faeroe": TimeZone;
      static "Atlantic/Faroe": TimeZone;
      static "Atlantic/Jan_Mayen": TimeZone;
      static "Atlantic/Madeira": TimeZone;
      static "Atlantic/Reykjavik": TimeZone;
      static "Atlantic/South_Georgia": TimeZone;
      static "Atlantic/St_Helena": TimeZone;
      static "Atlantic/Stanley": TimeZone;
      static "Australia/ACT": TimeZone;
      static "Australia/Adelaide": TimeZone;
      static "Australia/Brisbane": TimeZone;
      static "Australia/Broken_Hill": TimeZone;
      static "Australia/Canberra": TimeZone;
      static "Australia/Currie": TimeZone;
      static "Australia/Darwin": TimeZone;
      static "Australia/Eucla": TimeZone;
      static "Australia/Hobart": TimeZone;
      static "Australia/LHI": TimeZone;
      static "Australia/Lindeman": TimeZone;
      static "Australia/Lord_Howe": TimeZone;
      static "Australia/Melbourne": TimeZone;
      static "Australia/NSW": TimeZone;
      static "Australia/North": TimeZone;
      static "Australia/Perth": TimeZone;
      static "Australia/Queensland": TimeZone;
      static "Australia/South": TimeZone;
      static "Australia/Sydney": TimeZone;
      static "Australia/Tasmania": TimeZone;
      static "Australia/Victoria": TimeZone;
      static "Australia/West": TimeZone;
      static "Australia/Yancowinna": TimeZone;
      static "Brazil/Acre": TimeZone;
      static "Brazil/DeNoronha": TimeZone;
      static "Brazil/East": TimeZone;
      static "Brazil/West": TimeZone;
      static CET: TimeZone;
      static CST6CDT: TimeZone;
      static "Canada/Atlantic": TimeZone;
      static "Canada/Central": TimeZone;
      static "Canada/Eastern": TimeZone;
      static "Canada/Mountain": TimeZone;
      static "Canada/Newfoundland": TimeZone;
      static "Canada/Pacific": TimeZone;
      static "Canada/Saskatchewan": TimeZone;
      static "Canada/Yukon": TimeZone;
      static "Chile/Continental": TimeZone;
      static "Chile/EasterIsland": TimeZone;
      static Cuba: TimeZone;
      static EET: TimeZone;
      static EST: TimeZone;
      static EST5EDT: TimeZone;
      static Egypt: TimeZone;
      static Eire: TimeZone;
      static "Etc/GMT": TimeZone;
      static "Etc/GMT+0": TimeZone;
      static "Etc/GMT+1": TimeZone;
      static "Etc/GMT+10": TimeZone;
      static "Etc/GMT+11": TimeZone;
      static "Etc/GMT+12": TimeZone;
      static "Etc/GMT+2": TimeZone;
      static "Etc/GMT+3": TimeZone;
      static "Etc/GMT+4": TimeZone;
      static "Etc/GMT+5": TimeZone;
      static "Etc/GMT+6": TimeZone;
      static "Etc/GMT+7": TimeZone;
      static "Etc/GMT+8": TimeZone;
      static "Etc/GMT+9": TimeZone;
      static "Etc/GMT-0": TimeZone;
      static "Etc/GMT-1": TimeZone;
      static "Etc/GMT-10": TimeZone;
      static "Etc/GMT-11": TimeZone;
      static "Etc/GMT-12": TimeZone;
      static "Etc/GMT-13": TimeZone;
      static "Etc/GMT-14": TimeZone;
      static "Etc/GMT-2": TimeZone;
      static "Etc/GMT-3": TimeZone;
      static "Etc/GMT-4": TimeZone;
      static "Etc/GMT-5": TimeZone;
      static "Etc/GMT-6": TimeZone;
      static "Etc/GMT-7": TimeZone;
      static "Etc/GMT-8": TimeZone;
      static "Etc/GMT-9": TimeZone;
      static "Etc/GMT0": TimeZone;
      static "Etc/Greenwich": TimeZone;
      static "Etc/UCT": TimeZone;
      static "Etc/UTC": TimeZone;
      static "Etc/Universal": TimeZone;
      static "Etc/Zulu": TimeZone;
      static "Europe/Amsterdam": TimeZone;
      static "Europe/Andorra": TimeZone;
      static "Europe/Astrakhan": TimeZone;
      static "Europe/Athens": TimeZone;
      static "Europe/Belfast": TimeZone;
      static "Europe/Belgrade": TimeZone;
      static "Europe/Berlin": TimeZone;
      static "Europe/Bratislava": TimeZone;
      static "Europe/Brussels": TimeZone;
      static "Europe/Bucharest": TimeZone;
      static "Europe/Budapest": TimeZone;
      static "Europe/Busingen": TimeZone;
      static "Europe/Chisinau": TimeZone;
      static "Europe/Copenhagen": TimeZone;
      static "Europe/Dublin": TimeZone;
      static "Europe/Gibraltar": TimeZone;
      static "Europe/Guernsey": TimeZone;
      static "Europe/Helsinki": TimeZone;
      static "Europe/Isle_of_Man": TimeZone;
      static "Europe/Istanbul": TimeZone;
      static "Europe/Jersey": TimeZone;
      static "Europe/Kaliningrad": TimeZone;
      static "Europe/Kiev": TimeZone;
      static "Europe/Kirov": TimeZone;
      static "Europe/Kyiv": TimeZone;
      static "Europe/Lisbon": TimeZone;
      static "Europe/Ljubljana": TimeZone;
      static "Europe/London": TimeZone;
      static "Europe/Luxembourg": TimeZone;
      static "Europe/Madrid": TimeZone;
      static "Europe/Malta": TimeZone;
      static "Europe/Mariehamn": TimeZone;
      static "Europe/Minsk": TimeZone;
      static "Europe/Monaco": TimeZone;
      static "Europe/Moscow": TimeZone;
      static "Europe/Nicosia": TimeZone;
      static "Europe/Oslo": TimeZone;
      static "Europe/Paris": TimeZone;
      static "Europe/Podgorica": TimeZone;
      static "Europe/Prague": TimeZone;
      static "Europe/Riga": TimeZone;
      static "Europe/Rome": TimeZone;
      static "Europe/Samara": TimeZone;
      static "Europe/San_Marino": TimeZone;
      static "Europe/Sarajevo": TimeZone;
      static "Europe/Saratov": TimeZone;
      static "Europe/Simferopol": TimeZone;
      static "Europe/Skopje": TimeZone;
      static "Europe/Sofia": TimeZone;
      static "Europe/Stockholm": TimeZone;
      static "Europe/Tallinn": TimeZone;
      static "Europe/Tirane": TimeZone;
      static "Europe/Tiraspol": TimeZone;
      static "Europe/Ulyanovsk": TimeZone;
      static "Europe/Uzhgorod": TimeZone;
      static "Europe/Vaduz": TimeZone;
      static "Europe/Vatican": TimeZone;
      static "Europe/Vienna": TimeZone;
      static "Europe/Vilnius": TimeZone;
      static "Europe/Volgograd": TimeZone;
      static "Europe/Warsaw": TimeZone;
      static "Europe/Zagreb": TimeZone;
      static "Europe/Zaporozhye": TimeZone;
      static "Europe/Zurich": TimeZone;
      static Factory: TimeZone;
      static GB: TimeZone;
      static "GB-Eire": TimeZone;
      static GMT: TimeZone;
      static "GMT+0": TimeZone;
      static "GMT-0": TimeZone;
      static GMT0: TimeZone;
      static Greenwich: TimeZone;
      static HST: TimeZone;
      static Hongkong: TimeZone;
      static Iceland: TimeZone;
      static "Indian/Antananarivo": TimeZone;
      static "Indian/Chagos": TimeZone;
      static "Indian/Christmas": TimeZone;
      static "Indian/Cocos": TimeZone;
      static "Indian/Comoro": TimeZone;
      static "Indian/Kerguelen": TimeZone;
      static "Indian/Mahe": TimeZone;
      static "Indian/Maldives": TimeZone;
      static "Indian/Mauritius": TimeZone;
      static "Indian/Mayotte": TimeZone;
      static "Indian/Reunion": TimeZone;
      static Iran: TimeZone;
      static Israel: TimeZone;
      static Jamaica: TimeZone;
      static Japan: TimeZone;
      static Kwajalein: TimeZone;
      static Libya: TimeZone;
      static MET: TimeZone;
      static MST: TimeZone;
      static MST7MDT: TimeZone;
      static "Mexico/BajaNorte": TimeZone;
      static "Mexico/BajaSur": TimeZone;
      static "Mexico/General": TimeZone;
      static NZ: TimeZone;
      static "NZ-CHAT": TimeZone;
      static Navajo: TimeZone;
      static PRC: TimeZone;
      static PST8PDT: TimeZone;
      static "Pacific/Apia": TimeZone;
      static "Pacific/Auckland": TimeZone;
      static "Pacific/Bougainville": TimeZone;
      static "Pacific/Chatham": TimeZone;
      static "Pacific/Chuuk": TimeZone;
      static "Pacific/Easter": TimeZone;
      static "Pacific/Efate": TimeZone;
      static "Pacific/Enderbury": TimeZone;
      static "Pacific/Fakaofo": TimeZone;
      static "Pacific/Fiji": TimeZone;
      static "Pacific/Funafuti": TimeZone;
      static "Pacific/Galapagos": TimeZone;
      static "Pacific/Gambier": TimeZone;
      static "Pacific/Guadalcanal": TimeZone;
      static "Pacific/Guam": TimeZone;
      static "Pacific/Honolulu": TimeZone;
      static "Pacific/Johnston": TimeZone;
      static "Pacific/Kanton": TimeZone;
      static "Pacific/Kiritimati": TimeZone;
      static "Pacific/Kosrae": TimeZone;
      static "Pacific/Kwajalein": TimeZone;
      static "Pacific/Majuro": TimeZone;
      static "Pacific/Marquesas": TimeZone;
      static "Pacific/Midway": TimeZone;
      static "Pacific/Nauru": TimeZone;
      static "Pacific/Niue": TimeZone;
      static "Pacific/Norfolk": TimeZone;
      static "Pacific/Noumea": TimeZone;
      static "Pacific/Pago_Pago": TimeZone;
      static "Pacific/Palau": TimeZone;
      static "Pacific/Pitcairn": TimeZone;
      static "Pacific/Pohnpei": TimeZone;
      static "Pacific/Ponape": TimeZone;
      static "Pacific/Port_Moresby": TimeZone;
      static "Pacific/Rarotonga": TimeZone;
      static "Pacific/Saipan": TimeZone;
      static "Pacific/Samoa": TimeZone;
      static "Pacific/Tahiti": TimeZone;
      static "Pacific/Tarawa": TimeZone;
      static "Pacific/Tongatapu": TimeZone;
      static "Pacific/Truk": TimeZone;
      static "Pacific/Wake": TimeZone;
      static "Pacific/Wallis": TimeZone;
      static "Pacific/Yap": TimeZone;
      static Poland: TimeZone;
      static Portugal: TimeZone;
      static ROC: TimeZone;
      static ROK: TimeZone;
      static Singapore: TimeZone;
      static Turkey: TimeZone;
      static UCT: TimeZone;
      static "US/Alaska": TimeZone;
      static "US/Aleutian": TimeZone;
      static "US/Arizona": TimeZone;
      static "US/Central": TimeZone;
      static "US/East-Indiana": TimeZone;
      static "US/Eastern": TimeZone;
      static "US/Hawaii": TimeZone;
      static "US/Indiana-Starke": TimeZone;
      static "US/Michigan": TimeZone;
      static "US/Mountain": TimeZone;
      static "US/Pacific": TimeZone;
      static "US/Samoa": TimeZone;
      static Universal: TimeZone;
      static "W-SU": TimeZone;
      static WET: TimeZone;
      static Zulu: TimeZone;
    }
    namespace TimeZone  {
      type Field = 'UTC'|'Africa/Abidjan'|'Africa/Accra'|'Africa/Addis_Ababa'|'Africa/Algiers'|'Africa/Asmara'|'Africa/Asmera'|'Africa/Bamako'|'Africa/Bangui'|'Africa/Banjul'|'Africa/Bissau'|'Africa/Blantyre'|'Africa/Brazzaville'|'Africa/Bujumbura'|'Africa/Cairo'|'Africa/Casablanca'|'Africa/Ceuta'|'Africa/Conakry'|'Africa/Dakar'|'Africa/Dar_es_Salaam'|'Africa/Djibouti'|'Africa/Douala'|'Africa/El_Aaiun'|'Africa/Freetown'|'Africa/Gaborone'|'Africa/Harare'|'Africa/Johannesburg'|'Africa/Juba'|'Africa/Kampala'|'Africa/Khartoum'|'Africa/Kigali'|'Africa/Kinshasa'|'Africa/Lagos'|'Africa/Libreville'|'Africa/Lome'|'Africa/Luanda'|'Africa/Lubumbashi'|'Africa/Lusaka'|'Africa/Malabo'|'Africa/Maputo'|'Africa/Maseru'|'Africa/Mbabane'|'Africa/Mogadishu'|'Africa/Monrovia'|'Africa/Nairobi'|'Africa/Ndjamena'|'Africa/Niamey'|'Africa/Nouakchott'|'Africa/Ouagadougou'|'Africa/Porto-Novo'|'Africa/Sao_Tome'|'Africa/Timbuktu'|'Africa/Tripoli'|'Africa/Tunis'|'Africa/Windhoek'|'America/Adak'|'America/Anchorage'|'America/Anguilla'|'America/Antigua'|'America/Araguaina'|'America/Argentina/Buenos_Aires'|'America/Argentina/Catamarca'|'America/Argentina/ComodRivadavia'|'America/Argentina/Cordoba'|'America/Argentina/Jujuy'|'America/Argentina/La_Rioja'|'America/Argentina/Mendoza'|'America/Argentina/Rio_Gallegos'|'America/Argentina/Salta'|'America/Argentina/San_Juan'|'America/Argentina/San_Luis'|'America/Argentina/Tucuman'|'America/Argentina/Ushuaia'|'America/Aruba'|'America/Asuncion'|'America/Atikokan'|'America/Atka'|'America/Bahia'|'America/Bahia_Banderas'|'America/Barbados'|'America/Belem'|'America/Belize'|'America/Blanc-Sablon'|'America/Boa_Vista'|'America/Bogota'|'America/Boise'|'America/Buenos_Aires'|'America/Cambridge_Bay'|'America/Campo_Grande'|'America/Cancun'|'America/Caracas'|'America/Catamarca'|'America/Cayenne'|'America/Cayman'|'America/Chicago'|'America/Chihuahua'|'America/Ciudad_Juarez'|'America/Coral_Harbour'|'America/Cordoba'|'America/Costa_Rica'|'America/Coyhaique'|'America/Creston'|'America/Cuiaba'|'America/Curacao'|'America/Danmarkshavn'|'America/Dawson'|'America/Dawson_Creek'|'America/Denver'|'America/Detroit'|'America/Dominica'|'America/Edmonton'|'America/Eirunepe'|'America/El_Salvador'|'America/Ensenada'|'America/Fort_Nelson'|'America/Fort_Wayne'|'America/Fortaleza'|'America/Glace_Bay'|'America/Godthab'|'America/Goose_Bay'|'America/Grand_Turk'|'America/Grenada'|'America/Guadeloupe'|'America/Guatemala'|'America/Guayaquil'|'America/Guyana'|'America/Halifax'|'America/Havana'|'America/Hermosillo'|'America/Indiana/Indianapolis'|'America/Indiana/Knox'|'America/Indiana/Marengo'|'America/Indiana/Petersburg'|'America/Indiana/Tell_City'|'America/Indiana/Vevay'|'America/Indiana/Vincennes'|'America/Indiana/Winamac'|'America/Indianapolis'|'America/Inuvik'|'America/Iqaluit'|'America/Jamaica'|'America/Jujuy'|'America/Juneau'|'America/Kentucky/Louisville'|'America/Kentucky/Monticello'|'America/Knox_IN'|'America/Kralendijk'|'America/La_Paz'|'America/Lima'|'America/Los_Angeles'|'America/Louisville'|'America/Lower_Princes'|'America/Maceio'|'America/Managua'|'America/Manaus'|'America/Marigot'|'America/Martinique'|'America/Matamoros'|'America/Mazatlan'|'America/Mendoza'|'America/Menominee'|'America/Merida'|'America/Metlakatla'|'America/Mexico_City'|'America/Miquelon'|'America/Moncton'|'America/Monterrey'|'America/Montevideo'|'America/Montreal'|'America/Montserrat'|'America/Nassau'|'America/New_York'|'America/Nipigon'|'America/Nome'|'America/Noronha'|'America/North_Dakota/Beulah'|'America/North_Dakota/Center'|'America/North_Dakota/New_Salem'|'America/Nuuk'|'America/Ojinaga'|'America/Panama'|'America/Pangnirtung'|'America/Paramaribo'|'America/Phoenix'|'America/Port-au-Prince'|'America/Port_of_Spain'|'America/Porto_Acre'|'America/Porto_Velho'|'America/Puerto_Rico'|'America/Punta_Arenas'|'America/Rainy_River'|'America/Rankin_Inlet'|'America/Recife'|'America/Regina'|'America/Resolute'|'America/Rio_Branco'|'America/Rosario'|'America/Santa_Isabel'|'America/Santarem'|'America/Santiago'|'America/Santo_Domingo'|'America/Sao_Paulo'|'America/Scoresbysund'|'America/Shiprock'|'America/Sitka'|'America/St_Barthelemy'|'America/St_Johns'|'America/St_Kitts'|'America/St_Lucia'|'America/St_Thomas'|'America/St_Vincent'|'America/Swift_Current'|'America/Tegucigalpa'|'America/Thule'|'America/Thunder_Bay'|'America/Tijuana'|'America/Toronto'|'America/Tortola'|'America/Vancouver'|'America/Virgin'|'America/Whitehorse'|'America/Winnipeg'|'America/Yakutat'|'America/Yellowknife'|'Antarctica/Casey'|'Antarctica/Davis'|'Antarctica/DumontDUrville'|'Antarctica/Macquarie'|'Antarctica/Mawson'|'Antarctica/McMurdo'|'Antarctica/Palmer'|'Antarctica/Rothera'|'Antarctica/South_Pole'|'Antarctica/Syowa'|'Antarctica/Troll'|'Antarctica/Vostok'|'Arctic/Longyearbyen'|'Asia/Aden'|'Asia/Almaty'|'Asia/Amman'|'Asia/Anadyr'|'Asia/Aqtau'|'Asia/Aqtobe'|'Asia/Ashgabat'|'Asia/Ashkhabad'|'Asia/Atyrau'|'Asia/Baghdad'|'Asia/Bahrain'|'Asia/Baku'|'Asia/Bangkok'|'Asia/Barnaul'|'Asia/Beirut'|'Asia/Bishkek'|'Asia/Brunei'|'Asia/Calcutta'|'Asia/Chita'|'Asia/Choibalsan'|'Asia/Chongqing'|'Asia/Chungking'|'Asia/Colombo'|'Asia/Dacca'|'Asia/Damascus'|'Asia/Dhaka'|'Asia/Dili'|'Asia/Dubai'|'Asia/Dushanbe'|'Asia/Famagusta'|'Asia/Gaza'|'Asia/Harbin'|'Asia/Hebron'|'Asia/Ho_Chi_Minh'|'Asia/Hong_Kong'|'Asia/Hovd'|'Asia/Irkutsk'|'Asia/Istanbul'|'Asia/Jakarta'|'Asia/Jayapura'|'Asia/Jerusalem'|'Asia/Kabul'|'Asia/Kamchatka'|'Asia/Karachi'|'Asia/Kashgar'|'Asia/Kathmandu'|'Asia/Katmandu'|'Asia/Khandyga'|'Asia/Kolkata'|'Asia/Krasnoyarsk'|'Asia/Kuala_Lumpur'|'Asia/Kuching'|'Asia/Kuwait'|'Asia/Macao'|'Asia/Macau'|'Asia/Magadan'|'Asia/Makassar'|'Asia/Manila'|'Asia/Muscat'|'Asia/Nicosia'|'Asia/Novokuznetsk'|'Asia/Novosibirsk'|'Asia/Omsk'|'Asia/Oral'|'Asia/Phnom_Penh'|'Asia/Pontianak'|'Asia/Pyongyang'|'Asia/Qatar'|'Asia/Qostanay'|'Asia/Qyzylorda'|'Asia/Rangoon'|'Asia/Riyadh'|'Asia/Saigon'|'Asia/Sakhalin'|'Asia/Samarkand'|'Asia/Seoul'|'Asia/Shanghai'|'Asia/Singapore'|'Asia/Srednekolymsk'|'Asia/Taipei'|'Asia/Tashkent'|'Asia/Tbilisi'|'Asia/Tehran'|'Asia/Tel_Aviv'|'Asia/Thimbu'|'Asia/Thimphu'|'Asia/Tokyo'|'Asia/Tomsk'|'Asia/Ujung_Pandang'|'Asia/Ulaanbaatar'|'Asia/Ulan_Bator'|'Asia/Urumqi'|'Asia/Ust-Nera'|'Asia/Vientiane'|'Asia/Vladivostok'|'Asia/Yakutsk'|'Asia/Yangon'|'Asia/Yekaterinburg'|'Asia/Yerevan'|'Atlantic/Azores'|'Atlantic/Bermuda'|'Atlantic/Canary'|'Atlantic/Cape_Verde'|'Atlantic/Faeroe'|'Atlantic/Faroe'|'Atlantic/Jan_Mayen'|'Atlantic/Madeira'|'Atlantic/Reykjavik'|'Atlantic/South_Georgia'|'Atlantic/St_Helena'|'Atlantic/Stanley'|'Australia/ACT'|'Australia/Adelaide'|'Australia/Brisbane'|'Australia/Broken_Hill'|'Australia/Canberra'|'Australia/Currie'|'Australia/Darwin'|'Australia/Eucla'|'Australia/Hobart'|'Australia/LHI'|'Australia/Lindeman'|'Australia/Lord_Howe'|'Australia/Melbourne'|'Australia/NSW'|'Australia/North'|'Australia/Perth'|'Australia/Queensland'|'Australia/South'|'Australia/Sydney'|'Australia/Tasmania'|'Australia/Victoria'|'Australia/West'|'Australia/Yancowinna'|'Brazil/Acre'|'Brazil/DeNoronha'|'Brazil/East'|'Brazil/West'|'CET'|'CST6CDT'|'Canada/Atlantic'|'Canada/Central'|'Canada/Eastern'|'Canada/Mountain'|'Canada/Newfoundland'|'Canada/Pacific'|'Canada/Saskatchewan'|'Canada/Yukon'|'Chile/Continental'|'Chile/EasterIsland'|'Cuba'|'EET'|'EST'|'EST5EDT'|'Egypt'|'Eire'|'Etc/GMT'|'Etc/GMT+0'|'Etc/GMT+1'|'Etc/GMT+10'|'Etc/GMT+11'|'Etc/GMT+12'|'Etc/GMT+2'|'Etc/GMT+3'|'Etc/GMT+4'|'Etc/GMT+5'|'Etc/GMT+6'|'Etc/GMT+7'|'Etc/GMT+8'|'Etc/GMT+9'|'Etc/GMT-0'|'Etc/GMT-1'|'Etc/GMT-10'|'Etc/GMT-11'|'Etc/GMT-12'|'Etc/GMT-13'|'Etc/GMT-14'|'Etc/GMT-2'|'Etc/GMT-3'|'Etc/GMT-4'|'Etc/GMT-5'|'Etc/GMT-6'|'Etc/GMT-7'|'Etc/GMT-8'|'Etc/GMT-9'|'Etc/GMT0'|'Etc/Greenwich'|'Etc/UCT'|'Etc/UTC'|'Etc/Universal'|'Etc/Zulu'|'Europe/Amsterdam'|'Europe/Andorra'|'Europe/Astrakhan'|'Europe/Athens'|'Europe/Belfast'|'Europe/Belgrade'|'Europe/Berlin'|'Europe/Bratislava'|'Europe/Brussels'|'Europe/Bucharest'|'Europe/Budapest'|'Europe/Busingen'|'Europe/Chisinau'|'Europe/Copenhagen'|'Europe/Dublin'|'Europe/Gibraltar'|'Europe/Guernsey'|'Europe/Helsinki'|'Europe/Isle_of_Man'|'Europe/Istanbul'|'Europe/Jersey'|'Europe/Kaliningrad'|'Europe/Kiev'|'Europe/Kirov'|'Europe/Kyiv'|'Europe/Lisbon'|'Europe/Ljubljana'|'Europe/London'|'Europe/Luxembourg'|'Europe/Madrid'|'Europe/Malta'|'Europe/Mariehamn'|'Europe/Minsk'|'Europe/Monaco'|'Europe/Moscow'|'Europe/Nicosia'|'Europe/Oslo'|'Europe/Paris'|'Europe/Podgorica'|'Europe/Prague'|'Europe/Riga'|'Europe/Rome'|'Europe/Samara'|'Europe/San_Marino'|'Europe/Sarajevo'|'Europe/Saratov'|'Europe/Simferopol'|'Europe/Skopje'|'Europe/Sofia'|'Europe/Stockholm'|'Europe/Tallinn'|'Europe/Tirane'|'Europe/Tiraspol'|'Europe/Ulyanovsk'|'Europe/Uzhgorod'|'Europe/Vaduz'|'Europe/Vatican'|'Europe/Vienna'|'Europe/Vilnius'|'Europe/Volgograd'|'Europe/Warsaw'|'Europe/Zagreb'|'Europe/Zaporozhye'|'Europe/Zurich'|'Factory'|'GB'|'GB-Eire'|'GMT'|'GMT+0'|'GMT-0'|'GMT0'|'Greenwich'|'HST'|'Hongkong'|'Iceland'|'Indian/Antananarivo'|'Indian/Chagos'|'Indian/Christmas'|'Indian/Cocos'|'Indian/Comoro'|'Indian/Kerguelen'|'Indian/Mahe'|'Indian/Maldives'|'Indian/Mauritius'|'Indian/Mayotte'|'Indian/Reunion'|'Iran'|'Israel'|'Jamaica'|'Japan'|'Kwajalein'|'Libya'|'MET'|'MST'|'MST7MDT'|'Mexico/BajaNorte'|'Mexico/BajaSur'|'Mexico/General'|'NZ'|'NZ-CHAT'|'Navajo'|'PRC'|'PST8PDT'|'Pacific/Apia'|'Pacific/Auckland'|'Pacific/Bougainville'|'Pacific/Chatham'|'Pacific/Chuuk'|'Pacific/Easter'|'Pacific/Efate'|'Pacific/Enderbury'|'Pacific/Fakaofo'|'Pacific/Fiji'|'Pacific/Funafuti'|'Pacific/Galapagos'|'Pacific/Gambier'|'Pacific/Guadalcanal'|'Pacific/Guam'|'Pacific/Honolulu'|'Pacific/Johnston'|'Pacific/Kanton'|'Pacific/Kiritimati'|'Pacific/Kosrae'|'Pacific/Kwajalein'|'Pacific/Majuro'|'Pacific/Marquesas'|'Pacific/Midway'|'Pacific/Nauru'|'Pacific/Niue'|'Pacific/Norfolk'|'Pacific/Noumea'|'Pacific/Pago_Pago'|'Pacific/Palau'|'Pacific/Pitcairn'|'Pacific/Pohnpei'|'Pacific/Ponape'|'Pacific/Port_Moresby'|'Pacific/Rarotonga'|'Pacific/Saipan'|'Pacific/Samoa'|'Pacific/Tahiti'|'Pacific/Tarawa'|'Pacific/Tongatapu'|'Pacific/Truk'|'Pacific/Wake'|'Pacific/Wallis'|'Pacific/Yap'|'Poland'|'Portugal'|'ROC'|'ROK'|'Singapore'|'Turkey'|'UCT'|'US/Alaska'|'US/Aleutian'|'US/Arizona'|'US/Central'|'US/East-Indiana'|'US/Eastern'|'US/Hawaii'|'US/Indiana-Starke'|'US/Michigan'|'US/Mountain'|'US/Pacific'|'US/Samoa'|'Universal'|'W-SU'|'WET'|'Zulu';
    }

    class GeoBox extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoBox';
      sw: gc.core.geo;
      ne: gc.core.geo;
      constructor(sw: gc.core.geo, ne: gc.core.geo);
      static createFrom(fields: {sw: gc.core.geo, ne: gc.core.geo}): GeoBox;
    }

    class nodeIndex$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeIndex$info$args';
      nodes: globalThis.Array<gc.core.nodeIndex>;
      constructor(nodes: globalThis.Array<gc.core.nodeIndex>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeIndex>}): nodeIndex$info$args;
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

    class int extends gc.sdk.std_n.core.int {}

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

    class nodeTime<T = any> extends gc.sdk.std_n.core.nodeTime<T> {
      static info(nodes: globalThis.Array<gc.core.nodeTime>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>;
      static sample(refs: globalThis.Array<gc.core.nodeTime>, from: gc.core.time | null, to: gc.core.time | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: gc.core.duration | null, tz?: gc.core.TimeZone | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class nodeTimeSingleton extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTimeSingleton';
      t: gc.core.time;
      v: any;
      constructor(t: gc.core.time, v: any);
      static createFrom(fields: {t: gc.core.time, v: any}): nodeTimeSingleton;
    }

    class nodeList<T = any> extends gc.sdk.std_n.core.nodeList<T> {
      static info(nodes: globalThis.Array<gc.core.nodeList>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>;
      static sample(refs: globalThis.Array<gc.core.nodeList>, from: number | bigint | null, to: number | bigint | null, maxRows: number | bigint, mode: gc.core.SamplingMode, maxDephasing?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class nodeList$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeList$info$args';
      nodes: globalThis.Array<gc.core.nodeList>;
      constructor(nodes: globalThis.Array<gc.core.nodeList>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeList>}): nodeList$info$args;
    }

    class GeoCircle extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoCircle';
      center: gc.core.geo;
      radius: number;
      constructor(center: gc.core.geo, radius: number);
      static createFrom(fields: {center: gc.core.geo, radius: number}): GeoCircle;
    }

    class nodeGeo$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeGeo$info$args';
      nodes: globalThis.Array<gc.core.nodeGeo>;
      constructor(nodes: globalThis.Array<gc.core.nodeGeo>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeGeo>}): nodeGeo$info$args;
    }

    class t3f extends gc.sdk.std_n.core.t3f {}

    class node$resolve_all$args extends gc.sdk.GCObject {
      static readonly _type = 'core::node$resolve_all$args';
      n: globalThis.Array<gc.core.node | null>;
      constructor(n: globalThis.Array<gc.core.node | null>);
      static createFrom(fields: {n: globalThis.Array<gc.core.node | null>}): node$resolve_all$args;
    }

    class GeoPoly extends gc.sdk.GCObject {
      static readonly _type = 'core::GeoPoly';
      points: globalThis.Array<gc.core.geo>;
      constructor(points: globalThis.Array<gc.core.geo>);
      static createFrom(fields: {points: globalThis.Array<gc.core.geo>}): GeoPoly;
    }

    class Error extends gc.sdk.GCObject {
      static readonly _type = 'core::Error';
      message: string | null;
      stack: globalThis.Array<gc.core.ErrorFrame>;
      constructor(message: string | null, stack: globalThis.Array<gc.core.ErrorFrame>);
      static createFrom(fields: {message?: string | null, stack: globalThis.Array<gc.core.ErrorFrame>}): Error;
    }

    class Array<T = any> extends gc.sdk.std_n.core.Array<T> {}

    class ErrorFrame extends gc.sdk.GCObject {
      static readonly _type = 'core::ErrorFrame';
      module: string | null;
      function: string;
      line: number | bigint;
      column: number | bigint;
      constructor(module: string | null, function_: string, line: number | bigint, column: number | bigint);
      static createFrom(fields: {module?: string | null, function_: string, line: number | bigint, column: number | bigint}): ErrorFrame;
    }

    class nodeTime$info$args extends gc.sdk.GCObject {
      static readonly _type = 'core::nodeTime$info$args';
      nodes: globalThis.Array<gc.core.nodeTime>;
      constructor(nodes: globalThis.Array<gc.core.nodeTime>);
      static createFrom(fields: {nodes: globalThis.Array<gc.core.nodeTime>}): nodeTime$info$args;
    }

    class duration extends gc.sdk.std_n.core.duration {}

    class t3 extends gc.sdk.std_n.core.t3 {}

    class Tuple<T = any, U = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::Tuple';
      x: T | null;
      y: U | null;
      constructor(x?: T | null, y?: U | null);
      static createFrom<T, U>(fields: {x?: T | null, y?: U | null}): Tuple;
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

    class String extends gc.sdk.std_n.core.String {}

    class Map<K = any, V = any> extends gc.sdk.std_n.core.Map<K, V> {}

    class field extends gc.sdk.std_n.core.field {}

    class t2 extends gc.sdk.std_n.core.t2 {}

    class geo extends gc.sdk.std_n.core.geo {}

    class Table$applyMappings$args extends gc.sdk.GCObject {
      static readonly _type = 'core::Table$applyMappings$args';
      table: gc.core.Table;
      mappings: globalThis.Array<gc.core.TableColumnMapping>;
      constructor(table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>);
      static createFrom(fields: {table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>}): Table$applyMappings$args;
    }

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

    class float extends gc.sdk.std_n.core.float {}

    class function_ extends gc.sdk.std_n.core.function_ {}

    class TableColumnMapping extends gc.sdk.GCObject {
      static readonly _type = 'core::TableColumnMapping';
      column: number | bigint;
      extractors: globalThis.Array<any>;
      constructor(column: number | bigint, extractors: globalThis.Array<any>);
      static createFrom(fields: {column: number | bigint, extractors: globalThis.Array<any>}): TableColumnMapping;
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

    class time extends gc.sdk.std_n.core.time {}

    class str extends gc.sdk.std_n.core.str {}

    class Tensor extends gc.sdk.std_n.core.Tensor {}

    class t4 extends gc.sdk.std_n.core.t4 {}

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

    class NodeInfo<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'core::NodeInfo';
      size: number | bigint;
      from: T | null;
      to: T | null;
      constructor(size: number | bigint, from?: T | null, to?: T | null);
      static createFrom<T>(fields: {size: number | bigint, from?: T | null, to?: T | null}): NodeInfo;
    }

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

    class char extends gc.sdk.std_n.core.char {}

    class node<T = any> extends gc.sdk.std_n.core.node<T> {
      static resolve_all(n: globalThis.Array<gc.core.node | null>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
    }

    class Date$from_time$args extends gc.sdk.GCObject {
      static readonly _type = 'core::Date$from_time$args';
      time: gc.core.time;
      tz: gc.core.TimeZone | null;
      constructor(time: gc.core.time, tz?: gc.core.TimeZone | null);
      static createFrom(fields: {time: gc.core.time, tz?: gc.core.TimeZone | null}): Date$from_time$args;
    }

    class t2f extends gc.sdk.std_n.core.t2f {}

    class t4f extends gc.sdk.std_n.core.t4f {}

    class type extends gc.sdk.std_n.core.type {}

    class nodeGeo<T = any> extends gc.sdk.std_n.core.nodeGeo<T> {
      static info(nodes: globalThis.Array<gc.core.nodeGeo>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>;
      static sample(refs: globalThis.Array<gc.core.nodeGeo>, from: gc.core.geo | null, to: gc.core.geo | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class null_ extends gc.sdk.std_n.core.null_ {}

    class Table<T = any> extends gc.sdk.std_n.core.Table<T> {
      static applyMappings(table: gc.core.Table, mappings: globalThis.Array<gc.core.TableColumnMapping>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
    }

    class nodeIndex<K = any, V = any> extends gc.sdk.std_n.core.nodeIndex<K, V> {
      static info(nodes: globalThis.Array<gc.core.nodeIndex>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo>>;
      static sample(refs: globalThis.Array<gc.core.nodeIndex>, from: any | null, maxRows: number | bigint, mode: gc.core.SamplingMode, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
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

  }

  namespace runtime {
    class Runtime$info$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$info$args';
    }

    class User$logout$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$logout$args';
    }

    class UserGroupPolicy extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserGroupPolicy';
      group_id: number | bigint;
      type: gc.runtime.UserGroupPolicyType;
      constructor(group_id: number | bigint, type: gc.runtime.UserGroupPolicyType);
      static createFrom(fields: {group_id: number | bigint, type: gc.runtime.UserGroupPolicyType}): UserGroupPolicy;
    }

    class Runtime$abi$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$abi$args';
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

    class User$permissions$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$permissions$args';
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
      disk_data_bytes: number | bigint;
      constructor(version: string, program_version: string | null, arch: string, timezone: gc.core.TimeZone, license: gc.runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, disk_data_bytes: number | bigint);
      static createFrom(fields: {version: string, program_version?: string | null, arch: string, timezone: gc.core.TimeZone, license: gc.runtime.License, io_threads: number | bigint, bg_threads: number | bigint, fg_threads: number | bigint, mem_total: number | bigint, mem_worker: number | bigint, disk_data_bytes: number | bigint}): RuntimeInfo;
    }

    class Role$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Role$all$args';
    }

    class User$me$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$me$args';
    }

    class PeriodicTask$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicTask$all$args';
    }

    class SecurityFields$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityFields$set$args';
      f: gc.runtime.SecurityFields;
      constructor(f: gc.runtime.SecurityFields);
      static createFrom(fields: {f: gc.runtime.SecurityFields}): SecurityFields$set$args;
    }

    class Debug extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug';
      id: number | bigint;
      frames: globalThis.Array<gc.runtime.Frame>;
      root: any;
      constructor(id: number | bigint, frames: globalThis.Array<gc.runtime.Frame>, root: any);
      static createFrom(fields: {id: number | bigint, frames: globalThis.Array<gc.runtime.Frame>, root: any}): Debug;
      static resume(id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static get(id: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Debug>;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
    }

    class Permission$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Permission$all$args';
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

    class SecurityEntity$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityEntity$all$args';
    }

    class UserCredential extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserCredential';
      offset: number | bigint;
      pass: string | null;
      constructor(offset: number | bigint, pass?: string | null);
      static createFrom(fields: {offset: number | bigint, pass?: string | null}): UserCredential;
    }

    class Task$cancel$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$cancel$args';
      task_id: number | bigint;
      constructor(task_id: number | bigint);
      static createFrom(fields: {task_id: number | bigint}): Task$cancel$args;
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

    class Task$running$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$running$args';
    }

    class User$setPassword$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$setPassword$args';
      name: string;
      pass: string;
      constructor(name: string, pass: string);
      static createFrom(fields: {name: string, pass: string}): User$setPassword$args;
    }

    class Runtime$root$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime$root$args';
    }

    class Runtime extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Runtime';
      static root($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<any>;
      static abi($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static info($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.RuntimeInfo>;
    }

    class System extends gc.sdk.GCObject {
      static readonly _type = 'runtime::System';
    }

    class OpenIDConnect$config$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenIDConnect$config$args';
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

    class SecurityPolicy extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityPolicy';
      entities: globalThis.Array<gc.runtime.SecurityEntity> | null;
      credentials: globalThis.Map<string, gc.runtime.UserCredential> | null;
      fields: gc.runtime.SecurityFields | null;
      keys: globalThis.Map<string, string> | null;
      keys_last_refresh: gc.core.time | null;
      constructor(entities?: globalThis.Array<gc.runtime.SecurityEntity> | null, credentials?: globalThis.Map<string, gc.runtime.UserCredential> | null, fields?: gc.runtime.SecurityFields | null, keys?: globalThis.Map<string, string> | null, keys_last_refresh?: gc.core.time | null);
      static createFrom(fields: {entities?: globalThis.Array<gc.runtime.SecurityEntity> | null, credentials?: globalThis.Map<string, gc.runtime.UserCredential> | null, fields?: gc.runtime.SecurityFields | null, keys?: globalThis.Map<string, string> | null, keys_last_refresh?: gc.core.time | null}): SecurityPolicy;
    }

    class Debug$get$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$get$args';
      id: number | bigint;
      constructor(id: number | bigint);
      static createFrom(fields: {id: number | bigint}): Debug$get$args;
    }

    class User$tokenLogin$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$tokenLogin$args';
      token: string;
      use_cookie: boolean;
      constructor(token: string, use_cookie: boolean);
      static createFrom(fields: {token: string, use_cookie: boolean}): User$tokenLogin$args;
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

    class SecurityEntity$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityEntity$set$args';
      entity: gc.runtime.SecurityEntity;
      constructor(entity: gc.runtime.SecurityEntity);
      static createFrom(fields: {entity: gc.runtime.SecurityEntity}): SecurityEntity$set$args;
    }

    class SecurityEntity extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityEntity';
      id: number | bigint;
      name: string;
      activated: boolean;
      static set(entity: gc.runtime.SecurityEntity, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<number | bigint | null>;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.SecurityEntity>>;
    }

    class UserGroup extends gc.sdk.GCObject {
      static readonly _type = 'runtime::UserGroup';
      id: number | bigint;
      name: string;
      activated: boolean;
      constructor(id: number | bigint, name: string, activated: boolean);
      static createFrom(fields: {id: number | bigint, name: string, activated: boolean}): UserGroup;
    }

    class PeriodicTask$set$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::PeriodicTask$set$args';
      tasks: globalThis.Array<gc.runtime.PeriodicTask>;
      constructor(tasks: globalThis.Array<gc.runtime.PeriodicTask>);
      static createFrom(fields: {tasks: globalThis.Array<gc.runtime.PeriodicTask>}): PeriodicTask$set$args;
    }

    class User extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User';
      id: number | bigint;
      name: string;
      activated: boolean;
      full_name: string | null;
      email: string | null;
      role: string | null;
      groups: globalThis.Array<gc.runtime.UserGroupPolicy> | null;
      groups_flags: number | bigint | null;
      external: boolean;
      constructor(id: number | bigint, name: string, activated: boolean, full_name: string | null, email: string | null, role: string | null, groups: globalThis.Array<gc.runtime.UserGroupPolicy> | null, groups_flags: number | bigint | null, external: boolean);
      static createFrom(fields: {id: number | bigint, name: string, activated: boolean, full_name?: string | null, email?: string | null, role?: string | null, groups?: globalThis.Array<gc.runtime.UserGroupPolicy> | null, groups_flags?: number | bigint | null, external: boolean}): User;
      static setPassword(name: string, pass: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<boolean>;
      static permissions($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<string>>;
      static me($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.User>;
      static current($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<number | bigint>;
      static renew(use_cookie: boolean, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
      static logout($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<unknown>;
      static tokenLogin(token: string, use_cookie: boolean, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
      static login(credentials: string, use_cookie: boolean, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    }

    class Job<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Job';
      function: gc.core.function_;
      arguments: globalThis.Array<any | null> | null;
      constructor(function_: gc.core.function_, arguments_?: globalThis.Array<any | null> | null);
      static createFrom<T>(fields: {function_: gc.core.function_, arguments_?: globalThis.Array<any | null> | null}): Job;
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

    class User$login$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$login$args';
      credentials: string;
      use_cookie: boolean;
      constructor(credentials: string, use_cookie: boolean);
      static createFrom(fields: {credentials: string, use_cookie: boolean}): User$login$args;
    }

    class Permission extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Permission';
      name: string;
      description: string;
      constructor(name: string, description: string);
      static createFrom(fields: {name: string, description: string}): Permission;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Permission>>;
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

    class Variable extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Variable';
      name: string | null;
      value: any | null;
      constructor(name?: string | null, value?: any | null);
      static createFrom(fields: {name?: string | null, value?: any | null}): Variable;
    }

    class SecurityFields$get$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::SecurityFields$get$args';
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

    class User$current$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$current$args';
    }

    class Debug$resume$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$resume$args';
      id: number | bigint;
      constructor(id: number | bigint);
      static createFrom(fields: {id: number | bigint}): Debug$resume$args;
    }

    class User$renew$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::User$renew$args';
      use_cookie: boolean;
      constructor(use_cookie: boolean);
      static createFrom(fields: {use_cookie: boolean}): User$renew$args;
    }

    class Task$is_running$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$is_running$args';
      task_id: number | bigint;
      constructor(task_id: number | bigint);
      static createFrom(fields: {task_id: number | bigint}): Task$is_running$args;
    }

    class Role extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Role';
      name: string;
      permissions: globalThis.Array<string>;
      constructor(name: string, permissions: globalThis.Array<string>);
      static createFrom(fields: {name: string, permissions: globalThis.Array<string>}): Role;
      static all($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Role>>;
    }

    class OpenIDConnect extends gc.sdk.GCObject {
      static readonly _type = 'runtime::OpenIDConnect';
      url: string;
      clientId: string;
      constructor(url: string, clientId: string);
      static createFrom(fields: {url: string, clientId: string}): OpenIDConnect;
      static config($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.OpenIDConnect | null>;
    }

    class Task$history$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Task$history$args';
      offset: number | bigint;
      max: number | bigint;
      constructor(offset: number | bigint, max: number | bigint);
      static createFrom(fields: {offset: number | bigint, max: number | bigint}): Task$history$args;
    }

    class Debug$all$args extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Debug$all$args';
    }

    class Frame extends gc.sdk.GCObject {
      static readonly _type = 'runtime::Frame';
      module: string | null;
      type: string | null;
      function: string | null;
      src: string | null;
      line: number | bigint;
      column: number | bigint;
      scope: globalThis.Array<gc.runtime.Variable>;
      constructor(module: string | null, type: string | null, function_: string | null, src: string | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<gc.runtime.Variable>);
      static createFrom(fields: {module?: string | null, type?: string | null, function_?: string | null, src?: string | null, line: number | bigint, column: number | bigint, scope: globalThis.Array<gc.runtime.Variable>}): Frame;
    }

  }

  namespace io {
    class JsonReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::JsonReader';
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): JsonReader;
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

    class GcbWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::GcbWriter';
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): GcbWriter;
    }

    class CsvFormat extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvFormat';
      header_lines: number | bigint | null;
      separator: string | null;
      string_delimiter: string | null;
      decimal_separator: string | null;
      thousands_separator: string | null;
      trim: boolean | null;
      format: string | null;
      tz: gc.core.TimeZone | null;
      strict: boolean | null;
      nearest_time: boolean | null;
      constructor(header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, trim?: boolean | null, format?: string | null, tz?: gc.core.TimeZone | null, strict?: boolean | null, nearest_time?: boolean | null);
      static createFrom(fields: {header_lines?: number | bigint | null, separator?: string | null, string_delimiter?: string | null, decimal_separator?: string | null, thousands_separator?: string | null, trim?: boolean | null, format?: string | null, tz?: gc.core.TimeZone | null, strict?: boolean | null, nearest_time?: boolean | null}): CsvFormat;
    }

    class FileWalker extends gc.sdk.GCObject {
      static readonly _type = 'io::FileWalker';
      path: string;
      constructor(path: string);
      static createFrom(fields: {path: string}): FileWalker;
    }

    class Csv$sample$args extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv$sample$args';
      reader: gc.io.CsvReader;
      max_lines: number | bigint | null;
      constructor(reader: gc.io.CsvReader, max_lines?: number | bigint | null);
      static createFrom(fields: {reader: gc.io.CsvReader, max_lines?: number | bigint | null}): Csv$sample$args;
    }

    class JsonWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::JsonWriter';
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): JsonWriter;
    }

    class CsvWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvWriter';
      path: string;
      append: boolean | null;
      format: gc.io.CsvFormat | null;
      constructor(path: string, append?: boolean | null, format?: gc.io.CsvFormat | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null, format?: gc.io.CsvFormat | null}): CsvWriter;
    }

    class TextWriter<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::TextWriter';
      path: string;
      append: boolean | null;
      constructor(path: string, append?: boolean | null);
      static createFrom<T>(fields: {path: string, append?: boolean | null}): TextWriter;
    }

    class Reader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Reader';
      path: string;
      pos: number | bigint | null;
    }

    class Csv$generate$args extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv$generate$args';
      stats: gc.io.CsvStatistics;
      constructor(stats: gc.io.CsvStatistics);
      static createFrom(fields: {stats: gc.io.CsvStatistics}): Csv$generate$args;
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

    class GcbReader<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::GcbReader';
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom<T>(fields: {path: string, pos?: number | bigint | null}): GcbReader;
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

    class HttpHeader extends gc.sdk.GCObject {
      static readonly _type = 'io::HttpHeader';
      name: string;
      value: string;
      constructor(name: string, value: string);
      static createFrom(fields: {name: string, value: string}): HttpHeader;
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

    class Csv extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv';
      static sample(reader: gc.io.CsvReader, max_lines?: number | bigint | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
      static analyze(files: globalThis.Array<gc.io.File>, config?: gc.io.CsvAnalysisConfig | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.io.CsvStatistics>;
      static generate(stats: gc.io.CsvStatistics, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<string>;
    }

    class Json<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Json';
    }

    class TextReader extends gc.sdk.GCObject {
      static readonly _type = 'io::TextReader';
      path: string;
      pos: number | bigint | null;
      constructor(path: string, pos?: number | bigint | null);
      static createFrom(fields: {path: string, pos?: number | bigint | null}): TextReader;
    }

    class Csv$analyze$args extends gc.sdk.GCObject {
      static readonly _type = 'io::Csv$analyze$args';
      files: globalThis.Array<gc.io.File>;
      config: gc.io.CsvAnalysisConfig | null;
      constructor(files: globalThis.Array<gc.io.File>, config?: gc.io.CsvAnalysisConfig | null);
      static createFrom(fields: {files: globalThis.Array<gc.io.File>, config?: gc.io.CsvAnalysisConfig | null}): Csv$analyze$args;
    }

    class Http extends gc.sdk.GCObject {
      static readonly _type = 'io::Http';
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

    class Writer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'io::Writer';
      path: string;
      append: boolean | null;
    }

    class CsvSharding extends gc.sdk.GCObject {
      static readonly _type = 'io::CsvSharding';
      id: number | bigint;
      column: number | bigint;
      modulo: number | bigint;
      constructor(id: number | bigint, column: number | bigint, modulo: number | bigint);
      static createFrom(fields: {id: number | bigint, column: number | bigint, modulo: number | bigint}): CsvSharding;
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

    class File extends gc.sdk.GCObject {
      static readonly _type = 'io::File';
      path: string;
      size: number | bigint | null;
      last_modification: gc.core.time | null;
      constructor(path: string, size?: number | bigint | null, last_modification?: gc.core.time | null);
      static createFrom(fields: {path: string, size?: number | bigint | null, last_modification?: gc.core.time | null}): File;
    }

  }

  namespace util {
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

    class Random extends gc.sdk.GCObject {
      static readonly _type = 'util::Random';
      seed: number | bigint | null;
      v: number | null;
      constructor(seed?: number | bigint | null, v?: number | null);
      static createFrom(fields: {seed?: number | bigint | null, v?: number | null}): Random;
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

    class Crypto extends gc.sdk.GCObject {
      static readonly _type = 'util::Crypto';
    }

    class GaussianProfileSlot extends gc.sdk.GCObject {
      static readonly _type = 'util::GaussianProfileSlot';
      sum: number | bigint;
      sumsq: number | bigint;
      count: number | bigint;
      constructor(sum: number | bigint, sumsq: number | bigint, count: number | bigint);
      static createFrom(fields: {sum: number | bigint, sumsq: number | bigint, count: number | bigint}): GaussianProfileSlot;
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

    class MultiQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::MultiQuantizer';
      quantizers: globalThis.Array<gc.util.Quantizer<T>>;
      constructor(quantizers: globalThis.Array<gc.util.Quantizer<T>>);
      static createFrom<T>(fields: {quantizers: globalThis.Array<gc.util.Quantizer<T>>}): MultiQuantizer;
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

    class Quantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Quantizer';
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

    class Plot extends gc.sdk.GCObject {
      static readonly _type = 'util::Plot';
    }

    class Stack<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Stack';
      values: globalThis.Array<T> | null;
      constructor(values?: globalThis.Array<T> | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null}): Stack;
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

    class Assert extends gc.sdk.GCObject {
      static readonly _type = 'util::Assert';
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

    class Queue<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::Queue';
      values: globalThis.Array<T> | null;
      capacity: number | bigint | null;
      constructor(values?: globalThis.Array<T> | null, capacity?: number | bigint | null);
      static createFrom<T>(fields: {values?: globalThis.Array<T> | null, capacity?: number | bigint | null}): Queue;
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

    class CustomQuantizer<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::CustomQuantizer';
      min: T | null;
      max: T | null;
      step_starts: globalThis.Array<T>;
      open: boolean | null;
      constructor(min: T | null, max: T | null, step_starts: globalThis.Array<T>, open?: boolean | null);
      static createFrom<T>(fields: {min?: T | null, max?: T | null, step_starts: globalThis.Array<T>, open?: boolean | null}): CustomQuantizer;
    }

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

    class QuantizerSlotBound<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'util::QuantizerSlotBound';
      min: T | null;
      max: T | null;
      center: T | null;
      constructor(min?: T | null, max?: T | null, center?: T | null);
      static createFrom<T>(fields: {min?: T | null, max?: T | null, center?: T | null}): QuantizerSlotBound;
    }

  }

  namespace sdk {
    interface GreyCat {
        call(method: 'core::Date::from_time', args: [gc.core.time, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.core.Date>;
        spawn(method: 'core::Date::from_time', args: [gc.core.time, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::Date::from_time', args: [gc.core.time, gc.core.TimeZone | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Date>;
        call(method: 'core::nodeTime::info', args: [globalThis.Array<gc.core.nodeTime>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>;
        spawn(method: 'core::nodeTime::info', args: [globalThis.Array<gc.core.nodeTime>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeTime::info', args: [globalThis.Array<gc.core.nodeTime>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.time>>>;
        call(method: 'core::nodeTime::sample', args: [globalThis.Array<gc.core.nodeTime>, gc.core.time | null, gc.core.time | null, number | bigint, gc.core.SamplingMode, gc.core.duration | null, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeTime::sample', args: [globalThis.Array<gc.core.nodeTime>, gc.core.time | null, gc.core.time | null, number | bigint, gc.core.SamplingMode, gc.core.duration | null, gc.core.TimeZone | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeTime::sample', args: [globalThis.Array<gc.core.nodeTime>, gc.core.time | null, gc.core.time | null, number | bigint, gc.core.SamplingMode, gc.core.duration | null, gc.core.TimeZone | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::nodeList::info', args: [globalThis.Array<gc.core.nodeList>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>;
        spawn(method: 'core::nodeList::info', args: [globalThis.Array<gc.core.nodeList>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeList::info', args: [globalThis.Array<gc.core.nodeList>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<number | bigint>>>;
        call(method: 'core::nodeList::sample', args: [globalThis.Array<gc.core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, gc.core.SamplingMode, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeList::sample', args: [globalThis.Array<gc.core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, gc.core.SamplingMode, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeList::sample', args: [globalThis.Array<gc.core.nodeList>, number | bigint | null, number | bigint | null, number | bigint, gc.core.SamplingMode, number | bigint | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::node::resolve_all', args: [globalThis.Array<gc.core.node | null>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
        spawn(method: 'core::node::resolve_all', args: [globalThis.Array<gc.core.node | null>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::node::resolve_all', args: [globalThis.Array<gc.core.node | null>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<any | null>>;
        call(method: 'core::nodeGeo::info', args: [globalThis.Array<gc.core.nodeGeo>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>;
        spawn(method: 'core::nodeGeo::info', args: [globalThis.Array<gc.core.nodeGeo>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeGeo::info', args: [globalThis.Array<gc.core.nodeGeo>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo<gc.core.geo>>>;
        call(method: 'core::nodeGeo::sample', args: [globalThis.Array<gc.core.nodeGeo>, gc.core.geo | null, gc.core.geo | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeGeo::sample', args: [globalThis.Array<gc.core.nodeGeo>, gc.core.geo | null, gc.core.geo | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeGeo::sample', args: [globalThis.Array<gc.core.nodeGeo>, gc.core.geo | null, gc.core.geo | null, number | bigint, gc.core.SamplingMode], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::Table::applyMappings', args: [gc.core.Table, globalThis.Array<gc.core.TableColumnMapping>], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::Table::applyMappings', args: [gc.core.Table, globalThis.Array<gc.core.TableColumnMapping>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::Table::applyMappings', args: [gc.core.Table, globalThis.Array<gc.core.TableColumnMapping>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'core::nodeIndex::info', args: [globalThis.Array<gc.core.nodeIndex>], signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo>>;
        spawn(method: 'core::nodeIndex::info', args: [globalThis.Array<gc.core.nodeIndex>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeIndex::info', args: [globalThis.Array<gc.core.nodeIndex>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.core.NodeInfo>>;
        call(method: 'core::nodeIndex::sample', args: [globalThis.Array<gc.core.nodeIndex>, any | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'core::nodeIndex::sample', args: [globalThis.Array<gc.core.nodeIndex>, any | null, number | bigint, gc.core.SamplingMode], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'core::nodeIndex::sample', args: [globalThis.Array<gc.core.nodeIndex>, any | null, number | bigint, gc.core.SamplingMode], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'runtime::Debug::resume', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::Debug::resume', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::resume', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Debug::get', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Debug>;
        spawn(method: 'runtime::Debug::get', args: [number | bigint], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::get', args: [number | bigint], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.Debug>;
        call(method: 'runtime::Debug::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
        spawn(method: 'runtime::Debug::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Debug::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<number | bigint>>;
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
        call(method: 'runtime::SecurityEntity::set', args: [gc.runtime.SecurityEntity], signal?: globalThis.AbortSignal): Promise<number | bigint | null>;
        spawn(method: 'runtime::SecurityEntity::set', args: [gc.runtime.SecurityEntity], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityEntity::set', args: [gc.runtime.SecurityEntity], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<number | bigint | null>;
        call(method: 'runtime::SecurityEntity::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.SecurityEntity>>;
        spawn(method: 'runtime::SecurityEntity::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityEntity::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.SecurityEntity>>;
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
        call(method: 'runtime::SecurityFields::get', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.SecurityFields | null>;
        spawn(method: 'runtime::SecurityFields::get', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityFields::get', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.SecurityFields | null>;
        call(method: 'runtime::SecurityFields::set', args: [gc.runtime.SecurityFields], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::SecurityFields::set', args: [gc.runtime.SecurityFields], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::SecurityFields::set', args: [gc.runtime.SecurityFields], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::Permission::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Permission>>;
        spawn(method: 'runtime::Permission::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Permission::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Permission>>;
        call(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<gc.runtime.PeriodicTask>], signal?: globalThis.AbortSignal): Promise<unknown>;
        spawn(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<gc.runtime.PeriodicTask>], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::PeriodicTask::set', args: [globalThis.Array<gc.runtime.PeriodicTask>], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<unknown>;
        call(method: 'runtime::PeriodicTask::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.PeriodicTask>>;
        spawn(method: 'runtime::PeriodicTask::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::PeriodicTask::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.PeriodicTask>>;
        call(method: 'runtime::Role::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Role>>;
        spawn(method: 'runtime::Role::all', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::Role::all', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<globalThis.Array<gc.runtime.Role>>;
        call(method: 'runtime::OpenIDConnect::config', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.OpenIDConnect | null>;
        spawn(method: 'runtime::OpenIDConnect::config', args?: undefined, signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'runtime::OpenIDConnect::config', args?: undefined, pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.runtime.OpenIDConnect | null>;
        call(method: 'io::Csv::sample', args: [gc.io.CsvReader, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        spawn(method: 'io::Csv::sample', args: [gc.io.CsvReader, number | bigint | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::Csv::sample', args: [gc.io.CsvReader, number | bigint | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.core.Table>;
        call(method: 'io::Csv::analyze', args: [globalThis.Array<gc.io.File>, gc.io.CsvAnalysisConfig | null], signal?: globalThis.AbortSignal): Promise<gc.io.CsvStatistics>;
        spawn(method: 'io::Csv::analyze', args: [globalThis.Array<gc.io.File>, gc.io.CsvAnalysisConfig | null], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::Csv::analyze', args: [globalThis.Array<gc.io.File>, gc.io.CsvAnalysisConfig | null], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<gc.io.CsvStatistics>;
        call(method: 'io::Csv::generate', args: [gc.io.CsvStatistics], signal?: globalThis.AbortSignal): Promise<string>;
        spawn(method: 'io::Csv::generate', args: [gc.io.CsvStatistics], signal?: globalThis.AbortSignal): Promise<gc.runtime.Task>;
        spawnAwait(method: 'io::Csv::generate', args: [gc.io.CsvStatistics], pollEvery?: number, signal?: globalThis.AbortSignal): Promise<string>;
    }
  }

}
