# -*- coding: utf-8 -*-
# Copyright (c) 2017, Frappé and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
# from frappe.model.document import Document

# class Organisation(Document):
# 	pass
from frappe.utils.nestedset import NestedSet
class Organisation(NestedSet):
	nsm_parent_field = 'parent_organisation';

	def on_update(self):
		#super(AOrganisation, self).on_update()
		self.validate_one_root()

def get_parent_area_names(area_name):
	lft, rgt = frappe.db.get_value("Organisation", organisation, ['lft', 'rgt'])

	return frappe.db.sql("""select name from `tabOrganisation`
		where lft <= %s and rgt >= %s
		order by lft asc""", (lft, rgt), as_dict=True)