package cn.bnu.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import cn.bnu.common.DateUtil;
import cn.bnu.common.Encoder;
import cn.bnu.common.SaveUploadFile;
import cn.bnu.model.NoticeColumns;
import cn.bnu.model.NoticeNews;
import cn.bnu.service.NoticeManageService;

@Controller
public class NoticeManageController {

	private NoticeManageService noticeService;

	@Autowired
	public NoticeManageController(NoticeManageService noticeService) {
		this.noticeService = noticeService;
	}

	// --------------------内容发布-------------------------
	// 查询
	@RequestMapping(value = "/get_NoticeNews")
	@ResponseBody
	public Map<String, Object> getNoticeNews(
			@RequestParam("searchKeyword") String searchKeyword,
			@RequestParam("noticeState") String noticeState)
			throws SQLException {
		searchKeyword = Encoder.encode(searchKeyword);
		noticeState = Encoder.encode(noticeState);
		return this.noticeService.getNoticeNewList(searchKeyword, noticeState);
		//
	}

	// 移除到草稿箱
	@RequestMapping(value = "/del_NoticeToDraft")
	@ResponseBody
	public void noticeToDraftById(@RequestParam("id") String id)
			throws IOException {
		this.noticeService.noticeToDraft(id);
	}

	// 移除到删除
	@RequestMapping(value = "/del_NoticeToDelete")
	@ResponseBody
	public void noticeToDeleteById(@RequestParam("id") String id)
			throws IOException {
		this.noticeService.noticeToDelete(id);
	}

	// 删除
	@RequestMapping(value = "/del_NoticeNews")
	@ResponseBody
	public void delNoticeById(@RequestParam("id") String id) throws IOException {
		this.noticeService.deleteNotice(id);
	}

	// 添加用户信息
	@RequestMapping(value = "/add_NoticeNews", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> addNotice(@RequestBody NoticeNews notice)
			throws IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			Calendar ca = Calendar.getInstance();
			Date now = ca.getTime();
			notice.setPublishDate(now);
			this.noticeService.addNotice(notice);
			result.put("success", true);
			result.put("msg", ",successfully saved");
		} catch (Exception er) {
			result.put("failure", true);
			result.put("msg", ",failed saved");
		}
		return result;
	}

	// 修改用户信息
	@RequestMapping(value = "/update_NoticeNews", method = RequestMethod.POST)
	// ,method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateNotice(@RequestBody NoticeNews notice)
			throws IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			this.noticeService.updateNotice(notice);
			result.put("success", true);
			result.put("msg", ",successfully saved");
		} catch (Exception er) {
			result.put("failure", true);
			result.put("msg", ",failed saved");
		}
		return result;
	}

	// 更新阅读次数
	@RequestMapping(value = "/update_noticeReadCount")
	@ResponseBody
	public Map<String, Object> updateReadCount(@RequestParam("id") String id)
			throws SQLException {
		id = Encoder.encode(id);
		return this.noticeService.updateNoticeRead(id);
		//
	}

	// -------------------------columns----------------------------
	@RequestMapping(value = "/get_NoticeColumns")
	@ResponseBody
	public Map<String, Object> getNoticeColumns() throws SQLException {
		return this.noticeService.getNoticeColumnsList();
	}

	// 删除用户信息
	@RequestMapping(value = "/del_NoticeColumnById")
	// ,method=RequestMethod.POST)
	@ResponseBody
	public void delUserById(@RequestParam("id") String id) throws IOException {
		this.noticeService.deleteNoticeColumns(id);
	}

	// 添加用户信息
	@RequestMapping(value = "/add_NoticeColumns")
	@ResponseBody
	public Map<String, Object> addMap(@RequestBody NoticeColumns columns)
			throws IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			this.noticeService.addNoticeColumns(columns);
			result.put("success", true);
			result.put("msg", ",successfully saved");
		} catch (Exception er) {
			result.put("failure", true);
			result.put("msg", ",failed saved");
		}
		return result;
	}

	// 修改用户信息
	@RequestMapping(value = "/update_NoticeColumns", method = RequestMethod.POST)
	// ,method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateMap(@RequestBody NoticeColumns columns)
			throws IOException {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			this.noticeService.updateNoticeColumns(columns);
			result.put("success", true);
			result.put("msg", ",successfully saved");
		} catch (Exception er) {
			result.put("failure", true);
			result.put("msg", ",failed saved");
		}
		return result;
	}

	@RequestMapping(value = "/addNoticeNewsfile", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> addNoticeNewsfile(
			@RequestParam("file") CommonsMultipartFile[] files) {
		Map<String, Object> result = new HashMap<String, Object>();
		String filenames = "";
		String filepath = "D:/landuse/notice/" + DateUtil.getOnlyId() + "/";
		if (files != null && files.length > 0) {
			System.out.println(files.length);
			for (int i = 0; i < files.length; i++) {
				String filename = files[i].getOriginalFilename();// Extjs组件上传不需对中文进行解码
				boolean s = SaveUploadFile.saveFile(files[i], filepath,
						filename);
				if (!s) {
					result.put("success", false);
					result.put("msg", ",failed saved");
					return result;
				}
				if (i != files.length - 1)
					filename += ";";
				filenames += filename;
			}

			result.put("success", true);
			result.put("msg", "success saved");
			result.put("filenames", filenames);
			result.put("filepath", filepath);
		} else {
			result.put("success", false);
			result.put("msg", "failed saved");
		}
		return result;
	}
	/**
	 * 单文件下载
	 * @param filepath
	 * @param fileName
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/export_file")
	@ResponseBody
	public String download(
			@RequestParam("filepath")String filepath,
			@RequestParam("filename")String fileName,
			@RequestParam("groupFilepath")String groupFilepath, 
			HttpServletRequest request,HttpServletResponse response) {
		response.setCharacterEncoding("utf-8");
		response.setContentType("multipart/form-data");
		response.setHeader("Content-Disposition", "attachment;fileName="
				+ fileName);//attachment

		groupFilepath=Encoder.encode(groupFilepath);
		filepath=Encoder.encode(filepath)+groupFilepath;	
		fileName=Encoder.encode(fileName);
		System.out.println("download:"+filepath+fileName);
		File file=new File(filepath+fileName);
		if (!file.exists()) return null;
		
		InputStream inputStream=null;
		OutputStream os =null;
		try {
			inputStream= new FileInputStream(file);
			os= response.getOutputStream();
			byte[] b = new byte[2048];
			int length;
			while ((length = inputStream.read(b)) > 0) {
				os.write(b, 0, length);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{			
				try {
					if(os!=null)os.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}				
				try {
					if(inputStream!=null)inputStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}					
		}
        //  返回值要注意，要不然就出现下面这句错误！
        //java+getOutputStream() has already been called for this response
		return null;
	}
}
