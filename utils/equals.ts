// from a comment in here: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/#4-deep-equality
export function shallowEqual(object1: Record<string, unknown>, object2: Record<string, unknown>) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	// cannot simply compare key-array lengths as lengths could be same while the keys themselves differ
	// cannot skip this check either and just check the values of all keys concatenated
	// because { "key": undefined }["key"] and {}["key"] would equal incorrectly
	for (const k of keys1) if (!keys2.includes(k)) return false;
	for (const k of keys2) if (!keys1.includes(k)) return false;

	for (const key of keys1) if (object1[key] !== object2[key]) return false;

	return true;
}