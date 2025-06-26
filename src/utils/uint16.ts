const to16 = (x: number) => x & 0xffff;
const and16 = (x: number, y: number) => to16(x & y);
const or16 = (x: number, y: number) => to16(x | y);
const not16 = (x: number) => to16(~x);
const shl16 = (x: number, n: number) => to16(x << n);
const shr16 = (x: number, n: number) => to16(x >>> n);

class uint16Map extends Map {
  get(key: string) {
    const val = super.get(key);
    return !val ? undefined : to16(val);
  }

  set(key: string, value: number) {
    return super.set(key, to16(value));
  }
}

export default { to16, and16, or16, not16, shl16, shr16, uint16Map };
