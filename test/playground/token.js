import '@greycat/web/sdk';

const greycat = await gc.sdk.init({ auth: { username: 'root', password: 'oyovvikwmnbvzzrr' } });
console.log('token', greycat.token);
const res = await gc.project.protected();
console.log(res);
