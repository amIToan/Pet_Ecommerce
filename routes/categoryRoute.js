const Category = require("../models/CategoryModel.js");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { verifyTokenAndAdmin } = require("../middleware/Authentication.js");
const { fileImageRoot, upload } = require("./multer.js");
const fs = require("fs");
const categoryRouter = express.Router();
//change order category
categoryRouter.put(
  "/changeOrder",
  expressAsyncHandler(async (req, res) => {
    const allCategories = await Category.find({}).select("-parentId");
    const changedOrderData = req.body;
    allCategories.forEach(async (item) => {
      if (changedOrderData?.length > 0) {
        for (let index = 0; index < changedOrderData.length; index++) {
          if (item._id == changedOrderData[index]._id) {
            item.order = changedOrderData[index].order;
            break;
          }
        }
        await item.save();
      }
    });
    if (allCategories) {
      res.status(201).json("Change Order Success");
    } else {
      res.status(404).json("Change Order Failed");
    }
  })
);

// recursive category
function createCategory(allCategories, parentId = null) {
  // Đầu tiên là nó lọc ra thằng k có parent .Tiếp theo nó gọi hàm rồi lại truyền cái id của thằng mẹ vào
  const categoryList = [];
  let customCate;
  if (parentId == null) {
    customCate = allCategories.filter((cate) => cate.parentId == null);
    customCate.sort((a, b) => a.order - b.order);
  } else {
    customCate = allCategories.filter((cate) => {
      // Tiếp đến nó lại nhảy vào đây, lọc ra thằng vào có parentId mà bằng với cái Id mà truyền vào, nó sẽ lặp vô hạn liên tục như vậy đến khi nào hết phần tử thì thôi. Nếu k có ai trùng nó sẽ trả ra 1 array rỗng.
      if (cate.parentId) {
        return cate.parentId.valueOf() == parentId.valueOf();
      }
    });
    customCate.sort((a, b) => a.order - b.order);
  }
  for (let cate of customCate) {
    categoryList.push({
      _id: cate._id,
      categoryName: cate.categoryName,
      categoryImage: cate.categoryImage,
      slug: cate.slug,
      order: cate.order,
      children: createCategory(allCategories, cate._id),
    });
  }
  return categoryList;
}
//create categories
categoryRouter.post(
  "/create",
  verifyTokenAndAdmin,
  upload.single("categoryImage"),
  expressAsyncHandler(async (req, res) => {
    const { categoryName, slug, parentId } = req.body;
    const existedCategory = await Category.findOne({
      categoryName: categoryName,
    });
    if (existedCategory) {
      res.status(400);
      throw new Error();
    } else {
      const newCategory = await Category.create({
        categoryName: categoryName,
        slug: slug,
        categoryImage: req.file ? req.file.filename : null,
        parentId: parentId,
        user: req.user._id,
      });
      if (newCategory) {
        res.status(200).json(newCategory);
      } else {
        res.status(400);
        throw new Error("Category created unsuccessfully!");
      }
    }
  })
);

//get all categories
categoryRouter.get(
  "/get",
  expressAsyncHandler(async (req, res) => {
    const allCategories = await Category.find({});
    if (allCategories) {
      const categoryLists = createCategory(allCategories);
      return res.status(200).json(categoryLists);
    } else {
      res.status(400);
      throw new Error("Get all Products failed!");
    }
  })
);
//get specific Id
categoryRouter.get(
  "/:cateId",
  expressAsyncHandler(async (req, res) => {
    const foundCategory = await Category.findById(req.params.cateId);
    if (foundCategory) {
      res.status(200).json(foundCategory);
    } else {
      res.status(500).json(false);
    }
  })
);
//modify categories
categoryRouter.put(
  "/:id",
  verifyTokenAndAdmin,
  upload.single("categoryImage"),
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body, req.file)
    // First Step: get data from id cate
    const { categoryName, slug, parentId } = req.body;
    const foundCategory = await Category.findById(req.params.id);
    if (foundCategory) {
      foundCategory.categoryName = categoryName || foundCategory.categoryName;

      foundCategory.slug = slug || foundCategory.slug;
      foundCategory.parentId =
        parentId && parentId != "null" ? parentId : foundCategory.parentId;
      if (req.file?.filename && req.file.originalname != "null") {
        try {
          if (
            foundCategory.categoryImage &&
            fs.existsSync(fileImageRoot(foundCategory.categoryImage))
          ) {
            fs.unlink(
              fileImageRoot(foundCategory.categoryImage),
              function (err) {
                if (err) throw err;
              }
            );
          }
          foundCategory.categoryImage = req.file.filename;
          const updatedCate = await foundCategory.save();
          res.status(201).json(updatedCate);
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      } else {
        try {
          if (
            foundCategory.categoryImage &&
            fs.existsSync(fileImageRoot(foundCategory.categoryImage))
          ) {
            fs.unlink(
              fileImageRoot(foundCategory.categoryImage),
              function (err) {
                if (err) throw err;
              }
            );
          }
          foundCategory.categoryImage = null;
          const updatedCate = await foundCategory.save();
          res.status(201).json(updatedCate);
        } catch (error) {
          throw new Error(error);
        }
      }
    } else {
      res.json(401);
      throw new Error();
    }
  })
);

//Delete category
categoryRouter.delete(
  "/:id",
  verifyTokenAndAdmin,
  expressAsyncHandler(async (req, res) => {
    const foundCategory = await Category.findById(req.params.id);
    if (foundCategory) {
      try {
        if (
          foundCategory.categoryImage &&
          fs.existsSync(fileImageRoot(foundCategory.categoryImage))
        ) {
          fs.unlink(fileImageRoot(foundCategory.categoryImage), function (err) {
            if (err) throw err;
          });
        }
        foundCategory.categoryImage = null;
        const updatedCate = await foundCategory.save();
        // res.status(201).json(updatedCate);
      } catch (error) {
        throw new Error(error);
      }
      await foundCategory.remove();
      res.status(201).json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);
module.exports = categoryRouter;
