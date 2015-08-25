/* SuggestServlet.java

	Purpose:
		
	Description:
		
	History:
		Mon Apr 13 13:58:23     2009, Created by tomyeh

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 3.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
package org.zkuery.sample.booksuggest;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.zkuery.json.JSONArray;

/**
 * Handles the AU request for suggestion.
 * @author tomyeh
 */
public class SuggestServlet extends HttpServlet {
	private static final long serialVersionUID = -6206497555943352854L;
	private Map<String, List<Map<String,String>>> _bookInfos;

	public void doGet(HttpServletRequest hreq, HttpServletResponse hres)
	throws ServletException, IOException {
		doPost(hreq, hres);
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {
		final String categoryId = request.getParameter("categoryId");
		if (categoryId != null) {
			List bookInfo = (List)_bookInfos.get(categoryId);
			response.getWriter().append(JSONArray.toJSONString(bookInfo));
		}
	}

	public void init() {
		_bookInfos = new HashMap<String, List<Map<String,String>>>();

		String[] cats = {"bm", "ci", "lf"};
		String[][][] all = {
			{ //bm: Biographies and Memoirs
				{"The Last Lecture", "Randy Pausch", "Jeffrey Zaslow"},
				{"Always Looking Up: The Adventures of an Incurable Optimist ","Michael F. Fox", ""}
			},
			{ //ci: Computer and Internet
				{"ZK: Ajax without the Javascript Framework", "HenriChen", "Robbie Cheng"},
				{"Beautiful Teams: Inspiring and Cautionary Tales", "Andrew Stellman", "Jennifer Greene"}
			},
			{ //lf: Literature and Fiction
				{"The Shack", "William P. Young", ""},
				{"Watchmen", "Alan Moore", "Dave Gibbons"},
				{"Long Lost", "Harlan Coben", ""}
			}
		};
		for (int j = 0; j < cats.length; ++j) {
			String[][] infos = all[j];
			List<Map<String,String>> list = new LinkedList<Map<String,String>>();
			_bookInfos.put(cats[j], list);
			for (String[] info: infos)
				list.add(createBookInfo(info[0], info[1], info[2]));
		}
	}
	private Map<String,String> createBookInfo(String title, String author1, String author2) {
		Map<String,String> info = new LinkedHashMap<String,String>();
		info.put("title", title);
		info.put("author1", author1);
		info.put("author2", author2);
		return info;
	}
}
