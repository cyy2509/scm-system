package com.xxx.scm.controller;

import com.xxx.scm.entity.R;
import com.xxx.scm.entity.SysOperationLog;
import com.xxx.scm.mapper.SysOperationLogMapper;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 操作日志 Controller — REST API
 */
@RestController
@RequestMapping("/api/log")
public class LogController {

    @Autowired
    private SysOperationLogMapper logMapper;

    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String keyword,
                     @RequestParam(required = false) String module) {
        PageResult<SysOperationLog> page = new PageResult<>(pageNo, pageSize);
        int totalCount = logMapper.findCount(keyword, module);
        page.setTotalCount(totalCount);

        if (totalCount > 0) {
            List<SysOperationLog> list = logMapper.findByPage(keyword, module, page.getOffset(), pageSize);
            page.setList(list);
        }
        return R.ok(page);
    }
}
