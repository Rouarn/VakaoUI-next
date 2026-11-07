export type TreeKey = string | number

export interface TreeNode {
  key: TreeKey
  label: string
  children?: TreeNode[]
  disabled?: boolean
  isLeaf?: boolean
}

export interface TreeCheckInfo {
  /** 本次操作后该节点的勾选状态 */
  checked: boolean
  /** 当前所有半选节点 */
  halfCheckedKeys: TreeKey[]
}

export interface TreeProps {
  /** 树形数据 */
  data?: TreeNode[]
  /** 受控的选中节点 */
  selectedKeys?: TreeKey[]
  /** 非受控初始选中节点 */
  defaultSelectedKeys?: TreeKey[]
  /** 受控的勾选节点 */
  checkedKeys?: TreeKey[]
  /** 非受控初始勾选节点 */
  defaultCheckedKeys?: TreeKey[]
  /** 受控的展开节点 */
  expandedKeys?: TreeKey[]
  /** 非受控初始展开节点 */
  defaultExpandedKeys?: TreeKey[]
  /** 初始展开所有含子节点的节点 */
  defaultExpandAll?: boolean
  /** 显示复选框 */
  checkable?: boolean
  /** 允许选中节点 */
  selectable?: boolean
  /** 多选（配合 Ctrl / Cmd 点击） */
  multiple?: boolean
  disabled?: boolean
  /** 每级缩进，默认 24px */
  indent?: number
  /** 异步加载子节点 */
  loadData?: (node: TreeNode) => Promise<TreeNode[]>
  /** 无可见标签时的可访问名称 */
  ariaLabel?: string
}

export interface TreeEmits {
  (e: 'update:selectedKeys', keys: TreeKey[]): void
  (e: 'select', keys: TreeKey[], node: TreeNode): void
  (e: 'update:checkedKeys', keys: TreeKey[]): void
  (e: 'check', keys: TreeKey[], node: TreeNode, info: TreeCheckInfo): void
  (e: 'update:expandedKeys', keys: TreeKey[]): void
  (e: 'expand', keys: TreeKey[], node: TreeNode): void
  (e: 'load', node: TreeNode, children: TreeNode[]): void
}
