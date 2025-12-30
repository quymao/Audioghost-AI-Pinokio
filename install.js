module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/0x0funky/audioghost-ai app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        venv_python: "3.11",
        env: { },
        path: "app/backend",
        message: [
          "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126",
          "uv pip install git+https://github.com/facebookresearch/sam-audio.git",
          "uv pip install -r requirements.txt",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/frontend",	
        message: [
          "npm install",
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "startBackEnd.js",
        params: {
          venv: "env",
          path: "app",
        }
      }
    },
  ]
}
