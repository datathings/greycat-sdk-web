import '@greycat/web/sdk';

await gc.sdk.init();

// const format = new gc.io.CsvFormat(1, ';', null, null, null, null, [
//   gc.io.CsvColumnString.createFrom({
//     name: 'Id',
//     mandatory: true,
//     offset: 0,
//     trim: true,
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Commune',
//     mandatory: true,
//     offset: 1,
//     trim: true,
//     values: ['Le Rheu'],
//   }),
//   gc.io.CsvColumnInteger.createFrom({
//     name: 'Code INSEE',
//     mandatory: true,
//     offset: 2,
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'ID Capteur',
//     mandatory: true,
//     offset: 3,
//     trim: true,
//     values: [
//       '0018B2000001034B',
//       '0018B200000015BA',
//       '0018B200000015C1',
//       '0018B200000015D8',
//       '70B3D5E75E003106',
//       '70B3D5E75E002F9D',
//     ],
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Nom Capteur',
//     mandatory: true,
//     offset: 4,
//     trim: true,
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Site',
//     mandatory: true,
//     offset: 5,
//     trim: true,
//   }),
//   gc.io.CsvColumnDate.createFrom({
//     name: 'Horodatage',
//     mandatory: true,
//     offset: 6,
//     format: '%Y-%m-%dT%H:%M:%S%z',
//     as_time: true,
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Nature',
//     mandatory: true,
//     offset: 7,
//     trim: true,
//     values: ['Valeur', 'Différentiel'],
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Catégorie',
//     mandatory: true,
//     offset: 8,
//     trim: true,
//     values: ['Energie'],
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Type de donnée',
//     mandatory: true,
//     offset: 9,
//     trim: true,
//     values: ['Gaz', 'Injection Electricité', 'Electricité'],
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Sous-type',
//     mandatory: true,
//     offset: 10,
//     trim: true,
//   }),
//   gc.io.CsvColumnFloat.createFrom({
//     name: 'Valeur',
//     mandatory: true,
//     offset: 11,
//   }),
//   gc.io.CsvColumnString.createFrom({
//     name: 'Unité',
//     mandatory: true,
//     offset: 12,
//   }),
// ]);

const cols = await gc.get_columns();
console.log(cols.map((c) => c.toJSON()));
const res = await gc.columns(cols);
console.log(res);
// const res = await gc.io.CsvFormat.sample(`files/OED-AutreLieu-2018.csv`, format, 0, 1024 * 500);
// console.log(res.nbRows());
