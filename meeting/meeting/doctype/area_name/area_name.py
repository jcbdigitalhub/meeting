# -*- coding: utf-8 -*-
# Copyright (c) 2017, Frappé and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _



from frappe.utils.nestedset import NestedSet
class AreaName(NestedSet):
	nsm_parent_field = 'parent_area_name';

	def on_update(self):
		#super(AreaName, self).on_update()
		self.validate_one_root()

def get_parent_area_names(area_name):
	lft, rgt = frappe.db.get_value("Area Name", area_name, ['lft', 'rgt'])

	return frappe.db.sql("""select name from `tabArea Name`
		where lft <= %s and rgt >= %s
		order by lft asc""", (lft, rgt), as_dict=True)





