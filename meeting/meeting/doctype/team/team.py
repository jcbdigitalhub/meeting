# -*- coding: utf-8 -*-
# Copyright (c) 2017, Frappé and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Team(Document):
	pass

@frappe.whitelist()
def get_children():
	print "hiasdasdasdasdasd\n\n\n\n"

	team = frappe.db.sql("""select name as value,
		is_group as expandable
		from `tabTeam`
		order by name""", as_dict=1)

	# for wh in team:
		# wh["balance"] = team.team_status
	print "hi\n\n\n"
	print team
	return team

@frappe.whitelist()
def add_node():
	from frappe.desk.treeview import make_tree_args
	args = make_tree_args(**frappe.form_dict)

	if cint(args.is_root):
		args.parent_team = None

	frappe.get_doc(args).insert()