/* eslint-disable */

/**
 * This function basically does: `hex(sha256(data))`
 *
 * Generates SHA-256 hash of string
 *
 * @param {string} data               string to be hashed
 * @param {boolean|undefined} utf8encode encode data as UTF-8 before generating hash (defaults to `true`)
 * @returns {string}                  hash of data as hex character string
 */
export function sha256hex(data, utf8encode = true) {
  const c = {};
  c.hash = function (a, f) {
    ('undefined' == typeof f || f) && (a = t(a));
    for (
      var h = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
          2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
          2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
          1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372,
          1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
          3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734,
          506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
          3329325298,
        ],
        b = [
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
          1541459225,
        ],
        a = a + String.fromCharCode(128),
        i = Math.ceil((a.length / 4 + 2) / 16),
        j = Array(i),
        g = 0;
      g < i;
      g++
    ) {
      j[g] = Array(16);
      for (var e = 0; 16 > e; e++)
        j[g][e] =
          (a.charCodeAt(64 * g + 4 * e) << 24) |
          (a.charCodeAt(64 * g + 4 * e + 1) << 16) |
          (a.charCodeAt(64 * g + 4 * e + 2) << 8) |
          a.charCodeAt(64 * g + 4 * e + 3);
    }
    j[i - 1][14] = (8 * (a.length - 1)) / Math.pow(2, 32);
    j[i - 1][14] = Math.floor(j[i - 1][14]);
    j[i - 1][15] = (8 * (a.length - 1)) & 4294967295;
    for (var e = Array(64), k, m, n, q, l, o, p, r, g = 0; g < i; g++) {
      for (var d = 0; 16 > d; d++) e[d] = j[g][d];
      for (d = 16; 64 > d; d++)
        e[d] = (c.h(e[d - 2]) + e[d - 7] + c.g(e[d - 15]) + e[d - 16]) & 4294967295;
      k = b[0];
      m = b[1];
      n = b[2];
      q = b[3];
      l = b[4];
      o = b[5];
      p = b[6];
      r = b[7];
      for (d = 0; 64 > d; d++) {
        var s = r + c.f(l) + c.c(l, o, p) + h[d] + e[d],
          u = c.e(k) + c.d(k, m, n);
        r = p;
        p = o;
        o = l;
        l = (q + s) & 4294967295;
        q = n;
        n = m;
        m = k;
        k = (s + u) & 4294967295;
      }
      b[0] = (b[0] + k) & 4294967295;
      b[1] = (b[1] + m) & 4294967295;
      b[2] = (b[2] + n) & 4294967295;
      b[3] = (b[3] + q) & 4294967295;
      b[4] = (b[4] + l) & 4294967295;
      b[5] = (b[5] + o) & 4294967295;
      b[6] = (b[6] + p) & 4294967295;
      b[7] = (b[7] + r) & 4294967295;
    }
    return (
      c.b(b[0]) + c.b(b[1]) + c.b(b[2]) + c.b(b[3]) + c.b(b[4]) + c.b(b[5]) + c.b(b[6]) + c.b(b[7])
    );
  };
  c.a = function (a, f) {
    return (f >>> a) | (f << (32 - a));
  };
  c.e = function (a) {
    return c.a(2, a) ^ c.a(13, a) ^ c.a(22, a);
  };
  c.f = function (a) {
    return c.a(6, a) ^ c.a(11, a) ^ c.a(25, a);
  };
  c.g = function (a) {
    return c.a(7, a) ^ c.a(18, a) ^ (a >>> 3);
  };
  c.h = function (a) {
    return c.a(17, a) ^ c.a(19, a) ^ (a >>> 10);
  };
  c.c = function (a, f, h) {
    return (a & f) ^ (~a & h);
  };
  c.d = function (a, f, h) {
    return (a & f) ^ (a & h) ^ (f & h);
  };
  c.b = function (a) {
    for (var f = '', h, b = 7; 0 <= b; b--) (h = (a >>> (4 * b)) & 15), (f += h.toString(16));
    return f;
  };
  function t(a) {
    a = a.replace(/[\u0080-\u07ff]/g, function (a) {
      a = a.charCodeAt(0);
      return String.fromCharCode(192 | (a >> 6), 128 | (a & 63));
    });
    return (a = a.replace(/[\u0800-\uffff]/g, function (a) {
      a = a.charCodeAt(0);
      return String.fromCharCode(224 | (a >> 12), 128 | ((a >> 6) & 63), 128 | (a & 63));
    }));
  }
  return c.hash(data, utf8encode);
}
