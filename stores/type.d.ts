export enum langType { 'en', 'jp', 'zh_cn', 'zh_tw' }

export interface AppInfo {
	lang: langType
	theme: string
}