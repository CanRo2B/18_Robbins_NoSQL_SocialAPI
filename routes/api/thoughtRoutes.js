const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

// api/user route
router.route("/").get(getThoughts).post(createThought);

// api/users/:thoughtId route
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// api/users/:reactionId route
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);


module.exports = router;
