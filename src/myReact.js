// https://pomb.us/build-your-own-react/
// https://github.com/pomber/didact
// source code from https://juejin.cn/post/6844904197008130062#heading-3
function createElement(type, props, ...children) {
  // 核心逻辑不复杂，将参数都塞到一个对象上返回就行
  // children也要放到props里面去，这样我们在组件里面就能通过this.props.children拿到子元素
  return {
    type,
    props: {
      ...props,
      children
    }
  };
}
function render(vDom, container) {
  let dom;
  // 检查当前节点是文本还是对象
  if (typeof vDom !== "object") {
    dom = document.createTextNode(vDom);
  } else {
    dom = document.createElement(vDom.type);
  }

  // 将vDom上除了children外的属性都挂载到真正的DOM上去
  if (vDom.props) {
    Object.keys(vDom.props)
      .filter((key) => key != "children")
      .forEach((item) => {
        dom[item] = vDom.props[item];
      });
  }

  // 如果还有子元素，递归调用
  if (vDom.props && vDom.props.children && vDom.props.children.length) {
    vDom.props.children.forEach((child) => render(child, dom));
  }

  container.appendChild(dom);
}
export default {
  createElement,
  render
};
