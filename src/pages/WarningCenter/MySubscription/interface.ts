export interface ISubListItem {
  id: number
  type: string
  person: string
  tenant_name: string
  alert_rule_level: string
  // 缺少规则名称、配置路径两个字段 先占位
  rule_name: string
  folder_name: string
}
