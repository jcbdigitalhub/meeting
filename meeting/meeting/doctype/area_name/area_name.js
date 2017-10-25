// Copyright (c) 2017, Frappé and contributors
// For license information, please see license.txt

/*frappe.ui.form.on('Area Name', {
	refresh: function(frm) {

	}
});*/
cur_frm.cscript.refresh = function(doc, cdt, cdn) {
	cur_frm.cscript.set_root_readonly(doc);
}

cur_frm.cscript.set_root_readonly = function(doc) {
	// read-only for root customer group
	if(!doc.parent_area_name) {
		cur_frm.set_read_only();
		cur_frm.set_intro(__("This is a root customer group and cannot be edited."));
	} else {
		cur_frm.set_intro(null);
	}
}

//get query select Customer Group
cur_frm.fields_dict['parent_area_name'].get_query = function(doc,cdt,cdn) {
	return {
		filters: {
			'is_group': 1
		}
	}
}
