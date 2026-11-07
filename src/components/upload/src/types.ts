export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'

export type UploadRejectReason = 'size' | 'type' | 'count'

export interface UploadFile {
  /** 文件唯一标识 */
  uid: string
  /** 文件名 */
  name: string
  /** 文件大小（字节） */
  size: number
  /** MIME 类型 */
  type: string
  /** 上传状态 */
  status: UploadStatus
  /** 上传进度，0 - 100 */
  percent: number
  /** 原始 File 对象 */
  raw?: File
  /** 服务端返回的文件地址 */
  url?: string
  /** 上传成功响应 */
  response?: unknown
  /** 上传失败原因 */
  error?: unknown
}

export interface UploadRequestOptions {
  /** 当前文件 */
  file: UploadFile
  /** 原始 File 对象 */
  raw: File
  /** 更新上传进度 */
  onProgress: (percent: number) => void
  /** 标记上传成功 */
  onSuccess: (response?: unknown) => void
  /** 标记上传失败 */
  onError: (error: unknown) => void
}

export interface UploadProps {
  /** 受控文件列表 */
  fileList?: UploadFile[]
  /** 非受控初始文件列表 */
  defaultFileList?: UploadFile[]
  /** 允许选择多个文件 */
  multiple?: boolean
  /** 接受的文件类型，支持 `.png`、`image/*`、逗号分隔 */
  accept?: string
  /** 文件大小上限（字节） */
  maxSize?: number
  /** 文件大小下限（字节） */
  minSize?: number
  /** 文件数量上限 */
  maxCount?: number
  /** 禁用选择与删除 */
  disabled?: boolean
  /** 渲染拖拽上传区 */
  drag?: boolean
  /** 选择文件后自动上传，默认 true */
  autoUpload?: boolean
  /** 是否显示文件列表，默认 true */
  showFileList?: boolean
  /** 上传前校验，返回 false 时跳过该文件 */
  beforeUpload?: (file: File, fileList: UploadFile[]) => boolean | Promise<boolean>
  /** 自定义上传实现 */
  customRequest?: (options: UploadRequestOptions) => void | Promise<void>
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface UploadEmits {
  (e: 'update:fileList', files: UploadFile[]): void
  (e: 'change', file: UploadFile, files: UploadFile[]): void
  (e: 'remove', file: UploadFile, files: UploadFile[]): void
  (e: 'progress', file: UploadFile): void
  (e: 'success', file: UploadFile, response?: unknown): void
  (e: 'error', file: UploadFile, error: unknown): void
  (e: 'exceed', files: UploadFile[], fileList: UploadFile[]): void
  (e: 'reject', file: UploadFile, reason: UploadRejectReason): void
}

export interface UploadSlots {
  /** 触发区内容 */
  default?: () => unknown
  /** 触发区下方的提示内容 */
  tip?: () => unknown
}

export interface UploadExpose {
  /** 上传所有处于 ready 状态的文件 */
  submit: () => void
  /** 重新上传指定文件，缺省时重试全部失败文件 */
  retry: (file?: UploadFile) => void
  /** 清空文件列表 */
  clear: () => void
  /** 隐藏的文件输入框 */
  input: HTMLInputElement | null
}
