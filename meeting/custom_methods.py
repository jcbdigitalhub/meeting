import frappe
from frappe.utils import flt,rounded,money_in_words
from frappe.model.mapper import get_mapped_doc
from frappe import throw, _
import datetime



@frappe.whitelist()
def meeting_status(doc, method):
	frappe.msgprint("Meeting Updated")
