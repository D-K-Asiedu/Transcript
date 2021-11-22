from random import randint

class Otp():
    def __init__(self):
        self.otp = None

    def gen_otp(self):
        self.otp = randint(10000, 99999)
            