const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        let result;

        if (!authorizationHeader || !authorizationHeader.split(" ")[1]) {
            return res.json({
                error: true,
                message: "La clé d'accès est manquante."
            }).status(401);
        }

        const token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({
            where: {
            accessToken: token
            }
        });

        if (!user) {
            return res.status(403).json({ 
                error: true,
                message: "Accès interdit."
            });
        }

        result = jwt.verify(token, "MySuperSecretPassword", { expiresIn: "1h" });

        if (!user.email === result.email) {
            return res.status(403).json({
                error: true,
                message: "Accès interdit."
            });
        }

        req.decoded = user;

        next();
    }

    catch (error) {
        console.error(error);
        let errorMessage = '';

        if (error.name === "TokenExpiredError") {
            errorMessage = "Erreur d'authentification, veuillez recharger votre session."
        } else {
            errorMessage = "Erreur d'authentification."
        }
        
        return res.status(403).json({
            error: true,
            message: errorMessage
        });
    }

}
module.exports = { authenticateUser };