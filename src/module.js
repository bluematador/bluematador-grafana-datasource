import {BlueMatadorConfigCtrl} from './config_ctrl';
import {BlueMatadorDatasource} from './datasource';
import {QueryCtrl} from 'app/plugins/sdk';

class GenericQueryOptionsCtrl {}
GenericQueryOptionsCtrl.templateUrl = '';

class GenericAnnotationsQueryCtrl {}
GenericAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

class GenericDatasourceQueryCtrl extends QueryCtrl {}
GenericDatasourceQueryCtrl.templateUrl = '';

export {
  BlueMatadorDatasource as Datasource,
  GenericDatasourceQueryCtrl as QueryCtrl,
  BlueMatadorConfigCtrl as ConfigCtrl,
  GenericQueryOptionsCtrl as QueryOptionsCtrl,
  GenericAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
