/**
 * Génère les icônes PNG PWA LUXE&CO — pur Node.js, sans dépendances
 */
const zlib = require("zlib");
const fs   = require("fs");
const path = require("path");

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const OUT   = path.join(__dirname, "icons");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

// Couleurs (RGBA)
const BG   = [13,  13,  13,  255]; // #0d0d0d
const GOLD = [201, 169, 110, 255]; // #c9a96e

function makePNG(size) {
  // Dessine pixel par pixel : fond noir + bordure or (10%) + intérieur noir
  const border = Math.round(size * 0.10);
  const inner  = Math.round(size * 0.14);

  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = [0]; // filtre None
    for (let x = 0; x < size; x++) {
      const inBorder = x >= border && x < size - border && y >= border && y < size - border;
      const inInner  = x >= border + inner && x < size - border - inner &&
                       y >= border + inner && y < size - border - inner;
      const px = (!inBorder) ? BG : inInner ? BG : GOLD;
      row.push(...px);
    }
    rows.push(Buffer.from(row));
  }
  const raw = Buffer.concat(rows);

  // Compresse avec zlib (DEFLATE)
  const compressed = zlib.deflateSync(raw, { level: 9 });

  // Helpers PNG
  function u32(n) { const b = Buffer.alloc(4); b.writeUInt32BE(n); return b; }
  function chunk(type, data) {
    const t   = Buffer.from(type);
    const len = u32(data.length);
    const crc = crc32(Buffer.concat([t, data]));
    return Buffer.concat([len, t, data, u32(crc)]);
  }
  function crc32(buf) {
    let c = 0xFFFFFFFF;
    for (const b of buf) {
      c ^= b;
      for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (c & 1 ? 0xEDB88320 : 0);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  const sig  = Buffer.from([137,80,78,71,13,10,26,10]);
  const IHDR = chunk("IHDR", Buffer.concat([u32(size), u32(size),
    Buffer.from([8, 2, 0, 0, 0])])); // 8-bit RGB... wait need RGBA
  // Use color type 6 = RGBA
  const ihdrData = Buffer.concat([u32(size), u32(size), Buffer.from([8, 6, 0, 0, 0])]);
  const IHDR2 = chunk("IHDR", ihdrData);
  const IDAT = chunk("IDAT", compressed);
  const IEND = chunk("IEND", Buffer.alloc(0));

  return Buffer.concat([sig, IHDR2, IDAT, IEND]);
}

SIZES.forEach(s => {
  const buf  = makePNG(s);
  const file = path.join(OUT, `icon-${s}.png`);
  fs.writeFileSync(file, buf);
  console.log(`✓ icon-${s}.png`);
});
console.log("\nIcones générées dans /icons/");
