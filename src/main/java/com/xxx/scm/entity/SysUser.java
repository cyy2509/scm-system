package com.xxx.scm.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户实体类
 */
public class SysUser implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer userId;
    private String username;
    private String password;
    private String realName;
    private Integer roleId;
    private String phone;
    private String email;
    private Integer status;  // 1-启用 0-禁用
    private Date createTime;
    private Date updateTime;

    // 关联字段（非数据库字段）
    private String roleName;

    public SysUser() {}

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRealName() { return realName; }
    public void setRealName(String realName) { this.realName = realName; }

    public Integer getRoleId() { return roleId; }
    public void setRoleId(Integer roleId) { this.roleId = roleId; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }

    public Date getUpdateTime() { return updateTime; }
    public void setUpdateTime(Date updateTime) { this.updateTime = updateTime; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    @Override
    public String toString() {
        return "SysUser{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", realName='" + realName + '\'' +
                ", roleId=" + roleId +
                ", roleName='" + roleName + '\'' +
                '}';
    }
}
