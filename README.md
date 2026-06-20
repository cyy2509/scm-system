# 百货中心供应链管理系统

## 项目简介

这是一个基于 SpringMVC + Spring + MyBatis + MySQL 的百货中心供应链管理系统，作为期末项目。

## 技术栈

- **后端框架**：SpringMVC 5.3.20 + Spring 5.3.20 + MyBatis 3.5.10
- **数据库**：MySQL 8.0
- **连接池**：Druid 1.2.11
- **前端**：JSP + Bootstrap 4 + jQuery + ECharts
- **构建工具**：Maven

## 功能模块

1. **用户登录/退出** - 身份认证、会话管理
2. **数据大屏** - 经营数据可视化（ECharts图表）
3. **用户管理** - 员工信息CRUD、角色权限
4. **供应商管理** - 供应商档案管理
5. **商品管理** - 商品信息、库存、图片上传
6. **采购订单** - 创建、审核、库存联动
7. **销售订单** - 创建、库存扣减
8. **新闻公告** - 发布、编辑、删除
9. **操作日志** - AOP切面自动记录

## 系统角色

| 角色 | 权限 |
|------|------|
| 经理 | 全部权限 |
| 采购部员工 | 供应商管理、采购订单 |
| 销售部员工 | 销售订单 |
| 物资部员工 | 商品管理 |
| 人事部员工 | 用户管理、新闻公告 |

## 部署步骤

### 1. 环境准备

- JDK 1.8+
- Maven 3.6+
- MySQL 8.0+
- Tomcat 9.0+

### 2. 数据库配置

1. 执行 `sql/scm_db.sql` 创建数据库和表
2. 修改 `src/main/resources/db.properties` 中的数据库连接信息

```properties
jdbc.url=jdbc:mysql://localhost:3306/scm_db?useSSL=false&serverTimezone=Asia/Shanghai
jdbc.username=root
jdbc.password=你的密码
```

### 3. 前端资源

项目已配置使用CDN，无需下载前端资源：
- Bootstrap 4.6.2（bootcdn.net）
- jQuery 3.6.0（bootcdn.net）
- ECharts 5.4.3（bootcdn.net）

### 4. 构建部署

```bash
# 构建项目
mvn clean package

# 部署到Tomcat
# 将 target/scm-system.war 复制到 Tomcat 的 webapps 目录
```

### 5. 访问系统

- 访问地址：`http://localhost:8080/scm-system/`
- 测试账号：
  - 管理员：admin / 123456
  - 采购员：caigou / 123456
  - 销售员：xiaoshou / 123456

## 项目结构

```
src/main/java/com/xxx/scm/
├── controller/        # 控制层
├── service/           # 业务层
├── mapper/            # 数据访问层
├── entity/            # 实体类
├── interceptor/       # 拦截器
├── aspect/            # AOP切面
├── exception/         # 异常处理
└── util/              # 工具类

src/main/resources/
├── mapper/            # MyBatis映射文件
├── applicationContext.xml
├── springmvc-config.xml
└── db.properties

src/main/webapp/
├── WEB-INF/views/     # JSP页面
└── static/            # 静态资源
```

## 创新功能

1. **数据大屏** - ECharts可视化展示经营数据
2. **库存预警** - 自动监控低库存商品
3. **AOP日志** - 自动记录增删改操作
4. **库存联动** - 采购审核通过自动增加库存，销售自动扣减库存
