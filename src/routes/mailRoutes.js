const router = require("express").Router();
const logger = require("../utilities/logger");
const ApiResponse = require("../utilities/apiResponse");
const { mailValidator } = require("../validators");
const { mailController } = require("../controllers");

router.post(
  "/insert",
  mailValidator.insertEmailValidator,
  async (req, res, next) => {
    try {
      const { mail, company } = req.body;
      const insertEmail = await mailController.insertMail(mail, company);
      return ApiResponse.success(insertEmail).send(res);
    } catch (error) {
      logger.error("Error in Mail Route: ", error);
      next(error);
    }
  }
);

router.get("/send", async (req, res, next) => {
  try {
    await mailController.sendColdMails();
    return ApiResponse.success({ message: "Cold Mail Started", data: {} }).send(
      res
    );
  } catch (error) {
    logger.error("Error in Mail Route: ", error);
    next(error);
  }
});

module.exports = router;
