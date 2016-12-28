function classPrefix(prefix) {
  return (ComposedComponent) => {
    Object.assign(ComposedComponent.prototype, {
      ns(className) {
        return className ? `${prefix}-${className}` : prefix;
      }
    });
  };
}

export default classPrefix;
