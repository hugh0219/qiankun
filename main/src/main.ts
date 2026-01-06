import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"

import { registerMicroApps, start, initGlobalState } from "qiankun"

registerMicroApps([
  {
    name: "react-app", // app name registered
    entry: "//localhost:9528",
    container: "#subapp",
    activeRule: "/react",
  },
  {
    name: "vue-app",
    entry: { scripts: ["//localhost:9529"] },
    container: "#subapp",
    activeRule: "/vue",
  },
])

start()

createApp(App).mount("#app")
