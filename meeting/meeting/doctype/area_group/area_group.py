# # -*- coding: utf-8 -*-
# # Copyright (c) 2017, Frappé and contributors
# # For license information, please see license.txt

# from __future__ import unicode_literals
# import frappe
# from frappe.model.document import Document

# class AreaGroup(Document):
# 	pass

# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _


from frappe.utils.nestedset import NestedSet
class AreaGroup(NestedSet):
	nsm_parent_field = 'parent_customer_group';

	def on_update(self):
		self.validate_name_with_customer()
		super(AreaGroup, self).on_update()
		self.validate_one_root()

	def validate_name_with_customer(self):
		if frappe.db.exists("Customer", self.name):
			frappe.msgprint(_("An Customer exists with same name"), raise_exception=1)

def get_parent_customer_groups(customer_group):
	lft, rgt = frappe.db.get_value("Area Group", customer_group, ['lft', 'rgt'])

	return frappe.db.sql("""select name from `tabArea Group`
		where lft <= %s and rgt >= %s
		order by lft asc""", (lft, rgt), as_dict=True)