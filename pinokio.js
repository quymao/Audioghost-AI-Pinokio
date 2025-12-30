const path = require('path')
module.exports = {
  version: "1.0",
  title: "audioghost-ai",
  description: "Extract any sound with text prompts. Memory-optimized SAM-Audio with modern UI.",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app/backend", "env")
    let running = await kernel.running(__dirname, "startBackEnd.js")
    let running2 = await kernel.running(__dirname, "startFrontEnd.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        kernel.memory.local[path.resolve(__dirname, "startBackEnd.js")]
        let local2 = kernel.memory.local[path.resolve(__dirname, "startFrontEnd.js")]
        if (local2 && local2.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local2.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "TerminalBackEnd",
            href: "startBackEnd.js",
          }, {
            icon: 'fa-solid fa-terminal',
            text: "TerminalFrontEnd",
            href: "startFrontEnd.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "TerminalFrontEnd",
            href: "startFrontEnd.js",
          }, {icon: "fa-solid fa-power-off",
             text: "TerminalBackEnd",
             href: "startBackEnd.js",
          }]
        }
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "StartBackEnd",
          href: "startBackEnd.js",
        }, {
		  icon: "fa-solid fa-power-off",
          text: "StartFrontEnd",
          href: "startFrontEnd.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
