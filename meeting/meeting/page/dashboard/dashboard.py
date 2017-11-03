from __future__ import unicode_literals
import frappe
from frappe.utils import cstr,now,add_days
import json

@frappe.whitelist()
def save_customer(**args):
	customer = frappe.new_doc("Customer")
	args = frappe._dict(args)
	customer.customer_name=args.customer_name
	customer.customer_type=args.customer_type
	customer.customer_group=args.customer_group
	customer.territory=args.territory
	customer.image=args.image
	customer.disabled=args.disabled
	customer.insert()
	frappe.msgprint("Customer Record is Added....")

@frappe.whitelist()
def get_customer():
	query = """SELECT `customer_name`,`name`, `customer_group`, `territory`
			 from 
			 	`tabCustomer`"""
	batch = frappe.db.sql(query, as_dict=1)
	for batch_details in batch:
		if batch_details.get('size'):
			batch_details[batch_details.get('size')] = batch_details.get('multiplication_factor')

	return batch


@frappe.whitelist()
def save_item(**args):
	item = frappe.new_doc("Item")
	args = frappe._dict(args)
	item.item_code=args.item_code
	item.item_name=args.item_name
	item.item_group=args.item_group
	item.stock_uom=args.stock_uom
	item.disabled=args.disabled
	item.insert()
	frappe.msgprint("Item is Added....")