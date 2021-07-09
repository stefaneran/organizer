const getEnumValues = (Enum) => Object.keys(Enum).map(key => Enum[key])

export default getEnumValues;