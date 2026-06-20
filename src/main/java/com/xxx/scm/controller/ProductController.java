package com.xxx.scm.controller;

import com.xxx.scm.entity.Product;
import com.xxx.scm.entity.R;
import com.xxx.scm.service.ProductService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;

/**
 * 商品 Controller — REST API
 */
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * 商品列表（分页 + 多条件搜索）
     */
    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String keyword,
                     @RequestParam(required = false) Integer categoryId,
                     @RequestParam(required = false) BigDecimal minPrice,
                     @RequestParam(required = false) BigDecimal maxPrice) {
        PageResult<Product> page = productService.findByPage(keyword, categoryId, minPrice, maxPrice, pageNo, pageSize);
        return R.ok(page);
    }

    /**
     * 获取所有分类
     */
    @GetMapping("/categories")
    public R<?> categories() {
        return R.ok(productService.findAllCategories());
    }

    /**
     * 获取单个商品
     */
    @GetMapping("/{productId}")
    public R<?> getById(@PathVariable Integer productId) {
        return R.ok(productService.findById(productId));
    }

    /**
     * 添加商品（支持图片上传）
     */
    @PostMapping("/add")
    public R<?> add(Product product,
                    @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
                    HttpServletRequest request) {
        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                String imageUrl = uploadImage(imageFile, request);
                product.setImageUrl(imageUrl);
            }
            productService.add(product);
            return R.ok("添加成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 修改商品（支持图片上传）
     */
    @PostMapping("/update")
    public R<?> update(Product product,
                       @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
                       HttpServletRequest request) {
        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                String imageUrl = uploadImage(imageFile, request);
                product.setImageUrl(imageUrl);
            }
            productService.update(product);
            return R.ok("修改成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 删除商品
     */
    @PostMapping("/delete")
    public R<?> delete(@RequestParam Integer productId) {
        try {
            productService.delete(productId);
            return R.ok("删除成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 查询所有商品（下拉选择用）
     */
    @GetMapping("/all")
    public R<?> findAll() {
        return R.ok(productService.findAll());
    }

    /**
     * 图片上传
     */
    private String uploadImage(MultipartFile file, HttpServletRequest request) throws IOException {
        String uploadDir = request.getServletContext().getRealPath("/static/images/products/");
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String originalFilename = file.getOriginalFilename();
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
        String newFilename = UUID.randomUUID().toString() + ext;
        file.transferTo(new File(uploadDir + newFilename));
        return "/static/images/products/" + newFilename;
    }
}
