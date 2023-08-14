const express = require("express");
const router = express.Router();
const CuriousController = require("../controllers/CuriousController");

// Importe o middleware de verificação de autenticação
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, CuriousController.createCurious);
router.post("/add", checkAuth, CuriousController.createCuriousSave);
router.post("/remove", checkAuth, CuriousController.removeCurious);
router.get("/edit/:id", checkAuth, CuriousController.updateCurious);
router.post("/edit", checkAuth, CuriousController.updateCuriousPost);
router.get("/dashboard", checkAuth, CuriousController.dashboard);
router.get("/post/:id", checkAuth, CuriousController.post);
router.get("/", CuriousController.showCurious);

module.exports = router;