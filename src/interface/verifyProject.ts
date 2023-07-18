export interface TreeNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: TreeNode[];
}

export interface ITrapezoidDiagramFilter {
  projectId: string;
  expressId: string;
  subRequirementId: string;
}

export interface IVariablesFilter {
  projectId: string;
  expressId: string;
}

export interface IVariables {
  id?: string;
  projectId: string;
  expressId: string;
  selectedVariable: string;
  status?: number;
}
export interface Equipments {
  code: string,
  name: string,
  category: string,
  functionRoute: string,
  functionValue: string
}
export interface NodeFunctionChild {
  id: string,
  functionName: string,
  equipments: Equipments[]
}
export interface NodeFunction {
  groupName: string,
  functions: NodeFunctionChild[]
}
export interface EquipmentTypesFunction {
  functionName: string,
  functionValue: string
}
export interface NodeEquipmentTypesChild {
  code: string,
  name: string,
  category: string,
  functions: EquipmentTypesFunction[]
}
export interface NodeEquipmentTypes {
  code: string,
  name: string,
  category: string,
  equipments: NodeEquipmentTypesChild[]
}

export interface FunTreeNode {
  title: string,
  key: string,
  icon: any,
  category: any,
  children: any
}
export interface OriginTreeData {
  equipmentTypes?: FunTreeNode[],
  functionGroups?: FunTreeNode[]
}
export interface KeyType {
  [key: string]: FunTreeNode[]
}
export interface ValidationCountKey {
  total?: number,
  waiting?: number,
  doing?: number,
  success?: number,
  fail?: number,
  error?: number,
  finished?: number,
  unknown?: number,
  ids?: string
}
export interface MarkCodeParams {
  operation: number;
  code: string;
  projectId: string
}
export interface ValidationCount {
  id?: string;
  status?: number;
  validationCount: ValidationCountKey
}
export interface VariablesFollowParams {
  projectId: string;
  subRequirementId: string;
}
export interface variableFollowAddUpdate extends VariablesFollowParams {
  selectedVariable:Array<string>
}
export interface VariablesFollowItem {
  id?: string,
  name: string;
  code: string;
  cycle: Array<number>;
}

export interface ProjectInfo {
  id?: string,
  name?: string,
  subReqTotal?: number,
  validationTotal?: number,
  validationSuccess?: number,
  validationFail?: number,
  validationUnknown?: number,
  validationWaitting?: number
  validation?: ValidationCount,
  demandVersionId?: string,
  uninitialized?: number
}
export interface keyString {
  key: string
}
