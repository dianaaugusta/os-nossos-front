// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: '', // <-- Enter your own key here!'
  baseUrl: ' http://127.0.0.1:8000/tasks',
  images: 'http://image.tmdb.org/t/p',
};

export const options = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' // Definindo o cabeçalho CORS
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
