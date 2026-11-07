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
  breadcrumb: string
  backTop: string
  rate: string
  qrCode: string
  uploadDrop: string
  uploadHint: string
  uploadRemove: string
  uploadRetry: string
  uploadUploading: string
  uploadSuccess: string
  uploadFailed: string
  transferSource: string
  transferTarget: string
  transferSearch: string
  transferSelectAll: string
  treeEmpty: string
  cascaderEmpty: string
  resultTitles: Record<'success' | 'warning' | 'error' | 'info' | '403' | '404' | '500', string>
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
  breadcrumb: '面包屑',
  backTop: '回到顶部',
  rate: '评分',
  qrCode: '二维码',
  uploadDrop: '将文件拖到此处，或点击选择',
  uploadHint: '支持单个或批量选择文件',
  uploadRemove: '删除文件',
  uploadRetry: '重新上传',
  uploadUploading: '上传中',
  uploadSuccess: '上传成功',
  uploadFailed: '上传失败',
  transferSource: '待选列表',
  transferTarget: '已选列表',
  transferSearch: '搜索',
  transferSelectAll: '全选',
  treeEmpty: '暂无节点',
  cascaderEmpty: '暂无选项',
  resultTitles: {
    success: '操作成功',
    warning: '需要注意',
    error: '操作失败',
    info: '提示',
    '403': '无访问权限',
    '404': '页面不存在',
    '500': '服务异常',
  },
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
  breadcrumb: 'Breadcrumb',
  backTop: 'Back to top',
  rate: 'Rating',
  qrCode: 'QR code',
  uploadDrop: 'Drop files here, or click to select',
  uploadHint: 'Single or multiple files are supported',
  uploadRemove: 'Remove file',
  uploadRetry: 'Retry upload',
  uploadUploading: 'Uploading',
  uploadSuccess: 'Uploaded',
  uploadFailed: 'Upload failed',
  transferSource: 'Available',
  transferTarget: 'Selected',
  transferSearch: 'Search',
  transferSelectAll: 'Select all',
  treeEmpty: 'No nodes',
  cascaderEmpty: 'No options',
  resultTitles: {
    success: 'Success',
    warning: 'Warning',
    error: 'Something went wrong',
    info: 'Notice',
    '403': 'Access denied',
    '404': 'Page not found',
    '500': 'Server error',
  },
}

export const locales: Record<LocaleName, VkLocale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}
