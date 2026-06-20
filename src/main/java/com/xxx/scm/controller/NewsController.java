package com.xxx.scm.controller;

import com.xxx.scm.entity.News;
import com.xxx.scm.entity.R;
import com.xxx.scm.service.NewsService;
import com.xxx.scm.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 新闻公告 Controller — REST API
 */
@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/list")
    public R<?> list(@RequestParam(defaultValue = "1") int pageNo,
                     @RequestParam(defaultValue = "10") int pageSize,
                     @RequestParam(required = false) String keyword) {
        PageResult<News> page = newsService.findByPage(keyword, pageNo, pageSize);
        return R.ok(page);
    }

    @GetMapping("/{newsId}")
    public R<?> detail(@PathVariable Integer newsId) {
        return R.ok(newsService.findById(newsId));
    }

    @PostMapping("/add")
    public R<?> add(@RequestBody News news, HttpServletRequest request) {
        try {
            String realName = (String) request.getAttribute("username");
            news.setAuthor(realName);
            newsService.add(news);
            return R.ok("添加成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/update")
    public R<?> update(@RequestBody News news) {
        try {
            newsService.update(news);
            return R.ok("修改成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/delete")
    public R<?> delete(@RequestParam Integer newsId) {
        try {
            newsService.delete(newsId);
            return R.ok("删除成功");
        } catch (Exception e) {
            return R.error(e.getMessage());
        }
    }
}
