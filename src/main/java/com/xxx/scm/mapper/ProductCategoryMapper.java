package com.xxx.scm.mapper;

import com.xxx.scm.entity.ProductCategory;
import java.util.List;

/**
 * 商品分类Mapper接口
 */
public interface ProductCategoryMapper {

    /**
     * 查询所有分类
     */
    List<ProductCategory> findAll();

    /**
     * 根据ID查询分类
     */
    ProductCategory findById(Integer categoryId);

    /**
     * 插入分类
     */
    int insert(ProductCategory category);

    /**
     * 更新分类
     */
    int update(ProductCategory category);

    /**
     * 删除分类
     */
    int deleteById(Integer categoryId);

    /**
     * 查询分类下的商品数量
     */
    int countProducts(Integer categoryId);
}
