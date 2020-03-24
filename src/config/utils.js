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


module.exports.checkIsInRole = checkIsInRole;