export type LocaleName = 'zh-CN' | 'en-US'

export interface VkLocale {
  empty: string
  selectPlaceholder: string
  selectEmpty: string
  paginationTotal: (total: number) => string
  paginationPrev: string
  paginationNext: string
  paginationPageSize: (size: number) => string
  confirm: string
  cancel: string
  close: string
  loading: string
  clear: string
  increase: string
  decrease: string
}

export const zhCN: VkLocale = {
  empty: '暂无数据',
  selectPlaceholder: '请选择',
  selectEmpty: '没有匹配项',
  paginationTotal: (total) => `共 ${total} 条`,
  paginationPrev: '上一页',
  paginationNext: '下一页',
  paginationPageSize: (size) => `每页 ${size} 条`,
  confirm: '确定',
  cancel: '取消',
  close: '关闭',
  loading: '加载中',
  clear: '清空',
  increase: '增加',
  decrease: '减少',
}

export const enUS: VkLocale = {
  empty: 'No data',
  selectPlaceholder: 'Please select',
  selectEmpty: 'No matches',
  paginationTotal: (total) => `${total} items`,
  paginationPrev: 'Previous page',
  paginationNext: 'Next page',
  paginationPageSize: (size) => `${size} / page`,
  confirm: 'OK',
  cancel: 'Cancel',
  close: 'Close',
  loading: 'Loading',
  clear: 'Clear',
  increase: 'Increase',
  decrease: 'Decrease',
}

export const locales: Record<LocaleName, VkLocale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}
