
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
//import { RCodeMirrorProps } from '~@/interface';
import CodeMirror from 'codemirror';
// language
// import 'codemirror/mode/sql/sql.js';
import 'codemirror/lib/codemirror.css';
// theme css
import 'codemirror/theme/monokai.css';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css';

// require active-line.js
import 'codemirror/addon/selection/active-line.js';

// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/addon/search/searchcursor.js';

// hint
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/selection/active-line.js';

// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/match-highlighter.js';

// keyMap
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/keymap/sublime.js';

// foldGutter
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/fold/xml-fold.js';
/* import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/fold/foldgutter.css';

import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx.js';

// keyMap
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/jump-to-line.js'; */

class RCodeMirror extends Component {
  options: any;
  edit: any;
  refCodeEditor: any;
  posFrom: null | undefined;
  posTo: null | undefined;
  lastQuery: null | undefined;
  overlay: null | undefined;
  query: null | undefined;
  /* constructor(props:RCodeMirrorProps) {
    super(props);
  } */
  /**
 * 设置内容
 */
  setContent(content: string) {
    this.edit.setValue(content);
  }

  /**
 * 获取内容
 */
  getContent() {
    this.edit.getValue();
  }

  /* 
  * 添加行样式
  */
  addLineClass(line: any, where: any, classname: any) {
    this.edit.addLineClass(line, where, classname);
  }
  /* 
  * 删除行样式
  */
  removeLineClass(line: any, where: any, classname: any) {
    this.edit.removeLineClass(line, where, classname);
  }
  /* 
  * 正则搜索获取行号和列号
  */
  showMatchesOnScrollbar(query: any) {
    return this.edit.showMatchesOnScrollbar(query);
  }
  /* 
  * 滚动到可视区域 
  */
  scrollIntoView(obj: any) {
    this.edit.scrollIntoView(obj);
  }
  /* 
  * 获取总行数 
  */
  getLineCount() {
    return this.edit.lineCount();
  }
  /* 
  * 设置是否显示
  */
  getWrapperElement(isblock: string) {
    this.edit.getWrapperElement().style.display = isblock;
  }
  /* 
  * 刷新
  */
  refresh() {
    this.edit.refresh();
  }




  queryCaseInsensitive(query:any) {
    return typeof query === 'string' && query === query.toLowerCase();
  }

  parseString(string:any) {
    return string.replace(/\\([nrt\\])/g, function(match:any, ch:any) {
      let content = '';
      switch (ch) {
        case 'n':
          content = '\n';
          break;
        case 'r':
          content = '\r';
          break;
        case 't':
          content = '\t';
          break;
        case '\\':
          content = '\\';
          break;
        default:
          content = match;
      }
      return content;
    });
  }
  parseQuery(query:any) {
    const isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      try {
        query = new RegExp(isRE[1], isRE[2].indexOf('i') === -1 ? '' : 'i');
      } catch (e) {

      } // Not a regular expression after all, do a string search
    } else {
      query = this.parseString(query);
    }
    if (typeof query === 'string' ? query === '' : query.test('')) {
      query = /x^/;
    }
    return query;
  }
  SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }
  getSearchState(cm:any) {
    return cm.state.search || (cm.state.search = {
      posFrom: null,
      posTo: null,
      lastQuery: null,
      query: null,
      overlay: null
    });
    //return cm.state.search || (cm.state.search = new this.SearchState());
  }
  getSearchCursor(cm:any, query:any, pos:any) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, {
      caseFold: this.queryCaseInsensitive(query),
      multiline: true
    });
  }
  searchOverlay(query:any, caseInsensitive:any) {
    if (typeof query === 'string') {
      query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), caseInsensitive ? 'gi' : 'g');
    } else if (!query.global) {
      query = new RegExp(query.source, query.ignoreCase ? 'gi' : 'g');
    }

    return {
      token: (stream:any) => {
        query.lastIndex = stream.pos;
        const match = query.exec(stream.string);
        if (match && match.index === stream.pos) {
          stream.pos += match[0].length || 1;
          return 'searching';
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      }
    };
  }
  startSearch(cm:any, state:any, query:any) {
    state.queryText = query;
    state.query = this.parseQuery(query);
    cm.removeOverlay(state.overlay, this.queryCaseInsensitive(state.query));
    state.overlay = this.searchOverlay(state.query, this.queryCaseInsensitive(state.query));
    cm.addOverlay(state.overlay);
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) {
        state.annotate.clear(); state.annotate = null;
      }
      state.annotate = cm.showMatchesOnScrollbar(state.query, this.queryCaseInsensitive(state.query));
    }
  }
  clearSearch(cm:any) {
    cm.doc.setSelection({
      ch: 0,
      line: 0
    }, {
      ch: 0,
      line: 0
    });
    cm.operation(() => {
      const state = this.getSearchState(cm);
      state.lastQuery = state.query;
      if (!state.query) {
        return;
      }
      state.query = state.queryText = null;
      cm.removeOverlay(state.overlay);
      state.posFrom = {};
      state.posTo = {};
      if (state.annotate) {
        state.annotate.clear();
        state.annotate = null;
      }
    });
  }
  doSearch(cm:any, rev:any, query:any) {
    const state = this.getSearchState(cm);
    if (state.query) {
      return this.findNext(cm, rev);
    }
    let q = cm.getSelection() || state.lastQuery;
    if (q instanceof RegExp && q.source === 'x^') {
      q = null;
    }
    cm.operation(() => {
      this.startSearch(cm, state, query);
      state.posFrom = cm.getCursor();
      state.posTo = cm.getCursor();
      this.findNext(cm, rev);
    });
  }
  findNext(cm:any, rev?:any, callback?:any) {
    cm.operation(() => {
      const state = this.getSearchState(cm);
      let cursor = this.getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
      if (!cursor.find(rev)) {
        cursor = this.getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
        if (!cursor.find(rev)) {
          return;
        }
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({ from: cursor.from(), to: cursor.to() }, 20);
      state.posFrom = cursor.from();
      state.posTo = cursor.to();
      if (callback) {
        callback(cursor.from(), cursor.to());
      }
    });
  }
  /**
  * name
  */
  find(query:any, rev = false) {
    const cm = this.edit;
    this.clearSearch(cm);
    this.doSearch(cm, rev, query);
  }
  findBack() {
    this.findNext(this.edit, true);
  }
  findForward() {
    this.findNext(this.edit);
  }
  findClear() {
    this.clearSearch(this.edit);
  }
  componentDidMount() {
    const { options, value, onRef } = this.props;
    this.edit = CodeMirror.fromTextArea(this.refCodeEditor, options);
    this.setContent(value);
    onRef(this);
  }
  componentDidUpdate() {
    const { value } = this.props;
    this.setContent(value);
  }
  render() {
    return <>
      <textarea ref={(codeEditor) => { this.refCodeEditor = codeEditor; }} className='editor'></textarea>
    </>;
  }

}

export default observer(RCodeMirror);
RCodeMirror.propTypes = {
  options: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.string,
  onRef: PropTypes.func
};
