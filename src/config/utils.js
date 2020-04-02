function checkIsInRole(user, ...roles) {
    {
        console.log("CheckIsInRole");
        if (!user)
        {
            console.log("CheckIsInRole no user");
            return false;
        }

        const hasRole = roles.find(role => user.role === role)

        if (!hasRole)
        {
            return false;
        }

        return true;
    };
}

/**
 * @param loopArray The object array to loop through
 * @param addArray The object array to add the looped items to
 * @param endpoint The api url endpoint
 */
function addToArray(loopArray, addArray, endpoint) {
    for (let i = 0; i < loopArray.length; i++) {
        addArray.push({
            rel: `${endpoint}`,
            href: `http://localhost:3000/api/${endpoint}/` + loopArray[i]
        });
    }
    return addArray;
}


module.exports.checkIsInRole = checkIsInRole;
module.exports.addToArray = addToArray;