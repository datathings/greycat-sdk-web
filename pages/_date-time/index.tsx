// import { GreyCat, core, runtime } from '../../src';
// import '../layout';

// import './datetime-input';

// const app = document.createElement('app-layout');
// app.title = 'Date Time';
// await app.init();
// document.body.appendChild(app);

// const gc1 = await GreyCat.init();
// const gc2 = await GreyCat.init();

// console.log({
//   false_expected: runtime.TaskStatus.error(gc1) === runtime.TaskStatus.error(gc2),
// });

// const fmtIso = (d: Date) => {
//   let iso = '';
//   iso += d.getFullYear();
//   iso += '-';
//   iso += (d.getMonth() + 1).toString().padStart(2, '0');
//   iso += '-';
//   iso += d.getDate().toString().padStart(2, '0');
//   iso += 'T';
//   iso += d.getHours().toString().padStart(2, '0');
//   iso += ':';
//   iso += d.getMinutes().toString().padStart(2, '0');
//   iso += ':';
//   iso += d.getSeconds().toString().padStart(2, '0');
//   return iso;
// };

// let datetime = fmtIso(new Date());
// let tz = core.TimeZone.Europe_Paris();

// const text = document.createTextNode('');
// const update = () => {
//   console.log('update', { datetime, tz: tz.key });
//   text.textContent = `${datetime} @ ${tz.key}`;
// };

// update();

// app.main.appendChild(
//   <div>
//     <div>
//       <fieldset role="group">
//         <input
//           type="datetime-local"
//           step="1"
//           defaultValue={datetime}
//           oninput={(ev) => {
//             const input = ev.target as HTMLInputElement;
//             datetime = input.value;
//             update();
//           }}
//         />
//         <gui-searchable-select
//           placeholder="Timezone"
//           options={core.TimeZone.$fields().map((en) => ({
//             text: en.key,
//             value: en,
//             selected: en === tz,
//           }))}
//           onsearchable-select-change={(ev) => {
//             tz = ev.detail as core.TimeZone;
//             update();
//           }}
//         />
//       </fieldset>
//       {text}
//     </div>
//     <div>
//       <fieldset role="group">
//         <label>Datetime</label>
//         <gui-datetime-input value={new Date()} />
//       </fieldset>
//       <gui-datetime-input />
//     </div>
//   </div>,
// );
