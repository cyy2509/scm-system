package com.xxx.scm.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * 订单号生成工具类
 */
public class OrderNoUtil {

    /**
     * 生成采购订单号：PO + 日期 + 随机数
     */
    public static String generatePurchaseOrderNo() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateStr = sdf.format(new Date());
        Random random = new Random();
        int num = random.nextInt(9000) + 1000;
        return "PO" + dateStr + num;
    }

    /**
     * 生成销售订单号：SO + 日期 + 随机数
     */
    public static String generateSalesOrderNo() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateStr = sdf.format(new Date());
        Random random = new Random();
        int num = random.nextInt(9000) + 1000;
        return "SO" + dateStr + num;
    }
}
