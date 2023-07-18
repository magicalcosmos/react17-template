export interface FileItem {
    id: string,
    fileTypeId: number,
    name: string,
    content: string,
    status: number
}
export interface ParserResult {
    row: number,
    column: number,
    message: string
}
export interface DemandVersionInfo {
    id: string,
    name: string,
    description: string,
    safeRequirementTotal: number,
    parseTotal: number,
    parseSuccessTotal: number,
    parseFailTotal: number,
    status: number,
    parserResult: Array<ParserResult>,
    files: Array<FileItem>,
    reqCodePrefix: string
}
export interface ParentLSpecInfo {
    file?: FileItem,
    parserResult?: Array<ParserResult>,
    status?: number
}
export interface ChildrenCodeMirror {
    addLineClass: (arg0: number, arg1: string, arg2: string) => void;
    removeLineClass: (arg0: number, arg1: string, arg2: string) => void;
    showMatchesOnScrollbar: (arg1: any) => void;
    scrollIntoView: (arg0: { line: number; ch: number; }) => void;
    getWrapperElement: (arg0: string) => void
    getContent: () => string
    refresh: () => void
    find:(query:string, rev?:boolean) => void
}
export interface RCodeMirrorProps {
    value: string,
    options: {
        tabSize: number,
        lineNumbers: boolean,
        theme: string,
        readOnly: boolean
    },
    onRef: (params: any) => void
}
