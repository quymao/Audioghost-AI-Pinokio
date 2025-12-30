module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app/frontend",	
        message: [
          "npm run dev",
        ],
        on: [{
          "event": "/http:\/\/\\w+\\:\\d+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
