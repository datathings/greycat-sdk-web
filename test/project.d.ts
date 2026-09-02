// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
/* eslint-disable */
/* oxlint-disable */
declare namespace gc {
  namespace project {
    class Root extends gc.sdk.GCObject {
      static readonly _type = 'project::Root';
      static readonly $fields: Root.$Fields;
      "runtime::usages": gc.core.nodeTime<gc.runtime.RuntimeUsage>;
      "tests::w_idx": gc.core.node<number | bigint | null>;
    }
    namespace Root {
      interface $Fields {
        "runtime::usages": 0;
        "tests::w_idx": 1;
      }
    }

  }

  namespace tests {
    class no_result$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::no_result$args';
    }

    class concat$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::concat$args';
      static readonly $fields: concat$args.$Fields;
      a: string;
      b: string;
      constructor(a: string, b: string);
      static createFrom(fields: {a: string, b: string}): concat$args;
    }
    namespace concat$args {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    class make_person$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::make_person$args';
      static readonly $fields: make_person$args.$Fields;
      name: string;
      age: number | bigint;
      nickname: string | null;
      constructor(name: string, age: number | bigint, nickname?: string | null);
      static createFrom(fields: {name: string, age: number | bigint, nickname?: string | null}): make_person$args;
    }
    namespace make_person$args {
      interface $Fields {
        name: 0;
        age: 1;
        nickname: 2;
      }
    }

    class sum_array$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::sum_array$args';
      static readonly $fields: sum_array$args.$Fields;
      a: globalThis.Array<number | bigint>;
      constructor(a: globalThis.Array<number | bigint>);
      static createFrom(fields: {a: globalThis.Array<number | bigint>}): sum_array$args;
    }
    namespace sum_array$args {
      interface $Fields {
        a: 0;
      }
    }

    class echo_array$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::echo_array$args';
      static readonly $fields: echo_array$args.$Fields;
      a: globalThis.Array<number | bigint>;
      constructor(a: globalThis.Array<number | bigint>);
      static createFrom(fields: {a: globalThis.Array<number | bigint>}): echo_array$args;
    }
    namespace echo_array$args {
      interface $Fields {
        a: 0;
      }
    }

    class Person extends gc.sdk.GCObject {
      static readonly _type = 'tests::Person';
      static readonly $fields: Person.$Fields;
      name: string;
      age: number | bigint;
      nickname: string | null;
      constructor(name: string, age: number | bigint, nickname?: string | null);
      static createFrom(fields: {name: string, age: number | bigint, nickname?: string | null}): Person;
    }
    namespace Person {
      interface $Fields {
        name: 0;
        age: 1;
        nickname: 2;
      }
    }

    class Color extends gc.sdk.GCEnum {
      static readonly _type = 'tests::Color';
      static readonly $fields: Color[];
      key: Color.Field;
      constructor(type: gc.sdk.AbiType, offset: number, key: Color.Field);
      static red: Color;
      static green: Color;
      static blue: Color;
    }
    namespace Color  {
      type Field = "red"|"green"|"blue";
    }

    class add$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::add$args';
      static readonly $fields: add$args.$Fields;
      a: number | bigint;
      b: number | bigint;
      constructor(a: number | bigint, b: number | bigint);
      static createFrom(fields: {a: number | bigint, b: number | bigint}): add$args;
    }
    namespace add$args {
      interface $Fields {
        a: 0;
        b: 1;
      }
    }

    class Box<T = any> extends gc.sdk.GCObject {
      static readonly _type = 'tests::Box';
      static readonly $fields: Box.$Fields;
      value: T;
      constructor(value?: T);
      static createFrom<T>(fields: {value?: T}): Box;
    }
    namespace Box {
      interface $Fields {
        value: 0;
      }
    }

    class echo_any$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::echo_any$args';
      static readonly $fields: echo_any$args.$Fields;
      v: any | null;
      constructor(v?: any | null);
      static createFrom(fields: {v?: any | null}): echo_any$args;
    }
    namespace echo_any$args {
      interface $Fields {
        v: 0;
      }
    }

    class boom$args extends gc.sdk.GCObject {
      static readonly _type = 'tests::boom$args';
    }

    const add: ((a: number | bigint, b: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<number | bigint>) & {
      spawn(a: number | bigint, b: number | bigint, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<number | bigint>>;
    };
    const concat: ((a: string, b: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<string>) & {
      spawn(a: string, b: string, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<string>>;
    };
    const echo_any: ((v?: any | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<any | null>) & {
      spawn(v?: any | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<any | null>>;
    };
    const echo_array: ((a: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<globalThis.Array<number | bigint>>) & {
      spawn(a: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<globalThis.Array<number | bigint>>>;
    };
    const make_person: ((name: string, age: number | bigint, nickname?: string | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<gc.tests.Person>) & {
      spawn(name: string, age: number | bigint, nickname?: string | null, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<gc.tests.Person>>;
    };
    const sum_array: ((a: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<number | bigint>) & {
      spawn(a: globalThis.Array<number | bigint>, $g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<number | bigint>>;
    };
    const boom: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
      spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
    };
    const no_result: (($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal) => Promise<unknown>) & {
      spawn($g?: gc.sdk.GreyCat, $signal?: globalThis.AbortSignal): Promise<gc.runtime.Task<unknown>>;
    };
  }

  interface $TypesMap {
    'core::Array<core::NodeInfo<core::time>>': 0,
    'core::DurationUnit': 0,
    'core::Tuple<core::String,core::String?>': 0,
    'core::Array<io::S3Object>': 0,
    'core::nodeGeo': 0,
    'core::Array<runtime::McpTool>': 0,
    'core::Map<core::String,runtime::HeaderObject>': 0,
    'core::Array<runtime::McpPrompt>': 0,
    'core::Tuple<core::int,core::any?>': 0,
    'core::Array<core::GeoBox>': 0,
    'core::Array<runtime::PeriodicTask>': 0,
    'core::Array<runtime::McpTask>': 0,
    'core::TensorDistance': 0,
    'core::Array<core::SearchResult<core::geo,core::any?>>': 0,
    'core::geo': 0,
    'core::Array<core::geo>': 0,
    'core::Array<core::float>': 0,
    'core::Array<runtime::Frame>': 0,
    'core::Array<core::int?>': 0,
    'core::Array<runtime::SchemaObject>': 0,
    'core::Chars': 0,
    'core::Array<runtime::Variable>': 0,
    'core::ErrorCode': 0,
    'core::Array<core::NodeInfo<core::geo>>': 0,
    'core::nodeTimeCursor': 0,
    'core::Array<runtime::Job>': 0,
    'core::Array<core::nodeTime>': 0,
    'core::Array<core::any>': 0,
    'core::nodeGeo$search$args': 0,
    'core::Map': 0,
    'core::MathConstants': 0,
    'core::Map<core::String,runtime::ResponseObject>': 0,
    'core::float': 0,
    'core::Array<core::NodeInfo<core::int>>': 0,
    'core::bool': 0,
    'core::nodeTime<runtime::RuntimeUsage>': 0,
    'core::Array<runtime::McpResource>': 0,
    'core::Array<core::NodeInfo>': 0,
    'core::Array<runtime::McpContentBlock>': 0,
    'core::Array<runtime::Task?>': 0,
    'core::Array<runtime::McpPromptArgument>': 0,
    'core::String': 0,
    'core::field': 0,
    'core::Buffer': 0,
    'core::Table$applyMappings$args': 0,
    'core::Array<core::node?>': 0,
    'core::nodeIndex<core::node<core::Tensor>,core::any?>': 0,
    'core::nodeIndex$sample$args': 0,
    'core::Map<core::String,runtime::MediaTypeObject>': 0,
    'core::SearchResult<core::Tensor,core::any?>': 0,
    'core::nodeTime$info$args': 0,
    'core::SortOrder': 0,
    'core::Array<runtime::IdentityGrant>': 0,
    'core::Error': 0,
    'core::Array<core::SearchResult>': 0,
    'core::Array<runtime::HeaderObject>': 0,
    'core::Array<core::nodeList>': 0,
    'core::Array<io::S3Bucket>': 0,
    'core::TableColumnMapping': 0,
    'core::Array<core::nodeIndex>': 0,
    'core::Map<core::String,core::Map<core::String,core::any>>': 0,
    'core::node<core::int?>': 0,
    'core::Array<core::field>': 0,
    'core::nodeList$sample$args': 0,
    'core::Array<runtime::DateTuple>': 0,
    'core::Array<core::SearchResult<core::node<core::Tensor>,core::any?>>': 0,
    'core::Tuple<core::time,core::any?>': 0,
    'core::Array<runtime::Task>': 0,
    'core::type': 0,
    'core::null': 0,
    'core::node': 0,
    'core::SearchResult<core::geo,core::any?>': 0,
    'core::Table<core::Tuple<core::time,core::any?>>': 0,
    'core::nodeIndexBucket<core::node<core::Tensor>,core::any?>': 0,
    'core::Array<runtime::McpRole>': 0,
    'core::Tuple': 0,
    'core::node<core::Tensor>': 0,
    'core::GeoPoly': 0,
    'core::Array<core::nodeGeo>': 0,
    'core::Array<core::ErrorFrame>': 0,
    'core::VectorVertex': 0,
    'core::SearchResult<core::node<core::Tensor>,core::any?>': 0,
    'core::nodeIndexBucket': 0,
    'core::nodeGeo$info$args': 0,
    'core::Map<core::String,core::any>': 0,
    'core::TensorType': 0,
    'core::Array<util::HistogramBin>': 0,
    'core::NodeInfo<core::geo>': 0,
    'core::Array<core::int>': 0,
    'core::Array<runtime::MediaTypeObject>': 0,
    'core::node$resolve_all$args': 0,
    'core::Array<runtime::Identity>': 0,
    'core::NodeInfo<core::int>': 0,
    'core::node<core::VectorVertex>': 0,
    'core::Array<core::node<core::VectorVertex>?>': 0,
    'core::Array<core::Map<core::String,core::any>>': 0,
    'core::Table<util::GaussianProfileSlot?>': 0,
    'core::nodeTime': 0,
    'core::Array<core::SearchResult<core::Tensor,core::any?>>': 0,
    'core::SamplingMode': 0,
    'core::nodeGeo$sample$args': 0,
    'core::GeoCircle': 0,
    'core::Array<core::Tuple<core::int,core::int>>': 0,
    'core::Array<runtime::PathItemObject>': 0,
    'core::Map<core::String,runtime::SchemaObject>': 0,
    'core::Array<io::File>': 0,
    'core::nodeList$info$args': 0,
    'core::Tuple<core::geo,core::any?>': 0,
    'core::Array<core::type>': 0,
    'core::nodeList': 0,
    'core::Array<core::Tuple<core::String,core::String?>>': 0,
    'core::int': 0,
    'core::Tensor': 0,
    'core::nodeIndex$info$args': 0,
    'core::Map<core::String,core::String>': 0,
    'core::char': 0,
    'core::Array<runtime::WorkerUsage>': 0,
    'core::Array<core::String>': 0,
    'core::FloatPrecision': 0,
    'core::any': 0,
    'core::ErrorFrame': 0,
    'core::Array<runtime::RuntimeUsage>': 0,
    'core::Tuple<core::time,runtime::RuntimeUsage>': 0,
    'core::Table': 0,
    'core::function': 0,
    'core::Array<runtime::Role>': 0,
    'core::Array<runtime::DayOfWeek>': 0,
    'core::duration': 0,
    'core::Array<runtime::Permission>': 0,
    'core::Array<runtime::ZoneUsage>': 0,
    'core::Map<core::String,runtime::PathItemObject>': 0,
    'core::GeoBox': 0,
    'core::Map<core::any,core::int>': 0,
    'core::Tuple<core::int,core::int>': 0,
    'core::Array': 0,
    'core::Map<core::String,core::int>': 0,
    'core::Array<core::TableColumnMapping>': 0,
    'core::CalendarUnit': 0,
    'core::nodeIndex': 0,
    'core::Array<io::CsvColumnStatistics>': 0,
    'core::NodeInfo<core::time>': 0,
    'core::SearchResult': 0,
    'core::Array<core::char>': 0,
    'core::time': 0,
    'core::Array<core::bool>': 0,
    'core::Date': 0,
    'core::NodeInfo': 0,
    'core::nodeIndex$search_closest$args': 0,
    'core::TimeZone': 0,
    'core::Array<runtime::ResponseObject>': 0,
    'core::Array<util::Quantizer>': 0,
    'core::nodeTime$sample$args': 0,
    'core::VectorIndex': 0,
    'runtime::Debug$resume$args': 0,
    'runtime::Identity$set_password$args': 0,
    'runtime::Permission': 0,
    'runtime::McpContentType': 0,
    'runtime::McpToolExecution': 0,
    'runtime::Identity$set_role$args': 0,
    'runtime::Periodicity': 0,
    'runtime::McpClientRoots': 0,
    'runtime::Debug$get$args': 0,
    'runtime::IdentityGrantType': 0,
    'runtime::McpRequestParams': 0,
    'runtime::McpTaskStatus': 0,
    'runtime::McpServerToolsCapabilities': 0,
    'runtime::Runtime$usage$args': 0,
    'runtime::Identity$get_by_id$args': 0,
    'runtime::Identity$current$args': 0,
    'runtime::SchemaObject': 0,
    'runtime::Debug$all$args': 0,
    'runtime::McpClientTasksCapabilities': 0,
    'runtime::HeaderObject': 0,
    'runtime::Scheduler$activate$args': 0,
    'runtime::McpToolsListParams': 0,
    'runtime::ResponseCode': 0,
    'runtime::McpPromptsListResult': 0,
    'runtime::Role$all$args': 0,
    'runtime::McpResourceContent': 0,
    'runtime::PathItemObject': 0,
    'runtime::McpTasksCreateResult': 0,
    'runtime::mcp_tasks_cancel$args': 0,
    'runtime::McpToolsCallResult': 0,
    'runtime::McpAudioContent': 0,
    'runtime::WeeklyPeriodicity': 0,
    'runtime::Frame': 0,
    'runtime::Debug': 0,
    'runtime::McpTool': 0,
    'runtime::Job': 0,
    'runtime::ContactObject': 0,
    'runtime::McpImageContent': 0,
    'runtime::DailyPeriodicity': 0,
    'runtime::Scheduler': 0,
    'runtime::McpTextContent': 0,
    'runtime::Log': 0,
    'runtime::McpRole': 0,
    'runtime::ZoneUsage': 0,
    'runtime::Task$history$args': 0,
    'runtime::McpContentBlock': 0,
    'runtime::MergeStrategy': 0,
    'runtime::mcp_tools_list$args': 0,
    'runtime::McpInitializeResult': 0,
    'runtime::RuntimeInfo': 0,
    'runtime::Runtime$backup_full$args': 0,
    'runtime::ChildProcess': 0,
    'runtime::mcp_tasks_get$args': 0,
    'runtime::mcp_tools_call$args': 0,
    'runtime::McpInitializeParams': 0,
    'runtime::PeriodicOptions': 0,
    'runtime::RequestBodyObject': 0,
    'runtime::Task$live$args': 0,
    'runtime::Identity$logout$args': 0,
    'runtime::Task': 0,
    'runtime::Identity': 0,
    'runtime::McpClientCapabilities': 0,
    'runtime::McpServerResourcesCapabilities': 0,
    'runtime::McpServerPromptsCapabilities': 0,
    'runtime::OpenApiVersion': 0,
    'runtime::ComponentsObject': 0,
    'runtime::McpPriority': 0,
    'runtime::McpTasksGetParams': 0,
    'runtime::Task$tasks$args': 0,
    'runtime::Identity$create$args': 0,
    'runtime::Runtime$info$args': 0,
    'runtime::InfoObject': 0,
    'runtime::MediaTypeObject': 0,
    'runtime::McpPromptArgument': 0,
    'runtime::LicenseObject': 0,
    'runtime::LicenseType': 0,
    'runtime::OpenApiV3': 0,
    'runtime::McpTasksListParams': 0,
    'runtime::LogLevel': 0,
    'runtime::Task$running$args': 0,
    'runtime::McpTask': 0,
    'runtime::OperationObject': 0,
    'runtime::IdentityGrant': 0,
    'runtime::License': 0,
    'runtime::OpenApi': 0,
    'runtime::mcp_tasks_list$args': 0,
    'runtime::FixedPeriodicity': 0,
    'runtime::McpTaskSupport': 0,
    'runtime::Task$is_running$args': 0,
    'runtime::McpTasksListResult': 0,
    'runtime::WorkerUsage': 0,
    'runtime::DateTuple': 0,
    'runtime::McpServerTasksCapabilities': 0,
    'runtime::McpTaskCreateParams': 0,
    'runtime::Identity$permissions$args': 0,
    'runtime::MonthlyPeriodicity': 0,
    'runtime::SchemaFormat': 0,
    'runtime::Permission$all$args': 0,
    'runtime::ResponseObject': 0,
    'runtime::Identity$token$args': 0,
    'runtime::OpenApi$v3$args': 0,
    'runtime::PeriodicTask': 0,
    'runtime::LogDataUsage': 0,
    'runtime::Month': 0,
    'runtime::mcp_prompts_list$args': 0,
    'runtime::Runtime$root$args': 0,
    'runtime::McpResult': 0,
    'runtime::McpAnnotations': 0,
    'runtime::System$get_all_envs$args': 0,
    'runtime::Scheduler$deactivate$args': 0,
    'runtime::mcp_initialize$args': 0,
    'runtime::Variable': 0,
    'runtime::McpPrompt': 0,
    'runtime::Identity$login$args': 0,
    'runtime::Runtime': 0,
    'runtime::McpTasksResultParams': 0,
    'runtime::ChildProcessResult': 0,
    'runtime::Role': 0,
    'runtime::McpToolsListResult': 0,
    'runtime::System': 0,
    'runtime::Identity$get_by_name$args': 0,
    'runtime::DayOfWeek': 0,
    'runtime::Identity$current_id$args': 0,
    'runtime::YearlyPeriodicity': 0,
    'runtime::McpServerCapabilities': 0,
    'runtime::McpToolsCallParams': 0,
    'runtime::McpResourcesListResult': 0,
    'runtime::Scheduler$find$args': 0,
    'runtime::mcp_tasks_result$args': 0,
    'runtime::McpResourcesListParams': 0,
    'runtime::McpPromptsListParams': 0,
    'runtime::RuntimeUsage': 0,
    'runtime::Identity$all$args': 0,
    'runtime::Runtime$abi$args': 0,
    'runtime::SchemaType': 0,
    'runtime::Scheduler$list$args': 0,
    'runtime::mcp_resources_list$args': 0,
    'runtime::McpImplementation': 0,
    'runtime::Identity$set_grants$args': 0,
    'runtime::Scheduler$add$args': 0,
    'runtime::TaskStatus': 0,
    'runtime::McpBaseMetadata': 0,
    'runtime::McpResource': 0,
    'runtime::McpTasksCancelParams': 0,
    'runtime::Task$cancel$args': 0,
    'io::XmlReader': 0,
    'io::SmtpMode': 0,
    'io::Smtp': 0,
    'io::Json': 0,
    'io::CsvColumnStatistics': 0,
    'io::CsvWriter': 0,
    'io::CsvSharding': 0,
    'io::Email': 0,
    'io::Csv$sample$args': 0,
    'io::S3Object': 0,
    'io::BinReader': 0,
    'io::Reader': 0,
    'io::FileWalker': 0,
    'io::Csv$analyze$args': 0,
    'io::Reader<core::String>': 0,
    'io::TextWriter': 0,
    'io::CsvStatistics': 0,
    'io::S3BasicCredentials': 0,
    'io::GcbReader': 0,
    'io::TextReader': 0,
    'io::S3Bucket': 0,
    'io::Csv$generate$args': 0,
    'io::File': 0,
    'io::S3': 0,
    'io::JsonReader': 0,
    'io::CsvNested': 0,
    'io::CsvAnalysisConfig': 0,
    'io::Writer': 0,
    'io::CsvReader': 0,
    'io::Csv': 0,
    'io::SmtpAuth': 0,
    'io::CsvFormat': 0,
    'io::JsonWriter': 0,
    'io::Url': 0,
    'io::GcbWriter': 0,
    'util::Uuid': 0,
    'util::LogQuantizer': 0,
    'util::Quantizer<core::Array>': 0,
    'util::Queue': 0,
    'util::LinearQuantizer': 0,
    'util::CustomQuantizer': 0,
    'util::TimeWindow': 0,
    'util::Random': 0,
    'util::ProgressTracker': 0,
    'util::GaussianProfileSlot': 0,
    'util::SlidingWindow': 0,
    'util::Stack': 0,
    'util::Histogram': 0,
    'util::Gaussian': 0,
    'util::HistogramBin': 0,
    'util::HistogramStats': 0,
    'util::Assert': 0,
    'util::GaussianProfile': 0,
    'util::MultiQuantizer': 0,
    'util::Crypto': 0,
    'util::QuantizerSlotBound': 0,
    'util::QuantizerSlotBound<core::Array>': 0,
    'util::Quantizer': 0,
    'project::Root': 0,
    'tests::no_result$args': 0,
    'tests::concat$args': 0,
    'tests::make_person$args': 0,
    'tests::sum_array$args': 0,
    'tests::echo_array$args': 0,
    'tests::Box<core::int>': 0,
    'tests::Person': 0,
    'tests::Color': 0,
    'tests::add$args': 0,
    'tests::Box': 0,
    'tests::echo_any$args': 0,
    'tests::boom$args': 0,
  }

  interface $FieldsMap {
    'core::Chars::codepoints': 0,
    'core::nodeTimeCursor::n': 0,
    'core::nodeGeo$search$args::center': 0,
    'core::nodeGeo$search$args::max': 0,
    'core::Table$applyMappings$args::table': 0,
    'core::Table$applyMappings$args::mappings': 0,
    'core::nodeIndex$sample$args::refs': 0,
    'core::nodeIndex$sample$args::from': 0,
    'core::nodeIndex$sample$args::maxRows': 0,
    'core::nodeIndex$sample$args::mode': 0,
    'core::nodeTime$info$args::nodes': 0,
    'core::Error::message': 0,
    'core::Error::stack': 0,
    'core::TableColumnMapping::column': 0,
    'core::TableColumnMapping::extractors': 0,
    'core::nodeList$sample$args::refs': 0,
    'core::nodeList$sample$args::from': 0,
    'core::nodeList$sample$args::to': 0,
    'core::nodeList$sample$args::maxRows': 0,
    'core::nodeList$sample$args::mode': 0,
    'core::nodeList$sample$args::maxDephasing': 0,
    'core::Tuple::x': 0,
    'core::Tuple::y': 0,
    'core::GeoPoly::points': 0,
    'core::VectorVertex::vector': 0,
    'core::VectorVertex::level_sizes': 0,
    'core::VectorVertex::neighbour_nodes': 0,
    'core::nodeIndexBucket::key': 0,
    'core::nodeIndexBucket::value': 0,
    'core::nodeIndexBucket::next': 0,
    'core::nodeGeo$info$args::nodes': 0,
    'core::node$resolve_all$args::n': 0,
    'core::nodeGeo$sample$args::refs': 0,
    'core::nodeGeo$sample$args::from': 0,
    'core::nodeGeo$sample$args::to': 0,
    'core::nodeGeo$sample$args::maxRows': 0,
    'core::nodeGeo$sample$args::mode': 0,
    'core::GeoCircle::center': 0,
    'core::GeoCircle::radius': 0,
    'core::nodeList$info$args::nodes': 0,
    'core::nodeIndex$info$args::nodes': 0,
    'core::ErrorFrame::module': 0,
    'core::ErrorFrame::function': 0,
    'core::ErrorFrame::line': 0,
    'core::ErrorFrame::column': 0,
    'core::GeoBox::sw': 0,
    'core::GeoBox::ne': 0,
    'core::SearchResult::key': 0,
    'core::SearchResult::value': 0,
    'core::SearchResult::distance': 0,
    'core::Date::year': 0,
    'core::Date::month': 0,
    'core::Date::day': 0,
    'core::Date::hour': 0,
    'core::Date::minute': 0,
    'core::Date::second': 0,
    'core::Date::microsecond': 0,
    'core::NodeInfo::size': 0,
    'core::NodeInfo::from': 0,
    'core::NodeInfo::to': 0,
    'core::nodeIndex$search_closest$args::i': 0,
    'core::nodeIndex$search_closest$args::key': 0,
    'core::nodeIndex$search_closest$args::max': 0,
    'core::nodeTime$sample$args::refs': 0,
    'core::nodeTime$sample$args::from': 0,
    'core::nodeTime$sample$args::to': 0,
    'core::nodeTime$sample$args::maxRows': 0,
    'core::nodeTime$sample$args::mode': 0,
    'core::nodeTime$sample$args::maxDephasing': 0,
    'core::nodeTime$sample$args::tz': 0,
    'core::VectorIndex::values': 0,
    'core::VectorIndex::count': 0,
    'core::VectorIndex::max_level': 0,
    'core::VectorIndex::entry_node_ref': 0,
    'core::VectorIndex::rng': 0,
    'core::VectorIndex::distance': 0,
    'runtime::Debug$resume$args::id': 0,
    'runtime::Identity$set_password$args::name': 0,
    'runtime::Identity$set_password$args::pass': 0,
    'runtime::Permission::name': 0,
    'runtime::Permission::description': 0,
    'runtime::McpToolExecution::taskSupport': 0,
    'runtime::Identity$set_role$args::name': 0,
    'runtime::Identity$set_role$args::role': 0,
    'runtime::McpClientRoots::listChanged': 0,
    'runtime::Debug$get$args::id': 0,
    'runtime::McpServerToolsCapabilities::listChanged': 0,
    'runtime::Identity$get_by_id$args::id': 0,
    'runtime::SchemaObject::$ref': 0,
    'runtime::SchemaObject::$defs': 0,
    'runtime::SchemaObject::type': 0,
    'runtime::SchemaObject::format': 0,
    'runtime::SchemaObject::description': 0,
    'runtime::SchemaObject::nullable': 0,
    'runtime::SchemaObject::properties': 0,
    'runtime::SchemaObject::pattern': 0,
    'runtime::SchemaObject::required': 0,
    'runtime::SchemaObject::items': 0,
    'runtime::SchemaObject::oneOf': 0,
    'runtime::SchemaObject::allOf': 0,
    'runtime::SchemaObject::anyOf': 0,
    'runtime::SchemaObject::minItems': 0,
    'runtime::SchemaObject::maxItems': 0,
    'runtime::SchemaObject::enum': 0,
    'runtime::SchemaObject::additionalProperties': 0,
    'runtime::McpClientTasksCapabilities::list': 0,
    'runtime::McpClientTasksCapabilities::cancel': 0,
    'runtime::McpClientTasksCapabilities::requests': 0,
    'runtime::HeaderObject::description': 0,
    'runtime::HeaderObject::required': 0,
    'runtime::Scheduler$activate$args::function': 0,
    'runtime::McpToolsListParams::_meta': 0,
    'runtime::McpToolsListParams::cursor': 0,
    'runtime::McpPromptsListResult::_meta': 0,
    'runtime::McpPromptsListResult::prompts': 0,
    'runtime::McpPromptsListResult::nextCursor': 0,
    'runtime::McpResourceContent::type': 0,
    'runtime::McpResourceContent::_meta': 0,
    'runtime::McpResourceContent::annotations': 0,
    'runtime::McpResourceContent::uri': 0,
    'runtime::McpResourceContent::description': 0,
    'runtime::McpResourceContent::mimeType': 0,
    'runtime::McpResourceContent::size': 0,
    'runtime::PathItemObject::description': 0,
    'runtime::PathItemObject::post': 0,
    'runtime::McpTasksCreateResult::_meta': 0,
    'runtime::McpTasksCreateResult::task': 0,
    'runtime::mcp_tasks_cancel$args::params': 0,
    'runtime::McpToolsCallResult::_meta': 0,
    'runtime::McpToolsCallResult::content': 0,
    'runtime::McpToolsCallResult::structuredContent': 0,
    'runtime::McpToolsCallResult::isError': 0,
    'runtime::McpAudioContent::type': 0,
    'runtime::McpAudioContent::_meta': 0,
    'runtime::McpAudioContent::annotations': 0,
    'runtime::McpAudioContent::data': 0,
    'runtime::McpAudioContent::mimeType': 0,
    'runtime::WeeklyPeriodicity::days': 0,
    'runtime::WeeklyPeriodicity::daily': 0,
    'runtime::Frame::module': 0,
    'runtime::Frame::type': 0,
    'runtime::Frame::function': 0,
    'runtime::Frame::src': 0,
    'runtime::Frame::line': 0,
    'runtime::Frame::column': 0,
    'runtime::Frame::scope': 0,
    'runtime::Debug::id': 0,
    'runtime::Debug::frames': 0,
    'runtime::Debug::root': 0,
    'runtime::McpTool::name': 0,
    'runtime::McpTool::title': 0,
    'runtime::McpTool::description': 0,
    'runtime::McpTool::inputSchema': 0,
    'runtime::McpTool::outputSchema': 0,
    'runtime::McpTool::annotations': 0,
    'runtime::McpTool::execution': 0,
    'runtime::Job::function': 0,
    'runtime::Job::arguments': 0,
    'runtime::ContactObject::name': 0,
    'runtime::ContactObject::url': 0,
    'runtime::ContactObject::email': 0,
    'runtime::McpImageContent::type': 0,
    'runtime::McpImageContent::_meta': 0,
    'runtime::McpImageContent::annotations': 0,
    'runtime::McpImageContent::data': 0,
    'runtime::McpImageContent::mimeType': 0,
    'runtime::DailyPeriodicity::hour': 0,
    'runtime::DailyPeriodicity::minute': 0,
    'runtime::DailyPeriodicity::second': 0,
    'runtime::DailyPeriodicity::timezone': 0,
    'runtime::McpTextContent::type': 0,
    'runtime::McpTextContent::_meta': 0,
    'runtime::McpTextContent::annotations': 0,
    'runtime::McpTextContent::text': 0,
    'runtime::Log::level': 0,
    'runtime::Log::time': 0,
    'runtime::Log::user_id': 0,
    'runtime::Log::id': 0,
    'runtime::Log::id2': 0,
    'runtime::Log::src': 0,
    'runtime::Log::data': 0,
    'runtime::ZoneUsage::size': 0,
    'runtime::ZoneUsage::committed_blocks': 0,
    'runtime::ZoneUsage::reserved_blocks': 0,
    'runtime::ZoneUsage::blocks': 0,
    'runtime::ZoneUsage::cache': 0,
    'runtime::Task$history$args::offset': 0,
    'runtime::Task$history$args::max': 0,
    'runtime::mcp_tools_list$args::params': 0,
    'runtime::McpInitializeResult::_meta': 0,
    'runtime::McpInitializeResult::protocolVersion': 0,
    'runtime::McpInitializeResult::capabilities': 0,
    'runtime::McpInitializeResult::serverInfo': 0,
    'runtime::McpInitializeResult::instructions': 0,
    'runtime::RuntimeInfo::version': 0,
    'runtime::RuntimeInfo::program_version': 0,
    'runtime::RuntimeInfo::arch': 0,
    'runtime::RuntimeInfo::timezone': 0,
    'runtime::RuntimeInfo::license': 0,
    'runtime::RuntimeInfo::io_threads': 0,
    'runtime::RuntimeInfo::bg_threads': 0,
    'runtime::RuntimeInfo::fg_threads': 0,
    'runtime::RuntimeInfo::mem_total': 0,
    'runtime::RuntimeInfo::mem_worker': 0,
    'runtime::RuntimeInfo::disk_data_bytes': 0,
    'runtime::ChildProcess::pid': 0,
    'runtime::mcp_tasks_get$args::params': 0,
    'runtime::mcp_tools_call$args::params': 0,
    'runtime::McpInitializeParams::_meta': 0,
    'runtime::McpInitializeParams::protocolVersion': 0,
    'runtime::McpInitializeParams::capabilities': 0,
    'runtime::McpInitializeParams::clientInfo': 0,
    'runtime::PeriodicOptions::immediate': 0,
    'runtime::PeriodicOptions::activated': 0,
    'runtime::PeriodicOptions::start': 0,
    'runtime::PeriodicOptions::max_duration': 0,
    'runtime::RequestBodyObject::content': 0,
    'runtime::RequestBodyObject::required': 0,
    'runtime::Task$live$args::ids': 0,
    'runtime::Task::user_id': 0,
    'runtime::Task::user_name': 0,
    'runtime::Task::task_id': 0,
    'runtime::Task::mod': 0,
    'runtime::Task::type': 0,
    'runtime::Task::fun': 0,
    'runtime::Task::creation': 0,
    'runtime::Task::start': 0,
    'runtime::Task::completion': 0,
    'runtime::Task::status': 0,
    'runtime::Task::progress': 0,
    'runtime::Identity::id': 0,
    'runtime::Identity::name': 0,
    'runtime::Identity::role': 0,
    'runtime::Identity::grants': 0,
    'runtime::McpClientCapabilities::experimental': 0,
    'runtime::McpClientCapabilities::roots': 0,
    'runtime::McpClientCapabilities::sampling': 0,
    'runtime::McpClientCapabilities::elicitation': 0,
    'runtime::McpClientCapabilities::tasks': 0,
    'runtime::McpServerResourcesCapabilities::subscribe': 0,
    'runtime::McpServerResourcesCapabilities::listChanged': 0,
    'runtime::McpServerPromptsCapabilities::listChanged': 0,
    'runtime::ComponentsObject::schemas': 0,
    'runtime::McpTasksGetParams::_meta': 0,
    'runtime::McpTasksGetParams::taskId': 0,
    'runtime::Task$tasks$args::ids': 0,
    'runtime::Identity$create$args::name': 0,
    'runtime::Identity$create$args::role': 0,
    'runtime::InfoObject::title': 0,
    'runtime::InfoObject::version': 0,
    'runtime::InfoObject::summary': 0,
    'runtime::InfoObject::description': 0,
    'runtime::InfoObject::termsOfService': 0,
    'runtime::InfoObject::contact': 0,
    'runtime::InfoObject::license': 0,
    'runtime::MediaTypeObject::schema': 0,
    'runtime::McpPromptArgument::name': 0,
    'runtime::McpPromptArgument::title': 0,
    'runtime::McpPromptArgument::description': 0,
    'runtime::McpPromptArgument::required': 0,
    'runtime::LicenseObject::name': 0,
    'runtime::LicenseObject::identifier': 0,
    'runtime::LicenseObject::url': 0,
    'runtime::OpenApiV3::openapi': 0,
    'runtime::OpenApiV3::info': 0,
    'runtime::OpenApiV3::paths': 0,
    'runtime::OpenApiV3::components': 0,
    'runtime::McpTasksListParams::_meta': 0,
    'runtime::McpTasksListParams::cursor': 0,
    'runtime::McpTask::taskId': 0,
    'runtime::McpTask::status': 0,
    'runtime::McpTask::statusMessage': 0,
    'runtime::McpTask::createdAt': 0,
    'runtime::McpTask::lastUpdatedAt': 0,
    'runtime::McpTask::ttl': 0,
    'runtime::McpTask::pollInterval': 0,
    'runtime::OperationObject::tags': 0,
    'runtime::OperationObject::description': 0,
    'runtime::OperationObject::requestBody': 0,
    'runtime::OperationObject::responses': 0,
    'runtime::IdentityGrant::name': 0,
    'runtime::IdentityGrant::grant': 0,
    'runtime::License::name': 0,
    'runtime::License::start': 0,
    'runtime::License::end': 0,
    'runtime::License::company': 0,
    'runtime::License::max_memory': 0,
    'runtime::License::extra_1': 0,
    'runtime::License::extra_2': 0,
    'runtime::License::type': 0,
    'runtime::mcp_tasks_list$args::params': 0,
    'runtime::FixedPeriodicity::every': 0,
    'runtime::Task$is_running$args::task_id': 0,
    'runtime::McpTasksListResult::_meta': 0,
    'runtime::McpTasksListResult::tasks': 0,
    'runtime::McpTasksListResult::nextCursor': 0,
    'runtime::WorkerUsage::memory': 0,
    'runtime::WorkerUsage::cache': 0,
    'runtime::WorkerUsage::writes': 0,
    'runtime::WorkerUsage::reads': 0,
    'runtime::DateTuple::day': 0,
    'runtime::DateTuple::month': 0,
    'runtime::McpServerTasksCapabilities::list': 0,
    'runtime::McpServerTasksCapabilities::cancel': 0,
    'runtime::McpServerTasksCapabilities::requests': 0,
    'runtime::McpTaskCreateParams::ttl': 0,
    'runtime::MonthlyPeriodicity::days': 0,
    'runtime::MonthlyPeriodicity::daily': 0,
    'runtime::ResponseObject::description': 0,
    'runtime::ResponseObject::headers': 0,
    'runtime::ResponseObject::content': 0,
    'runtime::Identity$token$args::id': 0,
    'runtime::Identity$token$args::ttl': 0,
    'runtime::PeriodicTask::function': 0,
    'runtime::PeriodicTask::periodicity': 0,
    'runtime::PeriodicTask::options': 0,
    'runtime::PeriodicTask::is_active': 0,
    'runtime::PeriodicTask::next_execution': 0,
    'runtime::PeriodicTask::execution_count': 0,
    'runtime::LogDataUsage::read_bytes': 0,
    'runtime::LogDataUsage::read_hits': 0,
    'runtime::LogDataUsage::read_wasted': 0,
    'runtime::LogDataUsage::write_bytes': 0,
    'runtime::LogDataUsage::write_hits': 0,
    'runtime::LogDataUsage::cache_bytes': 0,
    'runtime::LogDataUsage::cache_hits': 0,
    'runtime::mcp_prompts_list$args::params': 0,
    'runtime::McpAnnotations::audience': 0,
    'runtime::McpAnnotations::priority': 0,
    'runtime::McpAnnotations::lastModified': 0,
    'runtime::Scheduler$deactivate$args::function': 0,
    'runtime::mcp_initialize$args::params': 0,
    'runtime::Variable::name': 0,
    'runtime::Variable::value': 0,
    'runtime::McpPrompt::name': 0,
    'runtime::McpPrompt::title': 0,
    'runtime::McpPrompt::description': 0,
    'runtime::McpPrompt::arguments': 0,
    'runtime::Identity$login$args::login': 0,
    'runtime::Identity$login$args::password': 0,
    'runtime::McpTasksResultParams::_meta': 0,
    'runtime::McpTasksResultParams::taskId': 0,
    'runtime::ChildProcessResult::code': 0,
    'runtime::ChildProcessResult::stdout': 0,
    'runtime::ChildProcessResult::stderr': 0,
    'runtime::Role::name': 0,
    'runtime::Role::permissions': 0,
    'runtime::McpToolsListResult::_meta': 0,
    'runtime::McpToolsListResult::tools': 0,
    'runtime::Identity$get_by_name$args::name': 0,
    'runtime::YearlyPeriodicity::dates': 0,
    'runtime::YearlyPeriodicity::timezone': 0,
    'runtime::McpServerCapabilities::experimental': 0,
    'runtime::McpServerCapabilities::logging': 0,
    'runtime::McpServerCapabilities::completions': 0,
    'runtime::McpServerCapabilities::prompts': 0,
    'runtime::McpServerCapabilities::resources': 0,
    'runtime::McpServerCapabilities::tools': 0,
    'runtime::McpServerCapabilities::tasks': 0,
    'runtime::McpToolsCallParams::_meta': 0,
    'runtime::McpToolsCallParams::name': 0,
    'runtime::McpToolsCallParams::arguments': 0,
    'runtime::McpToolsCallParams::task': 0,
    'runtime::McpResourcesListResult::_meta': 0,
    'runtime::McpResourcesListResult::resources': 0,
    'runtime::McpResourcesListResult::nextCursor': 0,
    'runtime::Scheduler$find$args::function': 0,
    'runtime::mcp_tasks_result$args::params': 0,
    'runtime::McpResourcesListParams::_meta': 0,
    'runtime::McpResourcesListParams::cursor': 0,
    'runtime::McpPromptsListParams::_meta': 0,
    'runtime::McpPromptsListParams::cursor': 0,
    'runtime::RuntimeUsage::os_total_bytes': 0,
    'runtime::RuntimeUsage::os_used_bytes': 0,
    'runtime::RuntimeUsage::proc_virt_bytes': 0,
    'runtime::RuntimeUsage::proc_res_bytes': 0,
    'runtime::RuntimeUsage::proc_shr_bytes': 0,
    'runtime::RuntimeUsage::global_memory': 0,
    'runtime::RuntimeUsage::memory_drift': 0,
    'runtime::RuntimeUsage::workers': 0,
    'runtime::RuntimeUsage::zones': 0,
    'runtime::mcp_resources_list$args::params': 0,
    'runtime::McpImplementation::name': 0,
    'runtime::McpImplementation::title': 0,
    'runtime::McpImplementation::version': 0,
    'runtime::Identity$set_grants$args::name': 0,
    'runtime::Identity$set_grants$args::grants': 0,
    'runtime::Scheduler$add$args::function': 0,
    'runtime::Scheduler$add$args::periodicity': 0,
    'runtime::Scheduler$add$args::options': 0,
    'runtime::McpResource::name': 0,
    'runtime::McpResource::title': 0,
    'runtime::McpResource::uri': 0,
    'runtime::McpResource::description': 0,
    'runtime::McpResource::mimeType': 0,
    'runtime::McpResource::size': 0,
    'runtime::McpTasksCancelParams::_meta': 0,
    'runtime::McpTasksCancelParams::taskId': 0,
    'runtime::Task$cancel$args::task_id': 0,
    'io::XmlReader::path': 0,
    'io::XmlReader::pos': 0,
    'io::Smtp::host': 0,
    'io::Smtp::port': 0,
    'io::Smtp::mode': 0,
    'io::Smtp::authenticate': 0,
    'io::Smtp::user': 0,
    'io::Smtp::pass': 0,
    'io::CsvColumnStatistics::name': 0,
    'io::CsvColumnStatistics::example': 0,
    'io::CsvColumnStatistics::null_count': 0,
    'io::CsvColumnStatistics::bool_count': 0,
    'io::CsvColumnStatistics::int_count': 0,
    'io::CsvColumnStatistics::float_count': 0,
    'io::CsvColumnStatistics::string_count': 0,
    'io::CsvColumnStatistics::date_count': 0,
    'io::CsvColumnStatistics::date_format_count': 0,
    'io::CsvColumnStatistics::enumerable_count': 0,
    'io::CsvColumnStatistics::profile': 0,
    'io::CsvWriter::path': 0,
    'io::CsvWriter::append': 0,
    'io::CsvWriter::format': 0,
    'io::CsvSharding::id': 0,
    'io::CsvSharding::column': 0,
    'io::CsvSharding::modulo': 0,
    'io::Email::from': 0,
    'io::Email::subject': 0,
    'io::Email::body': 0,
    'io::Email::body_is_html': 0,
    'io::Email::to': 0,
    'io::Email::cc': 0,
    'io::Email::bcc': 0,
    'io::Csv$sample$args::reader': 0,
    'io::Csv$sample$args::max_lines': 0,
    'io::S3Object::key': 0,
    'io::S3Object::last_modified': 0,
    'io::S3Object::size': 0,
    'io::S3Object::etag': 0,
    'io::BinReader::path': 0,
    'io::BinReader::pos': 0,
    'io::FileWalker::path': 0,
    'io::Csv$analyze$args::paths': 0,
    'io::Csv$analyze$args::config': 0,
    'io::TextWriter::path': 0,
    'io::TextWriter::append': 0,
    'io::CsvStatistics::header_lines': 0,
    'io::CsvStatistics::separator': 0,
    'io::CsvStatistics::string_delimiter': 0,
    'io::CsvStatistics::decimal_separator': 0,
    'io::CsvStatistics::thousands_separator': 0,
    'io::CsvStatistics::columns': 0,
    'io::CsvStatistics::line_count': 0,
    'io::CsvStatistics::fail_count': 0,
    'io::CsvStatistics::file_count': 0,
    'io::S3BasicCredentials::access_key': 0,
    'io::S3BasicCredentials::secret_key': 0,
    'io::GcbReader::path': 0,
    'io::GcbReader::pos': 0,
    'io::TextReader::path': 0,
    'io::TextReader::pos': 0,
    'io::S3Bucket::name': 0,
    'io::S3Bucket::creation_date': 0,
    'io::Csv$generate$args::stats': 0,
    'io::File::path': 0,
    'io::File::size': 0,
    'io::File::last_modification': 0,
    'io::S3::host': 0,
    'io::S3::region': 0,
    'io::S3::credentials': 0,
    'io::S3::force_path_style': 0,
    'io::JsonReader::path': 0,
    'io::JsonReader::pos': 0,
    'io::CsvAnalysisConfig::header_lines': 0,
    'io::CsvAnalysisConfig::separator': 0,
    'io::CsvAnalysisConfig::string_delimiter': 0,
    'io::CsvAnalysisConfig::decimal_separator': 0,
    'io::CsvAnalysisConfig::thousands_separator': 0,
    'io::CsvAnalysisConfig::row_limit': 0,
    'io::CsvAnalysisConfig::enumerable_limit': 0,
    'io::CsvAnalysisConfig::date_check_limit': 0,
    'io::CsvAnalysisConfig::date_formats': 0,
    'io::CsvReader::path': 0,
    'io::CsvReader::pos': 0,
    'io::CsvReader::format': 0,
    'io::CsvReader::sharding': 0,
    'io::CsvFormat::header_lines': 0,
    'io::CsvFormat::separator': 0,
    'io::CsvFormat::string_delimiter': 0,
    'io::CsvFormat::decimal_separator': 0,
    'io::CsvFormat::thousands_separator': 0,
    'io::CsvFormat::trim': 0,
    'io::CsvFormat::format': 0,
    'io::CsvFormat::tz': 0,
    'io::CsvFormat::strict': 0,
    'io::CsvFormat::null_in_quotes': 0,
    'io::CsvFormat::nested': 0,
    'io::CsvFormat::nearest_time': 0,
    'io::JsonWriter::path': 0,
    'io::JsonWriter::append': 0,
    'io::Url::protocol': 0,
    'io::Url::host': 0,
    'io::Url::port': 0,
    'io::Url::path': 0,
    'io::Url::user': 0,
    'io::Url::password': 0,
    'io::Url::params': 0,
    'io::Url::hash': 0,
    'io::GcbWriter::path': 0,
    'io::GcbWriter::append': 0,
    'util::LogQuantizer::min': 0,
    'util::LogQuantizer::max': 0,
    'util::LogQuantizer::bins': 0,
    'util::LogQuantizer::open': 0,
    'util::Queue::values': 0,
    'util::Queue::capacity': 0,
    'util::LinearQuantizer::min': 0,
    'util::LinearQuantizer::max': 0,
    'util::LinearQuantizer::bins': 0,
    'util::LinearQuantizer::open': 0,
    'util::CustomQuantizer::min': 0,
    'util::CustomQuantizer::max': 0,
    'util::CustomQuantizer::step_starts': 0,
    'util::CustomQuantizer::open': 0,
    'util::TimeWindow::values': 0,
    'util::TimeWindow::span': 0,
    'util::TimeWindow::sum': 0,
    'util::TimeWindow::sumsq': 0,
    'util::TimeWindow::field': 0,
    'util::Random::seed': 0,
    'util::Random::v': 0,
    'util::ProgressTracker::start': 0,
    'util::ProgressTracker::total': 0,
    'util::ProgressTracker::counter': 0,
    'util::ProgressTracker::duration': 0,
    'util::ProgressTracker::progress': 0,
    'util::ProgressTracker::speed': 0,
    'util::ProgressTracker::remaining': 0,
    'util::ProgressTracker::speed_smoothed': 0,
    'util::ProgressTracker::smoothing': 0,
    'util::GaussianProfileSlot::sum': 0,
    'util::GaussianProfileSlot::sumsq': 0,
    'util::GaussianProfileSlot::count': 0,
    'util::SlidingWindow::values': 0,
    'util::SlidingWindow::span': 0,
    'util::SlidingWindow::sum': 0,
    'util::SlidingWindow::sumsq': 0,
    'util::SlidingWindow::field': 0,
    'util::Stack::values': 0,
    'util::Histogram::quantizer': 0,
    'util::Histogram::bins': 0,
    'util::Histogram::nb_rejected': 0,
    'util::Histogram::nb_accepted': 0,
    'util::Histogram::min': 0,
    'util::Histogram::max': 0,
    'util::Histogram::sum': 0,
    'util::Histogram::sumsq': 0,
    'util::Gaussian::sum': 0,
    'util::Gaussian::sumsq': 0,
    'util::Gaussian::count': 0,
    'util::Gaussian::min': 0,
    'util::Gaussian::max': 0,
    'util::HistogramBin::bin': 0,
    'util::HistogramBin::count': 0,
    'util::HistogramBin::ratio': 0,
    'util::HistogramBin::cumulative_count': 0,
    'util::HistogramBin::cumulative_ratio': 0,
    'util::HistogramStats::min': 0,
    'util::HistogramStats::max': 0,
    'util::HistogramStats::whisker_low': 0,
    'util::HistogramStats::whisker_high': 0,
    'util::HistogramStats::percentile1': 0,
    'util::HistogramStats::percentile5': 0,
    'util::HistogramStats::percentile10': 0,
    'util::HistogramStats::percentile20': 0,
    'util::HistogramStats::percentile25': 0,
    'util::HistogramStats::percentile50': 0,
    'util::HistogramStats::percentile75': 0,
    'util::HistogramStats::percentile80': 0,
    'util::HistogramStats::percentile90': 0,
    'util::HistogramStats::percentile95': 0,
    'util::HistogramStats::percentile99': 0,
    'util::HistogramStats::sum': 0,
    'util::HistogramStats::avg': 0,
    'util::HistogramStats::std': 0,
    'util::HistogramStats::size': 0,
    'util::GaussianProfile::quantizer': 0,
    'util::GaussianProfile::precision': 0,
    'util::GaussianProfile::bins': 0,
    'util::GaussianProfile::value_min': 0,
    'util::GaussianProfile::nb_rejected': 0,
    'util::MultiQuantizer::quantizers': 0,
    'util::QuantizerSlotBound::min': 0,
    'util::QuantizerSlotBound::max': 0,
    'util::QuantizerSlotBound::center': 0,
    'tests::concat$args::a': 0,
    'tests::concat$args::b': 0,
    'tests::make_person$args::name': 0,
    'tests::make_person$args::age': 0,
    'tests::make_person$args::nickname': 0,
    'tests::sum_array$args::a': 0,
    'tests::echo_array$args::a': 0,
    'tests::Person::name': 0,
    'tests::Person::age': 0,
    'tests::Person::nickname': 0,
    'tests::add$args::a': 0,
    'tests::add$args::b': 0,
    'tests::Box::value': 0,
    'tests::echo_any$args::v': 0,
  }

  interface $FunctionsMap {
    'core::nodeGeo::search': 0,
    'core::nodeGeo::info': 0,
    'core::nodeGeo::sample': 0,
    'core::node::resolve_all': 0,
    'core::nodeTime::info': 0,
    'core::nodeTime::sample': 0,
    'core::nodeList::info': 0,
    'core::nodeList::sample': 0,
    'core::Table::applyMappings': 0,
    'core::nodeIndex::search_closest': 0,
    'core::nodeIndex::info': 0,
    'core::nodeIndex::sample': 0,
    'runtime::mcp_initialize': 0,
    'runtime::mcp_tools_list': 0,
    'runtime::mcp_tools_call': 0,
    'runtime::mcp_prompts_list': 0,
    'runtime::mcp_resources_list': 0,
    'runtime::mcp_tasks_get': 0,
    'runtime::mcp_tasks_result': 0,
    'runtime::mcp_tasks_list': 0,
    'runtime::mcp_tasks_cancel': 0,
    'runtime::Permission::all': 0,
    'runtime::Debug::resume': 0,
    'runtime::Debug::get': 0,
    'runtime::Debug::all': 0,
    'runtime::Scheduler::deactivate': 0,
    'runtime::Scheduler::activate': 0,
    'runtime::Scheduler::find': 0,
    'runtime::Scheduler::list': 0,
    'runtime::Scheduler::add': 0,
    'runtime::Task::tasks': 0,
    'runtime::Task::live': 0,
    'runtime::Task::is_running': 0,
    'runtime::Task::cancel': 0,
    'runtime::Task::history': 0,
    'runtime::Task::running': 0,
    'runtime::Identity::set_role': 0,
    'runtime::Identity::set_grants': 0,
    'runtime::Identity::set_password': 0,
    'runtime::Identity::permissions': 0,
    'runtime::Identity::logout': 0,
    'runtime::Identity::login': 0,
    'runtime::Identity::token': 0,
    'runtime::Identity::create': 0,
    'runtime::Identity::all': 0,
    'runtime::Identity::get_by_name': 0,
    'runtime::Identity::get_by_id': 0,
    'runtime::Identity::current': 0,
    'runtime::Identity::current_id': 0,
    'runtime::OpenApi::v3': 0,
    'runtime::Runtime::backup_full': 0,
    'runtime::Runtime::root': 0,
    'runtime::Runtime::abi': 0,
    'runtime::Runtime::usage': 0,
    'runtime::Runtime::info': 0,
    'runtime::Role::all': 0,
    'runtime::System::get_all_envs': 0,
    'io::Csv::sample': 0,
    'io::Csv::analyze': 0,
    'io::Csv::generate': 0,
    'tests::add': 0,
    'tests::concat': 0,
    'tests::echo_any': 0,
    'tests::echo_array': 0,
    'tests::make_person': 0,
    'tests::sum_array': 0,
    'tests::boom': 0,
    'tests::no_result': 0,
  }

  export import DurationUnit = gc.core.DurationUnit;
  export import nodeGeo = gc.core.nodeGeo;
  export import TensorDistance = gc.core.TensorDistance;
  export import geo = gc.core.geo;
  export import Chars = gc.core.Chars;
  export import ErrorCode = gc.core.ErrorCode;
  export import nodeTimeCursor = gc.core.nodeTimeCursor;
  export import Map = gc.core.Map;
  export import MathConstants = gc.core.MathConstants;
  export import float = gc.core.float;
  export import bool = gc.core.bool;
  export import String = gc.core.String;
  export import field = gc.core.field;
  export import Buffer = gc.core.Buffer;
  export import SortOrder = gc.core.SortOrder;
  export import Error = gc.core.Error;
  export import TableColumnMapping = gc.core.TableColumnMapping;
  export import type = gc.core.type;
  export import null_ = gc.core.null_;
  export import node = gc.core.node;
  export import Tuple = gc.core.Tuple;
  export import GeoPoly = gc.core.GeoPoly;
  export import TensorType = gc.core.TensorType;
  export import nodeTime = gc.core.nodeTime;
  export import SamplingMode = gc.core.SamplingMode;
  export import GeoCircle = gc.core.GeoCircle;
  export import nodeList = gc.core.nodeList;
  export import int = gc.core.int;
  export import Tensor = gc.core.Tensor;
  export import char = gc.core.char;
  export import FloatPrecision = gc.core.FloatPrecision;
  export import ErrorFrame = gc.core.ErrorFrame;
  export import Table = gc.core.Table;
  export import function_ = gc.core.function_;
  export import duration = gc.core.duration;
  export import GeoBox = gc.core.GeoBox;
  export import Array = gc.core.Array;
  export import CalendarUnit = gc.core.CalendarUnit;
  export import nodeIndex = gc.core.nodeIndex;
  export import SearchResult = gc.core.SearchResult;
  export import time = gc.core.time;
  export import Date = gc.core.Date;
  export import NodeInfo = gc.core.NodeInfo;
  export import TimeZone = gc.core.TimeZone;
  export import VectorIndex = gc.core.VectorIndex;
  export import McpContentType = gc.runtime.McpContentType;
  export import McpToolExecution = gc.runtime.McpToolExecution;
  export import Periodicity = gc.runtime.Periodicity;
  export import McpClientRoots = gc.runtime.McpClientRoots;
  export import IdentityGrantType = gc.runtime.IdentityGrantType;
  export import McpRequestParams = gc.runtime.McpRequestParams;
  export import McpTaskStatus = gc.runtime.McpTaskStatus;
  export import McpServerToolsCapabilities = gc.runtime.McpServerToolsCapabilities;
  export import McpClientTasksCapabilities = gc.runtime.McpClientTasksCapabilities;
  export import McpToolsListParams = gc.runtime.McpToolsListParams;
  export import McpPromptsListResult = gc.runtime.McpPromptsListResult;
  export import McpResourceContent = gc.runtime.McpResourceContent;
  export import McpTasksCreateResult = gc.runtime.McpTasksCreateResult;
  export import McpToolsCallResult = gc.runtime.McpToolsCallResult;
  export import McpAudioContent = gc.runtime.McpAudioContent;
  export import WeeklyPeriodicity = gc.runtime.WeeklyPeriodicity;
  export import McpTool = gc.runtime.McpTool;
  export import Job = gc.runtime.Job;
  export import McpImageContent = gc.runtime.McpImageContent;
  export import DailyPeriodicity = gc.runtime.DailyPeriodicity;
  export import Scheduler = gc.runtime.Scheduler;
  export import McpTextContent = gc.runtime.McpTextContent;
  export import Log = gc.runtime.Log;
  export import McpRole = gc.runtime.McpRole;
  export import McpContentBlock = gc.runtime.McpContentBlock;
  export import MergeStrategy = gc.runtime.MergeStrategy;
  export import McpInitializeResult = gc.runtime.McpInitializeResult;
  export import RuntimeInfo = gc.runtime.RuntimeInfo;
  export import ChildProcess = gc.runtime.ChildProcess;
  export import McpInitializeParams = gc.runtime.McpInitializeParams;
  export import PeriodicOptions = gc.runtime.PeriodicOptions;
  export import Task = gc.runtime.Task;
  export import Identity = gc.runtime.Identity;
  export import McpClientCapabilities = gc.runtime.McpClientCapabilities;
  export import McpServerResourcesCapabilities = gc.runtime.McpServerResourcesCapabilities;
  export import McpServerPromptsCapabilities = gc.runtime.McpServerPromptsCapabilities;
  export import McpPriority = gc.runtime.McpPriority;
  export import McpTasksGetParams = gc.runtime.McpTasksGetParams;
  export import McpPromptArgument = gc.runtime.McpPromptArgument;
  export import LicenseType = gc.runtime.LicenseType;
  export import McpTasksListParams = gc.runtime.McpTasksListParams;
  export import LogLevel = gc.runtime.LogLevel;
  export import McpTask = gc.runtime.McpTask;
  export import IdentityGrant = gc.runtime.IdentityGrant;
  export import License = gc.runtime.License;
  export import OpenApi = gc.runtime.OpenApi;
  export import FixedPeriodicity = gc.runtime.FixedPeriodicity;
  export import McpTaskSupport = gc.runtime.McpTaskSupport;
  export import McpTasksListResult = gc.runtime.McpTasksListResult;
  export import DateTuple = gc.runtime.DateTuple;
  export import McpServerTasksCapabilities = gc.runtime.McpServerTasksCapabilities;
  export import McpTaskCreateParams = gc.runtime.McpTaskCreateParams;
  export import MonthlyPeriodicity = gc.runtime.MonthlyPeriodicity;
  export import PeriodicTask = gc.runtime.PeriodicTask;
  export import LogDataUsage = gc.runtime.LogDataUsage;
  export import Month = gc.runtime.Month;
  export import McpResult = gc.runtime.McpResult;
  export import McpAnnotations = gc.runtime.McpAnnotations;
  export import McpPrompt = gc.runtime.McpPrompt;
  export import Runtime = gc.runtime.Runtime;
  export import McpTasksResultParams = gc.runtime.McpTasksResultParams;
  export import ChildProcessResult = gc.runtime.ChildProcessResult;
  export import McpToolsListResult = gc.runtime.McpToolsListResult;
  export import System = gc.runtime.System;
  export import DayOfWeek = gc.runtime.DayOfWeek;
  export import YearlyPeriodicity = gc.runtime.YearlyPeriodicity;
  export import McpServerCapabilities = gc.runtime.McpServerCapabilities;
  export import McpToolsCallParams = gc.runtime.McpToolsCallParams;
  export import McpResourcesListResult = gc.runtime.McpResourcesListResult;
  export import McpResourcesListParams = gc.runtime.McpResourcesListParams;
  export import McpPromptsListParams = gc.runtime.McpPromptsListParams;
  export import RuntimeUsage = gc.runtime.RuntimeUsage;
  export import McpImplementation = gc.runtime.McpImplementation;
  export import TaskStatus = gc.runtime.TaskStatus;
  export import McpBaseMetadata = gc.runtime.McpBaseMetadata;
  export import McpResource = gc.runtime.McpResource;
  export import McpTasksCancelParams = gc.runtime.McpTasksCancelParams;
  export import XmlReader = gc.io.XmlReader;
  export import SmtpMode = gc.io.SmtpMode;
  export import Smtp = gc.io.Smtp;
  export import Json = gc.io.Json;
  export import CsvColumnStatistics = gc.io.CsvColumnStatistics;
  export import CsvWriter = gc.io.CsvWriter;
  export import CsvSharding = gc.io.CsvSharding;
  export import Email = gc.io.Email;
  export import S3Object = gc.io.S3Object;
  export import BinReader = gc.io.BinReader;
  export import Reader = gc.io.Reader;
  export import FileWalker = gc.io.FileWalker;
  export import TextWriter = gc.io.TextWriter;
  export import CsvStatistics = gc.io.CsvStatistics;
  export import S3BasicCredentials = gc.io.S3BasicCredentials;
  export import GcbReader = gc.io.GcbReader;
  export import TextReader = gc.io.TextReader;
  export import S3Bucket = gc.io.S3Bucket;
  export import File = gc.io.File;
  export import S3 = gc.io.S3;
  export import JsonReader = gc.io.JsonReader;
  export import CsvNested = gc.io.CsvNested;
  export import CsvAnalysisConfig = gc.io.CsvAnalysisConfig;
  export import Writer = gc.io.Writer;
  export import CsvReader = gc.io.CsvReader;
  export import Csv = gc.io.Csv;
  export import SmtpAuth = gc.io.SmtpAuth;
  export import CsvFormat = gc.io.CsvFormat;
  export import JsonWriter = gc.io.JsonWriter;
  export import Url = gc.io.Url;
  export import GcbWriter = gc.io.GcbWriter;
  export import Uuid = gc.util.Uuid;
  export import LogQuantizer = gc.util.LogQuantizer;
  export import Queue = gc.util.Queue;
  export import LinearQuantizer = gc.util.LinearQuantizer;
  export import CustomQuantizer = gc.util.CustomQuantizer;
  export import TimeWindow = gc.util.TimeWindow;
  export import Random = gc.util.Random;
  export import ProgressTracker = gc.util.ProgressTracker;
  export import GaussianProfileSlot = gc.util.GaussianProfileSlot;
  export import SlidingWindow = gc.util.SlidingWindow;
  export import Stack = gc.util.Stack;
  export import Histogram = gc.util.Histogram;
  export import Gaussian = gc.util.Gaussian;
  export import HistogramBin = gc.util.HistogramBin;
  export import HistogramStats = gc.util.HistogramStats;
  export import Assert = gc.util.Assert;
  export import GaussianProfile = gc.util.GaussianProfile;
  export import MultiQuantizer = gc.util.MultiQuantizer;
  export import Crypto = gc.util.Crypto;
  export import QuantizerSlotBound = gc.util.QuantizerSlotBound;
  export import Quantizer = gc.util.Quantizer;
  export import Person = gc.tests.Person;
  export import Color = gc.tests.Color;
  export import Box = gc.tests.Box;
  export import mcp_initialize = gc.runtime.mcp_initialize;
  export import mcp_tools_list = gc.runtime.mcp_tools_list;
  export import mcp_tools_call = gc.runtime.mcp_tools_call;
  export import mcp_prompts_list = gc.runtime.mcp_prompts_list;
  export import mcp_resources_list = gc.runtime.mcp_resources_list;
  export import mcp_tasks_get = gc.runtime.mcp_tasks_get;
  export import mcp_tasks_result = gc.runtime.mcp_tasks_result;
  export import mcp_tasks_list = gc.runtime.mcp_tasks_list;
  export import mcp_tasks_cancel = gc.runtime.mcp_tasks_cancel;
  export import add = gc.tests.add;
  export import concat = gc.tests.concat;
  export import echo_any = gc.tests.echo_any;
  export import echo_array = gc.tests.echo_array;
  export import make_person = gc.tests.make_person;
  export import sum_array = gc.tests.sum_array;
  export import boom = gc.tests.boom;
  export import no_result = gc.tests.no_result;
}
