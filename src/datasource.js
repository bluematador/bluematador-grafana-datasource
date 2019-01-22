import moment from 'moment';
import './css/main.css!';

export class BlueMatadorDatasource {
  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.url = 'http://localhost:9000/'; // 'https://app.bluematador.com/';
    this.accountId = instanceSettings.jsonData.accountId;
    this.apikey = instanceSettings.jsonData.apikey;

    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = {'Content-Type': 'application/json'};
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  query(options) {}
  metricFindQuery(query) {}

  testDatasource() {
    return this.doRequest({
      url: `${this.url}ma/accounts/${this.accountId}/grafana/test`,
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        return { status: 'success', message: 'Data source is working', title: 'Success' };
      }
    }).catch(err => ({
      status: 'error',
      message: 'Unable to connect to data source',
      title: 'Error',
    }));
  }

  annotationQuery(options) {
    if (this.lastQuery && this.lastQuery.clone().add(1, 'minutes').isAfter(moment())) {
      return this.lastAnnotations;
    }
    this.lastQuery = moment();

    const start = options.range.from.toISOString();
    const end = options.range.to.toISOString();
    return this.doRequest({
      url: `${this.url}ma/accounts/${this.accountId}/grafana/${options.annotation.query}?start=${start}&end=${end}&limit=${options.annotation.limit}`,
      method: 'GET',
    }).then(result => {
      const annotations = result.data.map(event => {
        const source = `<em>${event.sourceType}: ${event.sourceName}</em>`;
        const details = event.details.length > 0 ?
          `<ul class="bm-list">${event.details.map(d => `<li>${d}</li>`).join('')}</ul>` :
          '';
        const closed = event.closed ? `Closed: ${(new Date(event.closed)).toLocaleString()}` : '';
        const link = `<a href="${event.link}" target="_blank">Open in Blue Matador</a>`;

        return {
          annotation: {
            name: options.annotation.name,
            enabled: options.annotation.enable,
            datasource: options.annotation.datasource,
          },
          title: event.title,
          time: event.time,
          text: `${source}<br />${closed}<br />${event.summary}${details && ':'}<br />${details}<br />${link}`,
          tags: event.tags,
        };
      });

      this.lastAnnotations = annotations;
      return annotations;
    });
  }

  doRequest(options) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;
    if (this.authToken) {
      options.headers['Rocks-Auth'] = this.authToken;
      return this.backendSrv.datasourceRequest(options).catch(result => {
        if (result.status == 401 || result.status == 403) {
          this.authToken = null;
          return this.doRequest(options);
        }
      });
    } else {
      return this.backendSrv.datasourceRequest({
        url: `${this.url}zi/auth/api`,
        data: {
          accountId: this.accountId,
          apiKey: this.apikey,
        },
        method: 'POST',
      }).then(result => {
        if (result.status == 200) {
          this.authToken = result.data;
          return this.doRequest(options);
        }
      });
    }
  }

}
