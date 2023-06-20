const ISO_REGEX = /^(-?\d+-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(.\d{3})?)?)(.*)$/;

/**
 *
 * @param iso returns the ISO without the tz part
 */
export function parseISO(iso: string): string | undefined {
  const res = ISO_REGEX.exec(iso);
  if (!res) {
    return;
  }
  return res[1];
}
