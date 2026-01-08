// 扩展 Window 接口以支持 qiankun 全局变量
interface Window {
  __POWERED_BY_QIANKUN__?: boolean
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string
}
