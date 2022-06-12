const HTML_CLOSING_TAG = "</html>";
let HOT_RELOAD_SCRIPT = `<script>
let socket = new WebSocket("ws://localhost:8989");
socket.onopen = () => console.log('Hot reload start')
socket.onclose = () => console.log('Hot reload stop')
socket.onerror = (error) => console.error(error)
socket.onmessage = () => window.location.reload(true);
</script>`;

module.exports = (command, args) => {
  let { srcFile, content } = args;
  if (srcFile.endsWith(".html") && command === "serve") {
    content = content
      .toString()
      .replace(HTML_CLOSING_TAG, HOT_RELOAD_SCRIPT + HTML_CLOSING_TAG);
  }

  return { srcFile, content };
};
