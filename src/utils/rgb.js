const r = (left, right, gradient) => Math.floor(left.r - gradient * (left.r - right.r));
const g = (left, right, gradient) => Math.floor(left.g - gradient * (left.g - right.g));
const b = (left, right, gradient) => Math.floor(left.b - gradient * (left.b - right.b));

export default { r, g, b };
