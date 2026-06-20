<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="创建销售订单"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never" style="max-width:900px">
    <div slot="header"><h3>创建销售订单</h3></div>

    <form id="orderForm">
        <el-form label-position="top" size="small">
            <el-divider content-position="left"><i class="el-icon-document" style="margin-right:6px"></i>商品明细</el-divider>

            <el-table :data="items" size="mini" border style="width:100%;margin-bottom:16px">
                <el-table-column label="商品" min-width="220">
                    <template slot-scope="scope">
                        <select v-model="scope.row.productId" @change="onProductChange(scope.row)" style="width:100%;height:28px;border:1px solid #DCDFE6;border-radius:4px;padding:0 6px;font-size:12px">
                            <option value="">请选择</option>
                            <option v-for="p in products" :value="p.id" :key="p.id">{{ p.name }} (库存:{{ p.stock }})</option>
                        </select>
                    </template>
                </el-table-column>
                <el-table-column label="单价" width="120" align="right">
                    <template slot-scope="scope">
                        <span>&yen;{{ scope.row.price }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="120" align="center">
                    <template slot-scope="scope">
                        <input type="number" v-model.number="scope.row.quantity" min="1" @input="calcAmount(scope.row)" style="width:80px;height:28px;border:1px solid #DCDFE6;border-radius:4px;text-align:center;font-size:12px">
                    </template>
                </el-table-column>
                <el-table-column label="金额" width="120" align="right">
                    <template slot-scope="scope">
                        <span style="color:#F56C6C;font-weight:600">&yen;{{ scope.row.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="" width="60" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-button type="text" icon="el-icon-plus" @click="addItem" style="margin-bottom:20px">添加商品</el-button>

            <div style="text-align:right;font-size:15px;color:#303133;margin-bottom:24px">
                合计：<span style="color:#F56C6C;font-size:20px;font-weight:700">&yen;{{ totalAmount }}</span>
            </div>

            <el-form-item>
                <el-button type="primary" @click="submitOrder" icon="el-icon-check">提交订单</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/sales/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>

<script>
(function() {
    var app = document.getElementById('app').__vue__;
    if (app) {
        var allProducts = [];
        $.ajax({ url: '${ctx}/product/all', type: 'get', async: false, success: function(data) { allProducts = data; } });

        app.$set(app, 'products', allProducts.map(function(p) { return { id: p.productId, name: p.productName, price: p.price, stock: p.stock }; }));
        app.$set(app, 'items', []);
        app.$set(app, 'totalAmount', '0.00');

        app.$set(app, 'addItem', function() {
            app.items.push({ productId: '', price: '0.00', quantity: 1, amount: '0.00' });
        });

        app.$set(app, 'removeItem', function(index) {
            app.items.splice(index, 1);
            app.calcTotal();
        });

        app.$set(app, 'onProductChange', function(row) {
            var p = app.products.find(function(item) { return item.id == row.productId; });
            if (p) { row.price = parseFloat(p.price).toFixed(2); row.maxStock = p.stock; }
            app.calcAmount(row);
        });

        app.$set(app, 'calcAmount', function(row) {
            row.amount = (parseFloat(row.price) * parseInt(row.quantity || 0)).toFixed(2);
            app.calcTotal();
        });

        app.$set(app, 'calcTotal', function() {
            var total = 0;
            app.items.forEach(function(item) { total += parseFloat(item.amount) || 0; });
            app.totalAmount = total.toFixed(2);
        });

        app.$set(app, 'submitOrder', function() {
            var validItems = app.items.filter(function(item) { return item.productId && item.quantity > 0; });
            if (validItems.length === 0) { app.$message.warning('请添加至少一个商品'); return; }
            for (var i = 0; i < validItems.length; i++) {
                if (validItems[i].quantity > validItems[i].maxStock) {
                    app.$message.error('商品库存不足，当前库存：' + validItems[i].maxStock);
                    return;
                }
            }
            var order = {
                orderItems: validItems.map(function(item) { return { productId: parseInt(item.productId), price: parseFloat(item.price), quantity: parseInt(item.quantity) }; })
            };
            $.ajax({
                url: '${ctx}/sales/add', type: 'post', contentType: 'application/json', data: JSON.stringify(order),
                success: function(result) {
                    if (result === 'success') { app.$message.success('销售订单创建成功！'); setTimeout(function() { location.href = '${ctx}/sales/list'; }, 800); }
                    else { app.$message.error(result.replace('error:', '')); }
                }
            });
        });

        app.addItem();
    }
})();
</script>
