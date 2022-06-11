const HTML_CLOSING_TAG = "</html>";
let HOT_RELOAD_SCRIPT = `<script>
let socket = new WebSocket("ws://localhost:8989");
socket.onopen = () => console.log('reload socket open')
socket.onclose = () => console.log('reload socket closed')
socket.onerror = (error) => console.log('reload socket error: ', error)
socket.onmessage = () => window.location.reload(true);
</script>`;

module.exports = (command, step, args) => {
  if (step === "build") {
    let { srcFile, content } = args;
    if (srcFile.endsWith(".html") && command === "serve") {
      content = content
        .toString()
        .replace(HTML_CLOSING_TAG, HOT_RELOAD_SCRIPT + HTML_CLOSING_TAG);
    }

    return { srcFile, content };
  }
};
