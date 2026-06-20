<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<jsp:include page="../common/header.jsp">
    <jsp:param name="title" value="${news.title}"/>
</jsp:include>
<jsp:include page="../common/menu.jsp"/>

<el-card class="detail-card" shadow="never" style="max-width:800px">
    <div style="text-align:center;margin-bottom:24px">
        <h2 style="font-size:22px;color:#1a1f36;margin-bottom:12px">${news.title}</h2>
        <div class="news-meta" style="justify-content:center;border:none;margin:0;padding:0">
            <span><i class="el-icon-user" style="margin-right:4px"></i>${news.author}</span>
            <span><i class="el-icon-time" style="margin-right:4px"></i><fmt:formatDate value="${news.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
        </div>
    </div>
    <el-divider></el-divider>
    <div class="news-content">${news.content}</div>

    <div class="action-buttons">
        <el-button icon="el-icon-back" @click="location.href='${ctx}/news/list'">返回列表</el-button>
        <c:if test="${sessionScope.loginUser.roleName == '经理' || sessionScope.loginUser.roleName == '人事部员工'}">
            <el-button type="warning" icon="el-icon-edit" @click="location.href='${ctx}/news/edit/${news.newsId}'">编辑</el-button>
        </c:if>
    </div>
</el-card>

<jsp:include page="../common/footer.jsp"/>
