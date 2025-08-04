const variables = (templateString: string) => {
  const values = [...templateString.matchAll(/\{(\w+)\}/g)].map(variable => variable[1])

  return function variables(...args: (string | null | undefined)[]) {
    let result = templateString
    values.forEach((v, i) => {
      if (i + 1 <= args.length) {
        result = result.replace(`{${v}}`, args[i] ?? '')
      }
    })
    return result
  }
}

const countable = (templates: { zero: string; one: string; many: string }) => {
  return function countable(count: number, exporting = false, showNumber = true) {
    if (exporting) {
      if (count === 0) {
        return templates.zero
      } else if (count === 1) {
        return templates.one
      } else {
        return templates.many
      }
    }
    if (count === 0) {
      return templates.zero
    } else if (count === 1) {
      return templates.one.replace('{count}', showNumber ? count.toString() : '')
    } else {
      return templates.many.replace('{count}', showNumber ? count.toString() : '')
    }
  }
}

export {
  variables,
  countable
}