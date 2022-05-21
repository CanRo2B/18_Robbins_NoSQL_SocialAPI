const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriends,
    removeFriend,
} = require("../../controllers/userController")

// api/user route
router.route("/").get(getUsers).post(createUser);

// api/users/:userId route
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/:friendId route
router.route("/friends/:friendId").post(addFriends).delete(removeFriend);

module.exports = router;