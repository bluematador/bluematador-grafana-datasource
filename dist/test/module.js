'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsQueryCtrl = exports.QueryOptionsCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _config_ctrl = require('./config_ctrl');

var _datasource = require('./datasource');

var _sdk = require('app/plugins/sdk');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericQueryOptionsCtrl = function GenericQueryOptionsCtrl() {
  _classCallCheck(this, GenericQueryOptionsCtrl);
};

GenericQueryOptionsCtrl.templateUrl = '';

var GenericAnnotationsQueryCtrl = function GenericAnnotationsQueryCtrl() {
  _classCallCheck(this, GenericAnnotationsQueryCtrl);
};

GenericAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

var GenericDatasourceQueryCtrl = function (_QueryCtrl) {
  _inherits(GenericDatasourceQueryCtrl, _QueryCtrl);

  function GenericDatasourceQueryCtrl() {
    _classCallCheck(this, GenericDatasourceQueryCtrl);

    return _possibleConstructorReturn(this, (GenericDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(GenericDatasourceQueryCtrl)).apply(this, arguments));
  }

  return GenericDatasourceQueryCtrl;
}(_sdk.QueryCtrl);

GenericDatasourceQueryCtrl.templateUrl = '';

exports.Datasource = _datasource.BlueMatadorDatasource;
exports.QueryCtrl = GenericDatasourceQueryCtrl;
exports.ConfigCtrl = _config_ctrl.BlueMatadorConfigCtrl;
exports.QueryOptionsCtrl = GenericQueryOptionsCtrl;
exports.AnnotationsQueryCtrl = GenericAnnotationsQueryCtrl;
//# sourceMappingURL=module.js.map
