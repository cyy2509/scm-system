package com.xxx.scm.util;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * MD5加密工具类
 */
public class MD5Util {

    /**
     * 对字符串进行MD5加密
     */
    public static String md5(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }
        return DigestUtils.md5Hex(input);
    }

    /**
     * 验证密码是否正确
     */
    public static boolean verify(String input, String md5) {
        return md5(input).equals(md5);
    }
}
