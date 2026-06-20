package com.xxx.scm.service.impl;

import com.xxx.scm.entity.Supplier;
import com.xxx.scm.exception.BusinessException;
import com.xxx.scm.mapper.SupplierMapper;
import com.xxx.scm.service.SupplierService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierMapper supplierMapper;

    @Override
    public Supplier findById(Integer supplierId) {
        return supplierMapper.findById(supplierId);
    }

    @Override
    public PageResult<Supplier> findByPage(String keyword, String contact, int pageNo, int pageSize) {
        PageResult<Supplier> page = new PageResult<>(pageNo, pageSize);
        int totalCount = supplierMapper.findCount(keyword, contact);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<Supplier> list = supplierMapper.findByPage(keyword, contact, page.getOffset(), pageSize);
            page.setList(list);
        }
        return page;
    }

    @Override
    public List<Supplier> findAll() {
        return supplierMapper.findAll();
    }

    @Override
    public void add(Supplier supplier) {
        supplierMapper.insert(supplier);
    }

    @Override
    public void update(Supplier supplier) {
        supplierMapper.update(supplier);
    }

    @Override
    public void delete(Integer supplierId) {
        // 检查是否有关联的采购订单
        int count = supplierMapper.countPurchaseOrders(supplierId);
        if (count > 0) {
            throw new BusinessException("该供应商存在关联的采购订单，无法删除");
        }
        supplierMapper.deleteById(supplierId);
    }
}
