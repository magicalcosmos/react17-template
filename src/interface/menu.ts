/**
 * menu item
 */
export interface MenuItem {
  name: string;
  url: string;
  isHelp?: boolean;
  isRecent?: boolean;
  isList?: boolean;
  id?: string;
}
