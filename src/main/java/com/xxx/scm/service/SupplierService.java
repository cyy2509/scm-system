package com.xxx.scm.service;

import com.xxx.scm.entity.Supplier;
import com.xxx.scm.util.PageResult;
import java.util.List;

/**
 * 供应商Service接口
 */
public interface SupplierService {

    /**
     * 根据ID查询供应商
     */
    Supplier findById(Integer supplierId);

    /**
     * 分页查询供应商
     */
    PageResult<Supplier> findByPage(String keyword, String contact, int pageNo, int pageSize);

    /**
     * 查询所有供应商
     */
    List<Supplier> findAll();

    /**
     * 添加供应商
     */
    void add(Supplier supplier);

    /**
     * 修改供应商
     */
    void update(Supplier supplier);

    /**
     * 删除供应商（检查关联订单）
     */
    void delete(Integer supplierId);
}
