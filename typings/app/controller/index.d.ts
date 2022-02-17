// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportApi from '../../../app/controller/api';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    api: ExportApi;
    home: ExportHome;
  }
}
