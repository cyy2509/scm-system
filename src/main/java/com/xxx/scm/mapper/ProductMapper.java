package com.xxx.scm.mapper;

import com.xxx.scm.entity.Product;
import org.apache.ibatis.annotations.Param;
import java.math.BigDecimal;
import java.util.List;

/**
 * 商品Mapper接口
 */
public interface ProductMapper {

    /**
     * 根据ID查询商品
     */
    Product findById(@Param("productId") Integer productId);

    /**
     * 分页查询商品列表
     */
    List<Product> findByPage(@Param("keyword") String keyword,
                              @Param("categoryId") Integer categoryId,
                              @Param("minPrice") BigDecimal minPrice,
                              @Param("maxPrice") BigDecimal maxPrice,
                              @Param("offset") int offset,
                              @Param("pageSize") int pageSize);

    /**
     * 查询商品总数
     */
    int findCount(@Param("keyword") String keyword,
                  @Param("categoryId") Integer categoryId,
                  @Param("minPrice") BigDecimal minPrice,
                  @Param("maxPrice") BigDecimal maxPrice);

    /**
     * 查询所有商品
     */
    List<Product> findAll();

    /**
     * 插入商品
     */
    int insert(Product product);

    /**
     * 更新商品
     */
    int update(Product product);

    /**
     * 删除商品
     */
    int deleteById(@Param("productId") Integer productId);

    /**
     * 更新库存（增加）
     */
    int increaseStock(@Param("productId") Integer productId, @Param("quantity") Integer quantity);

    /**
     * 更新库存（减少）
     */
    int decreaseStock(@Param("productId") Integer productId, @Param("quantity") Integer quantity);

    /**
     * 查询库存预警商品
     */
    List<Product> findLowStockProducts();

    /**
     * 查询库存预警商品数量
     */
    int countLowStock();

    /**
     * 查询类别销售占比
     */
    List<java.util.Map<String, Object>> findCategorySalesRatio();
}
