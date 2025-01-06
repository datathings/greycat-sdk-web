import type { AbiType, AbiReader, AbiWriter, GreyCat, std } from '../../exports.js';
import { GCObject, PrimitiveType, utils, $ } from '../../exports.js';

export class geo extends GCObject {
  static readonly _type = 'core::geo' as const;

  constructor(type: AbiType, public value: bigint = 0n) {
    super(type);
  }

  static create(value: bigint, g: GreyCat = $.default): std.core.geo {
    const ty = g.abi.types[g.abi.core.geo];
    return new ty.factory(ty, value) as std.core.geo;
  }

  static fromLatLng(lat: number, lng: number): std.core.geo {
    return geo.create(geoEncode(lat, lng));
  }

  /**
   * Morton encode's a `lat`, `lng` tuple into a `bigint` which is a valid GreyCat `geo` value
   */
  static encode(lat: number, lng: number): bigint {
    return geoEncode(lat, lng);
  }

  /**
   * Morton decode's a valid GreyCat `geo` value (`bigint`) into a `lat`, `lng` tuple
   */
  static decode(value: bigint): readonly [number, number] {
    return geoDecode(value);
  }

  static load(r: AbiReader, ty: AbiType): std.core.geo {
    const value = r.read_u64();
    return new ty.factory(ty, value) as std.core.geo;
  }

  get lat(): number {
    const [lat] = geoDecode(this.value);
    return lat;
  }

  get lng(): number {
    const [, lng] = geoDecode(this.value);
    return lng;
  }

  get latlng(): readonly [number, number] {
    return geoDecode(this.value);
  }

  override saveHeader(w: AbiWriter): void {
    w.write_u8(PrimitiveType.geo);
  }

  override saveContent(w: AbiWriter) {
    w.write_u64(this.value);
  }

  equals(other: std.core.geo): boolean {
    return this.value === other.value;
  }

  override toString() {
    const [lat, lng] = this.latlng;
    return `${lat},${lng}`;
  }

  override toJSON() {
    const [lat, lng] = geoDecode(this.value);
    return {
      _type: this.$type.name,
      lat,
      lng,
    };
  }
}

const LAT_MIN = -85.05112878;
const LAT_MAX = 85.05112878;
const LAT_EPS = 0.00000001;
const LNG_MIN = -180;
const LNG_MAX = 180;
const STEP_MAX = 32n;

/**
 * Encodes `lat`, `lng` to a `bigint` using Morton z-curve.
 */
export function geoEncode(lat: number, lng: number) {
  if (lat < LAT_MIN) {
    lat = LAT_MIN;
  }
  if (lat >= LAT_MAX) {
    lat = LAT_MAX - LAT_EPS;
  }
  if (lng < LNG_MIN) {
    lng = LNG_MIN;
  }
  if (lng >= LNG_MAX) {
    lng = LNG_MAX - LAT_EPS;
  }

  // Math.fround(): f64 => f32

  let lat_offset: number /*f64*/ = (lat - LAT_MIN) / (LAT_MAX - LAT_MIN);
  let lng_offset: number /*f64*/ = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN);
  // TODO convert f64 => f32
  // lat_offset = Math.fround(lat_offset)
  // lng_offset = Math.fround(lng_offset)
  lat_offset *= Number(1n << STEP_MAX);
  lng_offset *= Number(1n << STEP_MAX);

  const ilato: number /*u32*/ = /*cast f64 to u32*/ Math.floor(lat_offset);
  const ilono: number /*u32*/ = /*cast f64 to u32*/ Math.floor(lng_offset);

  return utils.interleave64_2d(ilato, ilono);
}

/**
 * Decodes a `bigint` to a `lat`, `lng` using Morton z-curve.
 */
export function geoDecode(geo: bigint): readonly [number, number] {
  const [ilato, ilono] = utils.deinterleave64_2d(geo);

  const lat = LAT_MIN + ((ilato + 0.5) / Number(1n << STEP_MAX)) * (LAT_MAX - LAT_MIN);
  const lng = LNG_MIN + ((ilono + 0.5) / Number(1n << STEP_MAX)) * (LNG_MAX - LNG_MIN);

  return [lat, lng] as const;
}
