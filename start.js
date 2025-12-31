module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.10",
        env: { },
        path: "app/backend",	
        message: [
          "uvicorn main:app --reload --port 8000",
          // "celery -A workers.celery_app worker --loglevel=info --pool=solo",
        ]
      }
    },
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

