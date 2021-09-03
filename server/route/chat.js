const router = require("express").Router();
const { allUserGET, messageGET, messagePOST } = require("../controllers/chat");

router.get("/", allUserGET);
router.get("/message", messageGET);
router.post("/message", messagePOST);

module.exports = router;
