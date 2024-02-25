export function getOffset(element, left, top) {
  const parent = element.offsetParent
  if (!parent) {
    return {
      left,
      top,
    }
  }
  const { offsetLeft, offsetTop } = parent
  return getOffset(parent, left + offsetLeft, top + offsetTop)
}

export function findTarget(target, currentTarget) {
  if (target === currentTarget) {
    return target
  }
  if (!target.parentNode) return null
  return findTarget(target.parentNode, currentTarget)
}