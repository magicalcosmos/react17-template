import axios from 'axios';
import qs from 'qs';
import Log from '~@/utils/log';
import localStorage from '~@/utils/localStorage';
import { LOGIN } from '~@/utils/dict';
import Errors from '~@/utils/errors';
/* import { ERROR } from '~@/utils/errors';
import { CommonPath } from '~@/routes/paths'; */
import Common from '~@/utils/common';

import { IAjaxParams } from '~@/interface';
class Ajax {
  private config = Common.getEnv();
  /**
   * Get config
   */
  async getConfig() {
    return new Promise((resolve, reject) => {
      const protocol = window.location.protocol;
      const host = window.location.host;
      if (this.config.API_ENDPOINT && this.config.WS_ENDPOINT) {
        resolve({
          API_ENDPOINT: this.config.API_ENDPOINT,
          WS_ENDPOINT: this.config.WS_ENDPOINT
        });
      } else {
        const URL = `${protocol}//${host}/config.json`;
        axios
          .get(URL)
          .then((data) => {
            let newEnv: any = {};
            const configData = data.data;
            if (configData.enable) {
              newEnv = {
                API_ENDPOINT: configData.API_ENDPOINT,
                WS_ENDPOINT: configData.WS_ENDPOINT
              };
            } else {
              if (this.config) {
                newEnv = {
                  // for develop
                  API_ENDPOINT: this.config.API_ENDPOINT,
                  WS_ENDPOINT: this.config.WS_ENDPOINT
                };
              }
              if (!newEnv.API_ENDPOINT) {
                // in case
                // const lastHost = host.split(':')[0];
                newEnv = {
                  API_ENDPOINT: `${protocol}//${host}/elephant/api/v1/gql/query`,
                  WS_ENDPOINT: `ws://${host}/elephant/api/v1/ws`
                };
              }
            }
            resolve(newEnv);
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    });
  }

  /**
   * restful style common request
   * @param type
   * @param ajaxParams
   * @param isQueryString
   * @param isFormData
   */
  restfulCommon(
    type: string,
    ajaxParams: IAjaxParams,
    isQueryString?: boolean,
    isFormData = false,
    responseType = 'json'
  ) {
    return axios
      .all([localStorage.getTokenSync(), this.getConfig()])
      .then(
        axios.spread(function(AUTH_TOKEN, config) {
          if (AUTH_TOKEN) {
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + AUTH_TOKEN;
          }
          axios.defaults.responseType = responseType;
          axios.defaults.headers[type]['Content-Type'] = !isFormData
            ? 'application/x-www-form-urlencoded'
            : 'multipart/form-data';

          //================== interceptors request   ====================
          axios.interceptors.request.use(
            (config) => {
              //==========  all config before request  ==============
              return config;
            },
            (err) => {
              //==================  error handle  ====================
              return Promise.resolve(err);
            }
          );
          let axiosURL =
            typeof config.API_ENDPOINT === 'function'
              ? config.API_ENDPOINT(window)
              : ajaxParams.url;
          let axiosParams = ajaxParams.params || {};
          if (isQueryString && Object.keys(ajaxParams.params).length) {
            // request parameters concat to url for put, delete
            axiosURL +=
              (axiosURL.indexOf('?') < 0 ? '?' : '&') +
              qs.stringify(Object.assign(ajaxParams.params));
            axiosParams = {};
          }
          const result = axios[type](axiosURL, axiosParams);
          result.catch((error: Error) => {
            if (
              error &&
              error.response &&
              error.response.status === 401 &&
              ajaxParams.url.indexOf('access-token.json') < 0
            ) {
              localStorage.remove(LOGIN.TOKEN);
              window.location.reload();
            }
            return error;
          });
          return !ajaxParams.callback
            ? result
            : result
              .then((data: any) => {
                ajaxParams.callback('', data);
              })
              .catch((error: Error) => {
                ajaxParams.callback(error);
              });
        })
      )
      .catch((err: Error) => {
        return ajaxParams.callback
          ? ajaxParams.callback(err)
          : new Promise((resolve, reject) => {
            reject(err);
          });
      });
  }

  /**
   * query
   * @param ajaxParams
   * @param isQueryString
   */
  get(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('get', ajaxParams, isQueryString);
  }
  /**
   * Submit data
   * @param ajaxParams
   * @param isQueryString
   */
  post(ajaxParams: IAjaxParams, isQueryString = false) {
    return this.restfulCommon('post', ajaxParams, isQueryString);
  }
  /**
   * Modified data
   * @param ajaxParams
   * @param isQueryString
   */
  put(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('put', ajaxParams, isQueryString);
  }
  /**
   * Delete data
   * @param ajaxParams
   * @param isQueryString
   */
  delete(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('delete', ajaxParams, isQueryString);
  }
  /**
   * Submit file to server
   * @param ajaxParams
   * @param isQueryString
   */
  formData(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon('post', ajaxParams, isQueryString, true);
  }
  /**
   * Download file from server
   * @param ajaxParams
   * @param isQueryString
   */
  download(ajaxParams: IAjaxParams, isQueryString = true) {
    return this.restfulCommon(
      'get',
      ajaxParams,
      isQueryString,
      false,
      'arraybuffer'
    );
  }
  /**
   * common function for data operate
   * @param params variables
   * @param graphQL string type
   */
  common(graphQL: string, variables = {}) {
    const token = localStorage.getToken();
    /* 测试改成放到axios里了 */
    /* if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } */
    /* axios.defaults.headers.common[
      'DebugRequestId'
    ] = `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDay()}`; */
    // axios.defaults.headers.common['X-Request-ID'] = `${Common.genUUID()}`;
    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Authorization': `Bearer ${token}` },
        url: this.config.API_ENDPOINT,
        method: 'post',
        data: {
          operationName: this.getAPIName(graphQL),
          variables: variables || {},
          query: graphQL
        }
      })
        .then((data: any) => {
          // reconstruct error handle mechanism
          const ret = data && data.data;
          if (ret.errors || ret.exceptions || ret.extensions) {
            Errors.handleBusinessErrors(ret);
            reject(ret);
          }
          resolve(data && data.data && data.data.data);
        })
        .catch((error) => {
          Errors.handleAxiosErrors(error);
          reject(error);
        });
    });
  }
  /**
   * gql form data
   * @param graphQL string type
   */
  gqlFormData(graphQL: string, variables: any = {}) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getToken()}`;
    return new Promise((resolve, reject) => {
      const fd = new FormData();
      const mapObj: any = {};
      const { files, multiple } = variables;
      fd.append('operations', graphQL);
      if (files.length > 0) {
        files.forEach((file: any, index: number) => {
          if (multiple) {
            mapObj[index] = [`variables.req.${index}.file`];
          } else {
            mapObj[index] = ['variables.file'];
          }
        });
        fd.append('map', JSON.stringify(mapObj));
        files.forEach((file: any, index: any) => {
          if (file && file.originFileObj) {
            file = file.originFileObj;
          }
          fd.append(index, file);
        });
      } else {
        fd.append('map', JSON.stringify({}));
      }
      axios.defaults.headers['post']['Content-Type'] = 'multipart/form-data';
      axios
        .post(this.config.API_ENDPOINT, fd)
        .then((data: any) => {
          // reconstruct error handle mechanism
          const ret = data && data.data;
          if (ret.errors || ret.exceptions || ret.extensions) {
            Errors.handleBusinessErrors(ret);
            reject(ret);
          }
          resolve(data && data.data && data.data.data);
        })
        .catch((error) => {
          Errors.handleAxiosErrors(error);
          reject(error);
        });
    });
  }
  /**
   * Get API name
   * @param graphQL string type
   */
  getAPIName(graphQL: string) {
    if (!graphQL) {
      Log.Error('parameter graphQL is required');
    }
    const graphQLStrArray = graphQL.split(' ');
    let operationName = graphQLStrArray[1];
    if (operationName.indexOf('{') !== -1) {
      operationName = operationName.split('{')[0];
    }
    return operationName;
  }
  /**
   * query
   * @param graphQL
   * @param variables
   */
  query(graphQL: string, variables = {}) {
    return this.common(graphQL, variables);
  }
  /**
   * persist data
   * @param graphQL
   * @param variables
   */
  mutation(graphQL: string, variables = {}) {
    return this.common(graphQL, variables);
  }
}
const ajax = new Ajax();
export { Ajax };
export default ajax;
