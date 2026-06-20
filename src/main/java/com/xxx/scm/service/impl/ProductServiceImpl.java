package com.xxx.scm.service.impl;

import com.xxx.scm.entity.Product;
import com.xxx.scm.entity.ProductCategory;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.ProductCategoryMapper;
import com.xxx.scm.mapper.ProductMapper;
import com.xxx.scm.service.ProductService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductCategoryMapper categoryMapper;

    @Override
    public Product findById(Integer productId) {
        return productMapper.findById(productId);
    }

    @Override
    public PageResult<Product> findByPage(String keyword, Integer categoryId,
                                           BigDecimal minPrice, BigDecimal maxPrice,
                                           int pageNo, int pageSize) {
        PageResult<Product> page = new PageResult<>(pageNo, pageSize);
        int totalCount = productMapper.findCount(keyword, categoryId, minPrice, maxPrice);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<Product> list = productMapper.findByPage(keyword, categoryId, minPrice, maxPrice,
                    page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    public List<Product> findAll() {
        return productMapper.findAll();
    }

    @Override
    public void add(Product product) {
        // 默认库存和安全库存
        if (product.getStock() == null) {
            product.setStock(0);
        }
        if (product.getSafetyStock() == null) {
            product.setSafetyStock(10);
        }
        productMapper.insert(product);
    }

    @Override
    public void update(Product product) {
        productMapper.update(product);
    }

    @Override
    public void delete(Integer productId) {
        productMapper.deleteById(productId);
    }

    @Override
    public List<Product> findLowStockProducts() {
        return productMapper.findLowStockProducts();
    }

    @Override
    public int countLowStock() {
        return productMapper.countLowStock();
    }

    @Override
    public List<Map<String, Object>> findCategorySalesRatio() {
        return productMapper.findCategorySalesRatio();
    }

    @Override
    public List<ProductCategory> findAllCategories() {
        return categoryMapper.findAll();
    }

    @Override
    public void addCategory(ProductCategory category) {
        categoryMapper.insert(category);
    }

    @Override
    public void updateCategory(ProductCategory category) {
        categoryMapper.update(category);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        // 检查分类下是否有商品
        int count = categoryMapper.countProducts(categoryId);
        if (count > 0) {
            throw new BusinessException("该分类下存在商品，无法删除");
        }
        categoryMapper.deleteById(categoryId);
    }
}
