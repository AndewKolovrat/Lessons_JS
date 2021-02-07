export const division = (arg, arg2) => {
    const param = checkArg(arg, arg2);
    if (!param) {
        return null;
    }
    return param.x / param.y;
};
export const addition = (arg, arg2) => {
    const param = checkArg(arg, arg2);
    if (!param) {
        return null;
    }
    return param.x + param.y;
};
export const subtraction = (arg, arg2) => {
    const param = checkArg(arg, arg2);
    if (!param) {
        return null;
    }
    return param.x - param.y;
};
export const multiplying = (arg, arg2) => {
    const param = checkArg(arg, arg2);
    if (!param) {
        return null;
    }
    return param.x * param.y;
};

const checkArg = (arg, arg2) => {
    if (!arg || !arg2) {
        return null;
    }
    const param = {
        'x': 0,
        'y': 0
    };
    param.x = Number.parseInt(arg);
    param.y = Number.parseInt(arg2);
    if (Number.isNaN(param.x) || Number.isNaN(param.y)) {
        return null;
    }
    return param;
}

// module.exports = {
//     division: division,
//     addition: addition,
//     subtraction: subtraction,
//     multiplying: multiplying
// };