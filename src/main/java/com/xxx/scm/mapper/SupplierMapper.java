package com.xxx.scm.mapper;

import com.xxx.scm.entity.Supplier;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * 供应商Mapper接口
 */
public interface SupplierMapper {

    Supplier findById(@Param("supplierId") Integer supplierId);

    List<Supplier> findByPage(@Param("keyword") String keyword,
                               @Param("contact") String contact,
                               @Param("offset") int offset,
                               @Param("pageSize") int pageSize);

    int findCount(@Param("keyword") String keyword, @Param("contact") String contact);

    List<Supplier> findAll();

    int insert(Supplier supplier);

    int update(Supplier supplier);

    int deleteById(@Param("supplierId") Integer supplierId);

    int countPurchaseOrders(@Param("supplierId") Integer supplierId);

    // 统计本月新增供应商数量
    int countNewSuppliersThisMonth();
}
