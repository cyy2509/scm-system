-- =============================================
-- 百货中心供应链管理系统 数据库脚本
-- 技术栈：SpringMVC + Spring + MyBatis + MySQL
-- =============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS scm_db DEFAULT CHARACTER SET utf8mb4;
USE scm_db;

-- =============================================
-- 1. 角色表
-- =============================================
DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role (
    role_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID',
    role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
    role_desc VARCHAR(200) COMMENT '角色描述'
) COMMENT '角色表';

-- =============================================
-- 2. 用户表
-- =============================================
DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user (
    user_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码(MD5加密)',
    real_name VARCHAR(50) NOT NULL COMMENT '真实姓名',
    role_id INT NOT NULL COMMENT '角色ID',
    phone VARCHAR(20) COMMENT '电话',
    email VARCHAR(50) COMMENT '邮箱',
    status TINYINT DEFAULT 1 COMMENT '状态(1-启用 0-禁用)',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    FOREIGN KEY (role_id) REFERENCES sys_role(role_id)
) COMMENT '用户表';

-- =============================================
-- 3. 供应商表
-- =============================================
DROP TABLE IF EXISTS supplier;
CREATE TABLE supplier (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '供应商ID',
    supplier_name VARCHAR(100) NOT NULL COMMENT '供应商名称',
    contact VARCHAR(50) COMMENT '联系人',
    phone VARCHAR(20) COMMENT '电话',
    address VARCHAR(200) COMMENT '地址',
    remark VARCHAR(500) COMMENT '备注',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '供应商表';

-- =============================================
-- 4. 商品分类表
-- =============================================
DROP TABLE IF EXISTS product_category;
CREATE TABLE product_category (
    category_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID',
    category_name VARCHAR(50) NOT NULL COMMENT '分类名称',
    category_desc VARCHAR(200) COMMENT '分类描述'
) COMMENT '商品分类表';

-- =============================================
-- 5. 商品表
-- =============================================
DROP TABLE IF EXISTS product;
CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
    product_name VARCHAR(100) NOT NULL COMMENT '商品名称',
    category_id INT COMMENT '分类ID',
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '价格',
    stock INT NOT NULL DEFAULT 0 COMMENT '库存数量',
    safety_stock INT NOT NULL DEFAULT 10 COMMENT '安全库存',
    image_url VARCHAR(200) COMMENT '图片URL',
    product_desc VARCHAR(500) COMMENT '商品描述',
    FOREIGN KEY (category_id) REFERENCES product_category(category_id)
) COMMENT '商品表';

-- =============================================
-- 6. 采购订单表
-- =============================================
DROP TABLE IF EXISTS purchase_order;
CREATE TABLE purchase_order (
    order_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    supplier_id INT NOT NULL COMMENT '供应商ID',
    total_amount DECIMAL(10,2) DEFAULT 0.00 COMMENT '总金额',
    order_status TINYINT DEFAULT 0 COMMENT '状态(0-待审核 1-已通过 2-已驳回)',
    create_user INT NOT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id),
    FOREIGN KEY (create_user) REFERENCES sys_user(user_id)
) COMMENT '采购订单表';

-- =============================================
-- 7. 采购订单明细表
-- =============================================
DROP TABLE IF EXISTS purchase_order_item;
CREATE TABLE purchase_order_item (
    item_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    order_id INT NOT NULL COMMENT '订单ID',
    product_id INT NOT NULL COMMENT '商品ID',
    quantity INT NOT NULL COMMENT '数量',
    price DECIMAL(10,2) NOT NULL COMMENT '单价',
    amount DECIMAL(10,2) NOT NULL COMMENT '金额',
    FOREIGN KEY (order_id) REFERENCES purchase_order(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
) COMMENT '采购订单明细表';

-- =============================================
-- 8. 销售订单表
-- =============================================
DROP TABLE IF EXISTS sales_order;
CREATE TABLE sales_order (
    order_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    total_amount DECIMAL(10,2) DEFAULT 0.00 COMMENT '总金额',
    create_user INT NOT NULL COMMENT '创建人',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (create_user) REFERENCES sys_user(user_id)
) COMMENT '销售订单表';

-- =============================================
-- 9. 销售订单明细表
-- =============================================
DROP TABLE IF EXISTS sales_order_item;
CREATE TABLE sales_order_item (
    item_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    order_id INT NOT NULL COMMENT '订单ID',
    product_id INT NOT NULL COMMENT '商品ID',
    quantity INT NOT NULL COMMENT '数量',
    price DECIMAL(10,2) NOT NULL COMMENT '单价',
    amount DECIMAL(10,2) NOT NULL COMMENT '金额',
    FOREIGN KEY (order_id) REFERENCES sales_order(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
) COMMENT '销售订单明细表';

-- =============================================
-- 10. 新闻表
-- =============================================
DROP TABLE IF EXISTS news;
CREATE TABLE news (
    news_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '新闻ID',
    title VARCHAR(200) NOT NULL COMMENT '标题',
    content TEXT COMMENT '内容',
    author VARCHAR(50) COMMENT '作者',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '新闻表';

-- =============================================
-- 11. 操作日志表
-- =============================================
DROP TABLE IF EXISTS sys_operation_log;
CREATE TABLE sys_operation_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT COMMENT '日志ID',
    user_id INT COMMENT '用户ID',
    username VARCHAR(50) COMMENT '用户名',
    operation VARCHAR(100) COMMENT '操作类型',
    module VARCHAR(50) COMMENT '操作模块',
    method VARCHAR(100) COMMENT '方法名',
    ip VARCHAR(50) COMMENT 'IP地址',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '操作日志表';

-- =============================================
-- 插入测试数据
-- =============================================

-- 角色数据
INSERT INTO sys_role(role_name, role_desc) VALUES
('经理', '系统管理员，拥有全部权限'),
('采购部员工', '负责供应商管理和采购订单'),
('销售部员工', '负责销售订单管理'),
('物资部员工', '负责商品和库存管理'),
('人事部员工', '负责用户管理和新闻公告');

-- 用户数据（密码都是123456的MD5加密：e10adc3949ba59abbe56e057f20f883e）
INSERT INTO sys_user(username, password, real_name, role_id, phone, email) VALUES
('admin', 'e10adc3949ba59abbe56e057f20f883e', '系统管理员', 1, '13800138000', 'admin@scm.com'),
('caigou', 'e10adc3949ba59abbe56e057f20f883e', '张采购', 2, '13800138001', 'caigou@scm.com'),
('xiaoshou', 'e10adc3949ba59abbe56e057f20f883e', '李销售', 3, '13800138002', 'xiaoshou@scm.com'),
('wuzi', 'e10adc3949ba59abbe56e057f20f883e', '王物资', 4, '13800138003', 'wuzi@scm.com'),
('renshi', 'e10adc3949ba59abbe56e057f20f883e', '赵人事', 5, '13800138004', 'renshi@scm.com');

-- 供应商数据
INSERT INTO supplier(supplier_name, contact, phone, address, remark) VALUES
('华为科技有限公司', '王经理', '0755-28780808', '深圳市龙岗区华为基地', '主要供应电子产品'),
('美的集团股份有限公司', '李经理', '0757-26605888', '广东省佛山市顺德区', '主要供应家电产品'),
('伊利实业集团', '张经理', '0471-3388888', '内蒙古呼和浩特市', '主要供应乳制品'),
('宝洁中国有限公司', '刘经理', '020-86668888', '广州市天河区', '主要供应日化产品'),
('蒙牛乳业集团', '陈经理', '0472-5128888', '内蒙古包头市', '主要供应乳制品');

-- 商品分类
INSERT INTO product_category(category_name, category_desc) VALUES
('电子产品', '手机、电脑、平板等电子设备'),
('家用电器', '冰箱、洗衣机、空调等家电'),
('食品饮料', '零食、饮料、乳制品等'),
('日用百货', '洗护用品、清洁用品等'),
('服装鞋帽', '男女服装、鞋帽配饰等');

-- 商品数据
INSERT INTO product(product_name, category_id, price, stock, safety_stock, product_desc) VALUES
('华为手机P60', 1, 4999.00, 100, 20, '华为旗舰手机'),
('联想笔记本电脑', 1, 5999.00, 50, 10, '14英寸轻薄本'),
('美的冰箱BCD-218', 2, 2999.00, 30, 10, '三门冰箱'),
('美的空调1.5匹', 2, 3299.00, 25, 8, '变频空调'),
('伊利纯牛奶', 3, 59.90, 200, 50, '250ml*24盒装'),
('蒙牛酸奶', 3, 69.90, 150, 40, '200g*12杯装'),
('海飞丝洗发水', 4, 39.90, 300, 80, '750ml去屑洗发水'),
('舒肤佳香皂', 4, 9.90, 500, 100, '115g抗菌香皂'),
('男士T恤', 5, 99.00, 80, 20, '纯棉短袖T恤'),
('运动鞋', 5, 299.00, 60, 15, '透气跑步鞋');

-- 采购订单
INSERT INTO purchase_order(order_no, supplier_id, total_amount, order_status, create_user) VALUES
('PO20260601001', 1, 249950.00, 1, 2),
('PO20260602001', 2, 89970.00, 1, 2),
('PO20260603001', 3, 11980.00, 0, 2);

-- 采购订单明细
INSERT INTO purchase_order_item(order_id, product_id, quantity, price, amount) VALUES
(1, 1, 50, 4999.00, 249950.00),
(2, 3, 30, 2999.00, 89970.00),
(3, 5, 200, 59.90, 11980.00);

-- 销售订单
INSERT INTO sales_order(order_no, total_amount, create_user) VALUES
('SO20260601001', 9998.00, 3),
('SO20260602001', 5999.00, 3),
('SO20260603001', 14997.00, 3);

-- 销售订单明细
INSERT INTO sales_order_item(order_id, product_id, quantity, price, amount) VALUES
(1, 1, 2, 4999.00, 9998.00),
(2, 2, 1, 5999.00, 5999.00),
(3, 1, 3, 4999.00, 14997.00);

-- 新闻数据
INSERT INTO news(title, content, author) VALUES
('系统上线通知', '百货中心供应链管理系统正式上线，请各部门员工及时登录系统熟悉操作流程。', '系统管理员'),
('6月份采购计划', '本月采购计划已发布，请采购部员工及时处理采购订单。', '系统管理员'),
('库存盘点通知', '定于本月15日进行库存盘点，请物资部做好准备工作。', '赵人事');

-- 操作日志
INSERT INTO sys_operation_log(user_id, username, operation, module, method, ip) VALUES
(1, 'admin', '新增', 'User', 'add', '127.0.0.1'),
(2, 'caigou', '新增', 'PurchaseOrder', 'add', '127.0.0.1'),
(3, 'xiaoshou', '新增', 'SalesOrder', 'add', '127.0.0.1');
