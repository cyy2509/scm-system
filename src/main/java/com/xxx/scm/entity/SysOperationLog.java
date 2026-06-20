package com.xxx.scm.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 操作日志实体类
 */
public class SysOperationLog implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer logId;
    private Integer userId;
    private String username;
    private String operation;
    private String module;
    private String method;
    private String ip;
    private Date createTime;

    public SysOperationLog() {}

    public Integer getLogId() { return logId; }
    public void setLogId(Integer logId) { this.logId = logId; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }
}
