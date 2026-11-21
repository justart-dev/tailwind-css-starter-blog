/**
 * Serialize a JSON-LD payload so it is safe to inline inside a <script> tag.
 * `JSON.stringify` leaves `<` untouched, which lets a value containing
 * `</script>` close the tag early.
 */
export function jsonLdScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
