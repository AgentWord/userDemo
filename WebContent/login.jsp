<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>欢迎使用本系统</title>
</head>
<body>

欢迎使用本系统 你好 dev

<form id = "loginform" action="j_spring_security_check" method="POST" >

<table>
<tr>
<td>用户名</td>
<td ><input class="textinput" type="text" name="j_username"></td>
</tr>
<tr>
<td>密码</td>
<td><input class="textinput" type="password" name="j_password"> </td>
</tr>
<tr>
<td colspan="2"><input name="submit" type="submit" class = "submitbtn" value="登录"></td>

</tr>
</table>
</form>

</body>
</html>