module.exports = (val, type = null) => {
  if (!type) return val;
  if (type === "bool" || type === "boolean") {
    if (val === "true") return true;
    if (val === "false") return false;
  }
  if (type === "number") return +val;
  return val;
};
