export const handlePolicies = policies => (req,res, next)=>{
    console.log(req.user)
    if (policies[0] === "PUBLIC") return next();
    if (!req.user) return res.status(401).send({status: "error", error: "authenticated"});
    if (!policies.includes(req.user.user.role.toUpperCase())) return res.status(403).send({status: "error", error: "Unauthorized"});
    next();
}