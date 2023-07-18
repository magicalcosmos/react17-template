export interface BuildAccessParam {
    projectId: number;
    name: string
}
export interface DeviceInterface {name: string, category: string | null }
export interface BuildAccessInterface { Switch: { name: string; value: boolean; }[], track: string[], trackswitch: string[] }

