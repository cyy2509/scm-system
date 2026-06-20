package com.xxx.scm.service;

import com.xxx.scm.entity.Product;
import com.xxx.scm.entity.ProductCategory;
import com.xxx.scm.util.PageResult;
import java.math.BigDecimal;
import java.util.List;

/**
 * 商品Service接口
 */
public interface ProductService {

    /**
     * 根据ID查询商品
     */
    Product findById(Integer productId);

    /**
     * 分页查询商品
     */
    PageResult<Product> findByPage(String keyword, Integer categoryId,
                                    BigDecimal minPrice, BigDecimal maxPrice,
                                    int pageNo, int pageSize);

    /**
     * 查询所有商品
     */
    List<Product> findAll();

    /**
     * 添加商品
     */
    void add(Product product);

    /**
     * 修改商品
     */
    void update(Product product);

    /**
     * 删除商品
     */
    void delete(Integer productId);

    /**
     * 查询库存预警商品
     */
    List<Product> findLowStockProducts();

    /**
     * 查询库存预警数量
     */
    int countLowStock();

    /**
     * 查询类别销售占比
     */
    List<java.util.Map<String, Object>> findCategorySalesRatio();

    /**
     * 查询所有分类
     */
    List<ProductCategory> findAllCategories();

    /**
     * 添加分类
     */
    void addCategory(ProductCategory category);

    /**
     * 修改分类
     */
    void updateCategory(ProductCategory category);

    /**
     * 删除分类
     */
    void deleteCategory(Integer categoryId);
}
