const router = require("express").Router();
const AddressController = require("../../Controllers/Address");

router.get("/count",async (req, res, next) => {
    try {
        const result = await AddressController.getCount();
        res.jsend.success(result);
    } catch (e) {
        res.jsend.error({
            message: e.message
        })
    }
});

router.get("/", async (req, res, next) => {
    try {
        const offset = parseInt(req.query.offset, 10);
        const result = await AddressController.getAddress({offset, limit: 5});
        res.jsend.success(result);
    } catch (e) {
        res.jsend.error({
            message: e.message
        })
    }
});
router.post("/", async (req, res, next) => {
    try {
        const addressInfo = req.body;
        const result = await AddressController.postAddress(addressInfo);
        res.jsend.success(result);
    } catch (e) {
        next(e)
    }
});
router.put("/:addressId", async (req, res, next) => {
    try {
        const id = parseInt(req.params.addressId, 10);
        const result = await AddressController.setDefault(id);
        res.jsend.success(result);
    } catch (e) {
        next(e)
    }
});
router.delete("/:addressId", async (req, res, next) => {
    try {
        const id = parseInt(req.params.addressId, 10);
        const result = await AddressController.deleteAddress(id);
        res.jsend.success(result);
    } catch (e) {
        next(e)
    }
});


module.exports = router;