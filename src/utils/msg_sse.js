function sseError(sess, code) {
  sess.push({ type: "error", code: code });
}

function sseApply(sess, attrs) {
  sess.push({ type: "apply", attrs: attrs });
}

function sseSet(sessCh, comp, attr, value) {
  sessCh.broadcast({
    type: "set",
    comp: comp,
    attr: attr,
    value: value,
  });
}

function sseKeepAlive(ch) {
  ch.broadcast({
    type: "keepalive",
  });
}

module.exports = {
  sseError,
  sseApply,
  sseSet,
  sseKeepAlive,
};
