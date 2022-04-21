import os
import gspread

def Authenticate():
  client_secret = os.path.join('E:/Program/bill-manager/backend/keys/', 'client_secret_OAuth.json')
  auth_user = os.path.join('E:/Program/bill-manager/backend/keys/', 'authorized_user.json' )

  # Using Oauth 
  gc = gspread.oauth(
    credentials_filename=client_secret,
    authorized_user_filename=auth_user
  )

  # Using Service Account
  # gc = gspread.service_account(filename=client_secret)
  
  return gc 

def getSpreadsheet(fileName):
  gc = Authenticate()
  try:
    sh = gc.open(fileName)
  except:
    sh = gc.create(fileName)
  return sh

def createProduct(sheet):
  worksheet = sheet.add_worksheet('Products', rows=1000, cols=1000)
  worksheet.update('A1:D1', [['product_id', 'product_name', 'product_HSN','last_updated_price']])
  return worksheet 

def createCustomer(sheet):
  worksheet = sheet.add_worksheet('Customers', rows=1000, cols=1000)
  worksheet.update('A1:F1', [['customer_id', 'name', 'balance', 'gst', 'phone', 'address']])
  return worksheet 

# Name varies for each year
def createBill(sheet, name):
  worksheet = sheet.add_worksheet(name, rows=1000, cols=1000)
  worksheet.update('A1:F1', [['bill_no', 'customer_id', 'date', 'amount', 'is_completed', 'completed_date', ]])
  return worksheet 

def createWorksheet(sheet, name):
  funtion = {
    'Products' : createProduct, 
    'customer': createCustomer,
    'Bill': createBill
  }
  create = funtion.get(name)
  return create(sheet)

def getWorksheet(sheet, name):
  try:
    worksheet = sheet.worksheet(name)
  except:
    worksheet = createWorksheet(sheet, name)
  return worksheet
