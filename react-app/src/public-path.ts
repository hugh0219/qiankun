// 配置 qiankun 的 publicPath
// 在 Vite 项目中，qiankun 会自动处理 publicPath，这里主要是确保类型正确
if (
  window.__POWERED_BY_QIANKUN__ &&
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
) {
  // Vite 使用 import.meta.env.BASE_URL，但通常由 vite-plugin-qiankun 自动处理
  // 这里只是确保变量存在，避免类型错误
  const publicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  console.log('[react-app] publicPath:', publicPath)
}
