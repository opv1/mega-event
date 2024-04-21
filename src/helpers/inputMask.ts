export const inputMask = (value: string, mask: string): string => {
  let i = 0
  let val = value.replace(/\D/g, '')
  const def = mask.replace(/\D/g, '')

  if (def.length >= val.length) {
    val = def
  }

  return mask.replace(/./g, (a) =>
    /[_\d]/.test(a) && i < val.length
      ? val.charAt(i++)
      : i >= val.length
        ? ''
        : a,
  )
}
