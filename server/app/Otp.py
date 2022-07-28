from os import truncate
from random import randint
from datetime import datetime
from twilio.rest import Client

from app.helper import format_contact

class Otp():
    def __init__(self):
        self.otp = None
        self.time = None
        

    def get_otp(self, contact):
        self.otp = randint(10000, 99999)
        self.time = datetime.now()

        # account_sid = 'AC35088d773e571b16f2d65d20d46878c6' 
        # auth_token = 'e724e7145ca927b4116d83ae66dde2ac' 
        # client = Client(account_sid, auth_token)
        # messaging_service_sid='MGb18b6a6fa90587f2c5a101986f9a3fc2'
        # body = f'Your otp code is {str(self.otp)}. Code expires in 30 minutes',
        # message = client.messages.create(  messaging_service_sid=messaging_service_sid, body=body, to="+233"+contact[1:])


    def verify_otp(self, code):
        current_time = datetime.now()
        seconds_in_days = 24 * 60 * 60
        time_diff = current_time - self.time
        time = divmod(time_diff.days * seconds_in_days + time_diff.seconds, 60)

    
        if time[0] < 30:
            if  code == self.otp:
                print(time[0])
                return True

            else:
                return "invalid code"

        else:
            return "code has expired"

            