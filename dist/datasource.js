'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlueMatadorDatasource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./css/main.css!');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlueMatadorDatasource = exports.BlueMatadorDatasource = function () {
  function BlueMatadorDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, BlueMatadorDatasource);

    this.url = 'http://localhost:9000/'; // 'https://app.bluematador.com/';
    this.accountId = instanceSettings.jsonData.accountId;
    this.apikey = instanceSettings.jsonData.apikey;

    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = { 'Content-Type': 'application/json' };
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  _createClass(BlueMatadorDatasource, [{
    key: 'query',
    value: function query(options) {}
  }, {
    key: 'metricFindQuery',
    value: function metricFindQuery(query) {}
  }, {
    key: 'testDatasource',
    value: function testDatasource() {
      return this.doRequest({
        url: this.url + 'ma/accounts/' + this.accountId + '/grafana/test',
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          return { status: 'success', message: 'Data source is working', title: 'Success' };
        }
      }).catch(function (err) {
        return {
          status: 'error',
          message: 'Unable to connect to data source',
          title: 'Error'
        };
      });
    }
  }, {
    key: 'annotationQuery',
    value: function annotationQuery(options) {
      var _this = this;

      if (this.lastQuery && this.lastQuery.clone().add(1, 'minutes').isAfter((0, _moment2.default)())) {
        return this.lastAnnotations;
      }
      this.lastQuery = (0, _moment2.default)();

      var start = options.range.from.toISOString();
      var end = options.range.to.toISOString();
      return this.doRequest({
        url: this.url + 'ma/accounts/' + this.accountId + '/grafana/' + options.annotation.query + '?start=' + start + '&end=' + end + '&limit=' + options.annotation.limit,
        method: 'GET'
      }).then(function (result) {
        var annotations = result.data.map(function (event) {
          var source = '<em>' + event.sourceType + ': ' + event.sourceName + '</em>';
          var details = event.details.length > 0 ? '<ul class="bm-list">' + event.details.map(function (d) {
            return '<li>' + d + '</li>';
          }).join('') + '</ul>' : '';
          var closed = event.closed ? 'Closed: ' + new Date(event.closed).toLocaleString() : '';
          var link = '<a href="' + event.link + '" target="_blank">Open in Blue Matador</a>';

          return {
            annotation: {
              name: options.annotation.name,
              enabled: options.annotation.enable,
              datasource: options.annotation.datasource
            },
            title: event.title,
            time: event.time,
            text: source + '<br />' + closed + '<br />' + event.summary + (details && ':') + '<br />' + details + '<br />' + link,
            tags: event.tags
          };
        });

        _this.lastAnnotations = annotations;
        return annotations;
      });
    }
  }, {
    key: 'doRequest',
    value: function doRequest(options) {
      var _this2 = this;

      options.withCredentials = this.withCredentials;
      options.headers = this.headers;
      if (this.authToken) {
        options.headers['Rocks-Auth'] = this.authToken;
        return this.backendSrv.datasourceRequest(options).catch(function (result) {
          if (result.status == 401 || result.status == 403) {
            _this2.authToken = null;
            return _this2.doRequest(options);
          }
        });
      } else {
        return this.backendSrv.datasourceRequest({
          url: this.url + 'zi/auth/api',
          data: {
            accountId: this.accountId,
            apiKey: this.apikey
          },
          method: 'POST'
        }).then(function (result) {
          if (result.status == 200) {
            _this2.authToken = result.data;
            return _this2.doRequest(options);
          }
        });
      }
    }
  }]);

  return BlueMatadorDatasource;
}();
//# sourceMappingURL=datasource.js.map
