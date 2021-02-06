const division = (arg, arg2) => {
    return +arg / +arg2;
}
const addition = (arg, arg2) => {
    return arg + arg2;
}
const subtraction = (arg, arg2) => {
    return +arg - +arg2;
}
const multiplying = (arg, arg2) => {
    return +arg * +arg2;
}

module.export = {
    division, addition, subtraction, multiplying
}