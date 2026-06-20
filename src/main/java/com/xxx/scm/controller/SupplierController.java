package com.xxx.scm.controller;

import com.xxx.scm.entity.R;
import com.xxx.scm.entity.Supplier;
import com.xxx.scm.service.SupplierService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 供应商 Controller — REST API
 */
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String keyword,
                     @RequestParam(required = false) String contact) {
        PageResult<Supplier> page = supplierService.findByPage(keyword, contact, pageNo, pageSize);
        return R.ok(page);
    }

    @GetMapping("/{supplierId}")
    public R<?> getById(@PathVariable Integer supplierId) {
        return R.ok(supplierService.findById(supplierId));
    }

    @PostMapping("/add")
    public R<?> add(@RequestBody Supplier supplier) {
        try {
            supplierService.add(supplier);
            return R.ok("添加成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/update")
    public R<?> update(@RequestBody Supplier supplier) {
        try {
            supplierService.update(supplier);
            return R.ok("修改成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/delete")
    public R<?> delete(@RequestParam Integer supplierId) {
        try {
            supplierService.delete(supplierId);
            return R.ok("删除成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    /**
     * 查询所有供应商（下拉选择用）
     */
    @GetMapping("/all")
    public R<?> findAll() {
        return R.ok(supplierService.findAll());
    }
}
