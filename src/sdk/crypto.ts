namespace gc {
  export namespace sdk {
    /**
     * Generates SHA-256 hash of a string as a hex character string.
     *
     * @param data - The string to be hashed.
     * @param utf8encode - Whether to encode data as UTF-8 before hashing (defaults to `true`).
     * @returns The hash of the data as a hexadecimal string.
     */
    export function sha256hex(data: string, utf8encode: boolean = true): string {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c: { [key: string]: any } = {};

      c.hash = function (a: string, f: boolean): string {
        if (f === undefined || f) {
          a = t(a);
        }

        const h = [
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
        ];

        const b = [
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
          1541459225,
        ];

        a += String.fromCharCode(128);

        const i = Math.ceil((a.length / 4 + 2) / 16);
        const j: number[][] = Array.from({ length: i }, () => Array(16).fill(0));

        for (let g = 0; g < i; g++) {
          for (let e = 0; e < 16; e++) {
            j[g][e] =
              (a.charCodeAt(64 * g + 4 * e) << 24) |
              (a.charCodeAt(64 * g + 4 * e + 1) << 16) |
              (a.charCodeAt(64 * g + 4 * e + 2) << 8) |
              a.charCodeAt(64 * g + 4 * e + 3);
          }
        }

        j[i - 1][14] = Math.floor((8 * (a.length - 1)) / Math.pow(2, 32));
        j[i - 1][15] = (8 * (a.length - 1)) & 4294967295;

        const e: number[] = Array(64);
        for (let g = 0; g < i; g++) {
          for (let d = 0; d < 16; d++) e[d] = j[g][d];
          for (let d = 16; d < 64; d++) {
            e[d] = (c.h(e[d - 2]) + e[d - 7] + c.g(e[d - 15]) + e[d - 16]) & 4294967295;
          }

          let [k, m, n, q, l, o, p, r] = b;

          for (let d = 0; d < 64; d++) {
            const s = r + c.f(l) + c.c(l, o, p) + h[d] + e[d];
            const u = c.e(k) + c.d(k, m, n);
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
          c.b(b[0]) +
          c.b(b[1]) +
          c.b(b[2]) +
          c.b(b[3]) +
          c.b(b[4]) +
          c.b(b[5]) +
          c.b(b[6]) +
          c.b(b[7])
        );
      };

      c.a = (a: number, f: number): number => (f >>> a) | (f << (32 - a));
      c.e = (a: number): number => c.a(2, a) ^ c.a(13, a) ^ c.a(22, a);
      c.f = (a: number): number => c.a(6, a) ^ c.a(11, a) ^ c.a(25, a);
      c.g = (a: number): number => c.a(7, a) ^ c.a(18, a) ^ (a >>> 3);
      c.h = (a: number): number => c.a(17, a) ^ c.a(19, a) ^ (a >>> 10);
      c.c = (a: number, f: number, h: number): number => (a & f) ^ (~a & h);
      c.d = (a: number, f: number, h: number): number => (a & f) ^ (a & h) ^ (f & h);
      c.b = (a: number): string => {
        let f = '';
        for (let b = 7; b >= 0; b--) {
          const h = (a >>> (4 * b)) & 15;
          f += h.toString(16);
        }
        return f;
      };

      function t(a: string): string {
        a = a.replace(/[\u0080-\u07ff]/g, (a) => {
          const c = a.charCodeAt(0);
          return String.fromCharCode(192 | (c >> 6), 128 | (c & 63));
        });

        return a.replace(/[\u0800-\uffff]/g, (a) => {
          const c = a.charCodeAt(0);
          return String.fromCharCode(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
        });
      }

      return c.hash(data, utf8encode);
    }
  }
}
