/*eslint-disable*/
import LocalStorage from '~@/utils/localStorage';
/**
 * log dictionary
 */
const LOGDICT = {
  log: 1,
  info: 1,
  warn: 2,
  trace: 3,
  error: 4,
  table: 5
};

class Log {
  /**
   * Is go on output the program log
   * @param {number} num
   * @returns {boolean}
   */
  isGoOn(num: number): boolean {
    const logLevel =
    LocalStorage.get('LOGLEVEL') ||
    LocalStorage.get('loglevel') ||
    LocalStorage.get('logLevel' || LocalStorage.get('LogLevel'));
    return logLevel && num >= logLevel;
  }
  /**
   * complete time for year month day hour minute second
   * @param {number} data
   * @returns {string}
   */
  completeTime(data: number): string {
    return data > 9 ? data + '' : '0' + data;
  }
  /**
   * output information
   * @param {any} data
   */
  getLogTime(): string {
    const date = new Date();
    return `${date.getFullYear()}-${this.completeTime(
      date.getMonth() + 1
    )}-${this.completeTime(date.getDate())} ${this.completeTime(
      date.getHours()
    )}:${this.completeTime(date.getMinutes())}:${this.completeTime(
      date.getSeconds()
    )}`;
  }
  /**
   * output information
   * @param {any} data
   */
  log(...data: any) {
    if (this.isGoOn(LOGDICT.log)) {
      console.log('%c%s', 'color:#121212;font-size: 18px;', this.getLogTime());
      console.log('%c%s', 'color:#78C06E;', ...data);
    }
  }
  /**
   * output information(log alias)
   * @param {any} data
   */
  info(...data: any) {
    if (this.isGoOn(LOGDICT.info)) {
      this.log(this.getLogTime());
      console.info('%c%s', 'color:orange;', ...data);
    }
  }
  /**
   * output warn information
   * @param {number} warning
   */
  warn(...warning: any) {
    if (this.isGoOn(LOGDICT.warn)) {
      this.log(this.getLogTime());
      console.warn('%c%s', 'color:yellow;', ...warning);
    }
  }
  /**
   * trace functon invoke process
   * @param {number} error
   */
  trace() {
    if (this.isGoOn(LOGDICT.trace)) {
      this.log(this.getLogTime());
      console.trace(); // eslint-disable-line
    }
  }
  /**
   * output error
   * @param {number} error
   */
  error(...error: any) {
    console.log('out')
    if (this.isGoOn(LOGDICT.error)) {
      console.log('in')
      this.log(this.getLogTime());
      console.error('%c%s', 'color:#F56C6C;', ...error);
      this.trace(); // eslint-disable-line
    }
  }
  /**
   * convert composite data to table
   * @param error
   */
  table(...data: any[]) {
    if (this.isGoOn(LOGDICT.table)) {
      console.table('%c%s', ...data);
    }
  }
}

const instance = new Log();
export { Log };
export default instance;
