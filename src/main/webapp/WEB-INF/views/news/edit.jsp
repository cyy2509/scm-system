<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="编辑新闻"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="form-card" shadow="never" style="max-width:700px">
    <div slot="header"><h3><i class="el-icon-edit-outline" style="margin-right:8px"></i>编辑新闻</h3></div>

    <c:if test="${not empty errorMsg}">
        <el-alert title="${errorMsg}" type="error" show-icon style="margin-bottom:20px"></el-alert>
    </c:if>

    <form method="post" action="${ctx}/news/edit">
        <input type="hidden" name="newsId" value="${news.newsId}">
        <el-form label-position="top" size="small">
            <el-form-item label="标题" required>
                <el-input name="title" value="${news.title}" placeholder="请输入新闻标题" prefix-icon="el-icon-document"></el-input>
            </el-form-item>
            <el-form-item label="内容" required>
                <el-input name="content" type="textarea" :rows="10" placeholder="请输入新闻内容">${news.content}</el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" icon="el-icon-check">保存</el-button>
                <el-button icon="el-icon-back" @click="location.href='${ctx}/news/list'">返回</el-button>
            </el-form-item>
        </el-form>
    </form>
</el-card>

<jsp:include page="../common/footer.jsp"/>
