export interface SkeletonProps {
  /** 是否处于加载中 */
  loading?: boolean
  /** 占位行数，默认 3 */
  rows?: number
  /** 是否显示头像占位 */
  avatar?: boolean
  /** 是否显示标题占位，默认 true */
  title?: boolean
  /** 呼吸动画，默认 true */
  animated?: boolean
}
